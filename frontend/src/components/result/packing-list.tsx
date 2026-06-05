import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { PackingList as PackingListType } from "@/types/plan";

interface PackingListProps {
  packingList: PackingListType;
}

export function PackingList({ packingList }: PackingListProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">旅行打包清单</p>
        <h2 className="mt-1 text-2xl font-bold text-[#24211d]">
          预计总预算 {formatCurrency(packingList.estimatedBudget)}
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <p className="text-base font-bold text-[#24211d]">必带单品</p>
          <div className="mt-3 space-y-3">
            {packingList.mustBring.length > 0 ? (
              packingList.mustBring.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-semibold text-[#756f68]">{group.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#4a433c]">{group.items.join("、")}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#756f68]">暂无必带单品</p>
            )}
          </div>
        </Card>
        <ListCard title="已拥有" items={packingList.owned} />
        <ListCard title="需要购买" items={packingList.toBuy} />
      </div>
    </section>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <p className="text-base font-bold text-[#24211d]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4a433c]">
        {items.length > 0 ? items.map((item) => <li key={item}>· {item}</li>) : <li>暂无数据</li>}
      </ul>
    </Card>
  );
}
