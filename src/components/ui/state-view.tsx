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
    <Card className="text-center">
      <p className="text-base font-semibold text-[#24211d]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#756f68]">{description}</p>
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
