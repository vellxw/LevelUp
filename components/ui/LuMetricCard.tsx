import type { ReactNode } from "react";
import { LuCard } from "@/components/ui/LuCard";

export function LuMetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <LuCard surface={3} className="p-4">
      <div className="flex items-start justify-between">
        <p className="lu-eyebrow">{label}</p>
        {icon && <span className="text-ink-faint">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-[12px] text-ink-faint">{hint}</p>}
    </LuCard>
  );
}
