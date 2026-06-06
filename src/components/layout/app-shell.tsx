import Link from "next/link";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  eyebrow?: string;
}

export function AppShell({ children, eyebrow }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#fbf8f3]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-2">
          <Link href="/" className="focus-ring rounded-lg text-sm font-bold text-[#24211d]">
            出游灵感方案
          </Link>
          {eyebrow ? <span className="text-xs font-medium text-[#756f68]">{eyebrow}</span> : null}
        </header>
        <div className="flex-1 py-5">{children}</div>
      </div>
    </main>
  );
}
