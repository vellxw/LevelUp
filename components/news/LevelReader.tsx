"use client";

import { useState } from "react";
import { Zap, Compass, Scale, FileText } from "@/components/ui/icons";
import type { NewsLevels } from "@/lib/types";
import { cn } from "@/lib/utils";

const levels = [
  { id: "quePaso", label: "Qué pasó", Icon: Zap },
  { id: "porQueImporta", label: "Por qué importa", Icon: Compass },
  { id: "decidir", label: "Decidir", Icon: Scale },
  { id: "notaCompleta", label: "Nota completa", Icon: FileText },
] as const;

export function LevelReader({ data }: { data: NewsLevels }) {
  const [active, setActive] = useState<(typeof levels)[number]["id"]>("quePaso");
  return (
    <div>
      <div role="tablist" aria-label="Niveles de lectura" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {levels.map(({ id, label, Icon }) => (
          <button key={id} role="tab" aria-selected={active === id} onClick={() => setActive(id)}
            className={cn("flex items-center gap-2 rounded-sm border px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
              active === id ? "border-brand bg-brand/12 text-ink" : "border-line bg-surface2 text-ink-muted hover:text-ink")}>
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-5 rounded-md border border-line bg-surface1 p-6">
        {active === "notaCompleta" ? (
          <div className="space-y-3">{data.notaCompleta.map((p, i) => <p key={i} className="text-ink-muted">{p}</p>)}</div>
        ) : (
          <p className="text-lg leading-relaxed text-ink">{data[active]}</p>
        )}
      </div>
    </div>
  );
}
