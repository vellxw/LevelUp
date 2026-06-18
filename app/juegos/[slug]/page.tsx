import { notFound } from "next/navigation";
import Link from "next/link";
import { games, gameBySlug } from "@/data/games";
import { platformById } from "@/data/platforms";
import { offerByGame } from "@/data/offers";
import { newsForGame, videosForGame, debatesForGame, similarGames, reviewForGame } from "@/lib/selectors";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuCorners } from "@/components/ui/LuCorners";
import { LuButton } from "@/components/ui/LuButton";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { FollowButton } from "@/components/actions/FollowButton";
import { SaveButton } from "@/components/actions/SaveButton";
import { GameTabs } from "@/components/game/GameTabs";
import { TrackView } from "@/components/util/TrackView";
import { coverStyle, priceFormat } from "@/lib/utils";
import type { Metadata } from "next";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) return { title: "Juego no encontrado" };
  return { title: game.title, description: game.summary };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) notFound();
  const news = newsForGame(game.id);
  const review = reviewForGame(game.id) ?? null;
  const videos = videosForGame(game.id);
  const debates = debatesForGame(game.id);
  const similar = similarGames(game);
  const offer = offerByGame(game.id);

  return (
    <>
      <TrackView id={game.id} type="game" title={game.title} href={`/juegos/${game.slug}`} />
      <section className="relative">
        <div className="relative h-[320px] sm:h-[420px]" style={coverStyle(game.seed, game.coverUrl)}>
          <div className="lu-scanlines absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
          <LuCorners color="brand" />
        </div>
        <LuContainer className="relative -mt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <LuBadge kind={game.status === "actualizado" ? "live" : "status"}>{game.releaseLabel}</LuBadge>
                {game.platformIds.map((p) => <LuBadge key={p} kind="platform">{platformById(p)?.short}</LuBadge>)}
              </div>
              <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-bold uppercase leading-none text-ink">{game.title}</h1>
              <p className="mt-2 lu-mono text-[13px] text-ink-muted">{game.studio} - {game.publisher}</p>
              <p className="mt-3 max-w-xl text-ink-muted">{game.summary}</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                {game.editorialScore !== null && (
                  <div className="flex flex-col items-center rounded-md border-2 border-positive/50 bg-surface1 px-4 py-2">
                    <span className="font-display text-2xl font-bold text-positive">{game.editorialScore.toFixed(1)}</span>
                    <span className="lu-mono text-[9px] uppercase tracking-wider text-ink-faint">Editorial</span>
                  </div>
                )}
                {game.communityScore !== null && (
                  <div className="flex flex-col items-center rounded-md border border-line bg-surface1 px-4 py-2">
                    <span className="font-display text-2xl font-bold text-ink">{game.communityScore.toFixed(1)}</span>
                    <span className="lu-mono text-[9px] uppercase tracking-wider text-ink-faint">Comunidad</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FollowButton gameId={game.id} />
                <SaveButton id={game.id} type="game" title={game.title} href={`/juegos/${game.slug}`} />
              </div>
            </div>
          </div>

          {offer && (
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-md border border-positive/30 bg-positive/8 p-4">
              <LuBadge kind="score">Oferta -{offer.discountPct}%</LuBadge>
              <span className="font-display text-xl font-bold text-ink">{priceFormat(offer.price)}</span>
              <span className="lu-mono text-[12px] text-ink-faint line-through">{priceFormat(offer.oldPrice)}</span>
              <span className="lu-mono text-[12px] text-ink-muted">en {offer.store}</span>
            </div>
          )}

          <div className="mt-8">
            <GameTabs game={game} news={news} review={review} videos={videos} debates={debates} />
          </div>

          {similar.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="mb-4 font-display text-2xl font-bold uppercase text-ink">Juegos similares</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {similar.map((g) => <LuGameCard key={g.id} game={g} compact />)}
              </div>
            </div>
          )}
          <div className="mt-10 pb-4"><LuButton href="/juegos" variant="ghost">&lt;- Volver al catálogo</LuButton></div>
        </LuContainer>
      </section>
    </>
  );
}
