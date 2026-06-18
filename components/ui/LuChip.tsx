"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LuChip({
  active,
  children,
  onClick,
  count,
  as = "button",
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  count?: number;
  as?: "button" | "span";
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 min-h-[44px] text-[13px] transition-all duration-[var(--dur-fast)] ease-smooth",
    active
      ? "border-brand bg-brand/15 text-ink"
      : "border-line bg-surface2 text-ink-muted hover:border-ink-faint hover:text-ink",
  );
  if (as === "span") {
    return (
      <span className={cls}>
        {children}
        {typeof count === "number" && <span className="font-mono text-ink-faint">{count}</span>}
      </span>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cls}>
      {children}
      {typeof count === "number" && <span className="font-mono text-ink-faint">{count}</span>}
    </button>
  );
}
