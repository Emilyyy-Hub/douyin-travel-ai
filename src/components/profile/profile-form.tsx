"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChipCheckbox } from "@/components/ui/chip";
import type { UserProfile } from "@/types/plan";

type RequiredField = keyof Pick<
  UserProfile,
  "height" | "size" | "stylePreference" | "budget" | "photoGoal" | "shoePreference" | "skinExposure" | "tripDays" | "gender"
>;

const requiredFields: RequiredField[] = [
  "height", "size", "stylePreference", "budget", "photoGoal", "shoePreference", "skinExposure", "tripDays", "gender"
];

const initialProfile: UserProfile = {
  height: "", size: "", stylePreference: "", budget: "", photoGoal: "",
  shoePreference: "", skinExposure: "", skinTone: "", outfitEffect: "",
  hasUploadedPhoto: false, tripDays: "3", gender: "女"
};

/* Body type options */
const bodyTypes = [
  { id: "H", label: "H型", description: "肩腰臀宽度相近，线条直" },
  { id: "X", label: "X型", description: "肩臀宽、腰细，曲线明显" },
  { id: "A", label: "A型", description: "肩窄臀宽，下身较丰满" }
];

/* Style tag options */
const styleTags = ["复古经典", "日系简约", "街头潮流", "法式浪漫"];

