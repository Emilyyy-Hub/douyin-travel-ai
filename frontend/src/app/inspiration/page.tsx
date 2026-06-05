"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { CaseCard } from "@/components/inspiration/case-card";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StateView } from "@/components/ui/state-view";
import { fetchTravelCases } from "@/lib/api";
import type { TravelCase } from "@/types/plan";

export default function InspirationPage() {
  const router = useRouter();
  const [cases, setCases] = useState<TravelCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<TravelCase | null>(null);
  const [douyinUrl, setDouyinUrl] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    let active = true;
    fetchTravelCases()
      .then((items) => {
        if (!active) {
          return;
        }
        setCases(items);
        setSelectedCase(items[0] ?? null);
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
  }, []);

  function handleContinue() {
    if (!selectedCase && !douyinUrl.trim()) {
      setUrlError("请选择案例或粘贴抖音链接");
      return;
    }

    window.localStorage.setItem(
      "douyin-travel-inspiration",
      JSON.stringify({
        caseId: selectedCase?.id,
        douyinUrl: douyinUrl.trim()
      })
    );
    router.push("/profile");
  }

  return (
    <AppShell eyebrow="选择灵感">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-sm font-semibold text-[#bf5f47]">第 1 步</p>
          <h1 className="mt-1 text-3xl font-bold text-[#24211d]">选择一个旅行视频灵感</h1>
          <p className="mt-2 text-sm leading-6 text-[#756f68]">
            MVP 阶段只使用 Mock 数据，不下载、不解析真实抖音内容。
          </p>
        </div>

        <Card>
          <label className="text-sm font-semibold text-[#24211d]" htmlFor="douyinUrl">
            抖音链接
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="douyinUrl"
              className="focus-ring min-h-11 flex-1 rounded-lg border border-[#d8cabc] bg-white px-3"
              placeholder="粘贴抖音旅行视频链接"
              value={douyinUrl}
              onChange={(event) => {
                setDouyinUrl(event.target.value);
                setUrlError("");
              }}
            />
            <Button type="button" onClick={handleContinue}>
              使用 Mock 解析
            </Button>
          </div>
          {urlError ? <p className="mt-2 text-xs text-[#9f422e]">{urlError}</p> : null}
        </Card>

        {status === "loading" ? (
          <StateView title="正在加载案例" description="正在准备三组可演示的旅行灵感。" />
        ) : null}
        {status === "error" ? (
          <StateView title="案例加载失败" description="Mock 数据暂时不可用，请重新进入页面再试。" />
        ) : null}
        {status === "success" && cases.length === 0 ? (
          <StateView title="暂无案例" description="当前没有可选择的预置旅行案例。" actionLabel="返回首页" actionHref="/" />
        ) : null}
        {status === "success" && cases.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <CaseCard
                key={item.id}
                item={item}
                selected={selectedCase?.id === item.id}
                onSelect={(nextCase) => {
                  setSelectedCase(nextCase);
                  setUrlError("");
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="w-full sm:w-auto" onClick={handleContinue}>
            下一步：填写个人信息
          </Button>
          <LinkButton href="/" variant="secondary" className="w-full sm:w-auto">
            返回首页
          </LinkButton>
        </div>
      </div>
    </AppShell>
  );
}
