import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ErrorResponse } from "../../schema/error";
import { UserListQuery, UserListResponse } from "../../schema/user";
import { AppType } from "../../../type";

export const UserRouter = new OpenAPIHono<AppType>();

const listUsersRoute = createRoute({
  operationId: "listUsers",
  tags: ["user"],
  method: "get",
  path: "/",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    query: UserListQuery,
  },
  responses: {
    200: {
      description: "Get",
      content: {
        "application/json": {
          schema: UserListResponse,
        },
      },
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Bad Request",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Unauthorized",
    },
    403: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Forbidden",
    },
    500: {
      description: "Internal Server Error",
    },
  },
});
UserRouter.openapi(listUsersRoute, async (c) => {
  const input = c.req.valid("query");
  const uc = c.get("deps").userUseCase;
  const result = await uc.list(input);
  if (result.isErr()) {
    const error = result.error;
    switch (error.name) {
      case "DBError":
        return c.json({ name: "DB_ERROR", message: "db error" }, 500);
      case "ValidationError":
        return c.json(
          { name: "VALIDATION_ERROR", message: "validation error" },
          400
        );
      case "ForbiddenError":
      default:
        return c.json({ name: "UNKNOWN_ERROR", message: "unknown error" }, 500);
    }
  }

  return c.json(result.value, 201);
});