export function ProfileForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [bodyType, setBodyType] = useState<string>("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [budgetValue, setBudgetValue] = useState("500");

  function updateField(field: keyof UserProfile, value: string | boolean) {
    setProfile((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function toggleStyleTag(tag: string) {
    setSelectedStyles((current) => {
      const next = current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag];
      // Sync to stylePreference
      setTimeout(() => updateField("stylePreference", next.join("、")), 0);
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Merge derived fields into profile before validation
    const mergedProfile: UserProfile = {
      ...profile,
      stylePreference: selectedStyles.length > 0 ? selectedStyles.join("、") : profile.stylePreference,
      budget: profile.budget || (budgetValue ? `¥${budgetValue}` : "")
    };

    // Update state so validation sees the merged fields
    setProfile(mergedProfile);

    // Validate against merged values
    const nextErrors: Partial<Record<RequiredField, string>> = {};
    requiredFields.forEach((field) => {
      if (!String(mergedProfile[field]).trim()) {
        nextErrors[field] = "请填写这一项";
      }
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    const profileToSave = {
      ...mergedProfile,
      bodyType,
      styleTags: selectedStyles,
      budget: mergedProfile.budget || `¥${budgetValue}`
    };
    window.localStorage.setItem("douyin-travel-profile", JSON.stringify(profileToSave));
    router.push("/generating");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-lg">
      {/* ===== Header ===== */}
      <section className="space-y-base">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
          完善您的搭配档案
        </h2>
        <p className="font-body-md text-on-surface-variant">
          告诉我们您的偏好，AI将为您定制专属的旅行穿搭与拍照方案。
        </p>
        <div className="hand-drawn-line mt-4" />
      </section>

      <Card variant="ghost" className="space-y-stack-md">
        {/* ===== Basic Info ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-base">
            <label className="font-label-sm text-primary block" htmlFor="gender">
              性别 *
            </label>
            <select
              id="gender"
              className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md"
              value={profile.gender}
              onChange={(event) => updateField("gender", event.target.value)}
            >
              <option value="">请选择</option>
              <option value="女">女</option>
              <option value="男">男</option>
              <option value="不限">不限</option>
            </select>
            {errors.gender ? <p className="mt-1 text-label-sm text-error">{errors.gender}</p> : null}
          </div>
          <div className="space-y-base">
            <label className="font-label-sm text-primary block" htmlFor="tripDays">
              出行天数 *
            </label>
            <select
              id="tripDays"
              className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md"
              value={profile.tripDays}
              onChange={(event) => updateField("tripDays", event.target.value)}
            >
              <option value="">请选择</option>
              <option value="1">1 天</option>
              <option value="2">2 天</option>
              <option value="3">3 天</option>
              <option value="5">5 天</option>
              <option value="7">7 天</option>
            </select>
            {errors.tripDays ? <p className="mt-1 text-label-sm text-error">{errors.tripDays}</p> : null}
          </div>
        </div>

        {/* ===== Height + Size ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-base">
            <label className="font-label-sm text-primary block" htmlFor="height">
              身高 (cm) *
            </label>
            <input
              id="height"
              className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md"
              placeholder="例如 165"
              value={profile.height}
              onChange={(event) => updateField("height", event.target.value)}
            />
            {errors.height ? <p className="mt-1 text-label-sm text-error">{errors.height}</p> : null}
          </div>
          <div className="space-y-base">
            <label className="font-label-sm text-primary block" htmlFor="size">
              尺码习惯 *
            </label>
            <select
              id="size"
              className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md"
              value={profile.size}
              onChange={(event) => updateField("size", event.target.value)}
            >
              <option value="">请选择</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="偏宽松">偏宽松</option>
            </select>
            {errors.size ? <p className="mt-1 text-label-sm text-error">{errors.size}</p> : null}
          </div>
        </div>

        {/* ===== Body Type Selection ===== */}
        <section className="space-y-stack-sm">
          <label className="font-label-sm text-primary block">身材参考 (点击选择)</label>
          <div className="grid grid-cols-3 gap-base">
            {bodyTypes.map((bt) => {
              const selected = bodyType === bt.id;
              return (
                <button
                  key={bt.id}
                  type="button"
                  className={
                    "p-4 flex flex-col items-center gap-2 cursor-pointer rounded-xl transition-all " +
                    "border border-primary sketch-hover " +
                    (selected ? "ghost-border bg-surface-container-low" : "bg-white")
                  }
                  onClick={() => setBodyType(selected ? "" : bt.id)}
                >
                  {/* Illustrated placeholder */}
                  <div className="w-16 h-24 flex items-center justify-center bg-surface-container rounded-lg">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                      accessibility_new
                    </span>
                  </div>
                  <span className="font-label-sm text-primary font-bold">{bt.label}</span>
                  <span className="text-[11px] text-on-surface-variant text-center leading-tight">
                    {bt.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== Style Chips ===== */}
        <section className="space-y-stack-sm">
          <label className="font-label-sm text-primary block">心仪风格</label>
          <div className="flex flex-wrap gap-base">
            {styleTags.map((tag) => (
              <ChipCheckbox
                key={tag}
                label={tag}
                checked={selectedStyles.includes(tag)}
                onChange={() => toggleStyleTag(tag)}
              />
            ))}
          </div>
        </section>

        {/* ===== Budget Slider ===== */}
        <section className="space-y-stack-sm">
          <div className="flex justify-between items-center">
            <label className="font-label-sm text-primary">单件预算 (CNY)</label>
            <span className="font-label-sm text-primary font-bold">¥{budgetValue}</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={budgetValue}
            onChange={(event) => {
              setBudgetValue(event.target.value);
              updateField("budget", `¥${event.target.value}`);
            }}
          />
          <div className="flex justify-between text-[10px] text-outline">
            <span>¥100</span>
            <span>¥2000+</span>
          </div>
        </section>

        {/* ===== Shoe + Skin Tone ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <SelectField
            id="shoePreference" label="鞋履偏好" required
            value={profile.shoePreference} error={errors.shoePreference}
            options={["平底优先", "可接受低跟", "运动鞋优先", "想要更精致"]}
            onChange={(value) => updateField("shoePreference", value)}
          />
          <SelectField
            id="skinTone" label="肤色倾向（可选）"
            value={profile.skinTone ?? ""}
            options={["冷调", "暖调", "中性", "不确定"]}
            onChange={(value) => updateField("skinTone", value)}
          />
          <SelectField
            id="skinExposure" label="露肤接受程度" required
            value={profile.skinExposure} error={errors.skinExposure}
            options={["保守舒适", "适度露肤", "可尝试吊带", "按场景推荐"]}
            onChange={(value) => updateField("skinExposure", value)}
          />
          <SelectField
            id="stylePreference" label="风格总偏好"
            value={selectedStyles.length > 0 ? selectedStyles.join("、") : profile.stylePreference}
            options={["清新松弛", "轻法式", "甜酷", "都市利落", "温柔通勤"]}
            onChange={(value) => {
              updateField("stylePreference", value);
              if (!selectedStyles.length) toggleStyleTag(value);
            }}
          />
        </div>

        {/* ===== Photo Goal ===== */}
        <TextAreaField
          id="photoGoal" label="拍照目标" required
          value={profile.photoGoal} error={errors.photoGoal}
          placeholder="例如：想拍自然、显得轻盈、有旅行故事感的照片"
          onChange={(value) => updateField("photoGoal", value)}
        />
        <TextAreaField
          id="outfitEffect" label="希望突出或优化的穿搭效果（可选）"
          value={profile.outfitEffect ?? ""}
          placeholder="例如：希望比例更利落、颜色更提气色、走路方便"
          onChange={(value) => updateField("outfitEffect", value)}
        />

        {/* ===== Photo Upload Checkbox ===== */}
        <label className="flex items-center gap-3 rounded-lg border border-dashed border-primary p-3 text-body-md text-on-surface-variant cursor-pointer">
          <input
            type="checkbox"
            checked={profile.hasUploadedPhoto}
            onChange={(event) => updateField("hasUploadedPhoto", event.target.checked)}
          />
          我愿意上传用户照片用于后续适配（MVP 仅展示入口，不会上传）
        </label>
      </Card>

      {/* ===== Actions ===== */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto flex items-center gap-2">
          生成方案
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        <LinkButton href="/inspiration" variant="secondary" className="w-full sm:w-auto">
          返回灵感选择
        </LinkButton>
      </div>
    </form>
  );
}

/* ===== Select Field ===== */
interface SelectFieldProps {
  id: string; label: string; value: string;
  options: string[]; error?: string;
  onChange: (value: string) => void;
  required?: boolean;
}
function SelectField({ id, label, value, options, error, onChange, required = false }: SelectFieldProps) {
  return (
    <div className="space-y-base">
      <label className="font-label-sm text-primary block" htmlFor={id}>
        {label}{required ? " *" : ""}
      </label>
      <select
        id={id}
        className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">请选择</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error ? <p className="mt-1 text-label-sm text-error">{error}</p> : null}
    </div>
  );
}

/* ===== Textarea Field ===== */
interface TextAreaFieldProps {
  id: string; label: string; value: string;
  placeholder: string; error?: string;
  onChange: (value: string) => void;
  required?: boolean;
}
function TextAreaField({ id, label, value, placeholder, error, onChange, required = false }: TextAreaFieldProps) {
  return (
    <div className="space-y-base">
      <label className="font-label-sm text-primary block" htmlFor={id}>
        {label}{required ? " *" : ""}
      </label>
      <textarea
        id={id}
        className="w-full border-b border-primary bg-transparent py-2 focus:outline-none focus:border-b-2 transition-all text-body-md min-h-24 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="mt-1 text-label-sm text-error">{error}</p> : null}
    </div>
  );
}
