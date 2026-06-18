import Link from "next/link";
import { Tag } from "@/components/ui/icons";
import { offers } from "@/data/offers";
import { gameById } from "@/data/games";
import { LuCard } from "@/components/ui/LuCard";
import { coverStyle, priceFormat } from "@/lib/utils";

export function OffersStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((o) => {
        const g = gameById(o.gameId);
        if (!g) return null;
        return (
          <Link key={o.id} href={`/juegos/${g.slug}`} className="group block">
            <LuCard surface={2} hover className="overflow-hidden">
              <div className="flex h-full">
                <div
                  className="relative h-32 w-32 shrink-0 transition-transform duration-700 ease-smooth group-hover:scale-105 sm:h-36 sm:w-36"
                  style={coverStyle(g.seed, g.coverUrl)}
                />
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold leading-tight text-ink">
                      {g.title}
                    </p>
                    <p className="lu-mono mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                      {o.store}
                    </p>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display text-lg font-bold leading-none text-ink">{priceFormat(o.price)}</p>
                      <p className="lu-mono mt-1 text-[10px] text-ink-faint line-through">{priceFormat(o.oldPrice)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-xs border border-brand/50 bg-brand px-2 py-1 lu-mono text-[11px] font-bold uppercase tracking-wider text-white">
                      <Tag className="h-3 w-3" /> -{o.discountPct}%
                    </span>
                  </div>
                </div>
              </div>
            </LuCard>
          </Link>
        );
      })}
    </div>
  );
}
