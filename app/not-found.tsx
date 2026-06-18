import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuButton } from "@/components/ui/LuButton";

export default function NotFound() {
  return (
    <LuContainer className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="text-center">
        <p className="lu-eyebrow text-brand">// 404</p>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase text-ink">No encontrado</h1>
        <p className="mt-3 max-w-md text-ink-muted">La página que buscás no existe o se movió.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LuButton href="/" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Volver al inicio</LuButton>
          <LuButton href="/juegos" variant="outline">Explorar juegos</LuButton>
        </div>
        <p className="mt-8 lu-mono text-[11px] uppercase tracking-wider text-ink-faint">// La competencia informa. LevelUp acompaña.</p>
      </div>
    </LuContainer>
  );
}
