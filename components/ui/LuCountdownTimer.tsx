"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function LuCountdownTimer({ targetISO, className }: { targetISO: string; className?: string }) {
  const target = new Date(targetISO).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const cell = (v: number, l: string, primary = false) => (
    <div className="flex flex-col items-center">
      <span className={cn("font-display text-xl font-bold tabular-nums", primary ? "text-brand" : "text-ink")}>{String(v).padStart(2, "0")}</span>
      <span className="lu-mono text-[10px] uppercase tracking-wider text-ink-faint">{l}</span>
    </div>
  );
  const isExpired = mounted && t.d === 0 && t.h === 0 && t.m === 0 && t.s === 0;
  if (isExpired) {
    return (
      <div className={cn("flex items-center gap-2", className)} suppressHydrationWarning>
        <span className="lu-mono text-[10px] uppercase tracking-wider text-positive font-semibold">// Disponible</span>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-3", className)} suppressHydrationWarning>
      {mounted ? (
        <>
          {cell(t.d, "días", true)}
          <span className="text-ink-faint">:</span>
          {cell(t.h, "hs")}
          <span className="text-ink-faint">:</span>
          {cell(t.m, "min")}
          <span className="text-ink-faint">:</span>
          {cell(t.s, "seg")}
        </>
      ) : (
        <span className="lu-mono text-sm text-ink-faint">--:--:--</span>
      )}
    </div>
  );
}
