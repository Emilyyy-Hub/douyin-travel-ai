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

  // Manual input fields
  const [inputMode, setInputMode] = useState<"preset" | "manual">("preset");
  const [destination, setDestination] = useState("");
  const [styleKeywords, setStyleKeywords] = useState("");
  const [sceneKeywords, setSceneKeywords] = useState("");
  const [tripDays, setTripDays] = useState("3");
  const [gender, setGender] = useState("女");
  const [manualError, setManualError] = useState("");

  useEffect(() => {
    let active = true;
    fetchTravelCases()
      .then((items) => {
        if (!active) return;
        setCases(items);
        setSelectedCase(items[0] ?? null);
        setStatus("success");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => { active = false; };
  }, []);

  function handleContinue() {
    if (inputMode === "manual") {
      if (!destination.trim()) {
        setManualError("请输入目的地");
        return;
      }
      window.localStorage.setItem(
        "douyin-travel-inspiration",
        JSON.stringify({
          caseId: null,
          douyinUrl: null,
          inputMode: "manual",
          destination: destination.trim(),
          styleKeywords: styleKeywords.trim(),
          sceneKeywords: sceneKeywords.trim()
        })
      );
      window.localStorage.setItem(
        "douyin-travel-profile",
        JSON.stringify({
          height: "165cm",
          size: "M",
          stylePreference: styleKeywords.trim(),
          budget: "500-1000",
          photoGoal: sceneKeywords.trim(),
          shoePreference: "平底优先",
          skinExposure: "适度露肤",
          hasUploadedPhoto: false,
          tripDays,
          gender
        })
      );
      router.push("/generating");
      return;
    }

    if (!selectedCase && !douyinUrl.trim()) {
      setUrlError("请选择案例或粘贴抖音链接");
      return;
    }

    window.localStorage.setItem(
      "douyin-travel-inspiration",
      JSON.stringify({ caseId: selectedCase?.id, douyinUrl: douyinUrl.trim(), inputMode: "preset" })
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
            MVP 阶段支持预置案例或手动输入目的地与关键词，不下载、不解析真实抖音内容。
          </p>
        </div>

        {/* Input mode toggle */}
        <div className="flex gap-2 rounded-lg bg-[#f5eee6] p-1">
          <button
            type="button"
            className={"flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors " + (inputMode === "preset" ? "bg-white text-[#24211d] shadow-sm" : "text-[#756f68] hover:text-[#24211d]")}
            onClick={() => { setInputMode("preset"); setManualError(""); }}
          >
            预置旅行案例
          </button>
          <button
            type="button"
            className={"flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors " + (inputMode === "manual" ? "bg-white text-[#24211d] shadow-sm" : "text-[#756f68] hover:text-[#24211d]")}
            onClick={() => { setInputMode("manual"); setUrlError(""); }}
          >
            手动输入关键词
          </button>
        </div>

        {/* Manual input mode */}
        {inputMode === "manual" ? (
          <Card className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#24211d]" htmlFor="destination">
                目的地 *
              </label>
              <input
                id="destination"
                className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
                placeholder="例如：云南大理、海南三亚、新疆阿勒泰"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setManualError(""); }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#24211d]" htmlFor="styleKeywords">
                  旅行风格 *
                </label>
                <input
                  id="styleKeywords"
                  className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
                  placeholder="例如：清新松弛、复古温柔、都市利落"
                  value={styleKeywords}
                  onChange={(e) => setStyleKeywords(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#24211d]" htmlFor="sceneKeywords">
                  场景关键词 *
                </label>
                <input
                  id="sceneKeywords"
                  className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
                  placeholder="例如：海边、古城、夜景、街拍、雪山"
                  value={sceneKeywords}
                  onChange={(e) => setSceneKeywords(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#24211d]" htmlFor="tripDays">
                  出行天数
                </label>
                <select
                  id="tripDays"
                  className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
                  value={tripDays}
                  onChange={(e) => setTripDays(e.target.value)}
                >
                  <option value="1">1 天</option>
                  <option value="2">2 天</option>
                  <option value="3">3 天</option>
                  <option value="5">5 天</option>
                  <option value="7">7 天</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#24211d]" htmlFor="gender">
                  性别
                </label>
                <select
                  id="gender"
                  className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="女">女</option>
                  <option value="男">男</option>
                  <option value="不限">不限</option>
                </select>
              </div>
            </div>
            {manualError ? <p className="text-xs text-[#9f422e]">{manualError}</p> : null}
            {/* Screenshot upload placeholder */}
            <label className="flex items-center gap-3 rounded-lg border border-dashed border-[#d8cabc] p-4 text-sm text-[#756f68] cursor-pointer hover:bg-[#fbf8f3] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <span>上传视频截图（当前为占位功能，后续可扩展）</span>
            </label>
          </Card>
        ) : null}

        {/* Preset: Douyin URL */}
        {inputMode === "preset" ? (
          <Card>
            <label className="text-sm font-semibold text-[#24211d]" htmlFor="douyinUrl">
              抖音链接
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="douyinUrl"
                className="focus-ring min-h-11 flex-1 rounded-lg border border-[#d8cabc] bg-white px-3"
                placeholder="粘贴抖音旅行视频链接（占位功能）"
                value={douyinUrl}
                onChange={(event) => { setDouyinUrl(event.target.value); setUrlError(""); }}
              />
            </div>
            {urlError ? <p className="mt-2 text-xs text-[#9f422e]">{urlError}</p> : null}
            <p className="mt-2 text-xs text-[#756f68]">
              当前暂不支持真实解析抖音链接，可切换到“手动输入关键词”模式直接体验完整流程。
            </p>
          </Card>
        ) : null}

        {/* Preset cases */}
        {inputMode === "preset" ? (
          <>
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
                    onSelect={(nextCase) => { setSelectedCase(nextCase); setUrlError(""); }}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="w-full sm:w-auto" onClick={handleContinue}>
            {inputMode === "manual" ? "直接生成方案" : "下一步：填写个人信息"}
          </Button>
          <LinkButton href="/" variant="secondary" className="w-full sm:w-auto">
            返回首页
          </LinkButton>
        </div>
      </div>
    </AppShell>
  );
}

