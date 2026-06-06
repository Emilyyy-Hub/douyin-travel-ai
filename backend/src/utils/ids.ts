import { randomUUID } from "node:crypto";

export function createId(prefix: "analysis" | "plan" | "scene" | "item" | "outfit"): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}
