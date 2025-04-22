// src/config/env.ts
import dotenv from "dotenv";
import { z } from "zod";

// .env ファイルを読み込む（1回だけ実行される）
dotenv.config();

// 型と必須チェックを定義（Zodで！）
const EnvSchema = z.object({
  JWT_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid .env configuration");
}

export const env = parsed.data;
