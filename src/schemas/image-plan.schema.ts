import { z } from "zod";

import { userProfileSchema } from "./plan.schema";

export const generateImagePlanSchema = z.object({
  destination: z.string().min(1).max(100).optional(),
  demoCaseId: z.string().min(1).max(60).optional(),
  styleKeywords: z.string().min(1).max(200).optional(),
  sceneKeywords: z.string().min(1).max(200).optional(),
  userProfile: userProfileSchema
});

export type GenerateImagePlanRequest = z.infer<typeof generateImagePlanSchema>;
