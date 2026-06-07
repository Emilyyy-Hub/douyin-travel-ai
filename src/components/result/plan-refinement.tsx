"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PlanRevision } from "@/types/plan";

interface PlanRefinementProps {
  disabled?: boolean;
  latestRevision?: PlanRevision;
  onSubmit: (instruction: string) => Promise<void>;
}

const quickInstructions = ["更显高", "不露肩", "预算300", "更有电影感"];

export function PlanRefinement({ disabled = false, latestRevision, onSubmit }: PlanRefinementProps) {
  const [instruction, setInstruction] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(nextInstruction: string) {
    const trimmed = nextInstruction.trim();
    if (!trimmed) {
      setError("请输入想调整的要求。");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(trimmed);
      setInstruction("");
    } catch {
      setError("调整失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card variant="journal" className="space-y-4">
      <div>
        <p className="font-label-sm text-label-sm font-bold text-secondary">对话式调整</p>
        <h2 className="mt-1 font-title-md text-primary">告诉我你想怎么改</h2>
      </div>

      {latestRevision ? (
        <div className="rounded-lg bg-surface-container-low p-3 font-body-md text-on-surface">
          <p className="font-semibold text-primary">最近一次调整</p>
          <p className="mt-1">{latestRevision.summary}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {quickInstructions.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
            disabled={disabled || isSubmitting}
            onClick={() => {
              const nextValue = instruction ? `${instruction}，${item}` : item;
              setInstruction(nextValue);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        className="focus-ring min-h-24 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-md text-on-surface"
        placeholder="例如：更显高，不露肩，预算300，不想太网红"
        value={instruction}
        disabled={disabled || isSubmitting}
        onChange={(event) => setInstruction(event.target.value)}
      />

      {error ? <p className="font-label-sm text-label-sm font-bold text-error">{error}</p> : null}

      <Button
        type="button"
        className="w-full sm:w-auto"
        disabled={disabled || isSubmitting}
        onClick={() => {
          void submit(instruction);
        }}
      >
        {isSubmitting ? "正在调整" : "按要求调整方案"}
      </Button>
    </Card>
  );
}
