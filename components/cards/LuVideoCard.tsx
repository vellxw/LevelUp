import Link from "next/link";
import { Play } from "@/components/ui/icons";
import type { VideoItem } from "@/lib/types";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { coverStyle, formatDuration, formatViews, cn, isLikelyEnglish } from "@/lib/utils";

export function LuVideoCard({ video }: { video: VideoItem }) {
  return (
    <LuCard hover className="group overflow-hidden">
      <Link href={`/videos?v=${video.slug}`} className="flex h-full flex-col" data-cursor="play">
        <div className="overflow-hidden relative h-40">
          <div
            className="relative h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
            style={coverStyle(video.seed, video.coverUrl)}
          >
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:border-brand">
              <Play className="h-5 w-5 fill-current text-white" />
            </span>
          </div>
          <span className="absolute bottom-2 right-2 rounded-xs bg-black/70 px-1.5 py-0.5 lu-mono text-[11px] text-white">
            {formatDuration(video.durationSec)}
          </span>
          <div className="absolute left-3 top-3">
            <LuBadge kind="category">{video.category}</LuBadge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-tight text-ink transition-colors group-hover:text-brand">
            {video.title}
          </h3>
          <p className="mt-2 lu-mono text-[11px] text-ink-faint">{formatViews(video.views)} vistas</p>
        </div>
      </Link>
    </LuCard>
  );
}
