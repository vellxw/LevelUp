"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuSectionHeader } from "@/components/ui/LuSectionHeader";
import { LuButton } from "@/components/ui/LuButton";
import { LuBadge } from "@/components/ui/LuBadge";
import { LuChip } from "@/components/ui/LuChip";
import { LuCard } from "@/components/ui/LuCard";
import { LuDivider } from "@/components/ui/LuDivider";
import { LuCorners } from "@/components/ui/LuCorners";
import { LuScoreBadge } from "@/components/ui/LuScoreBadge";
import { LuMetricCard } from "@/components/ui/LuMetricCard";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { FollowButton } from "@/components/actions/FollowButton";
import { games } from "@/data/games";
import { news } from "@/data/news";

const colors = [
  { name: "bg", hex: "#060607", cls: "bg-bg" },
  { name: "surface1", hex: "#0D0F12", cls: "bg-surface1" },
  { name: "surface2", hex: "#111318", cls: "bg-surface2" },
  { name: "surface3", hex: "#16191D", cls: "bg-surface3" },
  { name: "border", hex: "#2A2D32", cls: "bg-line" },
  { name: "text-1", hex: "#F4F4F4", cls: "bg-ink" },
  { name: "text-2", hex: "#A7A7A7", cls: "bg-ink-muted" },
  { name: "text-3", hex: "#6F7378", cls: "bg-ink-faint" },
  { name: "red", hex: "#E50914", cls: "bg-brand" },
  { name: "red-hover", hex: "#8F1118", cls: "bg-brand-hover" },
  { name: "green", hex: "#59D65C", cls: "bg-positive" },
  { name: "amber", hex: "#E7A83A", cls: "bg-warning" },
];
const radii: { name: string; cls: string }[] = [
  { name: "xs", cls: "rounded-xs" },
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
];

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <LuSection id={id} className="border-t border-line first:border-t-0">
      <LuSectionHeader eyebrow="Foundations" title={title} />
      {children}
    </LuSection>
  );
}

