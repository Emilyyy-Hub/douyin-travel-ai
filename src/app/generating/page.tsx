"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateImagePlan } from "@/lib/api";
import { clamp } from "@/lib/utils";
import type { CaseId, PlanRequest, UserProfile } from "@/types/plan";

const generationSteps = [
  "正在整理目的地地标",
  "正在生成穿搭提示词",
  "正在调用豆包生图模型",
  "正在准备一键配衣入口"
];

export default function GeneratingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(8);
  const [error, setError] = useState("");
  const activeIndex = useMemo(
    () => clamp(Math.floor(progress / 25), 0, generationSteps.length - 1),
    [progress]
  );

  useEffect(() => {
    let active = true;
    const interval = window.setInterval(() => {
      setProgress((current) => clamp(current + 13, 8, 100));
    }, 320);

    async function runGeneration() {
      try {
        const inspiration = readStorage<{ caseId?: CaseId; douyinUrl?: string; inputMode?: string; destination?: string; styleKeywords?: string; sceneKeywords?: string }>(
          "douyin-travel-inspiration"
        );
        const profile = readStorage<UserProfile>("douyin-travel-profile");
        const request: PlanRequest | undefined = profile
          ? {
              caseId: inspiration?.caseId,
              douyinUrl: inspiration?.douyinUrl,
              destination: inspiration?.destination,
              styleKeywords: inspiration?.styleKeywords,
              sceneKeywords: inspiration?.sceneKeywords,
              profile
            }
          : undefined;
        const response = await generateImagePlan(request);

        if (!active) return;
        setProgress(100);
        router.push("/result/" + response.plan.id);
      } catch {
        window.clearInterval(interval);
        if (active) {
          setProgress(0);
          setError("生成失败，请检查豆包配置后重试。");
        }
      }
    }

    void runGeneration();

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [router]);

  return (
    <AppShell eyebrow="生成中">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center space-y-6">
        {/* ===== Header ===== */}
        <div>
          <p className="font-label-sm text-label-sm font-bold text-secondary">第 3 步</p>
          <h1 className="mt-1 font-headline-lg-mobile text-headline-lg-mobile text-primary">
            正在生成你的出游行动方案
          </h1>
          <p className="mt-2 font-body-md text-on-surface-variant">
            AI 正在生成你的旅行穿搭参考图...
          </p>
        </div>

        {/* ===== Progress Card ===== */}
        <Card variant="journal">
          {/* Progress bar */}
          <div className="h-3 overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: progress + "%" }}
            />
          </div>
          <p className="mt-3 font-label-sm text-label-sm font-bold text-primary">
            {progress}%
          </p>

          {/* Step indicators */}
          <div className="mt-5 space-y-3">
            {generationSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-3 text-body-md"
              >
                <span
                  className={
                    index <= activeIndex
                      ? "h-3 w-3 rounded-full bg-secondary"
                      : "h-3 w-3 rounded-full bg-outline-variant"
                  }
                />
                <span
                  className={
                    index <= activeIndex
                      ? "font-semibold text-on-surface"
                      : "text-on-surface-variant"
                  }
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          {error ? (
            <p className="mt-4 font-label-sm text-label-sm font-bold text-error">{error}</p>
          ) : null}
        </Card>

        {/* ===== Actions ===== */}
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

function readStorage<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}
