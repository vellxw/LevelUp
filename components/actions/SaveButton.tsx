"use client";

import { Bookmark } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import type { SavedType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SaveButton({
  id,
  type,
  title,
  href,
  iconOnly,
  className,
}: {
  id: string;
  type: SavedType;
  title: string;
  href: string;
  iconOnly?: boolean;
  className?: string;
}) {
  const hydrated = useHydrated();
  const saved = useRadar((s) => s.saved.some((x) => x.id === id && x.type === type));
  const toggle = useRadar((s) => s.toggleSave);
  const active = hydrated && saved;
  return (
    <button
      type="button"
      onClick={() => toggle({ id, type, title, href })}
      aria-pressed={active}
      aria-label={active ? "Quitar de guardados" : "Guardar"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm border text-[13px] transition-colors duration-[var(--dur-fast)]",
        iconOnly ? "h-9 w-9" : "h-9 px-3",
        active ? "border-brand/50 bg-brand/12 text-brand" : "border-line bg-surface2 text-ink-muted hover:text-ink",
        className,
      )}
    >
      <Bookmark className={cn("h-4 w-4", active && "fill-current")} />
      {!iconOnly && (active ? "Guardado" : "Guardar")}
    </button>
  );
}
