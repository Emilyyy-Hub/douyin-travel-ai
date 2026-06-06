import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
  AI_PROVIDER: z.enum(["mock"]).default("mock")
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  AI_PROVIDER: process.env.AI_PROVIDER
});
