import { cn } from "@/lib/utils";

export function LuDivider({
  variant = "solid",
  className,
  label,
}: {
  variant?: "solid" | "dashed" | "glow";
  className?: string;
  label?: string;
}) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-line" />
        <span className="lu-eyebrow">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  }
  return (
    <hr
      className={cn(
        "border-0",
        variant === "solid" && "h-px bg-line",
        variant === "dashed" && "h-px border-t border-dashed border-line bg-transparent",
        variant === "glow" && "h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent",
        className,
      )}
    />
  );
}
