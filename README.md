# Next.js API Server

这是一个使用 [Next.js](https://nextjs.org) 构建的API服务器项目，使用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app) 引导创建。

## 开始使用

首先，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/route.ts` 来开始编辑页面。当你编辑文件时，页面会自动更新。

## 了解更多

要了解有关 Next.js 的更多信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 功能和 API。
- [学习 Next.js](https://nextjs.org/learn) - 一个交互式 Next.js 教程。

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎你的反馈和贡献！

## 部署在 Vercel 上

部署 Next.js 应用的最简单方法是使用来自 Next.js 创建者的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## API 路由

此目录包含用于无头 API 应用程序的示例 API 路由。

有关更多详细信息，请参阅 [route.js 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/route)。

## 日程管理 API

本项目实现了一个简单的日程管理 API，用于管理个人的 TODO 列表。

### API 端点

#### 获取所有 Todo 项目

```
GET /api/todos
```

响应示例：

```json
[
  {
    "id": "1621234567890",
    "title": "完成项目",
    "description": "完成 Next.js API 项目",
    "completed": false,
    "createdAt": "2023-05-17T10:30:00.000Z",
    "updatedAt": "2023-05-17T10:30:00.000Z"
  }
]
```

#### 创建新的 Todo 项目

```
POST /api/todos
```

请求体示例：

```json
{
  "title": "学习 Next.js",
  "description": "学习 Next.js API 路由的使用"
}
```

响应示例：

```json
{
  "id": "1621234567891",
  "title": "学习 Next.js",
  "description": "学习 Next.js API 路由的使用",
  "completed": false,
  "createdAt": "2023-05-17T11:00:00.000Z",
  "updatedAt": "2023-05-17T11:00:00.000Z"
}
```

#### 获取单个 Todo 项目

```
GET /api/todos/{id}
```

响应示例：

```json
{
  "id": "1621234567890",
  "title": "完成项目",
  "description": "完成 Next.js API 项目",
  "completed": false,
  "createdAt": "2023-05-17T10:30:00.000Z",
  "updatedAt": "2023-05-17T10:30:00.000Z"
}
```

#### 更新 Todo 项目

```
PUT /api/todos/{id}
```

请求体示例：

```json
{
  "title": "完成项目",
  "description": "完成 Next.js API 项目并部署",
  "completed": true
}
```

响应示例：

```json
{
  "id": "1621234567890",
  "title": "完成项目",
  "description": "完成 Next.js API 项目并部署",
  "completed": true,
  "createdAt": "2023-05-17T10:30:00.000Z",
  "updatedAt": "2023-05-17T12:00:00.000Z"
}
```

#### 删除 Todo 项目

```
DELETE /api/todos/{id}
```

响应示例：

```json
{
  "message": "Todo项目已成功删除"
}
```
