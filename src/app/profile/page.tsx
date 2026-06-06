import { AppShell } from "@/components/layout/app-shell";
import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <AppShell eyebrow="个人适配">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-sm font-semibold text-[#bf5f47]">第 2 步</p>
          <h1 className="mt-1 text-3xl font-bold text-[#24211d]">填写个人信息与拍照目标</h1>
          <p className="mt-2 text-sm leading-6 text-[#756f68]">
            这些信息会用于生成更贴近你的穿搭和拍照行动方案。
          </p>
        </div>
        <ProfileForm />
      </div>
    </AppShell>
  );
}
