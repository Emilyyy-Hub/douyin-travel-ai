import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { SceneAnalysis as SceneAnalysisType } from "@/types/plan";

interface SceneAnalysisProps {
  scene: SceneAnalysisType;
}

export function SceneAnalysis({ scene }: SceneAnalysisProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">旅行场景分析</p>
        <h1 className="mt-1 text-2xl font-bold text-[#24211d]">{scene.name}</h1>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <Image
            src={scene.image}
            alt={scene.imageAlt}
            fill
            sizes="(min-width: 768px) 860px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-4 p-4">
          <InfoBlock label="氛围关键词" values={scene.moodKeywords} />
          <InfoBlock label="主色调" values={scene.palette} swatches />
          <div>
            <p className="text-xs font-semibold text-[#756f68]">最佳拍摄时间</p>
            <p className="mt-1 text-sm text-[#24211d]">{scene.bestTime}</p>
          </div>
          <InfoBlock label="推荐机位" values={scene.cameraSpots} />
          <InfoBlock label="构图建议" values={scene.compositionTips} />
        </div>
      </Card>
    </section>
  );
}

function InfoBlock({
  label,
  values,
  swatches = false
}: {
  label: string;
  values: string[];
  swatches?: boolean;
}) {
  if (values.length === 0) {
    return (
      <div>
        <p className="text-xs font-semibold text-[#756f68]">{label}</p>
        <p className="mt-1 text-sm text-[#756f68]">暂无数据</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold text-[#756f68]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-2 rounded-lg bg-[#f5eee6] px-3 py-1.5 text-xs font-medium text-[#4a433c]"
          >
            {swatches ? <span className="h-3 w-3 rounded-full bg-[#bf5f47]" /> : null}
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
