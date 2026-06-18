"use client";

import { useMemo, useState } from "react";
import { news } from "@/data/news";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LuChip } from "@/components/ui/LuChip";

export default function NoticiasPage() {
  const categories = Array.from(new Set(news.map((n) => n.category)));
  const [cat, setCat] = useState<string | null>(null);
  const list = useMemo(() => (cat ? news.filter((n) => n.category === cat) : news), [cat]);
  return (
    <>
      <PageHeader eyebrow="Actualidad" title="Noticias" description="Lectura por niveles: enterate rápido o profundizá cuando quieras." />
      <LuSection>
        <div className="mb-6 flex flex-wrap gap-2">
          <LuChip active={cat === null} onClick={() => setCat(null)}>Todas</LuChip>
          {categories.map((c) => <LuChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</LuChip>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((n) => <LuNewsCard key={n.id} item={n} />)}
        </div>
      </LuSection>
    </>
  );
}
