"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clamp } from "@/lib/utils";

const generationSteps = [
  "正在理解视频场景",
  "正在提取出片机位",
  "正在匹配穿搭风格",
  "正在生成行动方案"
];

export default function GeneratingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(8);
  const activeIndex = useMemo(
    () => clamp(Math.floor(progress / 25), 0, generationSteps.length - 1),
    [progress]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => clamp(current + 13, 8, 100));
    }, 320);
    const timer = window.setTimeout(() => {
      router.push("/result/demo");
    }, 3200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [router]);

  return (
    <AppShell eyebrow="生成中">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center space-y-6">
        <div>
          <p className="text-sm font-semibold text-[#bf5f47]">第 3 步</p>
          <h1 className="mt-1 text-3xl font-bold text-[#24211d]">正在生成你的出游行动方案</h1>
          <p className="mt-2 text-sm leading-6 text-[#756f68]">MVP 使用模拟进度，稍后自动进入结果页。</p>
        </div>
        <Card>
          <div className="h-3 overflow-hidden rounded-full bg-[#f1e6da]">
            <div
              className="h-full rounded-full bg-[#bf5f47] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#24211d]">{progress}%</p>
          <div className="mt-5 space-y-3">
            {generationSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-lg bg-[#fbf8f3] px-3 py-3 text-sm"
              >
                <span
                  className={
                    index <= activeIndex
                      ? "h-3 w-3 rounded-full bg-[#607d6c]"
                      : "h-3 w-3 rounded-full bg-[#d8cabc]"
                  }
                />
                <span className={index <= activeIndex ? "font-semibold text-[#24211d]" : "text-[#756f68]"}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/profile" variant="secondary" className="w-full sm:w-auto">
            返回修改信息
          </LinkButton>
          <LinkButton href="/" variant="ghost" className="w-full sm:w-auto">
            重新开始
          </LinkButton>
        </div>
      </div>
    </AppShell>
  );
}
