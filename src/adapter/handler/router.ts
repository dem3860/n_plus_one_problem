import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";
import { AppType } from "../../type.js";
import { UserRouter } from "./user/route.js";
import { UserInteractor } from "../../useCase/interactor/user.js";
import { UserRepository } from "../database/repository/user.js";
const app = new OpenAPIHono<AppType>();
const prisma = new PrismaClient();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});

app.use("*", async (c, next) => {
  c.set("deps", {
    userUseCase: new UserInteractor(new UserRepository(prisma)),
  });
  await next();
});

app.get("/", (c) => c.text("Hello Hono!"));
app.route("/user/", UserRouter);

// Swagger UI
app.get("/ui", swaggerUI({ url: "/doc" }));
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
});

export { app };
