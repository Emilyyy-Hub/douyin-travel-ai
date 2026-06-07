import { Router } from "express";

import { AppError } from "../errors/app-error";
import { getPlanTask } from "../stores/memory-store";

export const resultsRouter = Router();

resultsRouter.get("/:id", (request, response, next) => {
  const task = getPlanTask(request.params.id);

  if (!task) {
    next(new AppError(404, "PLAN_NOT_FOUND", "planId不存在"));
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

  response.json({
    id: task.id,
    status: task.status,
    progress: task.progress,
    plan: task.plan
  });
});
