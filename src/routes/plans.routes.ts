import { Router } from "express";

import { AppError } from "../errors/app-error";
import { asyncHandler } from "../middleware/async-handler";
import { generatePlanSchema } from "../schemas/plan.schema";
import { MockPlanGenerator } from "../services/mock-plan-generator";
import {
  completePlanTask,
  createPlanTask,
  failPlanTask,
  getAnalysis,
  updatePlanProgress
} from "../stores/memory-store";

export const plansRouter = Router();
const planGenerator = new MockPlanGenerator();

function scheduleTaskUpdate(callback: () => void, delayMs: number): void {
  const timer = setTimeout(callback, delayMs);
  timer.unref();
}

plansRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const input = generatePlanSchema.parse(request.body);
    const storedAnalysis = getAnalysis(input.analysisId);

    if (!storedAnalysis) {
      throw new AppError(404, "ANALYSIS_NOT_FOUND", "analysisId不存在");
    }

    const task = createPlanTask();

    scheduleTaskUpdate(() => {
      updatePlanProgress(task.id, 35, "正在拆解视频场景与拍照机位");
    }, 150);

    scheduleTaskUpdate(() => {
      updatePlanProgress(task.id, 65, "正在匹配目的地穿搭");
    }, 350);

    scheduleTaskUpdate(() => {
      void planGenerator
        .generate({
          planId: task.id,
          storedAnalysis,
          userProfile: input.userProfile
        })
        .then((plan) => {
          completePlanTask(task.id, plan);
        })
        .catch(() => {
          failPlanTask(task.id, "方案生成失败");
        });
    }, 650);

    response.status(202).json({
      planId: task.id,
      status: task.status,
      resultUrl: `/api/result/${task.id}`
    });
  })
);
