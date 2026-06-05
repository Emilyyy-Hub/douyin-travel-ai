import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { TravelCase } from "@/types/plan";

interface CaseCardProps {
  item: TravelCase;
  selected?: boolean;
  onSelect?: (item: TravelCase) => void;
}

export function CaseCard({ item, selected = false, onSelect }: CaseCardProps) {
  return (
    <button
      type="button"
      className="focus-ring w-full rounded-lg text-left"
      onClick={() => onSelect?.(item)}
      aria-pressed={selected}
    >
      <Card
        className={
          selected
            ? "border-[#bf5f47] ring-2 ring-[#bf5f47]/20"
            : "transition-colors hover:border-[#d3bfaa]"
        }
      >
        <div className="relative h-36 w-full overflow-hidden rounded-md">
          <Image
            src={item.coverImage}
            alt={item.coverAlt}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <p className="text-base font-semibold text-[#24211d]">{item.title}</p>
          <p className="mt-1 text-xs text-[#756f68]">{item.source}</p>
          <p className="mt-2 text-sm leading-6 text-[#756f68]">{item.description}</p>
        </div>
      </Card>
    </button>
  );
}
