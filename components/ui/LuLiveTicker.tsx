"use client";

import Link from "next/link";
import { LuBadge } from "@/components/ui/LuBadge";

export function LuLiveTicker({ items, href = "/noticias" }: { items: string[]; href?: string }) {
  const loop = [...items, ...items];
  return (
    <div className="flex items-center gap-4 overflow-hidden border-y border-line bg-surface1/80 py-2.5">
      <LuBadge kind="live" dot className="shrink-0">En vivo</LuBadge>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max gap-10 whitespace-nowrap animate-marquee motion-reduce:anim-none">
          {loop.map((t, i) => (
            <span key={i} className="lu-mono text-[12px] uppercase tracking-wide text-ink-muted">
              <span className="mr-2 text-brand">//</span>
              {t}
            </span>
          ))}
        </div>
      </div>
      <Link href={href} className="shrink-0 lu-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-brand">
        Ver más
      </Link>
    </div>
  );
}
