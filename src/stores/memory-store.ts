import type { ImagePlan, ImagePlanTask, PlanTask, StoredAnalysis, TravelPlan } from "../types";
import { createId } from "../utils/ids";

const analyses = new Map<string, StoredAnalysis>();
const plans = new Map<string, PlanTask>();
const imagePlans = new Map<string, ImagePlanTask>();

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

  if (!task || task.status !== "processing") {
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

export function updateCompletedPlan(id: string, plan: TravelPlan): PlanTask | undefined {
  const task = plans.get(id);

  if (!task || task.status !== "completed") {
    return task;
  }

  const updatedTask: PlanTask = {
    ...task,
    plan,
    updatedAt: new Date().toISOString()
  };

  plans.set(id, updatedTask);
  return updatedTask;
}

export function clearMemoryStore(): void {
  analyses.clear();
  plans.clear();
  imagePlans.clear();
}

export function createImagePlanTask(): ImagePlanTask {
  const now = new Date().toISOString();
  const task: ImagePlanTask = {
    id: createId("image_plan"),
    status: "processing",
    progress: 10,
    currentStep: "已接收需求，正在整理目的地与个人信息",
    createdAt: now,
    updatedAt: now
  };

  imagePlans.set(task.id, task);
  return task;
}

export function updateImagePlanProgress(id: string, progress: number, currentStep: string): void {
  const task = imagePlans.get(id);

  if (!task || task.status !== "processing") {
    return;
  }

  imagePlans.set(id, {
    ...task,
    progress,
    currentStep,
    updatedAt: new Date().toISOString()
  });
}

export function completeImagePlanTask(id: string, plan: ImagePlan): void {
  const task = imagePlans.get(id);

  if (!task) {
    return;
  }

  imagePlans.set(id, {
    ...task,
    status: "completed",
    progress: 100,
    currentStep: "图片方案已生成",
    plan,
    updatedAt: new Date().toISOString()
  });
}

export function failImagePlanTask(id: string, message: string): void {
  const task = imagePlans.get(id);

  if (!task) {
    return;
  }

  imagePlans.set(id, {
    ...task,
    status: "failed",
    progress: 0,
    currentStep: message,
    updatedAt: new Date().toISOString()
  });
}

export function getImagePlanTask(id: string): ImagePlanTask | undefined {
  return imagePlans.get(id);
}
