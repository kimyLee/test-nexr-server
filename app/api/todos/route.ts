import { NextRequest, NextResponse } from 'next/server';
import { getAllTodos, createTodo } from '../../lib/todo-service';
import { CreateTodoRequest } from '../../lib/models';

// 获取所有Todo项目
export async function GET() {
  try {
    const todos = getAllTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: '获取Todo列表失败' },
      { status: 500 }
    );
  }
}

// 创建新的Todo项目
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证请求数据
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: '标题是必填项且必须是字符串' },
        { status: 400 }
      );
    }
    
    const todoData: CreateTodoRequest = {
      title: body.title,
      description: body.description
    };
    
    const newTodo = createTodo(todoData);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: '创建Todo失败' },
      { status: 500 }
    );
  }
}