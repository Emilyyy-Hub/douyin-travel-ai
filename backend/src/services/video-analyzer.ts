import type { VideoAnalysis } from "../types";

export interface AnalyzeDemoInput {
  sourceType: "demo";
  demoCaseId: string;
}

export interface AnalyzeDouyinUrlInput {
  sourceType: "douyin_url";
  videoUrl: string;
}

export type AnalyzeVideoInput = AnalyzeDemoInput | AnalyzeDouyinUrlInput;

export interface VideoAnalyzer {
  analyze(input: AnalyzeVideoInput): Promise<VideoAnalysis>;
}
