import { env } from "../config/env";
import { AppError } from "../errors/app-error";
import type { ImagePlan } from "../types";
import type { GenerateImageInput, ImageGenerator } from "./image-generator";
import { buildGeminiBananaRequestBody, extractGeminiImageUrl } from "./gemini-banana-request";
import { buildImagePrompt, resolveImageDestination, resolveLandmark } from "./image-plan-prompt";

function buildItems(style: string): string[] {
  if (style.toLowerCase().includes("urban")) return ["short jacket", "straight-leg pants", "low-heel shoes"];
  if (style.toLowerCase().includes("sweet")) return ["cropped jacket", "pleated skirt", "small crossbody bag"];
  if (style.toLowerCase().includes("minimal")) return ["light outerwear", "midi skirt", "comfortable flats"];
  return ["light outerwear", "midi skirt", "comfortable flats"];
}

function buildGeminiImageUrl(model: string): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

export class GeminiBananaImageGenerator implements ImageGenerator {
  public async generate(input: GenerateImageInput): Promise<ImagePlan> {
    if (env.GEMINI_API_KEY === "fake_key_replace_me") {
      throw new AppError(500, "GEMINI_API_KEY_NOT_CONFIGURED", "Gemini API Key is not configured");
    }

    const prompt = buildImagePrompt(input.request);
    const response = await fetch(buildGeminiImageUrl(env.GEMINI_IMAGE_MODEL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY
      },
      body: JSON.stringify(buildGeminiBananaRequestBody(prompt))
    });

    if (!response.ok) {
      throw new AppError(502, "GEMINI_IMAGE_GENERATION_FAILED", "Gemini image generation failed");
    }

    const body = (await response.json()) as unknown;
    const imageUrl = extractGeminiImageUrl(body);
    if (!imageUrl) {
      throw new AppError(502, "GEMINI_IMAGE_URL_MISSING", "Gemini image generation did not return image data");
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
        reason: `${style} matches ${landmark} while keeping the outfit reusable and practical for travel.`
      },
      wardrobeMatches: [],
      mallActionLabel: "一键配衣",
      provider: "gemini_banana"
    };
  }
}
