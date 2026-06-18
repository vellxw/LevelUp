"use client";

import { useMemo, useState } from "react";
import { Search } from "@/components/ui/icons";
import { games } from "@/data/games";
import { platforms } from "@/data/platforms";
import { genres } from "@/data/genres";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { LuChip } from "@/components/ui/LuChip";
import { LuButton } from "@/components/ui/LuButton";

const statuses = [
  { id: "disponible", label: "Disponible" },
  { id: "actualizado", label: "Actualizado" },
  { id: "proximo", label: "Próximo" },
  { id: "anunciado", label: "Anunciado" },
];

export default function JuegosPage() {
  const [q, setQ] = useState("");
  const [plat, setPlat] = useState<string[]>([]);
  const [gen, setGen] = useState<string[]>([]);
  const [stat, setStat] = useState<string[]>([]);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return games.filter((g) => {
      if (query && !(g.title + " " + g.studio + " " + g.tags.join(" ")).toLowerCase().includes(query)) return false;
      if (plat.length && !g.platformIds.some((p) => plat.includes(p))) return false;
      if (gen.length && !g.genreIds.some((x) => gen.includes(x))) return false;
      if (stat.length && !stat.includes(g.status)) return false;
      return true;
    });
  }, [q, plat, gen, stat]);

  const clear = () => { setQ(""); setPlat([]); setGen([]); setStat([]); };
  const hasFilters = q || plat.length || gen.length || stat.length;

  return (
    <>
      <PageHeader eyebrow="Catálogo" title="Juegos" description="Explorá fichas vivas: noticias, reviews, videos y comunidad conectados en cada juego." />
      <LuSection>
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar juego, estudio o tag..."
              aria-label="Buscar juegos"
              className="h-11 w-full rounded-sm border border-line bg-surface2 pl-10 pr-4 text-ink placeholder:text-ink-faint focus-visible:border-brand"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="lu-eyebrow mb-2">Plataforma</p>
              <div className="flex flex-wrap gap-2">{platforms.map((p) => <LuChip key={p.id} active={plat.includes(p.id)} onClick={() => toggle(plat, setPlat, p.id)}>{p.short}</LuChip>)}</div>
            </div>
            <div>
              <p className="lu-eyebrow mb-2">Género</p>
              <div className="flex flex-wrap gap-2">{genres.map((g) => <LuChip key={g.id} active={gen.includes(g.id)} onClick={() => toggle(gen, setGen, g.id)}>{g.name}</LuChip>)}</div>
            </div>
            <div>
              <p className="lu-eyebrow mb-2">Estado</p>
              <div className="flex flex-wrap gap-2">{statuses.map((st) => <LuChip key={st.id} active={stat.includes(st.id)} onClick={() => toggle(stat, setStat, st.id)}>{st.label}</LuChip>)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="lu-mono text-[12px] text-ink-faint">{filtered.length} de {games.length} juegos</p>
            {hasFilters && <LuButton variant="ghost" size="sm" onClick={clear}>Limpiar filtros</LuButton>}
          </div>
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((g) => <LuGameCard key={g.id} game={g} />)}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-line bg-surface2/50 p-10 text-center">
            <p className="text-ink-muted">No hay juegos que coincidan con tu búsqueda.</p>
            <LuButton variant="secondary" onClick={clear} className="mt-4">Reiniciar filtros</LuButton>
          </div>
        )}
      </LuSection>
    </>
  );
}
