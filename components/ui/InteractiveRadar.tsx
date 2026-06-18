"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Radar as RadarIcon, Check, Plus, CalendarClock } from "@/components/ui/icons";
import { useRadar } from "@/lib/store";
import { followedGames, recommendedGames } from "@/lib/selectors";
import { games } from "@/data/games";
import { platformById } from "@/data/platforms";
import { cn, hashString } from "@/lib/utils";

interface RadarBlip {
  game: typeof games[0];
  isFollowed: boolean;
  x: number;
  y: number;
  angle: number;
  radius: number;
}

export function InteractiveRadar() {
  const s = useRadar();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBlip, setHoveredBlip] = useState<RadarBlip | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [lockedBlip, setLockedBlip] = useState<RadarBlip | null>(null);

  const prefs = {
    followedGameIds: s.followedGameIds,
    platformIds: s.platformIds,
    genreIds: s.genreIds,
  };

  const followedList = followedGames(prefs);
  const recommendedList = recommendedGames(prefs, 6);

  // Combine followed and recommended for radar blips representation
  const [blips, setBlips] = useState<RadarBlip[]>([]);

  useEffect(() => {
    const cx = 200;
    const cy = 200;

    const newBlips: RadarBlip[] = [];

    // Map followed games
    followedList.forEach((game) => {
      const hash = hashString(game.id);
      const angle = ((hash % 360) * Math.PI) / 180;
      const radius = 50 + (hash % 80); // Followed are closer to center (50-130)
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);

      newBlips.push({
        game,
        isFollowed: true,
        x,
        y,
        angle,
        radius,
      });
    });

    // Map recommended games
    recommendedList.forEach((game) => {
      const hash = hashString(game.id);
      const angle = (((hash * 7) % 360) * Math.PI) / 180;
      const radius = 120 + (hash % 60); // Recommended are further out (120-180)
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);

      newBlips.push({
        game,
        isFollowed: false,
        x,
        y,
        angle,
        radius,
      });
    });

    setBlips(newBlips);

    // Keep locked target in sync with follow status
    if (lockedBlip) {
      const updatedLocked = newBlips.find((b) => b.game.id === lockedBlip.game.id);
      if (updatedLocked) {
        setLockedBlip(updatedLocked);
      } else {
        setLockedBlip(null);
      }
    }
  }, [s.followedGameIds, s.platformIds, s.genreIds]);

  const handleBlipHover = (e: React.MouseEvent<SVGElement>, blip: RadarBlip) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const svgEl = e.currentTarget.ownerSVGElement;
    if (!svgEl) return;

    // Calculate position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipX = rect.left - containerRect.left + rect.width / 2;
    const tooltipY = rect.top - containerRect.top - 8;

    setTooltipPos({ x: tooltipX, y: tooltipY });
    setHoveredBlip(blip);
  };

  const handleBlipClick = (blip: RadarBlip) => {
    setLockedBlip(blip);
  };

  return (
    <div ref={containerRef} className="relative grid gap-6 lg:grid-cols-[1fr_360px]" data-cursor="pointer">
      {/* Radar Graphic container */}
      <div className="relative flex items-center justify-center rounded-md border border-line bg-surface1 p-6 md:p-10 overflow-hidden">
        <div className="lu-scanlines absolute inset-0 opacity-20" />
        <div className="lu-grid-texture absolute inset-0 opacity-15" />
        
        {/* SVG Viewport */}
        <svg
          viewBox="0 0 400 400"
          className="relative w-full max-w-[400px] h-auto select-none"
        >
          <defs>
            {/* Sweep gradient */}
            <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--c-red)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--c-red)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Concentric grid lines */}
          <circle cx="200" cy="200" r="180" className="stroke-line fill-none" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="135" className="stroke-line fill-none" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" className="stroke-line fill-none" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="45" className="stroke-line fill-none" strokeWidth="1" />

          {/* Crosshairs */}
          <line x1="200" y1="10" x2="200" y2="390" className="stroke-line" strokeWidth="1" opacity="0.4" />
          <line x1="10" y1="200" x2="390" y2="200" className="stroke-line" strokeWidth="1" opacity="0.4" />

          {/* Diagonal guides */}
          <line x1="65" y1="65" x2="335" y2="335" className="stroke-line" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
          <line x1="65" y1="335" x2="335" y2="65" className="stroke-line" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />

          {/* Compass labels */}
          <text x="200" y="24" className="fill-ink-faint font-mono text-[10px] text-center" textAnchor="middle">000° N</text>
          <text x="375" y="203" className="fill-ink-faint font-mono text-[10px]" textAnchor="start">090° E</text>
          <text x="200" y="386" className="fill-ink-faint font-mono text-[10px]" textAnchor="middle">180° S</text>
          <text x="25" y="203" className="fill-ink-faint font-mono text-[10px]" textAnchor="end">270° W</text>

          {/* Rotating Laser Sweep */}
          <g className="animate-radarsweep origin-center">
            {/* Sweep Area */}
            <path
              d="M 200 200 L 200 20 A 180 180 0 0 1 327 72 Z"
              fill="url(#sweepGrad)"
              opacity="0.6"
            />
            {/* Sweep Leading Line */}
            <line
              x1="200"
              y1="200"
              x2="200"
              y2="20"
              className="stroke-brand"
              strokeWidth="1.5"
              opacity="0.8"
            />
          </g>

          {/* Blips */}
          {blips.map((blip) => {
            const isFollowed = s.followedGameIds.includes(blip.game.id);
            const isLocked = lockedBlip?.game.id === blip.game.id;
            return (
              <g
                key={blip.game.id}
                className="cursor-pointer group"
                onClick={() => handleBlipClick(blip)}
                onMouseEnter={(e) => handleBlipHover(e, blip)}
                onMouseLeave={() => setHoveredBlip(null)}
              >
                {/* Blip lock ring */}
                {isLocked && (
                  <circle
                    cx={blip.x}
                    cy={blip.y}
                    r="12"
                    className="stroke-brand fill-none animate-spin"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                )}
                
                {/* Outer pulsing ring */}
                <circle
                  cx={blip.x}
                  cy={blip.y}
                  r={isFollowed ? 9 : 7}
                  className={cn(
                    "transition-all duration-300",
                    isFollowed 
                      ? "fill-brand/20 stroke-brand/60 animate-ping" 
                      : "fill-ink-muted/10 stroke-ink-muted/30 animate-pulse group-hover:fill-brand/20 group-hover:stroke-brand/60"
                  )}
                  strokeWidth="1"
                />

                {/* Inner blip dot */}
                <circle
                  cx={blip.x}
                  cy={blip.y}
                  r={isFollowed ? 4 : 3}
                  className={cn(
                    "transition-colors duration-300",
                    isFollowed 
                      ? "fill-brand stroke-white stroke-[0.5px]" 
                      : "fill-ink-faint group-hover:fill-brand"
                  )}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredBlip && (
          <div
            style={{
              position: "absolute",
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: "translate3d(-50%, -100%, 0)",
            }}
            className="pointer-events-none z-50 rounded-sm border border-line bg-surface3/95 px-3 py-2 text-left shadow-raised backdrop-blur-sm"
          >
            <div className="lu-mono text-[10px] text-brand tracking-widest uppercase">
              {hoveredBlip.isFollowed ? "TARGET: LOCKED" : "TARGET: IDENTIFIED"}
            </div>
            <h4 className="font-display text-sm font-bold text-ink uppercase mt-0.5">
              {hoveredBlip.game.title}
            </h4>
            <p className="lu-mono text-[10px] text-ink-muted">
              {hoveredBlip.game.studio}
            </p>
          </div>
        )}
      </div>

      {/* Side Status HUD / telemetry details */}
      <div className="flex flex-col justify-between rounded-md border border-line bg-surface2 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 lu-mono text-[10px] text-ink-faint">
          // HUD_V1.9
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-brand/30 bg-brand/10 text-brand">
              <RadarIcon className="h-4 w-4 animate-pulse" />
            </span>
            <span className="lu-mono text-xs font-bold uppercase tracking-wider text-ink">
              Consola del Radar
            </span>
          </div>

          {lockedBlip ? (
            <div className="space-y-4">
              <div className="rounded-sm border border-brand/20 bg-brand/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="lu-mono text-[10px] text-brand">SEGUIMIENTO ACTIVO</span>
                  <span className="lu-mono text-[10px] text-ink-muted">ID: #{lockedBlip.game.id.slice(0, 5)}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink uppercase mt-1">
                  {lockedBlip.game.title}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">{lockedBlip.game.studio}</p>
              </div>

              <dl className="grid grid-cols-2 gap-3 lu-mono text-[10px] text-ink-muted border-t border-line pt-3">
                <div>
                  <dt className="text-ink-faint">Lanzamiento</dt>
                  <dd className="font-semibold text-ink mt-0.5 flex items-center gap-1">
                    <CalendarClock className="h-3 w-3 shrink-0 text-brand" />
                    {lockedBlip.game.releaseLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Hype score</dt>
                  <dd className="font-semibold text-brand mt-0.5">
                    ▲ {lockedBlip.game.hypeCount} pts
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-ink-faint">Plataformas</dt>
                  <dd className="flex gap-1.5 mt-1">
                    {lockedBlip.game.platformIds.map((pid) => (
                      <span
                        key={pid}
                        className="rounded-[2px] bg-surface3 px-1.5 py-0.5 text-[10px] font-bold text-ink border border-line"
                      >
                        {platformById(pid)?.short || pid.toUpperCase()}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => s.toggleFollow(lockedBlip.game.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-sm h-9 px-4 text-xs font-semibold transition-colors",
                    s.followedGameIds.includes(lockedBlip.game.id)
                      ? "bg-brand text-white hover:bg-brand-hover"
                      : "border border-line bg-surface3 text-ink hover:bg-surface1"
                  )}
                >
                  {s.followedGameIds.includes(lockedBlip.game.id) ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Seguido
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      Seguir Juego
                    </>
                  )}
                </button>
                <Link
                  href={`/juegos/${lockedBlip.game.slug}`}
                  className="flex items-center justify-center rounded-sm h-9 px-3 border border-line bg-surface3 text-ink-muted hover:text-ink hover:bg-surface1 transition-colors text-xs"
                >
                  Ficha
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed border-line rounded-sm bg-surface1/30">
              <span className="lu-mono text-[10px] text-ink-faint uppercase text-center max-w-[200px]">
                Hacé clic en cualquier blip del radar para bloquear el objetivo y ver telemetría.
              </span>
            </div>
          )}
        </div>

        {/* Small stats summary */}
        <div className="mt-6 border-t border-line pt-3 lu-mono text-[10px] text-ink-faint flex justify-between">
          <span>SEGUIDOS: {followedList.length}</span>
          <span>RECOMENDADOS: {recommendedList.length}</span>
        </div>
      </div>
    </div>
  );
}
