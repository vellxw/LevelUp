"use client";

import Link from "next/link";
import { Radar, ArrowUpRight } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import type { NewsItem } from "@/lib/types";
import { coverStyle, isLikelyEnglish, relativeTime } from "@/lib/utils";

function reorderByRadar(items: NewsItem[], followedIds: string[]): { news: NewsItem[]; matched: number } {
  if (followedIds.length === 0) return { news: items, matched: 0 };
  const followed = new Set(followedIds);
  const matched = items.filter((n) => n.gameId && followed.has(n.gameId));
  const rest = items.filter((n) => !matched.includes(n));
  return { news: [...matched, ...rest], matched: matched.length };
}

export function HeroSideRail({ news, featuredId }: { news: NewsItem[]; featuredId: string }) {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const onboarded = useRadar((s) => s.onboardingComplete);

  const pool = news.filter((n) => n.id !== featuredId).slice(0, 8);
  const { news: ordered, matched } = reorderByRadar(pool, followedIds);
  const items = ordered.slice(0, 4);
  const showRadarBadge = hydrated && onboarded && followedIds.length > 0 && matched > 0;

  return (
    <div className="flex flex-col">
      {showRadarBadge && (
        <div className="mb-2 flex items-center justify-between border-b border-brand/30 bg-brand/5 px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <Radar className="h-3 w-3 text-brand" />
            <span className="lu-eyebrow text-brand">Personalizado por tu radar</span>
          </div>
          <span className="lu-mono text-[10px] tabular-nums text-ink-muted">
            {matched} de {items.length}
          </span>
        </div>
      )}
      {items.map((n, i) => (
        <Link
          key={n.id}
          href={`/noticias/${n.slug}`}
          className={`group grid grid-cols-[56px_1fr] items-center gap-2.5 py-2.5 transition-colors hover:bg-surface2/40 sm:gap-3 ${
            i < items.length - 1 ? "border-b border-line" : ""
          } ${i === 0 ? "first:pt-1" : ""}`}
        >
          <div
            className="relative h-14 w-14 overflow-hidden rounded-sm border border-line"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-105"
              style={coverStyle(n.seed, n.coverUrl)}
            />
            {n.gameId && followedIds.includes(n.gameId) && showRadarBadge && (
              <span
                className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-brand ring-1 ring-bg"
                aria-label="Sigue a este juego"
              />
            )}
          </div>
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1.5">
              <span className="lu-mono text-[9px] uppercase tracking-wider text-ink-faint">
                {n.category}
              </span>
              <span className="lu-mono text-[9px] tabular-nums text-ink-faint">
                · {relativeTime(n.dateISO)}
              </span>
            </div>
            <h2 className="line-clamp-2 font-display text-[13px] font-semibold leading-tight text-ink transition-colors group-hover:text-brand sm:text-sm">
              {isLikelyEnglish(n.title) ? <span lang="en">{n.title}</span> : n.title}
            </h2>
          </div>
        </Link>
      ))}
      <Link
        href="/noticias"
        className="mt-2 flex items-center justify-end gap-1 lu-mono text-[10px] uppercase tracking-wider text-ink-faint transition-colors hover:text-ink"
      >
        Ver todas las noticias
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
