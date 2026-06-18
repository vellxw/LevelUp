"use client";

import Link from "next/link";
import { Radar, ArrowUpRight, CalendarClock, Plus } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { games } from "@/data/games";
import { coverStyle, relativeTime } from "@/lib/utils";
import { LuCorners } from "@/components/ui/LuCorners";
import { LuButton } from "@/components/ui/LuButton";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

function MiniRadarSweep({ className = "h-12 w-12" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/5 ${className}`} aria-hidden="true">
      <span className="absolute inset-1 rounded-full border border-brand/20" />
      <span className="absolute inset-2.5 rounded-full border border-brand/30" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
      {!reduce && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(229,9,20,0.55) 25deg, transparent 60deg)",
            animation: "lu-radar-spin 3.4s linear infinite",
          }}
        />
      )}
    </span>
  );
}

function MiniRadarWithBlips({ count }: { count: number }) {
  const reduce = useReducedMotion();
  const safe = Math.min(Math.max(count, 1), 6);
  const blips = Array.from({ length: safe }, (_, i) => {
    const angle = (i * (Math.PI * 2)) / safe;
    const radius = 36 + (i % 2 === 0 ? 0 : 8);
    return {
      cx: 50 + Math.cos(angle) * radius,
      cy: 50 + Math.sin(angle) * radius,
      delay: (i * 0.6) / safe,
    };
  });
  return (
    <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-brand/20" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-brand/20" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-brand/30" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.4" className="text-brand/15" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.4" className="text-brand/15" />
        {blips.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r="2.4"
            className="fill-brand"
            style={reduce ? undefined : { animation: `lu-radar-blink 2.6s ease-in-out ${b.delay}s infinite` }}
          />
        ))}
        {!reduce && (
          <g style={{ transformOrigin: "50% 50%", animation: "lu-radar-spin 4.2s linear infinite" }}>
            <path d="M50 50 L50 4 A46 46 0 0 1 95 65 Z" fill="rgba(229,9,20,0.18)" />
          </g>
        )}
      </svg>
    </span>
  );
}

export function RadarWidget() {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const onboarded = useRadar((s) => s.onboardingComplete);
  const followed = followedIds
    .map((id) => games.find((g) => g.id === id))
    .filter((g): g is (typeof games)[number] => Boolean(g));
  const hasContent = hydrated && onboarded && followed.length > 0;
  const nextUpcoming = hasContent
    ? followed
        .filter((g) => new Date(g.releaseDate).getTime() > Date.now())
        .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())[0]
    : null;

  return (
    <div className="relative mt-auto overflow-hidden rounded-md border border-line bg-surface1">
      <LuCorners color="brand" />
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <div className="flex items-center gap-2">
          <Radar className="h-3.5 w-3.5 text-brand" />
          <span className="lu-eyebrow text-brand">Mi Radar</span>
        </div>
        <Link
          href="/mi-radar"
          className="flex h-7 w-7 items-center justify-center rounded-sm text-ink-faint transition-colors hover:bg-surface2 hover:text-ink"
          aria-label="Abrir Mi Radar"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {!hydrated ? (
        <div className="p-3">
          <div className="h-14 animate-pulse rounded-sm bg-surface2" />
        </div>
      ) : hasContent && nextUpcoming ? (
        <Link
          href={`/juegos/${nextUpcoming.slug}`}
          className="group block p-3 transition-colors hover:bg-surface2"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-line"
              style={coverStyle(nextUpcoming.seed, nextUpcoming.coverUrl)}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="lu-eyebrow">Próximo en tu radar</p>
              <h3 className="truncate font-display text-[13px] font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-brand">
                {nextUpcoming.title}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-ink-faint">
                <CalendarClock className="h-3 w-3" />
                <span className="lu-mono text-[10px] tabular-nums uppercase tracking-wider">
                  {relativeTime(nextUpcoming.releaseDate)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <div className="flex items-center gap-2">
              <MiniRadarWithBlips count={followed.length} />
              <div className="leading-tight">
                <p className="lu-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {followed.length} seguís
                </p>
                <p className="font-display text-[12px] font-semibold text-ink">Radar calibrado</p>
              </div>
            </div>
            <span className="lu-mono text-[10px] uppercase tracking-wider text-ink-faint transition-colors group-hover:text-brand">
              Ver →
            </span>
          </div>
        </Link>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-3">
            <MiniRadarSweep className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <p className="lu-eyebrow">Tu radar está en silencio</p>
              <p className="mt-1 text-[12px] leading-snug text-ink-muted">
                Armalo en 60s y la home prioriza lo que te importa.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <p className="lu-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {onboarded ? "0 seguís" : "Sin calibrar"}
            </p>
            <LuButton href="/onboarding" size="sm" variant="primary" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Configurar
            </LuButton>
          </div>
        </div>
      )}
    </div>
  );
}
