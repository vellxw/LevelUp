import { cn } from "@/lib/utils";

export function LuCorners({ className, color = "brand" }: { className?: string; color?: "brand" | "line" }) {
  const c = color === "brand" ? "border-brand" : "border-line";
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn("absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2", c)} />
      <span className={cn("absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2", c)} />
      <span className={cn("absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2", c)} />
      <span className={cn("absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2", c)} />
    </span>
  );
}
