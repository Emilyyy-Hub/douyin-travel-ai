import { getDemoCaseById } from "../data/demo-cases";
import type { DemoCaseId } from "../types";
import type { GenerateImagePlanRequest } from "../schemas/image-plan.schema";

const landmarkByDestination: Record<string, string> = {
  "云南大理": "洱海、苍山与湖畔草坪",
  "江苏苏州": "古镇街巷、白墙灰瓦与园林漏窗",
  "上海": "外滩与陆家嘴天际线"
};

const destinationByDemoCaseId: Record<DemoCaseId, string> = {
  "dali-lake": "云南大理",
  "suzhou-lanes": "江苏苏州",
  "shanghai-night": "上海"
};

export function resolveImageDestination(input: GenerateImagePlanRequest): string {
  if (input.destination?.trim()) {
    return input.destination.trim();
  }

  const demoCase = input.demoCaseId ? getDemoCaseById(input.demoCaseId) : undefined;
  if (demoCase) {
    return demoCase.destination;
  }

  if (input.demoCaseId && input.demoCaseId in destinationByDemoCaseId) {
    return destinationByDemoCaseId[input.demoCaseId as DemoCaseId];
  }

  return "云南大理";
}

export function resolveLandmark(destination: string, sceneKeywords?: string): string {
  const scene = sceneKeywords?.trim();
  if (scene) {
    return scene;
  }

  return landmarkByDestination[destination] ?? `${destination}代表性城市地标`;
}

export function buildImagePrompt(input: GenerateImagePlanRequest): string {
  const destination = resolveImageDestination(input);
  const landmark = resolveLandmark(destination, input.sceneKeywords);
  const profile = input.userProfile;
  const style = input.styleKeywords?.trim() || profile.preferredStyle;

  return [
    `为一位去${destination}旅行的年轻女性生成一张真实可穿的出片穿搭参考图。`,
    `场景选择${landmark}，画面需要有清晰目的地识别度。`,
    `用户身高约${profile.heightCm}cm，日常尺码${profile.usualSize}，偏好${style}风格。`,
    `服装预算约${profile.budget}元，强调高复用、不过度消费、适合实际旅行。`,
    `露肤接受度为${profile.coveragePreference}，鞋履偏好为${profile.shoePreference}。`,
    `拍照目标：${profile.photoGoal}。`,
    profile.skinTone ? `肤色倾向：${profile.skinTone}，配色需要显气色。` : "",
    "画面要求：旅行写真感、自然光、完整穿搭可见、构图干净、社交媒体出片质感。",
    "避免夸张礼服、过度暴露、难以行走的鞋、文字水印和商品广告。"
  ]
    .filter(Boolean)
    .join("\n");
}
