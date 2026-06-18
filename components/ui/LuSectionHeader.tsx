import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LuSectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="lu-eyebrow mb-2">{eyebrow}</p>}
        <h2 className="line-clamp-2 text-[clamp(1.6rem,3vw,2.4rem)] font-bold uppercase leading-none text-ink">{title}</h2>
        {description && <p className="mt-2 text-ink-muted">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="lu-mono text-[12px] uppercase tracking-wider text-ink-muted underline-offset-4 transition-colors hover:text-brand"
        >
          {actionLabel} -&gt;
        </Link>
      )}
      {children}
    </div>
  );
}
