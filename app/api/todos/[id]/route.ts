import { NextRequest, NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '../../../lib/todo-service-db';
import { UpdateTodoRequest } from '../../../lib/models';

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: 获取单个Todo项目
 *     description: 根据ID获取特定的Todo项目
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo项目的唯一标识符
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功获取Todo项目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: 找不到指定的Todo项目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todo = await getTodoById(id);
    
    if (!todo) {
      return NextResponse.json(
        { error: '找不到指定的Todo项目' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: '获取Todo项目失败' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: 更新Todo项目
 *     description: 根据ID更新特定的Todo项目
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo项目的唯一标识符
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoRequest'
 *     responses:
 *       200:
 *         description: Todo项目更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: 请求数据无效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 找不到指定的Todo项目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // 验证请求数据
    if (body.title !== undefined && typeof body.title !== 'string') {
      return NextResponse.json(
        { error: '标题必须是字符串' },
        { status: 400 }
      );
    }
    
    if (body.completed !== undefined && typeof body.completed !== 'boolean') {
      return NextResponse.json(
        { error: '完成状态必须是布尔值' },
        { status: 400 }
      );
    }
    
    const todoData: UpdateTodoRequest = {
      title: body.title,
      description: body.description,
      completed: body.completed
    };
    
    const updatedTodo = await updateTodo(id, todoData);
    
    if (!updatedTodo) {
      return NextResponse.json(
        { error: '找不到指定的Todo项目' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: '更新Todo项目失败' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: 删除Todo项目
 *     description: 根据ID删除特定的Todo项目
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Todo项目的唯一标识符
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo项目删除成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: 找不到指定的Todo项目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteTodo(id);
    
    if (!success) {
      return NextResponse.json(
        { error: '找不到指定的Todo项目' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Todo项目已成功删除' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: '删除Todo项目失败' },
      { status: 500 }
    );
  }
}