import Link from "next/link";
import { CalendarClock, ArrowUpRight } from "@/components/ui/icons";
import { Hero } from "@/components/home/Hero";
import { MiRadarPreview } from "@/components/home/MiRadarPreview";
import { ForYouRail } from "@/components/home/ForYouRail";
import { OffersStrip } from "@/components/home/OffersStrip";
import { Reveal } from "@/components/ui/Reveal";
import { LuSection } from "@/components/layout/LuLayout";
import { LuSectionHeader } from "@/components/ui/LuSectionHeader";
import { LuCard } from "@/components/ui/LuCard";
import { LuCountdownTimer } from "@/components/ui/LuCountdownTimer";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuButton } from "@/components/ui/LuButton";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LuReviewCard } from "@/components/cards/LuReviewCard";
import { LuVideoCard } from "@/components/cards/LuVideoCard";
import { HorizontalRail, RailItem } from "@/components/ui/HorizontalRail";
import { LuCorners } from "@/components/ui/LuCorners";
import { news, featuredNews } from "@/data/news";
import { reviews } from "@/data/reviews";
import { videos } from "@/data/videos";
import { debates } from "@/data/community";
import { upcomingReleases } from "@/lib/selectors";
import { coverStyle, relativeTime, isLikelyEnglish } from "@/lib/utils";

export default function HomePage() {
  const featured = featuredNews();
  const heroSlides = [featured, ...news.filter((n) => n.id !== featured.id)].slice(0, 5);
  const secondary = news.filter((n) => n.id !== featured.id).slice(0, 8);
  const upcoming = upcomingReleases().slice(0, 6);
  const reviewsTop = reviews.slice(0, 3);
  const videosTop = videos.slice(0, 3);
  const debatesTop = debates.slice(0, 3);
  const briefing = news.filter((n) => n.id !== featured.id).slice(0, 7);

  return (
    <>
      <Hero slides={heroSlides} secondary={secondary} />
      <MiRadarPreview />
      <ForYouRail />

      <LuSection className="bg-surface1" density="default">
        <Reveal>
          <LuSectionHeader eyebrow="Calendario" title="Próximos lanzamientos" actionLabel="Ver catálogo" actionHref="/juegos" />
        </Reveal>
        <HorizontalRail>
          {upcoming.map((g) => (
            <RailItem key={g.id}>
              <LuCard hover className="group h-full overflow-hidden">
                <Link href={`/juegos/${g.slug}`} className="block">
                  <div className="relative h-40" style={coverStyle(g.seed, g.coverUrl)}>
                    <div className="absolute left-3 top-3"><LuBadge kind="status">{g.releaseLabel}</LuBadge></div>
                  </div>
                  <div className="p-4">
                    <p className="lu-eyebrow mb-1">{g.studio}</p>
                    <h3 className="font-display text-lg font-semibold uppercase text-ink group-hover:text-brand">{g.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-ink-faint">
                      <CalendarClock className="h-4 w-4" />
                      <LuCountdownTimer targetISO={g.releaseDate} />
                    </div>
                  </div>
                </Link>
              </LuCard>
            </RailItem>
          ))}
        </HorizontalRail>
      </LuSection>

      <LuSection density="tight">
        <Reveal>
          <LuSectionHeader eyebrow="Ahorrá hoy" title="Ofertas vigentes" description="Descuentos activos en tiendas. Vencen pronto, no te duermas." />
        </Reveal>
        <Reveal><OffersStrip /></Reveal>
      </LuSection>

      <LuSection className="bg-surface1" density="default">
        <Reveal>
          <LuSectionHeader eyebrow="Veredictos" title="Reviews destacadas" actionLabel="Todas las reviews" actionHref="/reviews" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <LuReviewCard review={reviewsTop[0]} featured />
          </Reveal>
          {reviewsTop.slice(1).map((r) => (
            <Reveal key={r.id}>
              <LuReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </LuSection>

      <LuSection density="loose">
        <Reveal>
          <LuSectionHeader eyebrow="Resumen del día" title="Lo que pasa en la industria" description="Lectura rápida: 7 puntos clave en menos de 2 minutos." />
        </Reveal>
        <LuCard surface={1} className="overflow-hidden">
          <LuCorners color="brand" />
          <ul className="divide-y divide-line">
            {briefing.map((n, i) => (
              <li key={n.id}>
                <Link
                  href={`/noticias/${n.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface2 sm:gap-5 sm:px-6 sm:py-3.5"
                >
                  <span className="lu-mono text-[11px] tabular-nums text-ink-faint">{(i + 1).toString().padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[15px] font-semibold leading-tight text-ink transition-colors group-hover:text-brand sm:text-base">
                      {isLikelyEnglish(n.title) ? <span lang="en">{n.title}</span> : n.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden lu-mono text-[11px] uppercase tracking-wider text-ink-faint sm:inline">{n.category}</span>
                    <span className="lu-mono text-[11px] tabular-nums text-ink-faint">{relativeTime(n.dateISO)}</span>
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-brand" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line bg-surface2/40 px-4 py-3 sm:px-6">
            <LuButton href="/noticias" variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              Ver todas las noticias
            </LuButton>
          </div>
        </LuCard>
      </LuSection>

      <LuSection className="bg-surface1" density="default">
        <Reveal>
          <LuSectionHeader eyebrow="Mirar" title="Videos" actionLabel="Hub de videos" actionHref="/videos" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videosTop.map((v) => (
            <Reveal key={v.id}><LuVideoCard video={v} /></Reveal>
          ))}
        </div>
      </LuSection>

      <LuSection density="default">
        <Reveal>
          <LuSectionHeader eyebrow="Comunidad" title="En debate" description="Lo que la comunidad está discutiendo ahora mismo." actionLabel="Ir a comunidad" actionHref="/comunidad" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          {debatesTop.slice(0, 2).map((d) => (
            <Reveal key={d.id}>
              <LuCard surface={2} hover className="h-full p-5">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface3 font-display text-sm font-bold text-ink">
                      {d.author.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold text-ink">{d.author}</p>
                      <p className="lu-mono text-[10px] uppercase tracking-wider text-ink-faint">{d.category} · {relativeTime(d.dateISO)}</p>
                    </div>
                  </div>
                  <Link href={`/comunidad?d=${d.slug}`} className="group mt-3 flex flex-1 flex-col">
                    <h3 className="font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-brand">
                      {isLikelyEnglish(d.title) ? <span lang="en">{d.title}</span> : d.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{d.excerpt}</p>
                    <div className="mt-auto flex items-center gap-4 pt-3 lu-mono text-[11px] text-ink-faint">
                      <span><span className="text-brand">{d.replies}</span> respuestas</span>
                      <span><span className="text-brand">{d.likes}</span> likes</span>
                    </div>
                  </Link>
                </div>
              </LuCard>
            </Reveal>
          ))}
        </div>
      </LuSection>
    </>
  );
}
