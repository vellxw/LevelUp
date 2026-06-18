import type { ReactNode } from "react";
import { LuContainer } from "@/components/layout/LuLayout";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-surface1">
      <div className="lu-grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
      <LuContainer className="relative py-10 sm:py-14">
        <p className="lu-eyebrow mb-2">{eyebrow}</p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-none text-ink">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-ink-muted">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </LuContainer>
    </div>
  );
}
