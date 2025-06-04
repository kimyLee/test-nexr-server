import { NextResponse } from 'next/server';
import { createTodosTable, query } from '../lib/db';
import { Todo } from '../lib/models';

// 示例数据
const sampleTodos: Todo[] = [
  {
    id: '1',
    title: '完成项目文档',
    description: '编写项目的README和API文档',
    completed: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 一周前
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()  // 5天前
  },
  {
    id: '2',
    title: '实现用户认证',
    description: '添加登录和注册功能',
    completed: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5天前
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()  // 2天前
  },
  {
    id: '3',
    title: '优化前端界面',
    description: '改进用户体验和响应式设计',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3天前
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()  // 1天前
  },
  {
    id: '4',
    title: '部署应用',
    description: '将应用部署到生产环境',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1天前
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()  // 1天前
  },
  {
    id: '5',
    title: '编写测试用例',
    description: '为核心功能编写单元测试和集成测试',
    completed: false,
    createdAt: new Date().toISOString(), // 今天
    updatedAt: new Date().toISOString()  // 今天
  }
];

// 初始化数据库表并插入示例数据
const seedDatabase = async () => {
  try {
    // 创建todos表（如果不存在）
    await createTodosTable();
    
    // 清空现有数据
    await query('TRUNCATE TABLE todos RESTART IDENTITY CASCADE');
    
    // 插入示例数据
    for (const todo of sampleTodos) {
      await query(
        'INSERT INTO todos (title, description, completed, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
        [todo.title, todo.description, todo.completed, todo.createdAt, todo.updatedAt]
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
};

// 清空数据库
const clearDatabase = async () => {
  try {
    // 确保表存在
    await createTodosTable();
    
    // 清空表数据
    await query('TRUNCATE TABLE todos RESTART IDENTITY CASCADE');
    
    return true;
  } catch (error) {
    console.error('Error clearing database:', error);
    return false;
  }
};

// GET 请求处理函数 - 初始化数据库
export async function GET() {
  try {
    const success = await seedDatabase();
    if (success) {
      return NextResponse.json(
        { message: '数据库初始化成功', count: sampleTodos.length },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '数据库初始化失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in seed route:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// DELETE 请求处理函数 - 清空数据库
export async function DELETE() {
  try {
    const success = await clearDatabase();
    if (success) {
      return NextResponse.json(
        { message: '数据库已清空' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '清空数据库失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in clear route:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}