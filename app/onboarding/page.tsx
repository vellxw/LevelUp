"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Radar, Sparkles } from "@/components/ui/icons";
import { platforms } from "@/data/platforms";
import { genres } from "@/data/genres";
import { games } from "@/data/games";
import { useRadar } from "@/lib/store";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuButton } from "@/components/ui/LuButton";
import { LuChip } from "@/components/ui/LuChip";
import { LuCard } from "@/components/ui/LuCard";
import { coverStyle, cn } from "@/lib/utils";

const steps = ["Plataformas", "Géneros", "Juegos", "Confirmar"];

export default function OnboardingPage() {
  const router = useRouter();
  const complete = useRadar((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [sel, setSel] = useState({ platformIds: [] as string[], genreIds: [] as string[], gameIds: [] as string[] });

  const toggle = (key: "platformIds" | "genreIds" | "gameIds", id: string) =>
    setSel((s) => ({ ...s, [key]: s[key].includes(id) ? s[key].filter((x) => x !== id) : [...s[key], id] }));

  const canNext =
    (step === 0 && sel.platformIds.length > 0) ||
    (step === 1 && sel.genreIds.length > 0) ||
    step === 2 ||
    step === 3;

  const finish = () => {
    complete({ platformIds: sel.platformIds, genreIds: sel.genreIds, followedGameIds: sel.gameIds });
    setCelebrating(true);
  };

  useEffect(() => {
    if (!celebrating) return;
    const t = setTimeout(() => router.push("/mi-radar"), 1400);
    return () => clearTimeout(t);
  }, [celebrating, router]);

  const skip = () => router.push("/");

  if (celebrating) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand bg-brand/10 shadow-glow">
            <Check className="h-10 w-10 text-brand" />
          </div>
          <p className="lu-eyebrow mt-6 text-brand">// Radar calibrado</p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase text-ink">Listo</h1>
          <p className="mt-2 text-ink-muted">Tu home ya está priorizando lo que te importa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="lu-grid-texture absolute inset-x-0 top-16 h-64 opacity-30" aria-hidden="true" />
      <LuContainer className="relative py-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-brand">
              <Radar className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="lu-eyebrow">Configuración inicial · 60 segundos</p>
              <h1 className="font-display text-3xl font-bold uppercase text-ink">Armá tu radar</h1>
            </div>
            <button
              type="button"
              onClick={skip}
              className="lu-mono text-[12px] uppercase tracking-wider text-ink-faint underline-offset-4 transition-colors hover:text-ink"
            >
              Lo haré después
            </button>
          </div>

          <ol className="mb-8 flex items-center gap-2" aria-label="Progreso">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[12px]",
                    i < step ? "border-positive bg-positive/15 text-positive" : i === step ? "border-brand bg-brand text-white" : "border-line bg-surface2 text-ink-faint",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("hidden text-[12px] uppercase tracking-wide sm:inline", i === step ? "text-ink" : "text-ink-faint")}>{label}</span>
                {i < steps.length - 1 && <span className={cn("h-px flex-1", i < step ? "bg-positive/50" : "bg-line")} />}
              </li>
            ))}
          </ol>

          <LuCard surface={1} className="p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold uppercase text-ink">¿En qué jugás?</h2>
                <p className="mt-1 text-sm text-ink-muted">Elegí tus plataformas para priorizar lo que te interesa.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <LuChip key={p.id} active={sel.platformIds.includes(p.id)} onClick={() => toggle("platformIds", p.id)}>{p.name}</LuChip>
                  ))}
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold uppercase text-ink">¿Qué te gusta jugar?</h2>
                <p className="mt-1 text-sm text-ink-muted">Tus géneros favoritos alimentan las recomendaciones.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <LuChip key={g.id} active={sel.genreIds.includes(g.id)} onClick={() => toggle("genreIds", g.id)}>{g.name}</LuChip>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-semibold uppercase text-ink">Seguí tus juegos</h2>
                <p className="mt-1 text-sm text-ink-muted">Opcional. Con estos juegos vas a recibir alertas de actualizaciones, ofertas y noticias.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {games.map((g) => {
                    const on = sel.gameIds.includes(g.id);
                    return (
                      <button key={g.id} type="button" onClick={() => toggle("gameIds", g.id)} aria-pressed={on}
                        className={cn("group relative overflow-hidden rounded-md border text-left transition-all", on ? "border-brand shadow-glow" : "border-line hover:border-ink-muted")}>
                        <div className="relative h-24" style={coverStyle(g.seed, g.coverUrl)}>
                          {on && <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"><Check className="h-4 w-4" /></span>}
                        </div>
                        <p className="truncate px-3 py-2 font-display text-sm font-semibold text-ink">{g.title}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold uppercase text-ink">Confirmá tus intereses</h2>
                <p className="mt-1 text-sm text-ink-muted">Podés ajustar todo después desde Mi Radar.</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_200px]">
                  <dl className="space-y-4">
                    <div>
                      <dt className="lu-eyebrow mb-2">Plataformas ({sel.platformIds.length})</dt>
                      <dd className="flex flex-wrap gap-2">{sel.platformIds.length ? sel.platformIds.map((id) => <LuChip key={id} as="span" active>{platforms.find((p) => p.id === id)?.name}</LuChip>) : <span className="text-sm text-ink-faint">Ninguna por ahora.</span>}</dd>
                    </div>
                    <div>
                      <dt className="lu-eyebrow mb-2">Géneros ({sel.genreIds.length})</dt>
                      <dd className="flex flex-wrap gap-2">{sel.genreIds.length ? sel.genreIds.map((id) => <LuChip key={id} as="span" active>{genres.find((g) => g.id === id)?.name}</LuChip>) : <span className="text-sm text-ink-faint">Ninguno por ahora.</span>}</dd>
                    </div>
                    <div>
                      <dt className="lu-eyebrow mb-2">Juegos seguidos ({sel.gameIds.length})</dt>
                      <dd className="flex flex-wrap gap-2">{sel.gameIds.length ? sel.gameIds.map((id) => <LuChip key={id} as="span" active>{games.find((g) => g.id === id)?.title}</LuChip>) : <span className="text-sm text-ink-faint">Ninguno por ahora.</span>}</dd>
                    </div>
                  </dl>
                  <div className="hidden sm:block">
                    <div className="rounded-md border border-line bg-surface2 p-4">
                      <p className="lu-eyebrow mb-3 text-brand">// Vista previa</p>
                      <div className="relative mx-auto h-32 w-32 rounded-full border border-line bg-bg">
                        <div className="absolute inset-2 rounded-full border border-dashed border-line" />
                        {sel.platformIds.slice(0, 4).map((id, i) => (
                          <span key={id} className="absolute h-2 w-2 rounded-full bg-brand" style={{ top: `${30 + i * 15}%`, left: `${20 + i * 18}%` }} />
                        ))}
                        {sel.gameIds.slice(0, 4).map((id, i) => (
                          <span key={id} className="absolute h-2 w-2 rounded-full bg-positive" style={{ top: `${50 + i * 10}%`, right: `${15 + i * 12}%` }} />
                        ))}
                        <div className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-ink" />
                      </div>
                      <p className="mt-3 text-center text-[11px] text-ink-faint">Tu radar verá blips para cada plataforma (rojo) y juego (verde) que sigas.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <LuButton variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} leftIcon={<ArrowLeft className="h-4 w-4" />} disabled={step === 0}>Atrás</LuButton>
              {step < steps.length - 1 ? (
                <LuButton variant="primary" onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} rightIcon={<ArrowRight className="h-4 w-4" />}>Continuar</LuButton>
              ) : (
                <LuButton variant="primary" onClick={finish} leftIcon={<Sparkles className="h-4 w-4" />}>Calibrar mi radar</LuButton>
              )}
            </div>
          </LuCard>
        </div>
      </LuContainer>
    </div>
  );
}
