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
      className="focus-ring w-full rounded-xl text-left group"
      onClick={() => onSelect?.(item)}
      aria-pressed={selected}
    >
      <article
        className={
          "hand-drawn-border overflow-hidden rounded-xl transition-all " +
          "hover:-translate-y-1 " +
          (selected ? "bg-primary-fixed" : "bg-surface-container-lowest")
        }
      >
        {/* Image container */}
        <div className="aspect-[4/3] relative overflow-hidden bg-surface-variant">
          <img
            src={item.coverImage}
            alt={item.coverAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Location badge */}
          <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full border border-primary">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
              {item.location}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 space-y-1">
          <h3 className="font-title-md text-primary">{item.title}</h3>
          <p className="font-label-sm text-on-surface-variant">{item.description}</p>

          {/* Selected indicator */}
          {selected ? (
            <span className="inline-block mt-2 rounded-full bg-primary text-on-primary px-3 py-1 font-label-sm text-label-sm">
              已选
            </span>
          ) : (
            <span className="inline-block mt-2 rounded-full bg-tertiary-fixed text-tertiary px-3 py-1 font-label-sm text-label-sm">
              案例
            </span>
          )}
        </div>
      </article>
    </button>
  );
}
