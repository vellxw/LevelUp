import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { reviews, reviewBySlug } from "@/data/reviews";
import { gameById } from "@/data/games";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuCard } from "@/components/ui/LuCard";
import { LuButton } from "@/components/ui/LuButton";
import { LuDivider } from "@/components/ui/LuDivider";
import { LuCorners } from "@/components/ui/LuCorners";
import { SaveButton } from "@/components/actions/SaveButton";
import { FollowButton } from "@/components/actions/FollowButton";
import { TrackView } from "@/components/util/TrackView";
import { Check, X } from "@/components/ui/icons";
import { coverStyle, formatDate, scoreTone, cn } from "@/lib/utils";

const tones = { high: "text-positive border-positive/50", mid: "text-warning border-warning/50", low: "text-brand border-brand/50" };

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = reviewBySlug(slug);
  if (!r) return { title: "Review no encontrada" };
  return { title: r.title, description: r.verdict };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = reviewBySlug(slug);
  if (!review) notFound();
  const game = gameById(review.gameId);
  const href = `/reviews/${review.slug}`;
  return (
    <>
      <TrackView id={review.id} type="review" title={review.title} href={href} />
      <article>
        <div className="relative h-[260px] sm:h-[340px]" style={coverStyle(game?.seed ?? review.slug)}>
          <div className="lu-scanlines absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          <LuCorners color="brand" />
        </div>
        <LuContainer className="relative -mt-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="max-w-2xl">
              <p className="lu-eyebrow mb-2">Review - {review.platformTested}</p>
              <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-none text-ink">{review.title}</h1>
              <p className="mt-3 lu-mono text-[12px] text-ink-faint">Por {review.author} - {formatDate(review.dateISO)}</p>
              <div className="mt-4"><SaveButton id={review.id} type="review" title={review.title} href={href} /></div>
              <div className="mt-6 space-y-3">{review.body.map((p, i) => <p key={i} className="text-ink-muted">{p}</p>)}</div>
              <LuDivider className="my-6" label="Veredicto" />
              <p className="text-lg font-medium text-ink">{review.verdict}</p>
            </div>
            <div className="space-y-4">
              <LuCard surface={1} className="flex items-center gap-4 p-5">
                <div className={cn("flex h-20 w-20 items-center justify-center rounded-md border-2 bg-surface1 font-display text-3xl font-bold", tones[scoreTone(review.editorialScore)])}>{review.editorialScore.toFixed(1)}</div>
                <div>
                  <p className="lu-eyebrow">Editorial</p>
                  <p className="mt-1 text-sm text-ink-muted">Comunidad <span className="font-display text-lg text-ink">{review.userScore.toFixed(1)}</span></p>
                </div>
              </LuCard>
              <LuCard surface={2} className="p-5">
                <p className="lu-eyebrow mb-3">Pros</p>
                <ul className="space-y-2">{review.pros.map((p) => <li key={p} className="flex items-start gap-2 text-sm text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />{p}</li>)}</ul>
                <LuDivider className="my-4" />
                <p className="lu-eyebrow mb-3">Contras</p>
                <ul className="space-y-2">{review.cons.map((c) => <li key={c} className="flex items-start gap-2 text-sm text-ink-muted"><X className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{c}</li>)}</ul>
              </LuCard>
              {game && (
                <LuCard surface={2} className="p-5">
                  <p className="lu-eyebrow mb-2">Juego</p>
                  <Link href={`/juegos/${game.slug}`} className="font-display text-lg font-semibold text-ink hover:text-brand">{game.title}</Link>
                  <div className="mt-3 flex items-center gap-2">
                    <FollowButton gameId={game.id} size="sm" />
                    <LuButton href={`/juegos/${game.slug}`} variant="outline" size="sm">Ficha</LuButton>
                  </div>
                </LuCard>
              )}
            </div>
          </div>
          <div className="mt-10 pb-4"><LuButton href="/reviews" variant="ghost">&lt;- Todas las reviews</LuButton></div>
        </LuContainer>
      </article>
    </>
  );
}
