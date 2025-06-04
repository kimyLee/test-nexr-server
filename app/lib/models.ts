/*
 * @Author: cuby-kimmy
 * @LastEditors: kimmy
 */
// 定义Todo项目的数据模型
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// 创建新Todo的请求数据结构
export interface CreateTodoRequest {
  title: string;
  description?: string;
}

// 更新Todo的请求数据结构
export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}