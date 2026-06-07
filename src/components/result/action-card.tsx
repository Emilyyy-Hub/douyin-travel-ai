import { Card } from "@/components/ui/card";
import type { ActionCard as ActionCardType } from "@/types/plan";

interface ActionCardProps {
  action: ActionCardType;
}

export function ActionCard({ action }: ActionCardProps) {
  return (
    <Card variant="journal" className="space-y-3">
      <div>
        <p className="font-label-sm text-label-sm font-bold text-secondary">{action.time}</p>
        <h3 className="mt-1 font-title-md text-primary">{action.scene}</h3>
      </div>
      <ActionLine label="机位" value={action.cameraSpot} />
      <ActionLine label="构图" value={action.composition} />
      <ActionLine label="拍照动作" value={action.pose} />
      <div>
        <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">注意事项</p>
        <ul className="mt-2 space-y-1 font-body-md text-on-surface">
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
      <p className="font-label-sm text-label-sm font-bold text-on-surface-variant">{label}</p>
      <p className="mt-1 font-body-md text-on-surface">{value}</p>
    </div>
  );
}
