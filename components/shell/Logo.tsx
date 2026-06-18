import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-1", className)} aria-label="LevelUp inicio">
      <span className="font-display text-xl font-bold uppercase tracking-tight text-ink">Level</span>
      <span className="font-display text-xl font-bold uppercase tracking-tight text-brand">Up</span>
      <span className="ml-1 h-4 w-1.5 bg-brand transition-transform duration-300 group-hover:scale-y-125" aria-hidden="true" />
    </Link>
  );
}
