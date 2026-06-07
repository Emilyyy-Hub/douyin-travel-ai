"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
}

export function Chip({ selected = false, label, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border border-primary px-4 py-2 font-label-sm text-label-sm transition-all",
        "sketch-hover",
        selected
          ? "bg-primary-container text-on-primary border-primary-container"
          : "bg-transparent text-primary hover:bg-surface-container-low",
        className
      )}
      aria-pressed={selected}
      {...props}
    >
      {label}
    </button>
  );
}

/* Checkbox-driven chip — wraps a hidden checkbox for form usage */
interface ChipCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ChipCheckbox({ label, checked = false, onChange }: ChipCheckboxProps) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span
        className={cn(
          "block rounded-full border border-primary px-4 py-2 font-label-sm text-label-sm transition-all",
          "peer-checked:bg-primary-container peer-checked:text-on-primary peer-checked:border-primary-container",
          "bg-transparent text-primary hover:bg-surface-container-low"
        )}
      >
        {label}
      </span>
    </label>
  );
}
