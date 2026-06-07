"use client";

import { useMemo, useSyncExternalStore } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { wardrobeStyles } from "@/data/wardrobe";
import type { WardrobeStyle } from "@/data/wardrobe";

const profileStorageKey = "douyin-travel-profile";
const wardrobeStorageKey = "douyin-travel-wardrobe";
const wardrobeChangeEvent = "douyin-travel-wardrobe-change";

interface StoredProfile {
  height?: string;
  size?: string;
  stylePreference?: string;
  budget?: string;
  photoGoal?: string;
  shoePreference?: string;
  skinExposure?: string;
  skinTone?: string;
  tripDays?: string;
  gender?: string;
}

function parseJson<T>(value: string | null): T | null {
  try {
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function subscribeToLocalStorage(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(wardrobeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(wardrobeChangeEvent, onStoreChange);
  };
}

function getProfileSnapshot(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(profileStorageKey) ?? "";
}

function getWardrobeSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(wardrobeStorageKey) ?? "[]";
}

function writeWardrobe(ids: string[]): void {
  window.localStorage.setItem(wardrobeStorageKey, JSON.stringify(ids));
  window.dispatchEvent(new Event(wardrobeChangeEvent));
}

export default function MePage() {
  const profileSnapshot = useSyncExternalStore(subscribeToLocalStorage, getProfileSnapshot, () => "");
  const wardrobeSnapshot = useSyncExternalStore(subscribeToLocalStorage, getWardrobeSnapshot, () => "[]");
  const profile = useMemo(() => parseJson<StoredProfile>(profileSnapshot), [profileSnapshot]);
  const collectedIds = useMemo(() => parseJson<string[]>(wardrobeSnapshot) ?? [], [wardrobeSnapshot]);

  const collectedCount = collectedIds.length;
  const profileItems = useMemo(
    () => [
      { label: "身高", value: profile?.height },
      { label: "尺码", value: profile?.size },
      { label: "偏好", value: profile?.stylePreference },
      { label: "预算", value: profile?.budget },
      { label: "露肤", value: profile?.skinExposure },
      { label: "鞋履", value: profile?.shoePreference }
    ],
    [profile]
  );

  function toggleWardrobe(id: string) {
    const next = collectedIds.includes(id)
      ? collectedIds.filter((item) => item !== id)
      : [...collectedIds, id];
    writeWardrobe(next);
  }

  return (
    <AppShell eyebrow="我的">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="space-y-base">
          <p className="font-label-sm text-label-sm font-bold text-secondary">个人中心</p>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
            我的旅行衣柜
          </h1>
          <p className="max-w-2xl font-body-md text-on-surface-variant">
            把常穿、想尝试、适合旅行出片的单品先收进衣柜，之后生成方案时就能优先复用。
          </p>
          <div className="hand-drawn-line mt-4" />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <Card variant="journal" className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label-sm text-label-sm font-bold text-secondary">档案摘要</p>
                <h2 className="mt-1 font-title-md text-primary">当前适配信息</h2>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary">person</span>
            </div>

            {profile ? (
              <div className="grid grid-cols-2 gap-3">
                {profileItems.map((item) => (
                  <div key={item.label} className="rounded-lg bg-surface-container-low px-3 py-3">
                    <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                      {item.label}
                    </p>
                    <p className="mt-1 min-h-6 font-body-md text-primary">
                      {item.value || "未填写"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-primary p-4">
                <p className="font-body-md text-on-surface-variant">
                  还没有个人适配资料。先填写一次，后续生成方案会更贴近你的预算、舒适边界和拍照目标。
                </p>
                <LinkButton href="/profile" className="mt-4 !text-white">
                  去填写资料
                </LinkButton>
              </div>
            )}
          </Card>

          <Card variant="journal" className="space-y-5 bg-primary text-black">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label-sm text-label-sm font-bold text-black">衣柜进度</p>
                <h2 className="mt-1 font-title-md">已收录 {collectedCount} / {wardrobeStyles.length} 种风格</h2>
              </div>
              <span className="material-symbols-outlined text-4xl">checkroom</span>
            </div>
            <p className="font-body-md text-black/80">
              建议先收录 3 种以上常穿风格：一个舒适基础款、一个拍照加分款、一个目的地氛围款。
            </p>
            <div className="flex flex-wrap gap-2">
              {wardrobeStyles
                .filter((item) => collectedIds.includes(item.id))
                .map((item) => (
                  <span key={item.id} className="rounded-full bg-white/30 px-3 py-1 font-label-sm text-label-sm text-black">
                    {item.label}
                  </span>
                ))}
              {collectedCount === 0 ? (
                <span className="rounded-full bg-white/30 px-3 py-1 font-label-sm text-label-sm text-black">
                  还未收录
                </span>
              ) : null}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="font-label-sm text-label-sm font-bold text-secondary">个人衣柜</p>
              <h2 className="mt-1 font-headline-lg text-headline-lg text-primary">
                按女装风格收录常用单品
              </h2>
            </div>
            <div className="space-y-3">
              <LinkButton href="/mall-link" className="w-full min-h-14 justify-between gap-3 px-6 font-title-md !text-white">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">add_link</span>
                  从抖音商城添加链接
                </span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </LinkButton>
              <LinkButton href="/inspiration" variant="secondary" className="w-full sm:w-auto">
                去生成旅行方案
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wardrobeStyles.map((item) => (
              <WardrobeCard
                key={item.id}
                item={item}
                collected={collectedIds.includes(item.id)}
                onToggle={() => toggleWardrobe(item.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function WardrobeCard({
  item,
  collected,
  onToggle
}: {
  item: WardrobeStyle;
  collected: boolean;
  onToggle: () => void;
}) {
  return (
    <Card variant="journal-sm" className={"flex h-full flex-col " + (collected ? "bg-primary-fixed" : "")}>
      <div className="overflow-hidden rounded-lg border border-primary bg-surface-container-low">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col space-y-3">
        <div>
          <p className="font-label-sm text-label-sm font-bold text-secondary">{item.label}</p>
          <h3 className="mt-1 font-title-md text-primary">{item.heroItem}</h3>
          <p className="mt-1 min-h-12 font-body-md text-on-surface-variant">{item.scene}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-container-low px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
        <Button
          type="button"
          variant={collected ? "secondary" : "primary"}
          className="mt-auto w-full"
          onClick={onToggle}
        >
          {collected ? "已收录" : "加入衣柜"}
        </Button>
      </div>
    </Card>
  );
}
