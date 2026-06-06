"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { ActionCard } from "@/components/result/action-card";
import { OutfitPlanCard } from "@/components/result/outfit-plan-card";
import { PackingList } from "@/components/result/packing-list";
import { SceneAnalysis } from "@/components/result/scene-analysis";
import { ProductCatalog } from "@/components/result/product-catalog";
import { PlanSummaryCard } from "@/components/result/plan-summary";
import { AppShell } from "@/components/layout/app-shell";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StateView } from "@/components/ui/state-view";
import { getPlanById } from "@/lib/api";
import type { Plan, EnhancedPackingItem } from "@/types/plan";

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    getPlanById(params.id)
      .then((result) => {
        if (!active) return;
        setPlan(result?.plan ?? null);
        setStatus("success");
      })
      .catch(() => { if (active) setStatus("error"); });
    return () => { active = false; };
  }, [params.id]);

  const handleCopy = useCallback(() => {
    if (!plan) return;
    const text = buildCopyText(plan);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [plan]);

  const handleSave = useCallback(() => {
    if (!plan) return;
    const json = JSON.stringify(plan, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = plan.destination + "-出游方案.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [plan]);

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
            {/* Header with action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#bf5f47]">{plan.destination} · {plan.tripDays}天 · {plan.gender}性</p>
                <h1 className="mt-1 text-3xl font-bold text-[#24211d]">你的穿搭与出片行动方案</h1>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={handleCopy}>
                  {copied ? "已复制" : "复制方案"}
                </Button>
                <Button type="button" variant="secondary" onClick={handleSave}>
                  保存方案
                </Button>
                <LinkButton href="/" variant="primary">
                  重新开始
                </LinkButton>
              </div>
            </div>

            {/* 1. Scene Analysis Card */}
            <SceneAnalysis destination={plan.destination} weather={plan.weather} analysis={plan.analysis} />

            {/* 2. Outfit Plan Card */}
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

            {/* 3. Photo Action Cards */}
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

            {/* 4. Product Catalog */}
            {plan.products && plan.products.length > 0 ? (
              <ProductCatalog products={plan.products} />
            ) : null}

            {/* 5. Enhanced Packing List */}
            {plan.enhancedPacking && plan.enhancedPacking.length > 0 ? (
              <EnhancedPackingSection items={plan.enhancedPacking} />
            ) : (
              <PackingList packingList={plan.packingList} />
            )}

            {/* 6. Plan Summary */}
            <PlanSummaryCard summary={plan.summary} />
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function EnhancedPackingSection({ items }: { items: EnhancedPackingItem[] }) {
  const grouped = items.reduce<Record<string, EnhancedPackingItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const labelColors: Record<string, string> = {
    "必带": "bg-[#bf5f47] text-white",
    "推荐": "bg-[#e9f0ec] text-[#607d6c]",
    "可选": "bg-[#f5eee6] text-[#756f68]",
    "拍照加分项": "bg-[#fef3c7] text-[#b45309]"
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">旅行打包清单</p>
        <h2 className="mt-1 text-2xl font-bold text-[#24211d]">按出行前直接检查</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(grouped).map(([category, entries]) => (
          <Card key={category}>
            <p className="text-base font-bold text-[#24211d]">{category}</p>
            <div className="mt-3 space-y-2">
              {entries.map((entry, idx) => (
                <div key={idx}>
                  <span className={"inline-block rounded px-2 py-0.5 text-xs font-semibold " + (labelColors[entry.label] || "bg-[#f5eee6] text-[#756f68]")}>
                    {entry.label}
                  </span>
                  <ul className="mt-1.5 text-sm leading-6 text-[#4a433c] space-y-0.5">
                    {entry.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#607d6c] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function buildCopyText(plan: Plan): string {
  const lines: string[] = [];
  lines.push("━".repeat(40));
  lines.push("【抖音出游灵感转行动方案】");
  lines.push("━".repeat(40));
  lines.push("");
  lines.push("◆ 目的地：" + plan.destination);
  lines.push("◆ 出行天数：" + plan.tripDays + "天");
  lines.push("◆ 性别：" + plan.gender);
  lines.push("◆ 天气：" + plan.weather);
  lines.push("");
  lines.push("◆ AI 分析：" + plan.analysis);
  lines.push("");
  lines.push("━".repeat(40));
  lines.push("【穿搭方案】");
  plan.outfits.forEach((o, i) => {
    lines.push("");
    lines.push("★ 穿搭 " + (i + 1) + "：" + o.name);
    lines.push("  风格：" + o.style);
    lines.push("  场景：" + o.scene);
    lines.push("  搭配理由：" + o.reason);
    lines.push("  拍照：" + (o.photoScore ? "✔" : "✖") + " 舒适：" + (o.comfortScore ? "✔" : "✖") + " 显高显瘦：" + (o.slimScore ? "✔" : "✖"));
    o.items.forEach((item) => {
      lines.push("  - " + item.category + "：" + item.name + " (" + (item.owned ? "已拥有" : "￥" + item.price) + ")");
    });
  });
  lines.push("");
  lines.push("━".repeat(40));
  lines.push("【拍照指导】");
  plan.actions.forEach((a) => {
    lines.push("");
    lines.push("★ " + a.scene);
    lines.push("  时间：" + a.time);
    lines.push("  机位：" + a.cameraSpot);
    lines.push("  姿势：" + a.pose);
  });
  lines.push("");
  lines.push("━".repeat(40));
  lines.push("◆ 预算：¥" + plan.summary.totalBudget);
  return lines.join("\n");
}

