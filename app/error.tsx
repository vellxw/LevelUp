"use client";

import { useEffect } from "react";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuButton } from "@/components/ui/LuButton";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <LuContainer className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="text-center">
        <p className="lu-eyebrow text-brand">// Error</p>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase text-ink">Algo salió mal</h1>
        <p className="mt-3 max-w-md text-ink-muted">Tuvimos un problema cargando esta vista. Probá de nuevo.</p>
        {error.digest && (
          <p className="mt-2 lu-mono text-[11px] text-ink-faint">// ID: {error.digest}</p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LuButton onClick={reset} variant="primary">Reintentar</LuButton>
          <LuButton href="/" variant="outline">Volver al inicio</LuButton>
        </div>
      </div>
    </LuContainer>
  );
}
