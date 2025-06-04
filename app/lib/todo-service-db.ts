import { Todo, CreateTodoRequest, UpdateTodoRequest } from './models';
import { query } from './db';

// 读取所有Todo项目
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const result = await query('SELECT * FROM todos ORDER BY created_at DESC');
    return result.rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      completed: row.completed,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString()
    }));
  } catch (error) {
    console.error('Error getting todos:', error);
    return [];
  }
};

// 根据ID获取单个Todo项目
export const getTodoById = async (id: string): Promise<Todo | null> => {
  try {
    const result = await query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      completed: row.completed,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString()
    };
  } catch (error) {
    console.error(`Error getting todo with id ${id}:`, error);
    return null;
  }
};

// 创建新的Todo项目
export const createTodo = async (todoData: CreateTodoRequest): Promise<Todo> => {
  try {
    const result = await query(
      'INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
      [todoData.title, todoData.description || '', false]
    );
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      completed: row.completed,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString()
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// 更新Todo项目
export const updateTodo = async (id: string, todoData: UpdateTodoRequest): Promise<Todo | null> => {
  try {
    // 构建更新查询
    let updateQuery = 'UPDATE todos SET updated_at = CURRENT_TIMESTAMP';
    const queryParams: any[] = [];
    const updateFields: { [key: string]: any } = {};
    
    if (todoData.title !== undefined) updateFields.title = todoData.title;
    if (todoData.description !== undefined) updateFields.description = todoData.description;
    if (todoData.completed !== undefined) updateFields.completed = todoData.completed;
    
    // 添加要更新的字段到查询
    let paramIndex = 1;
    Object.entries(updateFields).forEach(([key, value]) => {
      updateQuery += `, ${key} = $${paramIndex}`;
      queryParams.push(value);
      paramIndex++;
    });
    
    // 添加WHERE条件和RETURNING子句
    updateQuery += ` WHERE id = $${paramIndex} RETURNING *`;
    queryParams.push(id);
    
    // 执行查询
    const result = await query(updateQuery, queryParams);
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      title: row.title,
      description: row.description,
      completed: row.completed,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString()
    };
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    return null;
  }
};

// 删除Todo项目
export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const result = await query('DELETE FROM todos WHERE id = $1 RETURNING id', [id]);
    return result.rows.length > 0;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    return false;
  }
};