"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<{
    visible: boolean;
    text: string;
    variant: "default" | "pointer" | "view" | "read" | "play" | "follow";
  }>({
    visible: false,
    text: "",
    variant: "default",
  });

  // Position coordinates for lerp
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on devices with fine pointer (mouse) and reduced-motion disabled
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    document.body.classList.add("has-custom-cursor");
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!cursorState.visible) {
        setCursorState((s) => ({ ...s, visible: true }));
      }
    };

    const onMouseLeave = () => {
      setCursorState((s) => ({ ...s, visible: false }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor], a, button, select, input, [role='button']");

      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        if (type) {
          setCursorState((s) => ({
            ...s,
            variant: type as any,
            text: interactiveEl.getAttribute("data-cursor-text") ||
                  (type === "view" ? "VER" : type === "read" ? "LEER" : type === "play" ? "VER VIDEO" : type === "follow" ? "+ SEGUIR" : ""),
          }));
        } else {
          setCursorState((s) => ({ ...s, variant: "pointer", text: "" }));
        }
      } else {
        setCursorState((s) => ({ ...s, variant: "default", text: "" }));
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    let animId: number;
    const updatePosition = () => {
      const ring = ringRef.current;
      const dot = cursorRef.current;

      if (ring && dot) {
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.15;
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.15;
        cursorPosRef.current.x += (mouseRef.current.x - cursorPosRef.current.x) * 0.5;
        cursorPosRef.current.y += (mouseRef.current.y - cursorPosRef.current.y) * 0.5;

        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
        dot.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [cursorState.visible]);

  if (!enabled || !cursorState.visible) return null;

  const getVariantStyles = () => {
    switch (cursorState.variant) {
      case "pointer":
        return "w-10 h-10 border-brand bg-brand/10";
      case "view":
      case "read":
      case "play":
      case "follow":
        return "w-16 h-16 border-brand bg-brand text-white scale-100";
      default:
        return "w-6 h-6 border-ink-muted/50 bg-transparent";
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen">
      <div
        ref={ringRef}
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center rounded-full border text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 ease-out",
          getVariantStyles(),
        )}
      >
        <span className="animate-pulse">{cursorState.text}</span>
      </div>
      <div
        ref={cursorRef}
        className={cn(
          "fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-100 ease-out",
          cursorState.variant !== "default" && "scale-0"
        )}
      />
    </div>
  );
}
