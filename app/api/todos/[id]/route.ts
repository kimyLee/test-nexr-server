import { NextRequest, NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '../../../lib/todo-service';
import { UpdateTodoRequest } from '../../../lib/models';

// 获取单个Todo项目
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const todo = getTodoById(id);
    
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

// 更新Todo项目
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
    
    const updatedTodo = updateTodo(id, todoData);
    
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

// 删除Todo项目
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = deleteTodo(id);
    
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