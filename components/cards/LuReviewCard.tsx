import Link from "next/link";
import type { Review } from "@/lib/types";
import { gameById } from "@/data/games";
import { LuCard } from "@/components/ui/LuCard";
import { coverStyle, scoreTone, isLikelyEnglish, relativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const tones = { high: "text-positive border-positive/50", mid: "text-warning border-warning/50", low: "text-brand border-brand/50" };

export function LuReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  const game = gameById(review.gameId);
  if (featured) {
    return (
      <LuCard hover className="group overflow-hidden">
        <Link href={`/reviews/${review.slug}`} className="grid h-full grid-cols-1 sm:grid-cols-[55%_45%]" data-cursor="view">
          <div className="overflow-hidden relative h-56 sm:h-full sm:min-h-[280px]">
            <div
              className="relative h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
              style={coverStyle(game?.seed ?? review.slug, review.coverUrl ?? game?.coverUrl)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/40" />
            <div
              className={cn(
                "absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-md border-2 bg-surface1/95 font-display text-2xl font-bold",
                tones[scoreTone(review.editorialScore)],
              )}
            >
              {review.editorialScore.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="lu-eyebrow mb-2">// Review destacada · {game?.title}</p>
            <h3 className="line-clamp-2 font-display text-xl font-bold leading-tight text-ink transition-colors group-hover:text-brand sm:text-2xl">
              {isLikelyEnglish(review.title) ? <span lang="en">{review.title}</span> : review.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{review.verdict}</p>
            <div className="mt-auto flex items-center justify-between pt-3 lu-mono text-[11px] text-ink-faint">
              <span>Por {review.author}</span>
              <span>{relativeTime(review.dateISO)}</span>
            </div>
          </div>
        </Link>
      </LuCard>
    );
  }
  return (
    <LuCard hover className="group overflow-hidden">
      <Link href={`/reviews/${review.slug}`} className="flex h-full flex-col" data-cursor="view">
        <div className="overflow-hidden relative h-36">
          <div
            className="relative h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
            style={coverStyle(game?.seed ?? review.slug, review.coverUrl ?? game?.coverUrl)}
          >
          </div>
          <div
            className={cn(
              "absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-md border-2 bg-surface1/90 font-display text-lg font-bold",
              tones[scoreTone(review.editorialScore)],
            )}
          >
            {review.editorialScore.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <p className="lu-eyebrow mb-1">{game?.title}</p>
          <h3 className="line-clamp-2 font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-brand">
            {isLikelyEnglish(review.title) ? <span lang="en">{review.title}</span> : review.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{review.verdict}</p>
        </div>
      </Link>
    </LuCard>
  );
}
