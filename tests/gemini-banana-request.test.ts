import { describe, expect, it } from "vitest";

import { buildGeminiBananaRequestBody, extractGeminiImageUrl } from "../src/services/gemini-banana-request";

describe("Gemini Banana image request", () => {
  it("builds a generateContent body with the prompt as text", () => {
    expect(buildGeminiBananaRequestBody("travel outfit prompt")).toEqual({
      contents: [
        {
          parts: [
            {
              text: "travel outfit prompt"
            }
          ]
        }
      ]
    });
  });

  it("extracts the first inline image as a PNG data URL", () => {
    const response = {
      candidates: [
        {
          content: {
            parts: [
              { text: "done" },
              {
                inlineData: {
                  mimeType: "image/png",
                  data: "abc123"
                }
              }
            ]
          }
        }
      ]
    };

    expect(extractGeminiImageUrl(response)).toBe("data:image/png;base64,abc123");
  });

  it("returns null when the response does not contain inline image data", () => {
    expect(extractGeminiImageUrl({ candidates: [{ content: { parts: [{ text: "no image" }] } }] })).toBeNull();
  });
});
