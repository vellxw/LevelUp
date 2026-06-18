"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Zap, RefreshCw, Tag, Newspaper, Check } from "@/components/ui/icons";
import { alertsSeed } from "@/data/alerts";
import { gameById } from "@/data/games";
import { useRadar, useHydrated } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuButton } from "@/components/ui/LuButton";
import { relativeTime, cn } from "@/lib/utils";

const icons = { lanzamiento: Zap, actualizacion: RefreshCw, oferta: Tag, noticia: Newspaper };

export default function NotificacionesPage() {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const [read, setRead] = useState<string[]>([]);
  const markAll = () => setRead(alertsSeed.map((a) => a.id));
  const items = alertsSeed.slice().sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  return (
    <>
      <PageHeader eyebrow="Avisos" title="Notificaciones" description="Novedades de la industria y de los juegos que seguís.">
        <LuButton variant="secondary" size="sm" onClick={markAll} leftIcon={<Check className="h-4 w-4" />}>Marcar todo como leído</LuButton>
      </PageHeader>
      <LuSection>
        <ul className="space-y-2">
          {items.map((a) => {
            const game = gameById(a.gameId);
            const Icon = icons[a.kind];
            const isRead = read.includes(a.id);
            const isFollowed = hydrated && game && followedIds.includes(game.id);
            return (
              <li key={a.id}>
                <LuCard surface={isRead ? 1 : 2} className={cn("flex items-start gap-4 p-4", !isRead && "border-l-2 border-l-brand")}>
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line bg-surface3 text-ink-muted"><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <LuBadge kind="category">{a.kind}</LuBadge>
                      {isFollowed && <LuBadge kind="live" dot>Seguido</LuBadge>}
                    </div>
                    <p className="mt-1.5 text-ink">{a.message}</p>
                    <div className="mt-1 flex items-center gap-3 lu-mono text-[11px] text-ink-faint">
                      <span>{relativeTime(a.dateISO)}</span>
                      {game && <Link href={`/juegos/${game.slug}`} className="hover:text-brand">Ver {game.title}</Link>}
                    </div>
                  </div>
                  {!isRead && <button type="button" onClick={() => setRead((r) => [...r, a.id])} aria-label="Marcar leído" className="shrink-0 text-ink-faint hover:text-positive"><Check className="h-4 w-4" /></button>}
                </LuCard>
              </li>
            );
          })}
        </ul>
      </LuSection>
    </>
  );
}
