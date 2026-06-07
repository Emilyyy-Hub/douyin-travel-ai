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
        <p className="font-label-sm text-label-sm font-bold text-secondary">最终执行方案总结</p>
        <h2 className="mt-1 font-headline-lg text-headline-lg text-primary">你的完整出游计划</h2>
      </div>
      <Card variant="journal">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryField label="目的地" value={summary.destination} />
          <SummaryField label="出行天数" value={summary.tripDays + " 天"} />
          <SummaryField label="预估预算" value={formatCurrency(summary.totalBudget)} />
        </div>
        <div className="mt-5">
          <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">方案亮点</p>
          <ul className="mt-2 space-y-1.5">
            {summary.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 font-body-md text-on-surface">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t border-outline-variant pt-4">
          <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">出发前检查清单</p>
          <ul className="mt-2 space-y-1.5">
            {summary.checklist.map((c, i) => (
              <li key={i} className="flex items-start gap-2 font-body-md text-on-surface">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
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
    <div className="rounded-lg bg-surface-container-low p-3">
      <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">{label}</p>
      <p className="mt-1 font-body-lg text-primary font-bold">{value}</p>
    </div>
  );
}
