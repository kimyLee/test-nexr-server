import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // 定义API文件夹路径
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo API 文档",
        version: "1.0.0",
        description: "Todo应用的API接口文档",
      },
      components: {
        schemas: {
          Todo: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Todo项目的唯一标识符"
              },
              title: {
                type: "string",
                description: "Todo项目的标题"
              },
              description: {
                type: "string",
                description: "Todo项目的详细描述"
              },
              completed: {
                type: "boolean",
                description: "Todo项目的完成状态"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Todo项目的创建时间"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Todo项目的最后更新时间"
              }
            },
            required: ["id", "title", "completed", "createdAt", "updatedAt"]
          },
          CreateTodoRequest: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Todo项目的标题"
              },
              description: {
                type: "string",
                description: "Todo项目的详细描述"
              }
            },
            required: ["title"]
          },
          UpdateTodoRequest: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Todo项目的标题"
              },
              description: {
                type: "string",
                description: "Todo项目的详细描述"
              },
              completed: {
                type: "boolean",
                description: "Todo项目的完成状态"
              }
            }
          },
          Error: {
            type: "object",
            properties: {
              error: {
                type: "string",
                description: "错误信息"
              }
            },
            required: ["error"]
          },
          Success: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "成功信息"
              }
            },
            required: ["message"]
          }
        }
      },
      security: [],
    },
  });
  return spec;
};