import { NextRequest, NextResponse } from 'next/server';
import { getAllTodos, createTodo } from '../../lib/todo-service-db';
import { CreateTodoRequest } from '../../lib/models';

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 获取所有Todo项目
 *     description: 返回所有Todo项目的列表，支持按名称和创建时间排序
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, createdAt]
 *           default: createdAt
 *         description: 排序字段，支持按标题(title)或创建时间(createdAt)排序
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: 排序方向，升序(asc)或降序(desc)
 *     responses:
 *       200:
 *         description: 成功获取Todo列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  try {
    // 获取URL参数
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // 默认按创建时间排序
    const sortOrder = searchParams.get('sortOrder') || 'desc'; // 默认降序
    
    // 验证排序字段
    const validSortFields = ['title', 'createdAt'];
    const validSortOrders = ['asc', 'desc'];
    
    const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const finalSortOrder = validSortOrders.includes(sortOrder) ? sortOrder : 'desc';
    
    const todos = await getAllTodos(finalSortBy, finalSortOrder);
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: '获取Todo列表失败' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: 创建新的Todo项目
 *     description: 创建一个新的Todo项目并返回创建的项目
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       201:
 *         description: Todo项目创建成功
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
 *       500:
 *         description: 服务器错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证请求数据
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: '标题是必需的，且必须是字符串' },
        { status: 400 }
      );
    }
    
    const todoData: CreateTodoRequest = {
      title: body.title,
      description: body.description || ''
    };
    
    const newTodo = await createTodo(todoData);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: '创建Todo失败' },
      { status: 500 }
    );
  }
}