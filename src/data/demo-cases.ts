import type { DemoCase } from "../types";

export const demoCases: DemoCase[] = [
  {
    id: "dali-lake",
    title: "大理洱海日落",
    destination: "云南大理",
    coverUrl: "/demo/dali.jpg",
    description: "湖风、落日、浅色长裙和松弛感照片。",
    keywords: ["洱海", "日落", "湖风", "松弛感", "浅色系"]
  },
  {
    id: "suzhou-lanes",
    title: "苏州古镇街巷",
    destination: "江苏苏州",
    coverUrl: "/demo/suzhou.jpg",
    description: "青石路、灰瓦白墙、安静又有故事感。",
    keywords: ["古镇", "白墙黛瓦", "青石路", "新中式", "故事感"]
  },
  {
    id: "shanghai-night",
    title: "上海都市夜景",
    destination: "上海",
    coverUrl: "/demo/shanghai.jpg",
    description: "霓虹、玻璃幕墙、利落都市感。",
    keywords: ["外滩", "夜景", "霓虹", "都市", "利落感"]
  }
];

export function getDemoCaseById(id: string): DemoCase | undefined {
  return demoCases.find((demoCase) => demoCase.id === id);
}
