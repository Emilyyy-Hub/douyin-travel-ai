
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Outfit } from "@/types/plan";

interface OutfitPlanCardProps {
  outfit: Outfit;
}

export function OutfitPlanCard({ outfit }: OutfitPlanCardProps) {
  return (
    <Card variant="journal" className="overflow-hidden p-0">
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        <img
          src={outfit.previewImage}
          alt={outfit.previewAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="space-y-4 p-4">
        {/* Evaluation badges */}
        <div className="flex flex-wrap gap-1.5">
          {outfit.photoScore ? (
            <span className="rounded bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm font-semibold text-secondary">
              适合拍照
            </span>
          ) : null}
          {outfit.comfortScore ? (
            <span className="rounded bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm font-semibold text-secondary">
              舒适好走
            </span>
          ) : null}
          {outfit.slimScore ? (
            <span className="rounded bg-secondary-container px-2 py-0.5 font-label-sm text-label-sm font-semibold text-secondary">
              显高显瘦
            </span>
          ) : null}
        </div>
        <div>
          <p className="font-label-sm text-label-sm font-bold text-secondary">{outfit.style}</p>
          <h2 className="mt-1 font-title-md text-primary">{outfit.name}</h2>
          <p className="mt-2 font-body-md text-on-surface-variant">{outfit.reason}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Detail label="对应场景" value={outfit.scene} />
          <Detail label="推荐机位" value={outfit.cameraSpot} />
          <Detail label="色系" value={outfit.colorScheme} />
          <Detail label="拍照动作" value={outfit.pose} />
        </div>
        <div>
          <p className="font-label-sm text-label-sm font-bold text-primary">完整单品</p>
          <div className="mt-2 grid gap-2">
            {outfit.items.length > 0 ? (
              outfit.items.map((item) => (
                <div
                  key={outfit.id + "-" + item.category}
                  className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-low px-3 py-2 font-body-md"
                >
                  <span className="text-on-surface">
                    {item.category} · {item.name}
                  </span>
                  <span className="shrink-0 text-on-surface-variant">
                    {item.owned ? "已拥有" : formatCurrency(item.price)}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-surface-container-low px-3 py-2 font-body-md text-on-surface-variant">
                暂无单品
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-outline-variant pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body-lg text-primary font-bold">
            总价格 {formatCurrency(outfit.totalPrice)}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-3">
      <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">{label}</p>
      <p className="mt-1 font-body-md text-on-surface">{value}</p>
    </div>
  );
}
