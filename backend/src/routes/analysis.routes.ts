import { Router } from "express";

import { asyncHandler } from "../middleware/async-handler";
import { analyzeVideoSchema } from "../schemas/analysis.schema";
import { MockVideoAnalyzer } from "../services/mock-video-analyzer";
import { createStoredAnalysis } from "../stores/memory-store";

export const analysisRouter = Router();
const videoAnalyzer = new MockVideoAnalyzer();

analysisRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const input = analyzeVideoSchema.parse(request.body);
    const analysis = await videoAnalyzer.analyze(input);
    const storedAnalysis = createStoredAnalysis(analysis);

    response.json({
      analysisId: storedAnalysis.id,
      status: storedAnalysis.status,
      analysis: storedAnalysis.analysis
    });
  })
);
