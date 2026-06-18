import type { Metadata } from "next";
import { reviews } from "@/data/reviews";
import { PageHeader } from "@/components/ui/PageHeader";
import { LuSection } from "@/components/layout/LuLayout";
import { LuReviewCard } from "@/components/cards/LuReviewCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Reviews", description: "Veredictos editoriales y opinión de la comunidad." };

export default function ReviewsPage() {
  const sorted = reviews.slice().sort((a, b) => b.editorialScore - a.editorialScore);
  return (
    <>
      <PageHeader eyebrow="Veredictos" title="Reviews" description="Puntaje editorial, opinión de usuarios, pros y contras para decidir mejor." />
      <LuSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((r, i) => <Reveal key={r.id} delay={i * 0.04}><LuReviewCard review={r} /></Reveal>)}
        </div>
      </LuSection>
    </>
  );
}
