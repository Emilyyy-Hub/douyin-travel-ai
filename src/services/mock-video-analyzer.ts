import { AppError } from "../errors/app-error";
import { getDemoCaseById } from "../data/demo-cases";
import { scenePresets } from "../data/mock-plans";
import type { DemoCase, DemoCaseId, SceneAnalysis, VideoAnalysis } from "../types";
import type { AnalyzeManualKeywordsInput, AnalyzeVideoInput, VideoAnalyzer } from "./video-analyzer";

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

function buildManualAnalysis(input: AnalyzeManualKeywordsInput): VideoAnalysis {
  const styleKeywords = input.styleKeywords?.trim();
  const sceneKeywords = input.sceneKeywords?.trim();
  const scenes: SceneAnalysis[] = scenePresets["dali-lake"].map((scene, index) => ({
    ...scene,
    id: `scene_manual_${index + 1}`,
    name: `${input.destination}${sceneKeywords ? ` ${sceneKeywords}` : ""}出片场景`,
    keywords: [
      ...(sceneKeywords ? sceneKeywords.split(/\s+/).filter(Boolean) : []),
      ...(styleKeywords ? styleKeywords.split(/\s+/).filter(Boolean) : []),
      ...scene.keywords.slice(0, 3)
    ],
    recommendedStyles: styleKeywords ? [styleKeywords, ...scene.recommendedStyles] : scene.recommendedStyles,
    sourceEvidence: "根据用户手动输入的目的地、风格关键词和场景关键词生成的 Mock 灵感拆解。",
    inferenceType: "inferred"
  }));

  return {
    destination: input.destination,
    source: {
      sourceType: "manual_keywords",
      title: `${input.destination}手动灵感`,
      coverUrl: "/demo/manual.jpg",
      isMock: true
    },
    scenes
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

    if (input.sourceType === "douyin_url") {
      return buildAnalysis(resolveCaseFromUrl(input.videoUrl), input.videoUrl);
    }

    return buildManualAnalysis(input);
  }
}
