import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LuCard({
  children,
  surface = 2,
  hover,
  bordered = true,
  className,
}: {
  children: ReactNode;
  surface?: 1 | 2 | 3;
  hover?: boolean;
  bordered?: boolean;
  className?: string;
}) {
  const surfaceClass = surface === 1 ? "bg-surface1" : surface === 3 ? "bg-surface3" : "bg-surface2";
  return (
    <div
      className={cn(
        "relative rounded-md",
        surfaceClass,
        bordered && "border border-line",
        hover &&
          "transition-all duration-[var(--dur-base)] ease-smooth hover:-translate-y-2 hover:border-ink-muted hover:shadow-raised",
        className,
      )}
    >
      {children}
    </div>
  );
}
