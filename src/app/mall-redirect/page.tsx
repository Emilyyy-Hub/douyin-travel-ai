import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MallRedirectPage() {
  return (
    <AppShell eyebrow="一键配衣">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card variant="journal" className="max-w-xl space-y-5 text-center">
          <span className="material-symbols-outlined text-5xl text-primary">shopping_bag</span>
          <div>
            <p className="font-label-sm text-label-sm font-bold text-secondary">抖音商城</p>
            <h1 className="mt-1 font-headline-lg text-headline-lg text-primary">
              即将进入抖音商城
            </h1>
          </div>
          <p className="font-body-md text-on-surface-variant">
            正在根据当前生成图准备相似风格单品。
          </p>
          <LinkButton href="/me" variant="secondary" className="w-full sm:w-auto">
            返回我的衣柜
          </LinkButton>
        </Card>
      </div>
    </AppShell>
  );
}
