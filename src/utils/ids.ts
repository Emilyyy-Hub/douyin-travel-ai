import { randomUUID } from "node:crypto";

export function createId(prefix: "analysis" | "plan" | "image_plan" | "scene" | "item" | "outfit" | "revision"): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}
