"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquare, Heart } from "@/components/ui/icons";
import { debates } from "@/data/community";
import { gameById } from "@/data/games";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { relativeTime, cn } from "@/lib/utils";

function ComunidadInner() {
  const params = useSearchParams();
  const focus = params.get("d");
  return (
    <LuSection>
      <div className="space-y-3">
        {debates.map((d) => {
          const game = d.gameId ? gameById(d.gameId) : null;
          const active = focus === d.slug;
          return (
            <LuCard key={d.id} surface={active ? 3 : 2} hover className={cn("p-5", active && "ring-1 ring-brand/50")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <LuBadge kind="category">{d.category}</LuBadge>
                    {game && <Link href={`/juegos/${game.slug}`} className="lu-mono text-[11px] text-ink-faint hover:text-brand">#{game.title}</Link>}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">{d.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{d.excerpt}</p>
                  <p className="mt-2 lu-mono text-[11px] text-ink-faint">Por {d.author} - {relativeTime(d.dateISO)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4 lu-mono text-[12px] text-ink-faint">
                  <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" />{d.replies}</span>
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4" />{d.likes}</span>
                </div>
              </div>
            </LuCard>
          );
        })}
      </div>
    </LuSection>
  );
}

export default function ComunidadPage() {
  return (
    <>
      <PageHeader eyebrow="Comunidad" title="Debates y actividad" description="Lo que discute la comunidad gamer latinoamericana." />
      <Suspense fallback={<LuSection><div className="h-40 animate-pulse rounded-md bg-surface2" /></LuSection>}>
        <ComunidadInner />
      </Suspense>
    </>
  );
}
