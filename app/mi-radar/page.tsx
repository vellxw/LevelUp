"use client";

import Link from "next/link";
import { Radar, Bell, BellOff, Bookmark, Trash2, Settings2 } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { platforms } from "@/data/platforms";
import { genres } from "@/data/genres";
import { gameById } from "@/data/games";
import { recommendedGames, followedGames, radarNews } from "@/lib/selectors";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuSectionHeader } from "@/components/ui/LuSectionHeader";
import { LuChip } from "@/components/ui/LuChip";
import { LuCard } from "@/components/ui/LuCard";
import { LuButton } from "@/components/ui/LuButton";
import { LuMetricCard } from "@/components/ui/LuMetricCard";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LuEmptyState } from "@/components/ui/LuEmptyState";
import { FollowButton } from "@/components/actions/FollowButton";
import { platformById } from "@/data/platforms";
import { InteractiveRadar } from "@/components/ui/InteractiveRadar";
import { cn } from "@/lib/utils";

export default function MiRadarPage() {
  const hydrated = useHydrated();
  const s = useRadar();
  const prefs = { followedGameIds: s.followedGameIds, platformIds: s.platformIds, genreIds: s.genreIds };
  const followed = followedGames(prefs);
  const recos = recommendedGames(prefs, 6);
  const feed = radarNews(prefs, 4);

  if (!hydrated) {
    return (
      <>
        <PageHeader eyebrow="Tu panel" title="Mi Radar" description="Cargando tu configuración personalizada..." />
        <LuSection><div className="h-40 animate-pulse rounded-md bg-surface2" /></LuSection>
      </>
    );
  }

  const isEmpty = !s.onboardingComplete && followed.length === 0 && s.platformIds.length === 0 && s.genreIds.length === 0;

  return (
    <>
      <PageHeader eyebrow="Tu panel" title="Mi Radar" description="Tus juegos, plataformas y temas en un solo lugar. Todo se guarda en tu dispositivo.">
        <div className="flex flex-wrap gap-3">
          <LuButton href="/onboarding" variant="secondary" leftIcon={<Settings2 className="h-4 w-4" />}>Reconfigurar</LuButton>
          <LuButton variant="ghost" onClick={() => s.resetRadar()} leftIcon={<Trash2 className="h-4 w-4" />}>Vaciar radar</LuButton>
        </div>
      </PageHeader>

      {isEmpty ? (
        <LuSection>
          <LuEmptyState
            icon={<Radar className="h-7 w-7" />}
            title="Tu radar está en blanco"
            description="60 segundos y la home se acomoda a lo que te importa."
            benefits={[
              "Recomendaciones según tus plataformas",
              "Lanzamientos y fechas de lo que seguís",
              "Noticias filtradas por tus temas",
            ]}
            action={<LuButton href="/onboarding" variant="primary" size="lg">Armar mi radar</LuButton>}
          />
        </LuSection>
      ) : (
        <>
          <LuSection className="!pb-0">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <LuMetricCard label="Juegos seguidos" value={followed.length} />
              <LuMetricCard label="Plataformas" value={s.platformIds.length} />
              <LuMetricCard label="Temas" value={s.genreIds.length} />
              <LuMetricCard label="Guardados" value={s.saved.length} />
            </div>
          </LuSection>

          <LuSection className="bg-surface1 border-y border-line my-6">
            <LuSectionHeader eyebrow="Visualizador" title="Radar interactivo" description="Consola holográfica en tiempo real. Los blips rojos representan tus seguidos, los grises son recomendaciones según tu perfil." />
            <InteractiveRadar />
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Seguimiento" title="Juegos seguidos" actionLabel="Explorar catálogo" actionHref="/juegos" />
            {followed.length ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {followed.map((g) => (
                  <div key={g.id} className="space-y-2">
                    <LuGameCard game={g} compact />
                    <FollowButton gameId={g.id} size="sm" className="w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-ink-muted">Aún no seguís juegos. Entrá al <Link href="/juegos" className="text-brand underline-offset-2 hover:underline">catálogo</Link> y seguí los que te interesen.</p>
            )}
          </LuSection>

          <LuSection className="bg-surface1">
            <LuSectionHeader eyebrow="Preferencias" title="Plataformas y temas" description="Tocá para activar o desactivar. Esto cambia tus recomendaciones al instante." />
            <div className="space-y-6">
              <div>
                <p className="lu-eyebrow mb-3">Plataformas</p>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <LuChip key={p.id} active={s.platformIds.includes(p.id)} onClick={() => s.togglePlatform(p.id)}>{p.name}</LuChip>
                  ))}
                </div>
              </div>
              <div>
                <p className="lu-eyebrow mb-3">Temas y géneros</p>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <LuChip key={g.id} active={s.genreIds.includes(g.id)} onClick={() => s.toggleGenre(g.id)}>{g.name}</LuChip>
                  ))}
                </div>
              </div>
            </div>
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Para vos" title="Recomendaciones" description="Basadas en tus plataformas y géneros declarados." />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {recos.map((g) => <LuGameCard key={g.id} game={g} compact />)}
            </div>
          </LuSection>

          <LuSection className="bg-surface1">
            <LuSectionHeader eyebrow="Avisos" title="Alertas" description="Activá alertas mock para tus juegos seguidos." />
            {followed.length ? (
              <div className="space-y-2">
                {followed.map((g) => {
                  const on = s.alerts[g.id];
                  return (
                    <LuCard key={g.id} surface={2} className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="font-display text-base font-semibold text-ink">{g.title}</p>
                        <p className="lu-mono text-[11px] text-ink-faint">{on ? "Recibirás avisos de novedades" : "Sin alertas activas"}</p>
                      </div>
                      <button type="button" onClick={() => s.toggleAlert(g.id)} aria-pressed={Boolean(on)} aria-label={on ? `Desactivar alertas de ${g.title}` : `Activar alertas de ${g.title}`}
                        className={cn("inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-[13px] transition-colors", on ? "border-positive/50 bg-positive/12 text-positive" : "border-line bg-surface3 text-ink-muted hover:text-ink")}>
                        {on ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        {on ? "Activadas" : "Activar"}
                      </button>
                    </LuCard>
                  );
                })}
              </div>
            ) : <p className="text-ink-muted">Seguí juegos para poder activar alertas.</p>}
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Tu biblioteca" title="Guardados" actionLabel="Ver perfil" actionHref="/perfil" />
            {s.saved.length ? (
              <div className="space-y-2">
                {s.saved.map((item) => (
                  <LuCard key={`${item.type}-${item.id}`} surface={2} className="flex items-center justify-between gap-3 p-4">
                    <Link href={item.href} className="flex min-w-0 items-center gap-3">
                      <Bookmark className="h-4 w-4 shrink-0 text-brand" />
                      <span className="truncate text-ink hover:text-brand">{item.title}</span>
                    </Link>
                    <button type="button" onClick={() => s.toggleSave({ id: item.id, type: item.type, title: item.title, href: item.href })} aria-label="Quitar de guardados" className="text-ink-faint hover:text-brand"><Trash2 className="h-4 w-4" /></button>
                  </LuCard>
                ))}
              </div>
            ) : <p className="text-ink-muted">Todavía no guardaste contenidos. Usá el botón Guardar en noticias, reviews y videos.</p>}
          </LuSection>

          <LuSection className="bg-surface1">
            <LuSectionHeader eyebrow="Novedades" title="Relacionado con tu radar" actionLabel="Ver noticias" actionHref="/noticias" />
            <div className="grid gap-4 sm:grid-cols-2">
              {feed.map((n) => <LuNewsCard key={n.id} item={n} layout="horizontal" />)}
            </div>
          </LuSection>
        </>
      )}
    </>
  );
}
