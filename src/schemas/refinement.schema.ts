import { z } from "zod";

export const refinePlanSchema = z.object({
  planId: z.string().min(1, "请提供方案ID"),
  instruction: z.string().trim().min(1, "请输入调整要求").max(300, "调整要求不能超过300字")
});
