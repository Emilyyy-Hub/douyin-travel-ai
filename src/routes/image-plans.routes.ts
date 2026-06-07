import { Router } from "express";

import { AppError } from "../errors/app-error";
import { asyncHandler } from "../middleware/async-handler";
import { generateImagePlanSchema } from "../schemas/image-plan.schema";
import { DoubaoImageGenerator } from "../services/doubao-image-generator";
import type { ImageGenerator } from "../services/image-generator";
import {
  completeImagePlanTask,
  createImagePlanTask,
  failImagePlanTask,
  getImagePlanTask,
  updateImagePlanProgress
} from "../stores/memory-store";

export const imagePlansRouter = Router();

const imageGenerator: ImageGenerator = new DoubaoImageGenerator();

function scheduleTaskUpdate(callback: () => void, delayMs: number): void {
  const timer = setTimeout(callback, delayMs);
  timer.unref();
}

imagePlansRouter.post(
  "/generate-image-plan",
  asyncHandler(async (request, response) => {
    const input = generateImagePlanSchema.parse(request.body);
    const task = createImagePlanTask();

    scheduleTaskUpdate(() => {
      updateImagePlanProgress(task.id, 35, "正在整理目的地地标与穿搭要求");
    }, 150);

    scheduleTaskUpdate(() => {
      updateImagePlanProgress(task.id, 65, "正在调用豆包生图模型");
    }, 350);

    scheduleTaskUpdate(() => {
      void imageGenerator
        .generate({ planId: task.id, request: input })
        .then((plan) => {
          completeImagePlanTask(task.id, plan);
        })
        .catch(() => {
          failImagePlanTask(task.id, "图片方案生成失败");
        });
    }, 650);

    response.status(202).json({
      planId: task.id,
      status: task.status,
      resultUrl: `/api/image-plan-result/${task.id}`
    });
  })
);

imagePlansRouter.get("/image-plan-result/:id", (request, response, next) => {
  const task = getImagePlanTask(request.params.id);

  if (!task) {
    next(new AppError(404, "IMAGE_PLAN_NOT_FOUND", "图片方案不存在"));
    return;
  }

  if (task.status === "processing") {
    response.json({
      id: task.id,
      status: task.status,
      progress: task.progress,
      currentStep: task.currentStep
    });
    return;
  }

  if (task.status === "failed") {
    response.json({
      id: task.id,
      status: task.status,
      progress: task.progress,
      currentStep: task.currentStep
    });
    return;
  }

  response.json({
    id: task.id,
    status: task.status,
    progress: task.progress,
    plan: task.plan
  });
});
