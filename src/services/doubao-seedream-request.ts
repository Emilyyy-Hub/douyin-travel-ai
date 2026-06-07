import { env } from "../config/env";

export interface SeedreamRequestBody {
  model: string;
  prompt: string;
  sequential_image_generation: "disabled";
  response_format: "url";
  size: string;
  stream: false;
  watermark: boolean;
}

export function buildSeedreamRequestBody(prompt: string): SeedreamRequestBody {
  return {
    model: env.DOUBAO_IMAGE_MODEL,
    prompt,
    sequential_image_generation: "disabled",
    response_format: "url",
    size: env.DOUBAO_IMAGE_SIZE,
    stream: false,
    watermark: env.DOUBAO_IMAGE_WATERMARK
  };
}
