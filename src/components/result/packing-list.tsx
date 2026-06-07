import { Card } from "@/components/ui/card";
import type { PackingItem } from "@/types/plan";

interface PackingListProps {
  packingList: PackingItem[];
}

export function PackingList({ packingList }: PackingListProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="font-label-sm text-label-sm font-bold text-secondary">旅行打包清单</p>
        <h2 className="mt-1 font-headline-lg text-headline-lg text-primary">按出行前直接检查</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {packingList.length > 0 ? (
          packingList.map((group) => (
            <ListCard key={group.id} title={group.title} items={group.items} />
          ))
        ) : (
          <Card variant="journal">
            <p className="font-body-md text-on-surface-variant">暂无打包清单</p>
          </Card>
        )}
      </div>
    </section>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card variant="journal">
      <p className="font-title-md text-primary">{title}</p>
      <ul className="mt-3 space-y-2 font-body-md text-on-surface">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>- {item}</li>)
        ) : (
          <li>暂无数据</li>
        )}
      </ul>
    </Card>
  );
}
