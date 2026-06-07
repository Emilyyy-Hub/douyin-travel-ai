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

type InputMode = "preset" | "douyin" | "manual";

const inputModes: Array<{ id: InputMode; label: string; description: string }> = [
  { id: "preset", label: "预置案例", description: "从后端 Demo 案例开始" },
  { id: "douyin", label: "抖音链接", description: "只校验链接，不下载视频" },
  { id: "manual", label: "手动关键词", description: "直接输入目的地和风格" }
];

export default function InspirationPage() {
  const router = useRouter();
  const [cases, setCases] = useState<TravelCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<TravelCase | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [inputMode, setInputMode] = useState<InputMode>("preset");
  const [douyinUrl, setDouyinUrl] = useState("");
  const [destination, setDestination] = useState("");
  const [styleKeywords, setStyleKeywords] = useState("");
  const [sceneKeywords, setSceneKeywords] = useState("");
  const [tripDays, setTripDays] = useState("3");
  const [gender, setGender] = useState("女");
  const [error, setError] = useState("");

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

    return () => {
      active = false;
    };
  }, []);

  function changeMode(nextMode: InputMode) {
    setInputMode(nextMode);
    setError("");
  }

  function handleContinue() {
    if (inputMode === "preset") {
      if (!selectedCase) {
        setError("请先选择一个旅行灵感案例。");
        return;
      }

      window.localStorage.setItem(
        "douyin-travel-inspiration",
        JSON.stringify({ caseId: selectedCase.id, douyinUrl: "", inputMode: "preset" })
      );
      router.push("/profile");
      return;
    }

    if (inputMode === "douyin") {
      if (!douyinUrl.trim()) {
        setError("请粘贴抖音旅行视频链接。");
        return;
      }

      window.localStorage.setItem(
        "douyin-travel-inspiration",
        JSON.stringify({ caseId: null, douyinUrl: douyinUrl.trim(), inputMode: "douyin" })
      );
      router.push("/profile");
      return;
    }

    if (!destination.trim()) {
      setError("请输入目的地。");
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
        stylePreference: styleKeywords.trim() || "自然松弛",
        budget: "500-1000",
        photoGoal: sceneKeywords.trim() || "自然出片",
        shoePreference: "平底优先",
        skinExposure: "适度露肤",
        hasUploadedPhoto: false,
        tripDays,
        gender
      })
    );
    router.push("/generating");
  }

  return (
    <AppShell eyebrow="第 1 步：选择灵感">
      <div className="space-y-8">
        {/* ===== Page Header ===== */}
        <section className="mb-stack-lg relative">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">
            获取穿搭灵感
          </h2>
          <p className="text-on-surface-variant font-body-md italic">
            &ldquo;记录每一次与风景的相遇，从一件完美的衣服开始。&rdquo;
          </p>
          <div className="w-32 h-1 bg-primary mt-4 opacity-20 rounded-full" />
        </section>

        {/* ===== Tab Switcher ===== */}
        <div className="flex gap-gutter mb-stack-md overflow-x-auto pb-2 scrollbar-hide">
          {inputModes.map((mode) => {
            const active = inputMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                className={
                  "px-6 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all " +
                  (active
                    ? "bg-primary text-on-primary hand-drawn-border"
                    : "border border-outline text-primary hover:bg-surface-container-low")
                }
                onClick={() => changeMode(mode.id)}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* ===== Tab Content: Preset Cases ===== */}
        {inputMode === "preset" ? (
          <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-label-sm text-label-sm font-bold text-secondary">后端案例</p>
                <h2 className="mt-1 font-title-md text-title-md text-primary">
                  选择一个可演示的旅行场景
                </h2>
              </div>
            </div>

            {status === "loading" ? (
              <StateView title="正在加载案例" description="正在从后端读取旅行灵感。" />
            ) : null}
            {status === "error" ? (
              <StateView
                title="案例加载失败"
                description="请确认后端服务正在 http://localhost:8000 运行。"
              />
            ) : null}
            {status === "success" && cases.length === 0 ? (
              <StateView title="暂无案例" description="后端没有返回可选择的预置案例。" />
            ) : null}
            {status === "success" && cases.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {cases.map((item) => (
                  <CaseCard
                    key={item.id}
                    item={item}
                    selected={selectedCase?.id === item.id}
                    onSelect={(nextCase) => {
                      setSelectedCase(nextCase);
                      setError("");
                    }}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* ===== Tab Content: Douyin Link ===== */}
        {inputMode === "douyin" ? (
          <Card variant="journal" className="max-w-lg mx-auto space-y-4 bg-white">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined">link</span>
              <label className="font-label-sm uppercase tracking-wider">
                粘贴抖音视频链接
              </label>
            </div>
            <input
              className="w-full border-none border-b border-primary bg-transparent focus:ring-0 text-body-lg py-2 placeholder:opacity-30 italic"
              placeholder="https://v.douyin.com/..."
              value={douyinUrl}
              onChange={(event) => {
                setDouyinUrl(event.target.value);
                setError("");
              }}
            />
            <p className="text-on-surface-variant text-[12px] leading-relaxed">
              AI 将自动分析视频中的场景、气候与整体风格，为您匹配最合适的旅行穿搭。
            </p>
          </Card>
        ) : null}

        {/* ===== Tab Content: Manual Keywords ===== */}
        {inputMode === "manual" ? (
          <div className="space-y-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Field label="目的地 (Where to go?)" required>
                <input
                  className="w-full hand-drawn-border bg-white px-4 py-3 rounded-xl focus:ring-2 ring-primary/10 outline-none text-body-md"
                  placeholder="例如：冰岛 雷克雅未克"
                  value={destination}
                  onChange={(event) => {
                    setDestination(event.target.value);
                    setError("");
                  }}
                />
              </Field>
              <Field label="风格偏好 (What's your vibe?)">
                <select
                  className="w-full hand-drawn-border bg-white px-4 py-3 rounded-xl focus:ring-2 ring-primary/10 outline-none appearance-none text-body-md"
                  value={styleKeywords}
                  onChange={(event) => setStyleKeywords(event.target.value)}
                >
                  <option value="">请选择</option>
                  <option value="户外機能风">户外機能风</option>
                  <option value="法式慵懒风">法式慵懒风</option>
                  <option value="美式复古风">美式复古风</option>
                  <option value="新中式画意">新中式画意</option>
                  <option value="日系简约">日系简约</option>
                </select>
              </Field>
            </div>
            <Field label="具体场景 (Scene detail)">
              <textarea
                className="w-full hand-drawn-border bg-white px-4 py-3 rounded-xl focus:ring-2 ring-primary/10 outline-none resize-none text-body-md"
                placeholder="例如：在布满青苔的黑色沙滩上漫步，天空是阴沉的深灰色..."
                rows={3}
                value={sceneKeywords}
                onChange={(event) => setSceneKeywords(event.target.value)}
              />
            </Field>

            {/* Quick settings row */}
            <div className="grid grid-cols-2 gap-gutter">
              <Field label="出行天数">
                <select
                  className="w-full hand-drawn-border bg-white px-3 py-3 rounded-xl focus:ring-2 ring-primary/10 outline-none text-body-md"
                  value={tripDays}
                  onChange={(event) => setTripDays(event.target.value)}
                >
                  <option value="1">1 天</option>
                  <option value="2">2 天</option>
                  <option value="3">3 天</option>
                  <option value="5">5 天</option>
                  <option value="7">7 天</option>
                </select>
              </Field>
              <Field label="性别">
                <select
                  className="w-full hand-drawn-border bg-white px-3 py-3 rounded-xl focus:ring-2 ring-primary/10 outline-none text-body-md"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="女">女</option>
                  <option value="男">男</option>
                  <option value="不限">不限</option>
                </select>
              </Field>
            </div>
          </div>
        ) : null}

        {/* ===== Error Message ===== */}
        {error ? (
          <p className="rounded-lg border border-error bg-error-container text-on-error-container px-4 py-3 font-label-sm text-label-sm font-bold">
            {error}
          </p>
        ) : null}

        {/* ===== Divider + CTA ===== */}
        <div className="journal-divider opacity-40" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" className="w-full sm:w-auto flex items-center gap-2" onClick={handleContinue}>
            {inputMode === "manual" ? "直接生成方案" : "下一步：填写个人信息"}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
          <LinkButton href="/" variant="secondary" className="w-full sm:w-auto">
            返回首页
          </LinkButton>
        </div>
      </div>
    </AppShell>
  );
}

/* ===== Helper: Form Field ===== */
function Field({
  children,
  label,
  required = false
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-label-sm text-primary">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
