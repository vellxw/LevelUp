"use client";

import { useState } from "react";
import Link from "next/link";
import type { Game, NewsItem, Review, VideoItem, Debate } from "@/lib/types";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuDivider } from "@/components/ui/LuDivider";
import { LuCountdownTimer } from "@/components/ui/LuCountdownTimer";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LuVideoCard } from "@/components/cards/LuVideoCard";
import { cn, relativeTime, scoreTone } from "@/lib/utils";

const tones = { high: "text-positive border-positive/50", mid: "text-warning border-warning/50", low: "text-brand border-brand/50" };

interface Props {
  game: Game;
  news: NewsItem[];
  review: Review | null;
  videos: VideoItem[];
  debates: Debate[];
}

export function GameTabs({ game, news, review, videos, debates }: Props) {
  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "noticias", label: `Noticias (${news.length})` },
    { id: "review", label: "Review" },
    { id: "videos", label: `Videos (${videos.length})` },
    { id: "lanzamiento", label: "Lanzamiento" },
    { id: "comunidad", label: `Comunidad (${debates.length})` },
  ];
  const [tab, setTab] = useState("resumen");
  return (
    <div>
      <div role="tablist" aria-label="Secciones del juego" className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={cn("relative shrink-0 px-4 py-3 text-[14px] font-medium transition-colors", tab === t.id ? "text-ink" : "text-ink-muted hover:text-ink")}>
            {t.label}
            {tab === t.id && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand" />}
          </button>
        ))}
      </div>
      <div className="py-6" role="tabpanel">
        {tab === "resumen" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {game.description.map((p, i) => <p key={i} className="text-ink-muted">{p}</p>)}
              <div className="flex flex-wrap gap-2 pt-2">{game.tags.map((t) => <LuBadge key={t} kind="category">{t}</LuBadge>)}</div>
            </div>
            <LuCard surface={3} className="h-fit p-5">
              <p className="lu-eyebrow mb-3">Ficha técnica</p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-ink-faint">Estudio</dt><dd className="text-ink">{game.studio}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-faint">Editora</dt><dd className="text-ink">{game.publisher}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-faint">Lanzamiento</dt><dd className="text-ink">{game.releaseLabel}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-faint">Hype</dt><dd className="text-ink">{game.hypeCount.toLocaleString("es-AR")}</dd></div>
              </dl>
            </LuCard>
          </div>
        )}
        {tab === "noticias" && (
          news.length ? <div className="grid gap-4 sm:grid-cols-2">{news.map((n) => <LuNewsCard key={n.id} item={n} />)}</div>
            : <p className="text-ink-muted">Aún no hay noticias para este juego.</p>
        )}
        {tab === "review" && (
          review ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="font-display text-xl font-semibold text-ink">{review.title}</h3>
                <p className="mt-1 lu-mono text-[12px] text-ink-faint">Por {review.author} - Probado en {review.platformTested}</p>
                <div className="mt-4 space-y-3">{review.body.map((p, i) => <p key={i} className="text-ink-muted">{p}</p>)}</div>
                <Link href={`/reviews/${review.slug}`} className="mt-4 inline-block lu-mono text-[12px] uppercase tracking-wider text-brand hover:underline">Leer review completa -&gt;</Link>
              </div>
              <LuCard surface={3} className="h-fit p-5">
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-16 w-16 items-center justify-center rounded-md border-2 bg-surface1 font-display text-2xl font-bold", tones[scoreTone(review.editorialScore)])}>{review.editorialScore.toFixed(1)}</div>
                  <div><p className="lu-eyebrow">Editorial</p><p className="mt-1 text-sm text-ink-muted">Comunidad {review.userScore.toFixed(1)}</p></div>
                </div>
                <LuDivider className="my-4" />
                <p className="lu-eyebrow mb-2">Pros</p>
                <ul className="space-y-1 text-sm text-ink-muted">{review.pros.map((p) => <li key={p}>+ {p}</li>)}</ul>
                <p className="lu-eyebrow mb-2 mt-3">Contras</p>
                <ul className="space-y-1 text-sm text-ink-muted">{review.cons.map((c) => <li key={c}>- {c}</li>)}</ul>
              </LuCard>
            </div>
          ) : <p className="text-ink-muted">Este juego todavía no tiene review publicada.</p>
        )}
        {tab === "videos" && (
          videos.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{videos.map((v) => <LuVideoCard key={v.id} video={v} />)}</div>
            : <p className="text-ink-muted">Sin videos disponibles.</p>
        )}
        {tab === "lanzamiento" && (
          <LuCard surface={3} className="p-6">
            <p className="lu-eyebrow mb-2">Estado: {game.releaseLabel}</p>
            {game.updateNote && <p className="mb-4 text-ink-muted">{game.updateNote}</p>}
            {(game.status === "proximo" || game.status === "anunciado") ? (
              <div><p className="mb-2 text-sm text-ink-muted">Cuenta regresiva estimada:</p><LuCountdownTimer targetISO={game.releaseDate} /></div>
            ) : <p className="text-ink-muted">El juego ya está disponible. Revisá ofertas y actualizaciones.</p>}
          </LuCard>
        )}
        {tab === "comunidad" && (
          debates.length ? (
            <div className="space-y-3">{debates.map((d) => (
              <LuCard key={d.id} surface={2} hover className="p-5">
                <Link href={`/comunidad?d=${d.slug}`}>
                  <LuBadge kind="category" className="w-fit">{d.category}</LuBadge>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink hover:text-brand">{d.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{d.excerpt}</p>
                  <p className="mt-2 lu-mono text-[11px] text-ink-faint">{d.replies} respuestas - {relativeTime(d.dateISO)}</p>
                </Link>
              </LuCard>
            ))}</div>
          ) : <p className="text-ink-muted">Todavía no hay debates sobre este juego.</p>
        )}
      </div>
    </div>
  );
}
