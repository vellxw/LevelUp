"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Play } from "@/components/ui/icons";
import { videos } from "@/data/videos";
import { gameById } from "@/data/games";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuVideoCard } from "@/components/cards/LuVideoCard";
import { LuChip } from "@/components/ui/LuChip";
import { LuCorners } from "@/components/ui/LuCorners";
import { coverStyle, formatDuration, formatViews } from "@/lib/utils";

function VideosInner() {
  const params = useSearchParams();
  const initial = params.get("v");
  const featured = videos.find((v) => v.slug === initial) ?? videos[0];
  const [current, setCurrent] = useState(featured);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cat, setCat] = useState<string | null>(null);
  const categories = Array.from(new Set(videos.map((v) => v.category)));
  const list = cat ? videos.filter((v) => v.category === cat) : videos;
  const game = current.gameId ? gameById(current.gameId) : null;

  const selectVideo = (v: typeof videos[0]) => {
    setCurrent(v);
    setIsPlaying(false);
  };

  return (
    <LuSection>
      {isPlaying && current.youtubeId ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md border border-line bg-black min-h-[320px] sm:min-h-[480px]">
          <iframe
            src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={current.title}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative block w-full overflow-hidden rounded-md border border-line text-left transition-all duration-[var(--dur-base)] focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
          style={coverStyle(current.seed, current.coverUrl)}
        >
          <div className="lu-scanlines absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <LuCorners color="brand" />
          <div className="relative flex min-h-[260px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 transition-transform duration-300 hover:scale-110">
              <Play className="h-7 w-7 fill-current text-white" />
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold uppercase text-ink sm:text-4xl">{current.title}</h2>
            <p className="mt-2 lu-mono text-[12px] text-ink-muted">{current.category} - {formatDuration(current.durationSec)} - {formatViews(current.views)} vistas{game ? ` - ${game.title}` : ""}</p>
          </div>
        </button>
      )}
      <div className="mb-6 mt-8 flex flex-wrap gap-2">
        <LuChip active={cat === null} onClick={() => setCat(null)}>Todos</LuChip>
        {categories.map((c) => <LuChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</LuChip>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => (
          <button key={v.id} type="button" onClick={() => selectVideo(v)} className="text-left">
            <LuVideoCard video={v} />
          </button>
        ))}
      </div>
    </LuSection>
  );
}

export default function VideosPage() {
  return (
    <>
      <PageHeader eyebrow="Mirar" title="Videos" description="Tráilers, análisis y guías en un solo hub." />
      <Suspense fallback={<LuSection><div className="h-64 animate-pulse rounded-md bg-surface2" /></LuSection>}>
        <VideosInner />
      </Suspense>
    </>
  );
}
