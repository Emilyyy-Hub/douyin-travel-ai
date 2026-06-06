
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Outfit } from "@/types/plan";

interface OutfitPlanCardProps {
  outfit: Outfit;
}

export function OutfitPlanCard({ outfit }: OutfitPlanCardProps) {
  return (
    <Card className="overflow-hidden p-0">
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
          {outfit.photoScore ? <span className="rounded bg-[#e9f0ec] px-2 py-0.5 text-xs font-semibold text-[#607d6c]">适合拍照</span> : null}
          {outfit.comfortScore ? <span className="rounded bg-[#e9f0ec] px-2 py-0.5 text-xs font-semibold text-[#607d6c]">舒适好走</span> : null}
          {outfit.slimScore ? <span className="rounded bg-[#e9f0ec] px-2 py-0.5 text-xs font-semibold text-[#607d6c]">显高显瘦</span> : null}
        </div>
        <div>
          <p className="text-xs font-semibold text-[#bf5f47]">{outfit.style}</p>
          <h2 className="mt-1 text-xl font-bold text-[#24211d]">{outfit.name}</h2>
          <p className="mt-2 text-sm leading-6 text-[#756f68]">{outfit.reason}</p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <Detail label="对应场景" value={outfit.scene} />
          <Detail label="推荐机位" value={outfit.cameraSpot} />
          <Detail label="色系" value={outfit.colorScheme} />
          <Detail label="拍照动作" value={outfit.pose} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#24211d]">完整单品</p>
          <div className="mt-2 grid gap-2">
            {outfit.items.length > 0 ? (
              outfit.items.map((item) => (
                <div
                  key={outfit.id + "-" + item.category}
                  className="flex items-center justify-between gap-3 rounded-lg bg-[#fbf8f3] px-3 py-2 text-sm"
                >
                  <span className="text-[#4a433c]">
                    {item.category} · {item.name}
                  </span>
                  <span className="shrink-0 text-[#756f68]">
                    {item.owned ? "已拥有" : formatCurrency(item.price)}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-[#fbf8f3] px-3 py-2 text-sm text-[#756f68]">暂无单品</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#e8ded1] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-bold text-[#24211d]">总价格 {formatCurrency(outfit.totalPrice)}</p>
        </div>
      </div>
    </Card>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#fbf8f3] p-3">
      <p className="text-xs font-semibold text-[#756f68]">{label}</p>
      <p className="mt-1 leading-6 text-[#24211d]">{value}</p>
    </div>
  );
}

