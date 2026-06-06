import type { PlanTask, StoredAnalysis, TravelPlan } from "../types";
import { createId } from "../utils/ids";

const analyses = new Map<string, StoredAnalysis>();
const plans = new Map<string, PlanTask>();

export function saveAnalysis(analysis: StoredAnalysis): StoredAnalysis {
  analyses.set(analysis.id, analysis);
  return analysis;
}

export function createStoredAnalysis(analysis: StoredAnalysis["analysis"]): StoredAnalysis {
  return saveAnalysis({
    id: createId("analysis"),
    status: "completed",
    analysis,
    createdAt: new Date().toISOString()
  });
}

export function getAnalysis(id: string): StoredAnalysis | undefined {
  return analyses.get(id);
}

export function createPlanTask(): PlanTask {
  const now = new Date().toISOString();
  const task: PlanTask = {
    id: createId("plan"),
    status: "processing",
    progress: 10,
    currentStep: "已接收需求，正在整理视频场景",
    createdAt: now,
    updatedAt: now
  };

  plans.set(task.id, task);
  return task;
}

export function updatePlanProgress(id: string, progress: number, currentStep: string): void {
  const task = plans.get(id);

  if (!task || task.status === "completed") {
    return;
  }

  plans.set(id, {
    ...task,
    progress,
    currentStep,
    updatedAt: new Date().toISOString()
  });
}

export function completePlanTask(id: string, plan: TravelPlan): void {
  const task = plans.get(id);

  if (!task) {
    return;
  }

  plans.set(id, {
    ...task,
    status: "completed",
    progress: 100,
    currentStep: "方案已生成",
    plan,
    updatedAt: new Date().toISOString()
  });
}

export function failPlanTask(id: string, message: string): void {
  const task = plans.get(id);

  if (!task) {
    return;
  }

  plans.set(id, {
    ...task,
    progress: 100,
    currentStep: message,
    updatedAt: new Date().toISOString()
  });
}

export function getPlanTask(id: string): PlanTask | undefined {
  return plans.get(id);
}

export function clearMemoryStore(): void {
  analyses.clear();
  plans.clear();
}
