import { AppError } from "../errors/app-error";
import { getDemoCaseById } from "../data/demo-cases";
import { scenePresets } from "../data/mock-plans";
import type { DemoCase, DemoCaseId, VideoAnalysis } from "../types";
import type { AnalyzeVideoInput, VideoAnalyzer } from "./video-analyzer";

const fallbackCaseIdByUrl = new Map<string, DemoCaseId>([
  ["dali", "dali-lake"],
  ["suzhou", "suzhou-lanes"],
  ["shanghai", "shanghai-night"]
]);

function resolveCaseFromUrl(videoUrl: string): DemoCase {
  const lowerUrl = videoUrl.toLowerCase();
  const matchedCaseId =
    Array.from(fallbackCaseIdByUrl.entries()).find(([keyword]) => lowerUrl.includes(keyword))?.[1] ??
    "dali-lake";
  const demoCase = getDemoCaseById(matchedCaseId);

  if (!demoCase) {
    throw new AppError(500, "MOCK_CASE_NOT_FOUND", "Mock案例配置缺失");
  }

  return demoCase;
}

function buildAnalysis(demoCase: DemoCase, videoUrl?: string): VideoAnalysis {
  return {
    destination: demoCase.destination,
    source: {
      sourceType: videoUrl ? "douyin_url" : "demo",
      title: demoCase.title,
      coverUrl: demoCase.coverUrl,
      isMock: true,
      ...(videoUrl ? { videoUrl } : {})
    },
    scenes: scenePresets[demoCase.id]
  };
}

export class MockVideoAnalyzer implements VideoAnalyzer {
  public async analyze(input: AnalyzeVideoInput): Promise<VideoAnalysis> {
    if (input.sourceType === "demo") {
      const demoCase = getDemoCaseById(input.demoCaseId);

      if (!demoCase) {
        throw new AppError(400, "VALIDATION_ERROR", "预置旅行案例不存在", [
          { path: "demoCaseId", message: "请选择有效的预置案例" }
        ]);
      }

      return buildAnalysis(demoCase);
    }

    return buildAnalysis(resolveCaseFromUrl(input.videoUrl), input.videoUrl);
  }
}
