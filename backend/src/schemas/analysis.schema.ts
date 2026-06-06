import { z } from "zod";

const douyinUrlSchema = z
  .string()
  .url("请输入合法URL")
  .refine((value) => {
    try {
      const hostname = new URL(value).hostname.toLowerCase();
      return hostname === "douyin.com" || hostname.endsWith(".douyin.com");
    } catch {
      return false;
    }
  }, "请输入抖音域名链接");

export const analyzeVideoSchema = z.discriminatedUnion("sourceType", [
  z.object({
    sourceType: z.literal("demo"),
    demoCaseId: z.string().min(1, "请选择预置案例")
  }),
  z.object({
    sourceType: z.literal("douyin_url"),
    videoUrl: douyinUrlSchema
  }),
  z.object({
    sourceType: z.literal("manual_keywords"),
    destination: z.string().min(1, "请输入目的地"),
    styleKeywords: z.string().min(1).max(200).optional(),
    sceneKeywords: z.string().min(1).max(200).optional()
  })
]);

