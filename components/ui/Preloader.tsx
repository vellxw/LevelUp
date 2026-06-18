"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const messages = [
  "SYSTEM INIT: LEVELUP V1.0.0",
  "SCANNING GAMING DATABASE...",
  "SYNCING PLATFORM METRICS...",
  "INITIALIZING RADAR SYSTEM...",
  "LOADING COMPLETED",
];

export function Preloader() {
  const [percent, setPercent] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let visited = false;
    try {
      visited = !!sessionStorage.getItem("lu_preloaded");
    } catch (e) {
      // Ignore security errors on file:// protocol
    }

    // Respect prefers-reduced-motion: skip the preloader entirely
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsFinished(true);
      setIsHidden(true);
      try {
        sessionStorage.setItem("lu_preloaded", "true");
      } catch (e) {}
      return;
    }

    // Check if onboarding page has preloaded or was already visited in this session
    if (visited) {
      setIsFinished(true);
      setIsHidden(true);
      return;
    }

    // Lock scroll
    document.body.style.overflow = "hidden";

    const duration = 1200; // 1.2s total time
    const interval = 12; // Update interval
    const step = 100 / (duration / interval);

    let currentPercent = 0;
    const timer = setInterval(() => {
      currentPercent += step;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          try {
            sessionStorage.setItem("lu_preloaded", "true");
          } catch (e) {}
          // Unlock scroll
          document.body.style.overflow = "";
          setTimeout(() => setIsHidden(true), 800); // Wait for transition
        }, 300);
      }
      setPercent(Math.floor(currentPercent));

      // Rotate messages
      const msgIdx = Math.min(
        Math.floor((currentPercent / 100) * messages.length),
        messages.length - 1
      );
      setMsgIndex(msgIdx);
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      id="lu-preloader"
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col justify-between bg-bg p-8 transition-transform duration-700 ease-smooth",
        isFinished ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* Background cyber grid */}
      <div className="lu-grid-texture absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="lu-scanlines absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Header HUD info */}
      <div className="relative flex justify-between font-mono text-[10px] uppercase tracking-wider text-brand">
        <div>[ LEVELUP SYSTEM LOAD ]</div>
        <div>[ LATAM REGION FEED ]</div>
      </div>

      {/* Center percentage counter */}
      <div className="relative flex flex-col items-center justify-center">
        <div id="lu-preloader-percent" className="font-display text-[12vw] font-bold leading-none text-ink">
          {String(percent).padStart(3, "0")}
          <span className="text-brand">%</span>
        </div>
        <div id="lu-preloader-message" className="mt-4 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
          <span className="inline-block h-2 w-2 animate-pulsedot bg-brand mr-2 rounded-full" />
          {messages[msgIndex]}
        </div>
      </div>

      {/* Footer loading progress bar */}
      <div className="relative flex flex-col gap-2 font-mono text-[10px] text-ink-faint">
        <div className="flex justify-between">
          <span>COORDINATES: 34.6037 S, 58.3816 W</span>
          <span>SPEED: MAX_LATENCY</span>
        </div>
        <div className="relative h-1 w-full bg-surface3 overflow-hidden rounded-xs">
          <div
            id="lu-preloader-bar"
            className="h-full bg-brand transition-all duration-75 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
