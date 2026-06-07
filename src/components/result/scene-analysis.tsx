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
        <p className="font-label-sm text-label-sm font-bold text-secondary">旅行场景分析</p>
        <h1 className="mt-1 font-title-md text-title-md text-primary">{destination}</h1>
      </div>
      <Card variant="journal">
        <div className="space-y-4">
          <div>
            <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">天气建议</p>
            <p className="mt-1 font-body-md text-on-surface">{weather}</p>
          </div>
          <div>
            <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">AI 分析</p>
            <p className="mt-1 font-body-md text-on-surface">{analysis}</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
