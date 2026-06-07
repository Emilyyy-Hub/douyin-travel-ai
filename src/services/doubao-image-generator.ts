import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import type { ImagePlan } from "../types";
import { buildSeedreamRequestBody } from "./doubao-seedream-request";
import type { GenerateImageInput, ImageGenerator } from "./image-generator";
import { buildImagePrompt, resolveImageDestination, resolveLandmark } from "./image-plan-prompt";

interface DoubaoImageResponse {
  data?: Array<{
    url?: string;
    b64_json?: string;
  }>;
  image_url?: string;
  url?: string;
}

function isDoubaoImageResponse(value: unknown): value is DoubaoImageResponse {
  return typeof value === "object" && value !== null;
}

function extractImageUrl(value: unknown): string | null {
  if (!isDoubaoImageResponse(value)) return null;

  const first = value.data?.[0];
  if (first?.url) return first.url;
  if (first?.b64_json) return `data:image/png;base64,${first.b64_json}`;
  if (value.image_url) return value.image_url;
  if (value.url) return value.url;

  return null;
}

function buildItems(style: string): string[] {
  if (style.includes("新中式")) return ["盘扣短衫", "高腰半裙", "软底单鞋"];
  if (style.includes("都市")) return ["短外套", "高腰直筒裤", "低跟鞋"];
  if (style.includes("甜酷")) return ["短外套", "百褶裙", "小号斜挎包"];
  return ["轻薄外搭", "中长裙", "舒适平底鞋"];
}

export class DoubaoImageGenerator implements ImageGenerator {
  public async generate(input: GenerateImageInput): Promise<ImagePlan> {
    if (!env.DOUBAO_API_KEY || env.DOUBAO_API_KEY === "fake_key_replace_me") {
      throw new AppError(500, "DOUBAO_API_KEY_NOT_CONFIGURED", "豆包 API Key 未配置，无法生成图片");
    }

    const prompt = buildImagePrompt(input.request);
    const requestBody = buildSeedreamRequestBody(prompt);
    const response = await fetch(env.DOUBAO_IMAGE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.DOUBAO_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new AppError(502, "DOUBAO_IMAGE_GENERATION_FAILED", "豆包生图接口调用失败");
    }

    const body = (await response.json()) as unknown;
    const imageUrl = extractImageUrl(body);
    if (!imageUrl) {
      throw new AppError(502, "DOUBAO_IMAGE_URL_MISSING", "豆包生图接口未返回图片地址");
    }

    const destination = resolveImageDestination(input.request);
    const landmark = resolveLandmark(destination, input.request.sceneKeywords);
    const style = input.request.styleKeywords?.trim() || input.request.userProfile.preferredStyle;

    return {
      id: input.planId,
      destination,
      landmark,
      imageUrl,
      prompt,
      outfitSummary: {
        style,
        budget: input.request.userProfile.budget,
        items: buildItems(style),
        reason: `${style}与${landmark}的目的地气质匹配，优先保留可复穿和可行动的穿搭逻辑。`
      },
      wardrobeMatches: [],
      mallActionLabel: "一键配衣",
      provider: "doubao"
    };
  }
}
