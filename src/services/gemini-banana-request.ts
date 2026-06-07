export interface GeminiBananaRequestBody {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiImageResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        inlineData?: {
          mimeType?: string;
          data?: string;
        };
      }>;
    };
  }>;
}

function isGeminiImageResponse(value: unknown): value is GeminiImageResponse {
  return typeof value === "object" && value !== null;
}

export function buildGeminiBananaRequestBody(prompt: string): GeminiBananaRequestBody {
  return {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };
}

export function extractGeminiImageUrl(value: unknown): string | null {
  if (!isGeminiImageResponse(value)) return null;

  for (const candidate of value.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      const data = part.inlineData?.data;
      if (data) {
        const mimeType = part.inlineData?.mimeType ?? "image/png";
        return `data:${mimeType};base64,${data}`;
      }
    }
  }

  return null;
}
