"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "@/components/ui/icons";
import { searchAll } from "@/lib/selectors";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuGameCard } from "@/components/cards/LuGameCard";
import { LuNewsCard } from "@/components/cards/LuNewsCard";
import { LuReviewCard } from "@/components/cards/LuReviewCard";
import { LuVideoCard } from "@/components/cards/LuVideoCard";

function BuscarInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  useEffect(() => { setQ(params.get("q") ?? ""); }, [params]);
  const res = searchAll(q);
  const submit = (e: React.FormEvent) => { e.preventDefault(); router.push(`/buscar?q=${encodeURIComponent(q)}`); };
  return (
    <LuSection>
      <form onSubmit={submit} className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
        <input autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar juegos, noticias, reviews, videos..." aria-label="Buscar"
          className="h-12 w-full rounded-sm border border-line bg-surface2 pl-11 pr-4 text-ink placeholder:text-ink-faint focus-visible:border-brand" />
      </form>
      {q.trim() === "" ? (
        <div className="mt-10 max-w-xl">
          <p className="font-display text-lg text-ink">Buscá juegos, noticias, reviews y videos.</p>
          <p className="mt-2 text-sm text-ink-muted">Probá con <em className="text-ink">Hades</em>, <em className="text-ink">GTA</em> o el nombre de un estudio.</p>
        </div>
      ) : res.total === 0 ? (
        <div className="mt-10 max-w-xl">
          <p className="font-display text-lg text-ink">Sin resultados para &quot;{q}&quot;.</p>
          <p className="mt-2 text-sm text-ink-muted">Probá con otro término o <Link href="/juegos" className="text-brand underline-offset-2 hover:underline">explorá el catálogo</Link>.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <p className="lu-mono text-[12px] text-ink-faint">{res.total} resultados para {q}</p>
          {res.games.length > 0 && <Group title="Juegos">{res.games.map((g) => <LuGameCard key={g.id} game={g} />)}</Group>}
          {res.news.length > 0 && <Group title="Noticias">{res.news.map((n) => <LuNewsCard key={n.id} item={n} />)}</Group>}
          {res.reviews.length > 0 && <Group title="Reviews">{res.reviews.map((r) => <LuReviewCard key={r.id} review={r} />)}</Group>}
          {res.videos.length > 0 && <Group title="Videos">{res.videos.map((v) => <LuVideoCard key={v.id} video={v} />)}</Group>}
        </div>
      )}
    </LuSection>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="lu-eyebrow mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default function BuscarPage() {
  return (
    <>
      <PageHeader eyebrow="Explorar" title="Buscar" description="Encontrá juegos, noticias, reviews y videos al instante." />
      <Suspense fallback={<LuSection><div className="h-12 animate-pulse rounded-md bg-surface2" /></LuSection>}>
        <BuscarInner />
      </Suspense>
    </>
  );
}
