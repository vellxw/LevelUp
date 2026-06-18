import Link from "next/link";
import type { Game } from "@/lib/types";
import { LuCard } from "@/components/ui/LuCard";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuPlatformTag } from "@/components/ui/LuPlatformTag";
import { LuCorners } from "@/components/ui/LuCorners";
import { coverStyle, cn, isLikelyEnglish } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  anunciado: "Anunciado",
  proximo: "Próximo",
  disponible: "Disponible",
  actualizado: "Actualizado",
};

export function LuGameCard({ game, compact }: { game: Game; compact?: boolean }) {
  return (
    <LuCard hover className="group overflow-hidden">
      <Link href={`/juegos/${game.slug}`} className="block focus-visible:outline-none" data-cursor="view">
        <div className="overflow-hidden relative">
          <div
            className={cn(
              "transition-transform duration-700 ease-smooth group-hover:scale-105 group-hover:rotate-[0.5deg]",
              compact ? "relative h-32" : "relative h-44"
            )}
            style={coverStyle(game.seed, game.coverUrl)}
          >
            <LuCorners className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute left-3 top-3">
              <LuBadge kind={game.status === "actualizado" ? "live" : "status"}>
                {statusLabels[game.status]}
              </LuBadge>
            </div>
            {game.editorialScore !== null && (
              <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-md border-2 border-positive/50 bg-surface1/90 font-display text-base font-bold text-positive">
                {game.editorialScore.toFixed(1)}
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="lu-eyebrow mb-1 truncate">{game.studio}</p>
          <h3 className="font-display text-lg font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-brand">
            {game.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {game.platformIds.slice(0, 4).map((p) => (
              <LuPlatformTag key={p} id={p} />
            ))}
          </div>
        </div>
      </Link>
    </LuCard>
  );
}
