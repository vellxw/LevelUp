"use client";

import { Check, Plus } from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FollowButton({ gameId, size = "md", className }: { gameId: string; size?: "sm" | "md"; className?: string }) {
  const hydrated = useHydrated();
  const following = useRadar((s) => s.followedGameIds.includes(gameId));
  const toggle = useRadar((s) => s.toggleFollow);
  const active = hydrated && following;
  return (
    <button
      type="button"
      onClick={() => toggle(gameId)}
      aria-pressed={active}
      aria-label={active ? "Dejar de seguir" : "Seguir juego"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm border font-medium tracking-wide transition-all duration-[var(--dur-fast)] active:scale-95 motion-reduce:active:scale-100",
        size === "sm" ? "h-10 px-3 sm:h-11 sm:px-4 text-[13px]" : "h-11 px-5 text-[15px]",
        active ? "border-positive/50 bg-positive/12 text-positive" : "border-brand bg-brand text-white hover:bg-brand-hover",
        className,
      )}
    >
      {active ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {active ? "Siguiendo" : "Seguir"}
    </button>
  );
}
