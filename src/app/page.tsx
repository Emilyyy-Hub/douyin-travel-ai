
import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { fetchTravelCases } from "@/lib/api";

export const dynamic = "force-dynamic";

const steps = [
  {
    icon: "play_circle",
    bgClass: "bg-secondary-container text-primary",
    title: "读懂视频",
    description: "AI深度解析风景视频，捕捉色彩、氛围与光影细节。"
  },
  {
    icon: "person_search",
    bgClass: "bg-tertiary-fixed text-tertiary",
    title: "适配个人",
    description: "结合你的肤色、身形与喜好，推荐最适合你的出片装扮。"
  },
  {
    icon: "magic_button",
    bgClass: "bg-primary-fixed text-primary",
    title: "生成行动方案",
    description: "获得包含购买建议、构图指导及拍摄机位的完整手册。"
  }
];

export default async function HomePage() {
  const travelCases = await fetchTravelCases();

  return (
    <AppShell>
      {/* ===== Hero Section ===== */}
      <section className="relative mb-stack-lg">
        <div className="hand-drawn-border p-8 bg-surface rounded-xl overflow-hidden relative">
          {/* Background watercolor camera icon */}
          <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
            <span
              className="material-symbols-outlined text-8xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48" }}
            >
              camera_enhance
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-4 text-primary max-w-md">
            从刷到风景，<br />
            <span className="underline decoration-secondary decoration-wavy underline-offset-4">
              到穿进风景
            </span>
          </h1>

          <p className="text-on-surface-variant font-body-lg mb-8 max-w-sm">
            记录你的灵感，定制你的穿搭，在每一个目的地留下最美的瞬间。
          </p>

          <LinkButton href="/inspiration" className="inline-flex items-center gap-2 font-headline-lg !text-title-md !text-white">
            开始规划
            <span className="material-symbols-outlined ml-1">arrow_forward</span>
          </LinkButton>
        </div>
      </section>

      {/* ===== Journal Divider ===== */}
      <div className="journal-divider mb-stack-lg opacity-30" />

      {/* ===== 3 Steps Section ===== */}
      <section className="mb-stack-lg">
        <h2 className="font-title-md text-primary mb-stack-md flex items-center gap-2">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_stories
          </span>
          智能三步走
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-surface-container-low p-6 rounded-xl border border-primary sketch-hover"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${step.bgClass}`}
              >
                <span className="material-symbols-outlined text-3xl">{step.icon}</span>
              </div>
              <h3 className="font-title-md text-primary mb-2">{step.title}</h3>
              <p className="font-label-sm text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Featured Destinations Bento ===== */}
      <section className="mb-stack-lg">
        <h2 className="font-title-md text-primary mb-stack-md flex items-center gap-2">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            explore
          </span>
          热门目的地灵感
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {/* Large hero card: first case, col-span-2 row-span-2 */}
          {travelCases.length > 0 ? (
            <div className="col-span-2 relative group overflow-hidden rounded-xl hand-drawn-border md:row-span-2">
              <img
                src={travelCases[0].coverImage}
                alt={travelCases[0].coverAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <span className="bg-secondary-container text-primary px-3 py-1 rounded-full font-label-sm text-label-sm w-fit mb-2">
                  人气榜首
                </span>
                <h3 className="font-headline-lg text-white">
                  {travelCases[0].location} · {travelCases[0].title}
                </h3>
                <p className="text-white/80 text-body-md">{travelCases[0].description}</p>
              </div>
            </div>
          ) : null}

          {/* Second case: col-span-2 */}
          {travelCases.length > 1 ? (
            <div className="col-span-2 relative h-48 group overflow-hidden rounded-xl hand-drawn-border md:h-full">
              <img
                src={travelCases[1].coverImage}
                alt={travelCases[1].coverAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="font-title-md text-white">
                  {travelCases[1].location} · {travelCases[1].title}
                </h3>
              </div>
            </div>
          ) : null}

          {/* Third case: single column */}
          {travelCases.length > 2 ? (
            <div className="relative h-48 group overflow-hidden rounded-xl hand-drawn-border md:h-full">
              <img
                src={travelCases[2].coverImage}
                alt={travelCases[2].coverAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-white font-bold">
                  {travelCases[2].location} · {travelCases[2].title}
                </span>
              </div>
            </div>
          ) : null}

          {/* Explore more placeholder */}
          <div className="relative h-48 group overflow-hidden rounded-xl hand-drawn-border bg-surface-container flex flex-col items-center justify-center p-4 border-dashed md:h-full">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">
              add_location_alt
            </span>
            <LinkButton href="/inspiration" variant="ghost" className="text-outline">
              探索更多...
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ===== Tips Banner ===== */}
      <section className="mb-stack-lg">
        <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-xl hand-drawn-border-sm flex items-center gap-6">
          <div className="hidden md:block">
            <span className="material-symbols-outlined text-5xl opacity-40">lightbulb</span>
          </div>
          <div>
            <h4 className="font-title-md mb-1">今日贴士：如何拍出氛围感？</h4>
            <p className="font-label-sm opacity-90">
              大理洱海早晚温差大，披一件刺绣披肩不仅保暖，还能在逆光拍摄时增加画面层次感。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Floating Action Button (Desktop) ===== */}
      <div className="fixed right-6 bottom-24 z-40 hidden md:block">
        <button className="w-16 h-16 bg-surface border-2 border-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">edit</span>
        </button>
      </div>
    </AppShell>
  );
}
