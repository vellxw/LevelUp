"use client";

import { LuChip } from "@/components/ui/LuChip";

export interface FilterOption {
  id: string;
  label: string;
}

export function LuFilterBar({
  options,
  active,
  onToggle,
  ariaLabel,
}: {
  options: FilterOption[];
  active: string[];
  onToggle: (id: string) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {options.map((o) => (
        <div key={o.id} className="shrink-0">
          <LuChip active={active.includes(o.id)} onClick={() => onToggle(o.id)}>
            {o.label}
          </LuChip>
        </div>
      ))}
    </div>
  );
}
