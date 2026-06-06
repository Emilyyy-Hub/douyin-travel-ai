"use client";

import { Card } from "@/components/ui/card";
import type { ProductItem } from "@/types/plan";

interface ProductCatalogProps {
  products: ProductItem[];
}

const categoryLabels: Record<string, string> = {
  "穿搭类": "穿搭类",
  "拍照类": "拍照类",
  "旅行必备类": "旅行必备类"
};

const priorityColors: Record<string, string> = {
  "必买": "bg-[#bf5f47] text-white",
  "推荐": "bg-[#e9f0ec] text-[#607d6c]",
  "可选": "bg-[#f5eee6] text-[#756f68]"
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
        <p className="text-sm font-semibold text-[#bf5f47]">商品推荐清单</p>
        <h2 className="mt-1 text-2xl font-bold text-[#24211d]">按分类查看需要准备的商品</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category} className="p-0 overflow-hidden">
            <div className="bg-[#fbf8f3] px-4 py-3 border-b border-[#e8ded1]">
              <p className="text-sm font-bold text-[#24211d]">{category}</p>
            </div>
            <div className="divide-y divide-[#e8ded1]">
              {items.map((item) => (
                <div key={item.id} className="px-4 py-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#24211d]">{item.name}</span>
                    <span className={"shrink-0 rounded px-2 py-0.5 text-xs font-semibold " + (priorityColors[item.priority] || "bg-[#f5eee6] text-[#756f68]")}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-[#756f68]">{item.reason}</p>
                  <p className="text-xs font-medium text-[#bf5f47]">{item.priceRange} 元</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

