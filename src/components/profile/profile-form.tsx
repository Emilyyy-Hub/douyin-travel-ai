"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export function ProfileForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});

  function updateField(field: keyof UserProfile, value: string | boolean) {
    setProfile((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<RequiredField, string>> = {};
    requiredFields.forEach((field) => {
      if (!String(profile[field]).trim()) nextErrors[field] = "请填写这一项";
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    window.localStorage.setItem("douyin-travel-profile", JSON.stringify(profile));
    router.push("/generating");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-[#24211d]" htmlFor="gender">
              性别 *
            </label>
            <select
              id="gender"
              className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
              value={profile.gender}
              onChange={(event) => updateField("gender", event.target.value)}
            >
              <option value="">请选择</option>
              <option value="女">女</option>
              <option value="男">男</option>
              <option value="不限">不限</option>
            </select>
            {errors.gender ? <p className="mt-1 text-xs text-[#9f422e]">{errors.gender}</p> : null}
          </div>
          <div>
            <label className="text-sm font-semibold text-[#24211d]" htmlFor="tripDays">
              出行天数 *
            </label>
            <select
              id="tripDays"
              className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
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
            {errors.tripDays ? <p className="mt-1 text-xs text-[#9f422e]">{errors.tripDays}</p> : null}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#24211d]" htmlFor="height">
            身高 *
          </label>
          <input
            id="height"
            className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
            placeholder="例如 165cm"
            value={profile.height}
            onChange={(event) => updateField("height", event.target.value)}
          />
          {errors.height ? <p className="mt-1 text-xs text-[#9f422e]">{errors.height}</p> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField id="size" label="常穿尺码" value={profile.size} error={errors.size}
            options={["XS","S","M","L","XL","偏宽松"]}
            onChange={(value) => updateField("size", value)} />
          <SelectField id="budget" label="预算" value={profile.budget} error={errors.budget}
            options={["500以内", "500-1000", "1000-2000", "2000以上"]}
            onChange={(value) => updateField("budget", value)} />
          <SelectField id="stylePreference" label="风格偏好" value={profile.stylePreference} error={errors.stylePreference}
            options={["清新松弛","轻法式","甜酷","都市利落","温柔通勤"]}
            onChange={(value) => updateField("stylePreference", value)} />
          <SelectField id="shoePreference" label="鞋子偏好" value={profile.shoePreference} error={errors.shoePreference}
            options={["平底优先","可接受低跟","运动鞋优先","想要更精致"]}
            onChange={(value) => updateField("shoePreference", value)} />
          <SelectField id="skinExposure" label="露肤接受程度" value={profile.skinExposure} error={errors.skinExposure}
            options={["保守舒适","适度露肤","可尝试吊带","按场景推荐"]}
            onChange={(value) => updateField("skinExposure", value)} />
          <SelectField id="skinTone" label="肤色倾向（可选）" value={profile.skinTone ?? ""}
            options={["冷调","暖调","中性","不确定"]}
            onChange={(value) => updateField("skinTone", value)} />
        </div>

        <TextAreaField id="photoGoal" label="拍照目标" value={profile.photoGoal} error={errors.photoGoal}
          placeholder="例如：想拍自然、显得轻盈、有旅行故事感的照片"
          onChange={(value) => updateField("photoGoal", value)} />
        <TextAreaField id="outfitEffect" label="希望突出或优化的穿搭效果（可选）" value={profile.outfitEffect ?? ""}
          placeholder="例如：希望比例更利落、颜色更提气色、走路方便"
          onChange={(value) => updateField("outfitEffect", value)} />

        <label className="flex items-center gap-3 rounded-lg border border-dashed border-[#d8cabc] p-3 text-sm text-[#756f68]">
          <input type="checkbox" checked={profile.hasUploadedPhoto}
            onChange={(event) => updateField("hasUploadedPhoto", event.target.checked)} />
          我愿意上传用户照片用于后续适配（MVP 仅展示入口，不会上传）
        </label>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto">生成方案</Button>
        <LinkButton href="/inspiration" variant="secondary" className="w-full sm:w-auto">返回灵感选择</LinkButton>
      </div>
    </form>
  );
}

interface SelectFieldProps { id: string; label: string; value: string; options: string[]; error?: string; onChange: (value: string) => void; }
function SelectField({ id, label, value, options, error, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#24211d]" htmlFor={id}>{label}</label>
      <select id={id} className="focus-ring mt-2 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3" value={value}
        onChange={(event) => onChange(event.target.value)}>
        <option value="">请选择</option>
        {options.map((option) => (<option key={option} value={option}>{option}</option>))}
      </select>
      {error ? <p className="mt-1 text-xs text-[#9f422e]">{error}</p> : null}
    </div>
  );
}

interface TextAreaFieldProps { id: string; label: string; value: string; placeholder: string; error?: string; onChange: (value: string) => void; }
function TextAreaField({ id, label, value, placeholder, error, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#24211d]" htmlFor={id}>{label}</label>
      <textarea id={id} className="focus-ring mt-2 min-h-24 w-full rounded-lg border border-[#d8cabc] bg-white px-3 py-3"
        placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
      {error ? <p className="mt-1 text-xs text-[#9f422e]">{error}</p> : null}
    </div>
  );
}

