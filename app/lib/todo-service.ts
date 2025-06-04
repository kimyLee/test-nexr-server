import fs from 'fs';
import path from 'path';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './models';

// 数据文件路径
const DATA_FILE = path.join(process.cwd(), 'data', 'todos.json');

// 确保数据目录存在
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
  }
};

// 读取所有Todo项目
export const getAllTodos = (): Todo[] => {
  ensureDataDir();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
};

// 根据ID获取单个Todo项目
export const getTodoById = (id: string): Todo | null => {
  const todos = getAllTodos();
  return todos.find(todo => todo.id === id) || null;
};

// 创建新的Todo项目
export const createTodo = (todoData: CreateTodoRequest): Todo => {
  const todos = getAllTodos();
  const now = new Date().toISOString();
  
  const newTodo: Todo = {
    id: Date.now().toString(),
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
    createdAt: now,
    updatedAt: now
  };
  
  todos.push(newTodo);
  saveTodos(todos);
  
  return newTodo;
};

// 更新Todo项目
export const updateTodo = (id: string, todoData: UpdateTodoRequest): Todo | null => {
  const todos = getAllTodos();
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) return null;
  
  const updatedTodo = {
    ...todos[index],
    ...todoData,
    updatedAt: new Date().toISOString()
  };
  
  todos[index] = updatedTodo;
  saveTodos(todos);
  
  return updatedTodo;
};

// 删除Todo项目
export const deleteTodo = (id: string): boolean => {
  const todos = getAllTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  
  if (filteredTodos.length === todos.length) return false;
  
  saveTodos(filteredTodos);
  return true;
};

// 保存所有Todo项目到文件
const saveTodos = (todos: Todo[]) => {
  ensureDataDir();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};