import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { clearMemoryStore } from "../src/stores/memory-store";

const app = createApp();

beforeEach(() => {
  clearMemoryStore();
});

async function createCompletedPlan(demoCaseId: string) {
  const analysisResponse = await request(app)
    .post("/api/analyze-video")
    .send({ sourceType: "demo", demoCaseId })
    .expect(200);

  const planResponse = await request(app)
    .post("/api/generate-plan")
    .send({
      analysisId: analysisResponse.body.analysisId,
      userProfile: {
        heightCm: 163,
        usualSize: "M",
        preferredStyle: "法式松弛",
        budget: 800,
        photoGoal: "显高且有松弛感",
        shoePreference: "平底鞋",
        coveragePreference: "适度露肤",
        skinTone: "中性偏暖"
      }
    })
    .expect(202);

  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

  return request(app).get(planResponse.body.resultUrl).expect(200);
}

describe("douyin travel action API", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("douyin-travel-action-api");
    expect(new Date(response.body.timestamp).toString()).not.toBe("Invalid Date");
  });

  it("returns three demo cases", async () => {
    const response = await request(app).get("/api/demo-cases").expect(200);

    expect(response.body).toHaveLength(3);
    expect(response.body.map((item: { title: string }) => item.title)).toEqual([
      "大理洱海日落",
      "苏州古镇街巷",
      "上海都市夜景"
    ]);
  });

  it("analyzes a demo video case", async () => {
    const response = await request(app)
      .post("/api/analyze-video")
      .send({ sourceType: "demo", demoCaseId: "dali-lake" })
      .expect(200);

    expect(response.body.analysisId).toMatch(/^analysis_/);
    expect(response.body.status).toBe("completed");
    expect(response.body.analysis.destination).toContain("大理");
    expect(response.body.analysis.source.isMock).toBe(true);
    expect(response.body.analysis.scenes[0]).toMatchObject({
      inferenceType: expect.stringMatching(/^(extracted|inferred)$/)
    });
  });

  it("rejects invalid douyin URLs", async () => {
    const response = await request(app)
      .post("/api/analyze-video")
      .send({ sourceType: "douyin_url", videoUrl: "not-a-url" })
      .expect(400);

    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("creates a plan generation task", async () => {
    const analysisResponse = await request(app)
      .post("/api/analyze-video")
      .send({ sourceType: "demo", demoCaseId: "suzhou-lanes" })
      .expect(200);

    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        analysisId: analysisResponse.body.analysisId,
        userProfile: {
          heightCm: 168,
          usualSize: "L",
          preferredStyle: "新中式",
          budget: 1200,
          photoGoal: "温柔有故事感",
          shoePreference: "舒适单鞋",
          coveragePreference: "适度露肤",
          skinTone: "冷白"
        }
      })
      .expect(202);

    expect(response.body.planId).toMatch(/^plan_/);
    expect(response.body.status).toBe("processing");
    expect(response.body.resultUrl).toBe(`/api/result/${response.body.planId}`);
  });

  it("returns 404 when analysisId does not exist", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        analysisId: "analysis_missing",
        userProfile: {
          heightCm: 163,
          usualSize: "M",
          preferredStyle: "法式松弛",
          budget: 800,
          photoGoal: "显高且有松弛感",
          shoePreference: "平底鞋",
          coveragePreference: "适度露肤"
        }
      })
      .expect(404);

    expect(response.body.error.code).toBe("ANALYSIS_NOT_FOUND");
  });

  it("returns progress and then completed result with three outfits", async () => {
    const analysisResponse = await request(app)
      .post("/api/analyze-video")
      .send({ sourceType: "demo", demoCaseId: "shanghai-night" })
      .expect(200);

    const planResponse = await request(app)
      .post("/api/generate-plan")
      .send({
        analysisId: analysisResponse.body.analysisId,
        userProfile: {
          heightCm: 163,
          usualSize: "M",
          preferredStyle: "都市利落",
          budget: 1600,
          photoGoal: "显高且有镜头气场",
          shoePreference: "短靴",
          coveragePreference: "偏保守",
          skinTone: "中性偏暖"
        }
      })
      .expect(202);

    const progressResponse = await request(app).get(planResponse.body.resultUrl).expect(200);
    expect(progressResponse.body.status).toBe("processing");
    expect(progressResponse.body.progress).toBeGreaterThanOrEqual(0);

    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    const completedResponse = await request(app).get(planResponse.body.resultUrl).expect(200);
    expect(completedResponse.body.status).toBe("completed");
    expect(completedResponse.body.progress).toBe(100);
    expect(completedResponse.body.plan.outfits).toHaveLength(3);
    expect(completedResponse.body.plan.planId).toBe(planResponse.body.planId);
    expect(completedResponse.body.plan.case.id).toBe("shanghai-night");
  });

  it("returns 404 when planId does not exist", async () => {
    const response = await request(app).get("/api/result/plan_missing").expect(404);

    expect(response.body.error.code).toBe("PLAN_NOT_FOUND");
  });

  it("returns distinct scene content for Dali, Suzhou, and Shanghai", async () => {
    const [dali, suzhou, shanghai] = await Promise.all([
      createCompletedPlan("dali-lake"),
      createCompletedPlan("suzhou-lanes"),
      createCompletedPlan("shanghai-night")
    ]);

    expect(dali.body.plan.scenes[0].name).toContain("洱海");
    expect(suzhou.body.plan.scenes[0].name).toContain("古镇");
    expect(shanghai.body.plan.scenes[0].name).toContain("外滩");
    expect(new Set([
      dali.body.plan.outfits[0].style,
      suzhou.body.plan.outfits[0].style,
      shanghai.body.plan.outfits[0].style
    ])).toHaveLength(3);
    expect(dali.body.plan.case.id).toBe("dali-sunset");
    expect(suzhou.body.plan.case.id).toBe("suzhou-lanes");
    expect(shanghai.body.plan.case.id).toBe("shanghai-night");
  });

  it("returns at least seven item categories per outfit and mock purchase links", async () => {
    const completedResponse = await createCompletedPlan("dali-lake");

    for (const outfit of completedResponse.body.plan.outfits) {
      const categories = new Set(
        outfit.items.map((item: { category: string }) => item.category)
      );

      expect(categories.size).toBeGreaterThanOrEqual(7);
      expect(
        outfit.items.every((item: { purchaseUrl: string }) =>
          item.purchaseUrl.startsWith("https://example.com/mock-search?")
        )
      ).toBe(true);
    }
  });
});
