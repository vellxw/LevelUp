import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LuCorners } from "@/components/ui/LuCorners";

export function LuEmptyState({
  icon,
  title,
  description,
  benefits,
  action,
  className,
  variant = "default",
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
  benefits?: string[];
  action?: ReactNode;
  className?: string;
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className={cn("rounded-md border border-dashed border-line bg-surface2/50 p-5", className)}>
        {description && <p className="text-ink-muted">{description}</p>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    );
  }
  return (
    <div className={cn("relative flex flex-col items-center gap-5 rounded-md border border-line bg-surface1 p-12 text-center", className)}>
      <LuCorners color="brand" />
      {icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
          {icon}
        </span>
      )}
      <h2 className="font-display text-2xl font-bold uppercase text-ink">{title}</h2>
      {description && <p className="max-w-md text-ink-muted">{description}</p>}
      {benefits && benefits.length > 0 && (
        <ul className="flex flex-col gap-2 text-left text-sm text-ink-muted">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="text-positive">✓</span>
              {b}
            </li>
          ))}
        </ul>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
