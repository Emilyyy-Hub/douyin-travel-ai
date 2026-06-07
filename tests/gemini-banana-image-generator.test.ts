import { afterEach, describe, expect, it, vi } from "vitest";

describe("GeminiBananaImageGenerator", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("calls Gemini image generation and returns an image plan", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-gemini-key");
    vi.stubEnv("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image");

    const fetchSpy = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
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
        }),
        { status: 200 }
      );
    });
    vi.stubGlobal("fetch", fetchSpy);

    const { GeminiBananaImageGenerator } = await import("../src/services/gemini-banana-image-generator");
    const generator = new GeminiBananaImageGenerator();

    const plan = await generator.generate({
      planId: "image_plan_1",
      request: {
        destination: "Shanghai",
        sceneKeywords: "The Bund",
        styleKeywords: "urban",
        userProfile: {
          heightCm: 165,
          usualSize: "M",
          preferredStyle: "urban",
          budget: 800,
          photoGoal: "street style",
          shoePreference: "flats",
          coveragePreference: "moderate",
          tripDays: 3,
          gender: "female"
        }
      }
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "test-gemini-key"
        }
      })
    );
    expect(plan).toMatchObject({
      id: "image_plan_1",
      destination: "Shanghai",
      landmark: "The Bund",
      imageUrl: "data:image/png;base64,abc123",
      provider: "gemini_banana"
    });
  });
});
