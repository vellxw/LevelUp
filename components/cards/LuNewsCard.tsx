import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { coverStyle, relativeTime, isLikelyEnglish } from "@/lib/utils";

export function LuNewsCard({ item, layout = "vertical" }: { item: NewsItem; layout?: "vertical" | "horizontal" }) {
  if (layout === "horizontal") {
    return (
      <LuCard hover className="group overflow-hidden">
        <Link href={`/noticias/${item.slug}`} className="flex gap-4" data-cursor="read">
          <div className="overflow-hidden relative h-24 w-32 shrink-0">
            <div
              className="relative h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
              style={coverStyle(item.seed, item.coverUrl)}
            />
          </div>
          <div className="min-w-0 flex-1 py-3 pr-3">
            <LuBadge kind="category">{item.category}</LuBadge>
            <h3 className="mt-1.5 line-clamp-2 font-display text-base font-semibold leading-tight text-ink transition-colors group-hover:text-brand">
              {isLikelyEnglish(item.title) ? <span lang="en">{item.title}</span> : item.title}
            </h3>
            <p className="mt-1 lu-mono text-[11px] text-ink-faint">{relativeTime(item.dateISO)}</p>
          </div>
        </Link>
      </LuCard>
    );
  }
  return (
    <LuCard hover className="group h-full overflow-hidden">
      <Link href={`/noticias/${item.slug}`} className="flex h-full flex-col" data-cursor="read">
        <div className="overflow-hidden relative h-40">
          <div
            className="relative h-full transition-transform duration-700 ease-smooth group-hover:scale-105"
            style={coverStyle(item.seed, item.coverUrl)}
          />
          <div className="absolute left-3 top-3">
            <LuBadge kind="category">{item.category}</LuBadge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-brand">
            {isLikelyEnglish(item.title) ? <span lang="en">{item.title}</span> : item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{item.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-3 lu-mono text-[11px] text-ink-faint">
            <span>{relativeTime(item.dateISO)}</span>
            <span>{item.readTimeMin} min</span>
          </div>
        </div>
      </Link>
    </LuCard>
  );
}
