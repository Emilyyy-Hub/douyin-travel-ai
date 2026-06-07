import { z } from "zod";

export const userProfileSchema = z.object({
  heightCm: z.number().int().min(120).max(230),
  usualSize: z.string().min(1).max(20),
  preferredStyle: z.string().min(1).max(60),
  budget: z.number().min(0).max(100000),
  photoGoal: z.string().min(1).max(120),
  shoePreference: z.string().min(1).max(60),
  coveragePreference: z.string().min(1).max(60),
  skinTone: z.string().min(1).max(60).optional(),
  tripDays: z.number().int().min(1).max(30).optional().default(3),
  gender: z.string().min(1).max(10).optional().default("女")
});

export const generatePlanSchema = z.object({
  analysisId: z.string().min(1),
  userProfile: userProfileSchema,
  destination: z.string().min(1).max(100).optional(),
  styleKeywords: z.string().min(1).max(200).optional(),
  sceneKeywords: z.string().min(1).max(200).optional()
});

