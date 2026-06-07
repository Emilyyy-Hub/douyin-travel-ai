import { Router } from "express";

import { AppError } from "../errors/app-error";
import { asyncHandler } from "../middleware/async-handler";
import { refinePlanSchema } from "../schemas/refinement.schema";
import { MockPlanRefiner } from "../services/mock-plan-refiner";
import { getPlanTask, updateCompletedPlan } from "../stores/memory-store";

export const refinementRouter = Router();
const planRefiner = new MockPlanRefiner();

refinementRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const input = refinePlanSchema.parse(request.body);
    const task = getPlanTask(input.planId);

    if (!task) {
      throw new AppError(404, "PLAN_NOT_FOUND", "planId不存在");
    }

    if (task.status !== "completed" || !task.plan) {
      throw new AppError(409, "PLAN_NOT_READY", "方案仍在生成中，请稍后再调整");
    }

    const result = planRefiner.refine(task.plan, input.instruction);
    updateCompletedPlan(task.id, result.plan);

    response.json({
      planId: task.id,
      status: "completed",
      revision: result.revision,
      plan: result.plan
    });
  })
);
