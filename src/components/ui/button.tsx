import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container transition-colors",
  secondary:
    "bg-surface-container-lowest border border-primary text-primary hover:bg-surface-container-low transition-colors",
  ghost:
    "text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
};

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-label-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50",
        "sketch-hover",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  href,
  variant = "primary"
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-label-sm font-semibold transition-all",
        "sketch-hover",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
