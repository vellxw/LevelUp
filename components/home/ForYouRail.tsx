"use client";

import { useRadar, useHydrated } from "@/lib/store";
import { recommendedGames } from "@/lib/selectors";
import { LuCard } from "@/components/ui/LuCard";
import { LuSection } from "@/components/layout/LuLayout";
import { LuSectionHeader } from "@/components/ui/LuSectionHeader";
import { LuCorners } from "@/components/ui/LuCorners";
import { LuButton } from "@/components/ui/LuButton";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { Sparkles, ArrowRight } from "@/components/ui/icons";

export function ForYouRail() {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const platformIds = useRadar((s) => s.platformIds);
  const genreIds = useRadar((s) => s.genreIds);
  const onboarded = useRadar((s) => s.onboardingComplete);

  const prefs = { followedGameIds: followedIds, platformIds, genreIds };
  const picks = recommendedGames(prefs, 6);

  const noPrefs = !hydrated || (!onboarded && followedIds.length === 0 && platformIds.length === 0 && genreIds.length === 0);

  if (noPrefs) {
    return (
      <LuSection density="tight">
        <LuCard surface={2} className="relative overflow-hidden p-6">
          <LuCorners color="brand" />
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-brand">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="lu-eyebrow">Para vos</p>
                <p className="font-display text-xl font-bold uppercase text-ink">Recomendaciones en pausa</p>
                <p className="mt-1 text-sm text-ink-muted">Configurá tus plataformas y géneros para ver sugerencias.</p>
              </div>
            </div>
            <LuButton href="/onboarding" variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Configurar
            </LuButton>
          </div>
        </LuCard>
      </LuSection>
    );
  }

  return (
    <LuSection density="tight">
      <LuSectionHeader
        eyebrow="Para tu radar"
        title="Lo que te va a gustar"
        description="Recomendaciones en base a las plataformas y géneros que seguís."
        actionLabel="Ver más"
        actionHref="/mi-radar"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((g) => (
          <LuGameCard key={g.id} game={g} />
        ))}
      </div>
    </LuSection>
  );
}
