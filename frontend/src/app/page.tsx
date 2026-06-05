import Image from "next/image";
import { AppShell } from "@/components/layout/app-shell";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { travelCases } from "@/data/mock-plan";

const steps = [
  {
    title: "读懂视频",
    description: "识别旅行视频里的场景、光线、机位和背景气质。"
  },
  {
    title: "适配个人",
    description: "结合身高、尺码、预算、风格偏好和拍照目标。"
  },
  {
    title: "生成行动方案",
    description: "输出穿搭、机位、动作、商品元素和打包清单。"
  }
];

export default function HomePage() {
  return (
    <AppShell eyebrow="MVP Demo">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#bf5f47]">抖音出游灵感转行动方案工具</p>
            <h1 className="text-4xl font-bold leading-tight text-[#24211d] sm:text-5xl">
              从刷到风景，到穿进风景
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#756f68]">
              把旅行视频里的景点、出片机位和拍照氛围，转成可以直接照着做的穿搭与打包方案。
            </p>
          </div>
          <LinkButton href="/inspiration" className="w-full sm:w-auto">
            开始规划
          </LinkButton>
        </div>
        <Card className="p-3">
          <div className="relative h-72 w-full overflow-hidden rounded-md">
            <Image
              src={travelCases[0].coverImage}
              alt={travelCases[0].coverAlt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-[#24211d]">{travelCases[0].title}</p>
            <p className="mt-1 text-sm leading-6 text-[#756f68]">
              视频灵感会被拆成场景、机位、动作和完整穿搭方案。
            </p>
          </div>
        </Card>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f0ec] text-sm font-bold text-[#607d6c]">
              {index + 1}
            </span>
            <h2 className="mt-4 text-lg font-bold text-[#24211d]">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#756f68]">{step.description}</p>
          </Card>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#bf5f47]">预置旅行案例</p>
            <h2 className="mt-1 text-2xl font-bold text-[#24211d]">先从一个场景开始</h2>
          </div>
          <LinkButton href="/inspiration" variant="secondary" className="hidden sm:inline-flex">
            查看全部
          </LinkButton>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {travelCases.map((item) => (
            <Card key={item.id}>
              <div className="relative h-36 w-full overflow-hidden rounded-md">
                <Image
                  src={item.coverImage}
                  alt={item.coverAlt}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-base font-semibold text-[#24211d]">{item.title}</p>
              <p className="mt-1 text-xs text-[#756f68]">{item.location}</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
