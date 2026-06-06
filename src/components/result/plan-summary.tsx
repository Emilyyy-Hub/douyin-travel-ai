"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { PlanSummary as PlanSummaryType } from "@/types/plan";

interface PlanSummaryProps {
  summary: PlanSummaryType;
}

export function PlanSummaryCard({ summary }: PlanSummaryProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">最终执行方案总结</p>
        <h2 className="mt-1 text-2xl font-bold text-[#24211d]">你的完整出游计划</h2>
      </div>
      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryField label="目的地" value={summary.destination} />
          <SummaryField label="出行天数" value={summary.tripDays + " 天"} />
          <SummaryField label="预估预算" value={formatCurrency(summary.totalBudget)} />
        </div>
        <div className="mt-5">
          <p className="text-xs font-semibold text-[#756f68]">方案亮点</p>
          <ul className="mt-2 space-y-1.5">
            {summary.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[#4a433c]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#bf5f47]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t border-[#e8ded1] pt-4">
          <p className="text-xs font-semibold text-[#756f68]">出发前检查清单</p>
          <ul className="mt-2 space-y-1.5">
            {summary.checklist.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[#4a433c]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#607d6c]" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </section>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#fbf8f3] p-3">
      <p className="text-xs font-semibold text-[#756f68]">{label}</p>
      <p className="mt-1 text-base font-bold text-[#24211d]">{value}</p>
    </div>
  );
}

