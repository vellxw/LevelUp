import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HorizontalRail({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0", className)}>
      {children}
    </div>
  );
}

export function RailItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("w-[260px] shrink-0 snap-start sm:w-[300px]", className)}>{children}</div>;
}
