import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StateViewProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function StateView({
  title,
  description,
  actionLabel,
  actionHref,
  onAction
}: StateViewProps) {
  return (
    <Card variant="journal" className="text-center">
      <p className="text-title-md font-title-md text-primary">{title}</p>
      <p className="mt-2 text-body-md text-on-surface-variant">{description}</p>
      {actionLabel && actionHref ? (
        <LinkButton href={actionHref} className="mt-4">
          {actionLabel}
        </LinkButton>
      ) : null}
      {actionLabel && onAction ? (
        <Button type="button" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
