import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "journal" | "journal-sm" | "ghost";

const variantClasses: Record<CardVariant, string> = {
  default: "hand-drawn-border bg-surface-container-lowest rounded-xl p-gutter",
  journal: "journal-card bg-surface-container-lowest rounded-xl p-gutter",
  "journal-sm": "journal-card-sm bg-surface-container-lowest rounded-xl p-gutter",
  ghost: "border border-primary bg-surface-container-lowest rounded-xl p-gutter"
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
