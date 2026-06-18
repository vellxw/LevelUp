"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "@/components/ui/icons";
import { Logo } from "@/components/shell/Logo";
import { primaryNav } from "@/lib/nav";
import { useRadar, useHydrated } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const followCount = useRadar((s) => s.followedGameIds.length);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <header className="sticky top-0 z-nav border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-shell items-center gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav aria-label="Principal" className="hidden flex-1 items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-3 py-2 text-[14px] font-medium transition-colors block",
                isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand" />}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/buscar" aria-label="Buscar" className="flex h-11 w-11 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-surface2 hover:text-ink">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/notificaciones" aria-label="Notificaciones" className="relative flex h-11 w-11 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-surface2 hover:text-ink">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
          </Link>
          <Link href="/perfil" aria-label="Perfil" className="relative flex h-11 items-center gap-2 rounded-sm px-2 text-ink-muted transition-colors hover:bg-surface2 hover:text-ink">
            <User className="h-5 w-5" />
            {hydrated && followCount > 0 && (
              <span className="hidden lu-mono text-[11px] text-ink-faint sm:inline">{followCount} seguidos</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
