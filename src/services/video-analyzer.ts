import type { VideoAnalysis } from "../types";

export interface AnalyzeDemoInput {
  sourceType: "demo";
  demoCaseId: string;
}

export interface AnalyzeDouyinUrlInput {
  sourceType: "douyin_url";
  videoUrl: string;
}

export interface AnalyzeManualKeywordsInput {
  sourceType: "manual_keywords";
  destination: string;
  styleKeywords?: string;
  sceneKeywords?: string;
}

export type AnalyzeVideoInput = AnalyzeDemoInput | AnalyzeDouyinUrlInput | AnalyzeManualKeywordsInput;

export interface VideoAnalyzer {
  analyze(input: AnalyzeVideoInput): Promise<VideoAnalysis>;
}
