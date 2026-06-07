import { AppShell } from "@/components/layout/app-shell";
import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <AppShell eyebrow="第 2 步：个人适配">
      <div className="mx-auto max-w-3xl">
        <ProfileForm />
      </div>
    </AppShell>
  );
}
