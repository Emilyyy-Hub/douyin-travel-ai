import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
  AI_PROVIDER: z.enum(["mock"]).default("mock"),
  IMAGE_PROVIDER: z.enum(["doubao"]).default("doubao"),
  DOUBAO_API_KEY: z.string().min(1).default("fake_key_replace_me"),
  DOUBAO_IMAGE_MODEL: z.string().min(1).default("doubao-seedream-5.0-lite"),
  DOUBAO_IMAGE_API_URL: z.string().url().default("https://ark.cn-beijing.volces.com/api/v3/images/generations"),
  DOUBAO_IMAGE_SIZE: z.string().min(1).default("2K"),
  DOUBAO_IMAGE_WATERMARK: z.coerce.boolean().default(true)
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  AI_PROVIDER: process.env.AI_PROVIDER,
  IMAGE_PROVIDER: process.env.IMAGE_PROVIDER,
  DOUBAO_API_KEY: process.env.DOUBAO_API_KEY,
  DOUBAO_IMAGE_MODEL: process.env.DOUBAO_IMAGE_MODEL,
  DOUBAO_IMAGE_API_URL: process.env.DOUBAO_IMAGE_API_URL,
  DOUBAO_IMAGE_SIZE: process.env.DOUBAO_IMAGE_SIZE,
  DOUBAO_IMAGE_WATERMARK: process.env.DOUBAO_IMAGE_WATERMARK
});
