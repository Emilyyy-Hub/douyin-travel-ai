"use client";

import { Card } from "@/components/ui/card";
import type { ProductItem } from "@/types/plan";

interface ProductCatalogProps {
  products: ProductItem[];
}

const priorityColors: Record<string, string> = {
  "必买": "bg-primary text-on-primary",
  "推荐": "bg-secondary-container text-secondary",
  "可选": "bg-surface-container-high text-on-surface-variant"
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const grouped = products.reduce<Record<string, ProductItem[]>>((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <section className="space-y-4">
      <div>
        <p className="font-label-sm text-label-sm font-bold text-secondary">商品推荐清单</p>
        <h2 className="mt-1 font-headline-lg text-headline-lg text-primary">
          按分类查看需要准备的商品
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category} variant="journal" className="p-0 overflow-hidden">
            <div className="bg-surface-container-low px-4 py-3 border-b border-outline-variant">
              <p className="font-label-sm text-label-sm font-bold text-primary">{category}</p>
            </div>
            <div className="divide-y divide-outline-variant">
              {items.map((item) => (
                <div key={item.id} className="px-4 py-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      {item.name}
                    </span>
                    <span
                      className={
                        "shrink-0 rounded px-2 py-0.5 font-label-sm text-label-sm font-semibold " +
                        (priorityColors[item.priority] || "bg-surface-container-high text-on-surface-variant")
                      }
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="font-body-md text-on-surface-variant">{item.reason}</p>
                  <p className="font-label-sm text-label-sm font-medium text-secondary">
                    {item.priceRange} 元
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
