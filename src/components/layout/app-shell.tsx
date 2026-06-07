"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  eyebrow?: string;
}

const navItems = [
  { href: "/", label: "首页", icon: "home" },
  { href: "/inspiration", label: "灵感", icon: "lightbulb" },
  { href: "/generating", label: "生成", icon: "magic_button", raised: true },
  { href: "/profile", label: "计划", icon: "auto_stories" },
  { href: "/me", label: "我的", icon: "person" }
];

export function AppShell({ children, eyebrow }: AppShellProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden pb-32">
      {/* ===== Top Navigation ===== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-primary px-margin-page h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full border border-primary overflow-hidden bg-surface-container shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSufcwlGSVqxU7LNAAumTmtk7QmkOfMSf6EiF6Fzme8Ui_N60K9uUlZvqHLfIXvqxRkBFgVLZOCxNd8hhw-lKaZf-wU-XHGx_5KQt4PvCz8j0CH9638wpSvsmdXR_7cFRJo0S7E-lKULytqCqbOCFZFfz9uu3p8lVfJ61xi5uSJyrotYMY7HriB0bSa8VRdE_NFgRHVAJvq1vCbhImLLNKC-NbuWFZyJZ8L5oaMc95OPoC37itNwk90T4Y3psRFmcEkG25fpLVmxq"
              alt="用户头像"
              className="w-full h-full object-cover"
            />
          </div>
          {/* App Name */}
          <Link href="/" className="focus-ring rounded-lg">
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary whitespace-nowrap">
              衣边走，衣路拍
            </span>
          </Link>
          {/* Eyebrow chip */}
          {eyebrow ? (
            <span className="hidden sm:inline-flex rounded-full bg-primary-fixed text-on-primary-fixed px-3 py-1 font-label-sm text-label-sm">
              {eyebrow}
            </span>
          ) : null}
        </div>
        {/* Menu button */}
        <button className="text-primary hover:opacity-80 transition-opacity" aria-label="菜单">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </header>

      {/* ===== Page Content ===== */}
      <div className="pt-24 pb-8 px-margin-page max-w-5xl mx-auto w-full">
        {children}
      </div>

      {/* ===== Bottom Navigation ===== */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 safe-bottom bg-background border-t border-primary rounded-t-xl">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          // Raised center button
          if (item.raised) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring flex flex-col items-center justify-center relative -mt-8"
              >
                <span className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg sketch-hover">
                  <span className="material-symbols-outlined text-3xl">
                    {item.icon}
                  </span>
                </span>
                <span
                  className={
                    "font-label-sm text-label-sm mt-1 " +
                    (active ? "text-primary font-bold" : "text-on-surface-variant")
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "focus-ring flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-colors " +
                (active
                  ? "text-primary font-bold active-nav-item"
                  : "text-on-surface-variant hover:bg-surface-container-low")
              }
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={
                  active
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
