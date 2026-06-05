import { Card } from "@/components/ui/card";
import type { ActionCard as ActionCardType } from "@/types/plan";

interface ActionCardProps {
  action: ActionCardType;
}

export function ActionCard({ action }: ActionCardProps) {
  return (
    <Card className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-[#bf5f47]">{action.time}</p>
        <h3 className="mt-1 text-lg font-bold text-[#24211d]">{action.scene}</h3>
      </div>
      <ActionLine label="机位" value={action.cameraSpot} />
      <ActionLine label="构图" value={action.composition} />
      <ActionLine label="拍照动作" value={action.pose} />
      <div>
        <p className="text-xs font-semibold text-[#756f68]">注意事项</p>
        <ul className="mt-2 space-y-1 text-sm leading-6 text-[#4a433c]">
          {action.notes.length > 0 ? (
            action.notes.map((note) => <li key={note}>· {note}</li>)
          ) : (
            <li>暂无注意事项</li>
          )}
        </ul>
      </div>
    </Card>
  );
}

function ActionLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#756f68]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[#24211d]">{value}</p>
    </div>
  );
}
