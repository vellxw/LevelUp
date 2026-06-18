"use client";

import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import type { NewsItem } from "@/lib/types";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuButton } from "@/components/ui/LuButton";
import { LuCorners } from "@/components/ui/LuCorners";
import { coverStyle } from "@/lib/utils";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { RadarWidget } from "@/components/home/RadarWidget";
import { HeroSideRail } from "@/components/home/HeroSideRail";

export function Hero({ slides, secondary }: { slides: NewsItem[]; secondary: NewsItem[] }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  return (
    <section aria-label="Destacados" className="border-b border-line">
      <div className="mx-auto grid max-w-shell gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[65%_35%] lg:px-10">
        <div className="relative min-h-[420px] overflow-hidden rounded-md border border-line lg:min-h-[640px]">
          <div key={current.id} className="absolute inset-0 animate-fadein motion-reduce:animate-none" style={coverStyle(current.seed, current.coverUrl)}>
            <div className="lu-scanlines absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
          <LuCorners color="brand" />
          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
            <div className="mb-3 flex items-center gap-3">
              <LuBadge kind="new">Destacado</LuBadge>
              <span className="lu-mono text-[12px] text-ink-muted">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>
            <h1 className="max-w-3xl text-[clamp(2rem,5vw,4.2rem)] font-bold uppercase leading-[0.95] text-ink lu-text-balance min-h-[1.1em]">
              <SplitText key={current.id} text={current.title} />
            </h1>
            <p className="mt-3 max-w-xl text-ink-muted">{current.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic><LuButton href={`/noticias/${current.slug}`} variant="primary">Leer nota completa</LuButton></Magnetic>
              <Magnetic><LuButton href="/videos" variant="outline" leftIcon={<Play className="h-4 w-4" />}>Ver tráiler</LuButton></Magnetic>
            </div>
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            <button onClick={() => go(-1)} aria-label="Anterior" className="flex h-11 w-11 items-center justify-center rounded-sm border border-line bg-black/50 text-ink-muted backdrop-blur transition-colors hover:text-ink"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => go(1)} aria-label="Siguiente" className="flex h-11 w-11 items-center justify-center rounded-sm border border-line bg-black/50 text-ink-muted backdrop-blur transition-colors hover:text-ink"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="flex flex-col">
          <HeroSideRail news={secondary} featuredId={current.id} />
          <RadarWidget />
        </div>
      </div>
    </section>
  );
}