export default function DesignSystemPage() {
  const [chip, setChip] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Documentación" title="Sistema de diseño" description="Tokens, átomos, moléculas y organismos de LevelUp. Una sola fuente de verdad, sin estilos hardcodeados." />

      <Block id="color" title="Color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((c) => (
            <LuCard key={c.name} surface={3} className="overflow-hidden">
              <div className={`h-20 ${c.cls}`} />
              <div className="p-3"><p className="font-display text-sm font-semibold text-ink">{c.name}</p><p className="lu-mono text-[11px] text-ink-faint">{c.hex}</p></div>
            </LuCard>
          ))}
        </div>
      </Block>

      <Block id="tipografia" title="Tipografía">
        <div className="space-y-4">
          <div><p className="lu-eyebrow mb-1">Rajdhani - Display</p><p className="font-display text-5xl font-bold uppercase text-ink">Nivel superior</p></div>
          <div><p className="lu-eyebrow mb-1">Inter - Cuerpo</p><p className="max-w-2xl text-ink-muted">Texto de lectura para noticias, descripciones y cuerpo editorial. Equilibrio entre legibilidad y densidad informativa.</p></div>
          <div><p className="lu-eyebrow mb-1">IBM Plex Mono - Datos</p><p className="lu-mono text-ink">// 01 / 05 - 2026-06-14 - PLATFORM: PC PS5 XSX</p></div>
        </div>
      </Block>

      <Block id="espaciado" title="Espaciado, radios y sombras">
        <div className="space-y-6">
          <div>
            <p className="lu-eyebrow mb-3">Espaciado base 8</p>
            <div className="flex items-end gap-2">{[1,2,3,4,6,8].map((n) => <div key={n} className="bg-brand/40" style={{ width: n*8, height: n*8 }} title={`${n*8}px`} />)}</div>
          </div>
          <div>
            <p className="lu-eyebrow mb-3">Radios</p>
            <div className="flex flex-wrap gap-3">{radii.map((r) => <div key={r.name} className={`flex h-16 w-16 items-center justify-center border border-line bg-surface3 ${r.cls} lu-mono text-[11px] text-ink-muted`}>{r.name}</div>)}</div>
          </div>
          <div>
            <p className="lu-eyebrow mb-3">Sombras</p>
            <div className="flex flex-wrap gap-4">
              <div className="h-16 w-32 rounded-md bg-surface2 shadow-soft" /><div className="h-16 w-32 rounded-md bg-surface2 shadow-raised" /><div className="h-16 w-32 rounded-md bg-surface2 shadow-glow" />
            </div>
          </div>
        </div>
      </Block>

      <Block id="botones" title="Botones">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <LuButton variant="primary">Primary</LuButton>
            <LuButton variant="secondary">Secondary</LuButton>
            <LuButton variant="ghost">Ghost</LuButton>
            <LuButton variant="outline">Outline</LuButton>
            <LuButton variant="danger">Danger</LuButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LuButton size="sm">Small</LuButton>
            <LuButton size="md">Medium</LuButton>
            <LuButton size="lg">Large</LuButton>
            <LuButton loading>Loading</LuButton>
            <LuButton disabled>Disabled</LuButton>
          </div>
        </div>
      </Block>

      <Block id="badges" title="Badges">
        <div className="flex flex-wrap gap-3">
          <LuBadge kind="live" dot>En vivo</LuBadge>
          <LuBadge kind="category">Lanzamientos</LuBadge>
          <LuBadge kind="score">9.2</LuBadge>
          <LuBadge kind="platform">PS5</LuBadge>
          <LuBadge kind="status">Próximo</LuBadge>
          <LuBadge kind="new">Nuevo</LuBadge>
          <LuBadge kind="count">12</LuBadge>
        </div>
      </Block>

      <Block id="chips" title="Chips">
        <div className="flex flex-wrap gap-2">
          <LuChip active={chip} onClick={() => setChip((v) => !v)}>Interactivo</LuChip>
          <LuChip as="span">Inactivo</LuChip>
          <LuChip as="span" active>Activo</LuChip>
          <LuChip as="span" count={8}>Con conteo</LuChip>
        </div>
      </Block>

      <Block id="cards" title="Cards y bordes HUD">
        <div className="grid gap-4 sm:grid-cols-3">
          <LuCard surface={1} className="p-5"><p className="font-display text-ink">Surface 1</p></LuCard>
          <LuCard surface={2} hover className="p-5"><p className="font-display text-ink">Surface 2 - hover</p></LuCard>
          <LuCard surface={3} className="relative p-5"><LuCorners color="brand" /><p className="font-display text-ink">Con LuCorners</p></LuCard>
        </div>
      </Block>

      <Block id="inputs" title="Inputs, score y dividers">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <input className="h-11 w-full rounded-sm border border-line bg-surface2 px-3 text-ink placeholder:text-ink-faint focus-visible:border-brand" placeholder="Input de texto" aria-label="Demo input" />
            <select className="h-11 w-full rounded-sm border border-line bg-surface2 px-3 text-ink" aria-label="Demo select"><option>Opción A</option><option>Opción B</option></select>
            <LuDivider label="Divider con label" />
          </div>
          <div className="flex items-center gap-6"><LuScoreBadge score={9.2} label="Alto" size="lg" /><LuScoreBadge score={6.8} label="Medio" /><LuScoreBadge score={4.5} label="Bajo" size="sm" /></div>
        </div>
      </Block>

      <Block id="moleculas" title="Moléculas">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LuGameCard game={games[0]} />
          <LuNewsCard item={news[0]} />
          <LuMetricCard label="Métrica" value="12.4K" hint="Ejemplo" />
          <LuCard surface={2} className="flex items-center justify-center p-5"><FollowButton gameId={games[1].id} /></LuCard>
        </div>
      </Block>

      <Block id="grilla" title="Grilla responsive de 12 columnas">
        <div className="grid grid-cols-12 gap-2">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="col-span-1 rounded-xs bg-surface3 py-3 text-center lu-mono text-[10px] text-ink-faint">{i + 1}</div>)}</div>
      </Block>
    </>
  );
}
