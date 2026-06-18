import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LuBadgeKind = "live" | "category" | "score" | "platform" | "status" | "new" | "count";

const styles: Record<LuBadgeKind, string> = {
  live: "bg-brand/15 text-brand border-brand/40",
  category: "bg-surface3 text-ink-muted border-line",
  score: "bg-positive/12 text-positive border-positive/40",
  platform: "bg-surface2 text-ink-muted border-line font-mono",
  status: "bg-surface3 text-ink border-line",
  new: "bg-brand text-white border-brand",
  count: "bg-surface2 text-ink-muted border-line font-mono",
};

export function LuBadge({
  kind = "category",
  children,
  className,
  dot,
}: {
  kind?: LuBadgeKind;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider",
        styles[kind],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full bg-current", kind === "live" && "animate-pulsedot")} />}
      {children}
    </span>
  );
}
