import { z } from "zod";

export const AuthRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type AuthRequest = z.infer<typeof AuthRequest>;

export const Login = z.object({
  accessToken: z.string(),
  tokenType: z.literal("Bearer"),
  expiresIn: z.number(),
});
export type Login = z.infer<typeof Login>;
