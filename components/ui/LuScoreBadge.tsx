import { cn } from "@/lib/utils";
import { scoreTone } from "@/lib/utils";

const tones = {
  high: "text-positive border-positive/50",
  mid: "text-warning border-warning/50",
  low: "text-brand border-brand/50",
};

export function LuScoreBadge({
  score,
  label,
  size = "md",
}: {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const tone = tones[scoreTone(score)];
  const dims = size === "lg" ? "h-16 w-16 text-2xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-12 w-12 text-lg";
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 bg-surface1 font-display font-bold leading-none",
          dims,
          tone,
        )}
        aria-label={`${score.toFixed(1)} de 10`}
      >
        <span>{score.toFixed(1)}</span>
        {size === "lg" && <span className="mt-0.5 text-[10px] font-normal opacity-70">/ 10</span>}
      </div>
      {label && <span className="lu-eyebrow">{label}</span>}
    </div>
  );
}
