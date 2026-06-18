import { platformById } from "@/data/platforms";
import { cn } from "@/lib/utils";

export function LuPlatformTag({ id, className }: { id: string; className?: string }) {
  const p = platformById(id);
  if (!p) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-line bg-surface2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted",
        className,
      )}
      title={p.name}
    >
      {p.short}
    </span>
  );
}
