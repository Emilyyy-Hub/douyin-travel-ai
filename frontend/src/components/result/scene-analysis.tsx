import { Card } from "@/components/ui/card";

interface SceneAnalysisProps {
  destination: string;
  weather: string;
  analysis: string;
}

export function SceneAnalysis({ destination, weather, analysis }: SceneAnalysisProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">旅行场景分析</p>
        <h1 className="mt-1 text-2xl font-bold text-[#24211d]">{destination}</h1>
      </div>
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#756f68]">天气建议</p>
            <p className="mt-1 text-sm leading-6 text-[#24211d]">{weather}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#756f68]">AI 分析</p>
            <p className="mt-1 text-sm leading-6 text-[#24211d]">{analysis}</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
