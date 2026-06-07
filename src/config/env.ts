import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
  AI_PROVIDER: z.enum(["mock"]).default("mock"),
  IMAGE_PROVIDER: z.enum(["gemini_banana"]).default("gemini_banana"),
  GEMINI_API_KEY: z.string().min(1).default("fake_key_replace_me"),
  GEMINI_IMAGE_MODEL: z.string().min(1).default("gemini-2.5-flash-image")
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  AI_PROVIDER: process.env.AI_PROVIDER,
  IMAGE_PROVIDER: process.env.IMAGE_PROVIDER,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_IMAGE_MODEL: process.env.GEMINI_IMAGE_MODEL
});
