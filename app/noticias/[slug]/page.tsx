import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { news, newsBySlug } from "@/data/news";
import { gameById } from "@/data/games";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuButton } from "@/components/ui/LuButton";
import { LuCorners } from "@/components/ui/LuCorners";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LevelReader } from "@/components/news/LevelReader";
import { SaveButton } from "@/components/actions/SaveButton";
import { FollowButton } from "@/components/actions/FollowButton";
import { TrackView } from "@/components/util/TrackView";
import { coverStyle, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = newsBySlug(slug);
  if (!item) return { title: "Noticia no encontrada" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsBySlug(slug);
  if (!item) notFound();
  const game = item.gameId ? gameById(item.gameId) : null;
  const related = news.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);
  const href = `/noticias/${item.slug}`;
  return (
    <>
      <TrackView id={item.id} type="news" title={item.title} href={href} />
      <article>
        <div className="relative h-[280px] sm:h-[380px]" style={coverStyle(item.seed, item.coverUrl)}>
          <div className="lu-scanlines absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          <LuCorners color="brand" />
        </div>
        <LuContainer className="relative -mt-28">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <LuBadge kind="category">{item.category}</LuBadge>
              <span className="lu-mono text-[12px] text-ink-faint">{formatDate(item.dateISO)} - {item.readTimeMin} min</span>
            </div>
            <h1 className="text-[clamp(1.8rem,4.5vw,3.4rem)] font-bold uppercase leading-none text-ink lu-text-balance">{item.title}</h1>
            <p className="mt-3 text-lg text-ink-muted">{item.excerpt}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="lu-mono text-[12px] text-ink-faint">Por {item.author}</span>
              <SaveButton id={item.id} type="news" title={item.title} href={href} />
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <LevelReader data={item.levels} />
          </div>

          {game && (
            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-line bg-surface2 p-5">
                <div>
                  <p className="lu-eyebrow mb-1">Juego relacionado</p>
                  <Link href={`/juegos/${game.slug}`} className="font-display text-xl font-semibold text-ink hover:text-brand">{game.title}</Link>
                </div>
                <div className="flex items-center gap-2">
                  <FollowButton gameId={game.id} size="sm" />
                  <LuButton href={`/juegos/${game.slug}`} variant="outline" size="sm">Ver ficha</LuButton>
                </div>
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="mb-4 font-display text-2xl font-bold uppercase text-ink">Seguir leyendo</h2>
              <div className="grid gap-4 sm:grid-cols-3">{related.map((n) => <LuNewsCard key={n.id} item={n} />)}</div>
            </div>
          )}
          <div className="mt-10 pb-4"><LuButton href="/noticias" variant="ghost">&lt;- Todas las noticias</LuButton></div>
        </LuContainer>
      </article>
    </>
  );
}
