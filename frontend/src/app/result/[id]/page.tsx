"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ActionCard } from "@/components/result/action-card";
import { OutfitPlanCard } from "@/components/result/outfit-plan-card";
import { PackingList } from "@/components/result/packing-list";
import { SceneAnalysis } from "@/components/result/scene-analysis";
import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { StateView } from "@/components/ui/state-view";
import { getPlanById } from "@/lib/api";
import type { Plan } from "@/types/plan";

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    let active = true;
    getPlanById(params.id)
      .then((result) => {
        if (!active) {
          return;
        }
        setPlan(result?.plan ?? null);
        setStatus("success");
      })
      .catch(() => {
        if (active) {
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [params.id]);

  return (
    <AppShell eyebrow="行动方案">
      <div className="mx-auto max-w-4xl space-y-8">
        {status === "loading" ? (
          <StateView title="正在加载方案" description="正在整理场景分析、穿搭和打包清单。" />
        ) : null}
        {status === "error" ? (
          <StateView title="方案加载失败" description="请返回重新生成一次方案。" actionLabel="重新开始" actionHref="/" />
        ) : null}
        {status === "success" && plan === null ? (
          <StateView title="暂无方案" description="没有找到对应的 Mock 方案。" actionLabel="重新开始" actionHref="/" />
        ) : null}
        {status === "success" && plan ? (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#bf5f47]">{plan.destination}</p>
                <h1 className="mt-1 text-3xl font-bold text-[#24211d]">你的穿搭与出片行动方案</h1>
              </div>
              <LinkButton href="/" variant="secondary">
                重新开始
              </LinkButton>
            </div>

            <SceneAnalysis destination={plan.destination} weather={plan.weather} analysis={plan.analysis} />

            <section className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#bf5f47]">完整穿搭方案</p>
                <h2 className="mt-1 text-2xl font-bold text-[#24211d]">按场景直接执行</h2>
              </div>
              {plan.outfits.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-3">
                  {plan.outfits.map((outfit) => (
                    <OutfitPlanCard key={outfit.id} outfit={outfit} />
                  ))}
                </div>
              ) : (
                <StateView title="暂无穿搭方案" description="当前方案没有返回穿搭数据。" />
              )}
            </section>

            <section className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#bf5f47]">出片行动卡</p>
                <h2 className="mt-1 text-2xl font-bold text-[#24211d]">拍摄时照着做</h2>
              </div>
              {plan.actions.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {plan.actions.map((action) => (
                    <ActionCard key={action.id} action={action} />
                  ))}
                </div>
              ) : (
                <StateView title="暂无行动卡" description="当前方案没有返回拍摄行动数据。" />
              )}
            </section>

            <PackingList packingList={plan.packingList} />
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
