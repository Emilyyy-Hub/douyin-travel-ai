import type { ImagePlan } from "../types";
import type { GenerateImagePlanRequest } from "../schemas/image-plan.schema";

export interface GenerateImageInput {
  planId: string;
  request: GenerateImagePlanRequest;
}

export interface ImageGenerator {
  generate(input: GenerateImageInput): Promise<ImagePlan>;
}
