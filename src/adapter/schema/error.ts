import { z } from "@hono/zod-openapi";

export const ErrorResponse = z
  .object({
    name: z.string(),
    message: z.string(),
  })
  .openapi("ErrorMessage");
