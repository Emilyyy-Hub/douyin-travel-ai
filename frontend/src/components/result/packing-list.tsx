import { Card } from "@/components/ui/card";
import type { PackingItem } from "@/types/plan";

interface PackingListProps {
  packingList: PackingItem[];
}

export function PackingList({ packingList }: PackingListProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[#bf5f47]">旅行打包清单</p>
        <h2 className="mt-1 text-2xl font-bold text-[#24211d]">按出行前直接检查</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {packingList.length > 0 ? (
          packingList.map((group) => <ListCard key={group.id} title={group.title} items={group.items} />)
        ) : (
          <Card>
            <p className="text-sm text-[#756f68]">暂无打包清单</p>
          </Card>
        )}
      </div>
    </section>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <p className="text-base font-bold text-[#24211d]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4a433c]">
        {items.length > 0 ? items.map((item) => <li key={item}>- {item}</li>) : <li>暂无数据</li>}
      </ul>
    </Card>
  );
}
