"use client";

import Link from "next/link";
import { Radar, ArrowRight } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { recommendedGames, followedGames } from "@/lib/selectors";
import { LuCard } from "@/components/ui/LuCard";
import { LuButton } from "@/components/ui/LuButton";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuCorners } from "@/components/ui/LuCorners";
import { InteractiveRadar } from "@/components/ui/InteractiveRadar";

export function MiRadarPreview() {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const platformIds = useRadar((s) => s.platformIds);
  const genreIds = useRadar((s) => s.genreIds);
  const onboarded = useRadar((s) => s.onboardingComplete);
  const prefs = { followedGameIds: followedIds, platformIds, genreIds };
  const followed = followedGames(prefs);
  const empty = !hydrated || (!onboarded && followed.length === 0);

  return (
    <section aria-labelledby="radar-preview" className="py-10 sm:py-14">
      <LuContainer>
        <LuCard surface={1} className="relative overflow-hidden p-6 sm:p-8">
          <div className="lu-grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
          <LuCorners color="brand" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-brand">
                  <Radar className="h-6 w-6" />
                </span>
                <div>
                  <p className="lu-eyebrow">Tu panel</p>
                  <h2 id="radar-preview" className="font-display text-2xl font-bold uppercase text-ink">Mi Radar</h2>
                </div>
              </div>
              <LuButton href="/mi-radar" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Abrir panel
              </LuButton>
            </div>

            {empty ? (
              <div className="mt-6 flex flex-col items-start gap-4 rounded-md border border-dashed border-line bg-surface2/50 p-6">
                <p className="max-w-xl text-ink-muted">
                  Tu radar aún no está calibrado. <span className="text-ink">60 segundos</span> y la home prioriza lo que te importa.
                </p>
                <LuButton href="/onboarding" variant="primary">Configurar Mi Radar</LuButton>
              </div>
            ) : (
              <div className="mt-6">
                <InteractiveRadar />
              </div>
            )}
          </div>
        </LuCard>
      </LuContainer>
    </section>
  );
}
