import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LuContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function LuSection({
  children,
  className,
  id,
  as: Tag = "section",
  density = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  density?: "tight" | "default" | "loose";
}) {
  const densityClass = density === "tight" ? "py-6 sm:py-8" : density === "loose" ? "py-16 sm:py-24" : "py-10 sm:py-14";
  return (
    <Tag id={id} className={cn(densityClass, className)}>
      <LuContainer>{children}</LuContainer>
    </Tag>
  );
}

export function LuGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12", className)}>{children}</div>;
}

const spanMap: Record<number, string> = {
  1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4",
  5: "col-span-4 sm:col-span-5", 6: "col-span-4 sm:col-span-6",
  7: "col-span-4 sm:col-span-8 lg:col-span-7", 8: "col-span-4 sm:col-span-8 lg:col-span-8",
  9: "col-span-4 sm:col-span-8 lg:col-span-9", 10: "col-span-4 sm:col-span-8 lg:col-span-10",
  11: "col-span-4 sm:col-span-8 lg:col-span-11", 12: "col-span-4 sm:col-span-8 lg:col-span-12",
};

export function LuCol({ span = 12, children, className }: { span?: number; children: ReactNode; className?: string }) {
  return <div className={cn(spanMap[span] ?? "col-span-4", className)}>{children}</div>;
}

export function LuStack({
  children,
  gap = 4,
  className,
}: {
  children: ReactNode;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
}) {
  const g: Record<number, string> = { 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8" };
  return <div className={cn("flex flex-col", g[gap], className)}>{children}</div>;
}
