import { AppShell } from "@/components/layout/app-shell";

export default function MallLinkPage() {
  return (
    <AppShell eyebrow="抖音商城">
      <div className="flex min-h-[60vh] items-center justify-center">
        <section className="w-full max-w-xl space-y-3 text-center">
          <label className="block font-title-md text-primary" htmlFor="mall-link-input">
            请复制链接到此处
          </label>
          <textarea
            id="mall-link-input"
            className="focus-ring min-h-36 w-full rounded-xl border border-primary bg-surface-container-lowest px-4 py-4 font-body-md text-on-surface"
            placeholder="粘贴抖音商城商品链接"
          />
        </section>
      </div>
    </AppShell>
  );
}
