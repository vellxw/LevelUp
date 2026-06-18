"use client";

import Link from "next/link";
import { Clock, Bookmark, Bell, Settings2, Trash2 } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { platforms } from "@/data/platforms";
import { genres } from "@/data/genres";
import { followedGames } from "@/lib/selectors";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuSectionHeader } from "@/components/ui/LuSectionHeader";
import { LuCard } from "@/components/ui/LuCard";
import { LuChip } from "@/components/ui/LuChip";
import { LuButton } from "@/components/ui/LuButton";
import { LuMetricCard } from "@/components/ui/LuMetricCard";
import { LuEmptyState } from "@/components/ui/LuEmptyState";
import { relativeTime } from "@/lib/utils";

export default function PerfilPage() {
  const hydrated = useHydrated();
  const s = useRadar();
  const followed = followedGames({ followedGameIds: s.followedGameIds, platformIds: s.platformIds, genreIds: s.genreIds });
  const platLabels = s.platformIds.map((id) => platforms.find((p) => p.id === id)?.name).filter(Boolean) as string[];
  const genLabels = s.genreIds.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean) as string[];
  return (
    <>
      <PageHeader eyebrow="Tu cuenta" title="Perfil" description="Tu trazabilidad gamer: intereses, historial, guardados y alertas. Todo local.">
        <div className="flex flex-wrap gap-3">
          <LuButton href="/mi-radar" variant="secondary">Abrir Mi Radar</LuButton>
          <LuButton href="/onboarding" variant="ghost" leftIcon={<Settings2 className="h-4 w-4" />}>Reconfigurar intereses</LuButton>
        </div>
      </PageHeader>

      {!hydrated ? (
        <LuSection><div className="h-40 animate-pulse rounded-md bg-surface2" /></LuSection>
      ) : (
        <>
          <LuSection className="!pb-0">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <LuMetricCard label="Seguidos" value={s.followedGameIds.length} />
              <LuMetricCard label="Guardados" value={s.saved.length} />
              <LuMetricCard label="En historial" value={s.history.length} />
              <LuMetricCard label="Alertas activas" value={Object.values(s.alerts).filter(Boolean).length} />
            </div>
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Tus intereses" title="Intereses" actionLabel="Editar en Mi Radar" actionHref="/mi-radar" />
            <div className="space-y-5">
              <div>
                <p className="lu-eyebrow mb-2">Plataformas</p>
                <div className="flex flex-wrap gap-2">{platLabels.length ? platLabels.map((l) => <LuChip key={l} as="span" active>{l}</LuChip>) : <span className="text-sm text-ink-faint">Sin plataformas seleccionadas.</span>}</div>
              </div>
              <div>
                <p className="lu-eyebrow mb-2">Temas y géneros</p>
                <div className="flex flex-wrap gap-2">{genLabels.length ? genLabels.map((l) => <LuChip key={l} as="span" active>{l}</LuChip>) : <span className="text-sm text-ink-faint">Sin géneros seleccionados.</span>}</div>
              </div>
            </div>
          </LuSection>

          <LuSection className="bg-surface1">
            <LuSectionHeader eyebrow="Actividad" title="Historial reciente" />
            {s.history.length ? (
              <ul className="space-y-2">
                {s.history.map((h) => (
                  <li key={`${h.type}-${h.id}-${h.at}`}>
                    <Link href={h.href} className="flex items-center justify-between gap-3 rounded-sm border border-line bg-surface2 px-4 py-3 hover:border-ink-faint">
                      <span className="flex min-w-0 items-center gap-3"><Clock className="h-4 w-4 shrink-0 text-ink-faint" /><span className="truncate text-ink">{h.title}</span></span>
                      <span className="shrink-0 lu-mono text-[11px] text-ink-faint">{relativeTime(new Date(h.at).toISOString())}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <div className="rounded-md border border-dashed border-line bg-surface2/50 p-5"><p className="text-ink-muted">Tu actividad aparecerá acá. Empezá explorando el <Link href="/juegos" className="text-brand underline-offset-2 hover:underline">catálogo de juegos</Link>.</p></div>}
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Tu biblioteca" title="Guardados" />
            {s.saved.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {s.saved.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <LuCard surface={2} className="flex items-center justify-between gap-3 p-4">
                      <Link href={item.href} className="flex min-w-0 items-center gap-3"><Bookmark className="h-4 w-4 shrink-0 text-brand" /><span className="truncate text-ink hover:text-brand">{item.title}</span></Link>
                      <button type="button" onClick={() => s.toggleSave({ id: item.id, type: item.type, title: item.title, href: item.href })} aria-label="Quitar" className="text-ink-faint hover:text-brand"><Trash2 className="h-4 w-4" /></button>
                    </LuCard>
                  </li>
                ))}
              </ul>
            ) : <p className="text-ink-muted">No guardaste contenidos todavía.</p>}
          </LuSection>

          <LuSection className="bg-surface1">
            <LuSectionHeader eyebrow="Avisos" title="Alertas" actionLabel="Ver notificaciones" actionHref="/notificaciones" />
            {followed.length ? (
              <ul className="space-y-2">
                {followed.map((g) => (
                  <li key={g.id} className="flex items-center justify-between gap-3 rounded-sm border border-line bg-surface2 px-4 py-3">
                    <span className="flex items-center gap-3"><Bell className="h-4 w-4 text-ink-faint" /><span className="text-ink">{g.title}</span></span>
                    <button type="button" onClick={() => s.toggleAlert(g.id)} className={s.alerts[g.id] ? "lu-mono text-[12px] text-positive" : "lu-mono text-[12px] text-ink-faint hover:text-ink"}>{s.alerts[g.id] ? "Activadas" : "Desactivadas"}</button>
                  </li>
                ))}
              </ul>
            ) : <LuEmptyState variant="compact" description="Activá alertas para enterarte de actualizaciones y ofertas de los juegos que seguís." />}
          </LuSection>

          <LuSection>
            <LuSectionHeader eyebrow="Cuenta" title="Configuración" />
            <LuCard surface={2} className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div><p className="font-display text-lg font-semibold text-ink">Reiniciar Mi Radar</p><p className="text-sm text-ink-muted">Borra intereses, seguidos, guardados, historial y alertas de este dispositivo.</p></div>
              <LuButton variant="danger" onClick={() => s.resetRadar()} leftIcon={<Trash2 className="h-4 w-4" />}>Reiniciar</LuButton>
            </LuCard>
          </LuSection>
        </>
      )}
    </>
  );
}
