"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Radar, 
  ArrowRight, 
  ChevronRight, 
  CalendarClock, 
  Tag, 
  Newspaper, 
  FileText, 
  Check, 
  Plus, 
  Bell, 
  BellOff, 
  ArrowUpRight 
} from "@/components/ui/icons";
import { useRadar, useHydrated } from "@/lib/store";
import { followedGames } from "@/lib/selectors";
import { games, gameById } from "@/data/games";
import { news } from "@/data/news";
import { platformById } from "@/data/platforms";
import { LuCard } from "@/components/ui/LuCard";
import { LuButton } from "@/components/ui/LuButton";
import { LuContainer } from "@/components/layout/LuLayout";
import { LuCorners } from "@/components/ui/LuCorners";
import { cn, coverStyle } from "@/lib/utils";

// Hardcoded lists to match the static telemetry console exactly
const OFFERS_LIST = [
  { gameId: 'g-dbd', title: "Dead by Daylight - Gratis este fin de semana en Steam", desc: "100% de descuento en la edición estándar.", type: "GRATIS" },
  { gameId: 'g-cyberpunk', title: "Cyberpunk 2077 - 50% de descuento en Steam", desc: "La aventura definitiva a mitad de precio por tiempo limitado.", type: "50% OFF" },
  { gameId: 'g-helldivers', title: "Helldivers 2 - 20% de descuento en PS Store", desc: "Unite a la lucha galáctica con precio promocional.", type: "20% OFF" },
  { gameId: 'g-elden', title: "Elden Ring: Shadow of the Erdtree - 15% OFF", desc: "La aclamada expansión con descuento exclusivo en PC.", type: "15% OFF" }
];

const LOGS_LIST = [
  { text: "Conexión satelital de telemetría establecida con 6 objetivos principales.", date: "Hace 10 seg" },
  { text: "Señal de filtración de preventa detectada para Grand Theft Auto VI.", date: "Hace 3 horas" },
  { text: "Actualización de firmware 2.12 aplicada con éxito en Cyberpunk 2077.", date: "Hace 4 horas" },
  { text: "Descuento temporal del 20% activo para Helldivers 2 en PS Store.", date: "Hace 5 horas" },
  { text: "Alerta de lanzamiento configurada para DOOM: The Dark Ages.", date: "Hace 1 día" },
  { text: "Sincronización de base de datos del Radar completada con éxito.", date: "Hace 2 días" }
];

export function MiRadarPreview() {
  const hydrated = useHydrated();
  const followedIds = useRadar((s) => s.followedGameIds);
  const platformIds = useRadar((s) => s.platformIds);
  const genreIds = useRadar((s) => s.genreIds);
  const onboarded = useRadar((s) => s.onboardingComplete);
  
  // State for collapsible Telemetry Console
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"cronograma" | "ofertas" | "noticias" | "bitacora">("cronograma");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");
  const [filterTopic, setFilterTopic] = useState<string>("all");
  const [selectedGameId, setSelectedGameId] = useState<string>("g-elden");

  const s = useRadar();

  const prefs = { followedGameIds: followedIds, platformIds, genreIds };
  const followed = followedGames(prefs);
  const empty = !hydrated || (!onboarded && followed.length === 0);

  // Auto-seed required profile if store is empty on hydration
  useEffect(() => {
    if (hydrated && followedIds.length === 0 && !onboarded) {
      // Force the exact profile requirements: PC, PS5, Xbox Series X|S
      // Genres: Shooter, MOBA, RPG, Acción
      // Games: Elden Ring, Cyberpunk, Wukong, Helldivers 2, DOOM, Monster Hunter Wilds
      s.completeOnboarding({
        platformIds: ['pc', 'ps5', 'xsx'],
        genreIds: ['shooter', 'moba', 'rpg', 'accion'],
        followedGameIds: ['g-elden', 'g-cyberpunk', 'g-wukong', 'g-helldivers', 'g-doom', 'g-mhwilds']
      });
      // Set default alerts
      s.toggleAlert('g-elden');
      s.toggleAlert('g-cyberpunk');
      s.toggleAlert('g-wukong');
    }
  }, [hydrated, followedIds, onboarded]);

  // Set default selected game ID once followed list loads
  useEffect(() => {
    if (followed.length > 0 && !followed.some(g => g.id === selectedGameId)) {
      setSelectedGameId(followed[0].id);
    }
  }, [followed, selectedGameId]);

  if (empty) {
    return (
      <section aria-labelledby="radar-preview" className="py-10 sm:py-14">
        <LuContainer>
          <LuCard surface={1} className="relative overflow-hidden p-6 sm:p-8">
            <div className="lu-grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
            <LuCorners color="brand" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-brand">
                    <Radar className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="lu-eyebrow">Tu panel</p>
                    <h2 id="radar-preview" className="font-display text-2xl font-bold uppercase text-ink">Mi Radar</h2>
                  </div>
                </div>
                <LuButton href="/mi-radar" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Abrir panel
                </LuButton>
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 rounded-md border border-dashed border-line bg-surface2/50 p-6">
                <p className="max-w-xl text-ink-muted">
                  Tu radar aún no está calibrado. <span className="text-ink">60 segundos</span> y la home prioriza lo que te importa.
                </p>
                <LuButton href="/onboarding" variant="primary">Configurar Mi Radar</LuButton>
              </div>
            </div>
          </LuCard>
        </LuContainer>
      </section>
    );
  }

  // Filter followed games based on select criteria in Cronograma tab
  const cronogramaGames = followed.filter(g => {
    if (filterPlatform !== "all") {
      const match = g.platformIds.includes(filterPlatform === "xbox-series" ? "xsx" : filterPlatform);
      if (!match) return false;
    }
    if (filterTopic !== "all") {
      const match = g.genreIds.includes(filterTopic);
      if (!match) return false;
    }
    return true;
  });

  // Filter news articles based on followed game IDs
  const filteredNews = news.filter(n => n.gameId && followedIds.includes(n.gameId));

  // Determine current active selection based on current tab list
  const getActiveGame = () => {
    return gameById(selectedGameId) || followed[0] || games[0];
  };

  const activeSelectedGame = getActiveGame();
  const isSelectedGameFollowed = followedIds.includes(activeSelectedGame.id);
  const isSelectedGameAlertActive = !!s.alerts[activeSelectedGame.id];

  return (
    <section aria-labelledby="radar-preview" className="py-10 sm:py-14">
      <LuContainer>
        <LuCard surface={1} className="relative overflow-hidden p-6 sm:p-8">
          <div className="lu-grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
          <LuCorners color="brand" />
          
          <div className="relative">
            {/* Header section */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-brand">
                  <Radar className="h-6 w-6 animate-pulse" />
                </span>
                <div>
                  <p className="lu-eyebrow">Tu panel</p>
                  <h2 id="radar-preview" className="font-display text-2xl font-bold uppercase text-ink">Mi Radar</h2>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-2 rounded-sm border border-line bg-surface3 px-4 h-11 text-xs font-semibold uppercase text-ink hover:bg-surface2 transition-all"
                >
                  <span className="font-mono">{isExpanded ? "Colapsar Telemetría" : "Expandir Telemetría"}</span>
                  <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-90")} />
                </button>
                
                <LuButton href="/mi-radar" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Abrir panel
                </LuButton>
              </div>
            </div>

            {/* Collapsible Telemetry Content wrapper */}
            <div 
              className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden",
                isExpanded ? "max-h-[1400px] opacity-100 mt-6" : "max-h-0 opacity-0"
              )}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                
                {/* Left Panel: Content Lists */}
                <div className="flex flex-col gap-4">
                  
                  {/* Telemetry Tabs bar */}
                  <div className="flex flex-wrap gap-2 border-b border-line pb-3">
                    <button
                      onClick={() => setActiveTab("cronograma")}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-3.5 py-2 border border-line bg-surface2/40 text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-ink transition-colors",
                        activeTab === "cronograma" && "border-brand bg-brand/5 text-ink"
                      )}
                    >
                      <CalendarClock className="h-3.5 w-3.5" />
                      Cronograma
                    </button>
                    <button
                      onClick={() => setActiveTab("ofertas")}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-3.5 py-2 border border-line bg-surface2/40 text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-ink transition-colors",
                        activeTab === "ofertas" && "border-brand bg-brand/5 text-ink"
                      )}
                    >
                      <Tag className="h-3.5 w-3.5" />
                      Ofertas
                    </button>
                    <button
                      onClick={() => setActiveTab("noticias")}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-3.5 py-2 border border-line bg-surface2/40 text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-ink transition-colors",
                        activeTab === "noticias" && "border-brand bg-brand/5 text-ink"
                      )}
                    >
                      <Newspaper className="h-3.5 w-3.5" />
                      Noticias
                    </button>
                    <button
                      onClick={() => setActiveTab("bitacora")}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-3.5 py-2 border border-line bg-surface2/40 text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-ink transition-colors",
                        activeTab === "bitacora" && "border-brand bg-brand/5 text-ink"
                      )}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Bitácora
                    </button>
                  </div>

                  {/* Filters for Cronograma Tab only */}
                  {activeTab === "cronograma" && (
                    <div className="flex flex-wrap items-center gap-4 border-b border-line pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-ink-faint uppercase">Plataforma:</span>
                        <select 
                          value={filterPlatform} 
                          onChange={(e) => setFilterPlatform(e.target.value)}
                          className="bg-surface2 border border-line rounded-sm text-xs font-mono px-2.5 py-1 text-ink focus:outline-none focus:border-brand"
                        >
                          <option value="all">Todas</option>
                          <option value="pc">PC</option>
                          <option value="ps5">PlayStation 5</option>
                          <option value="xbox-series">Xbox Series X|S</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-ink-faint uppercase">Tema:</span>
                        <select 
                          value={filterTopic} 
                          onChange={(e) => setFilterTopic(e.target.value)}
                          className="bg-surface2 border border-line rounded-sm text-xs font-mono px-2.5 py-1 text-ink focus:outline-none focus:border-brand"
                        >
                          <option value="all">Todos</option>
                          <option value="shooter">Shooter</option>
                          <option value="moba">MOBA</option>
                          <option value="rpg">RPG</option>
                          <option value="accion">Acción</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Reactive Scrollable List Content */}
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* CRONOGRAMA LIST */}
                    {activeTab === "cronograma" && (
                      cronogramaGames.length === 0 ? (
                        <div className="p-8 text-center text-ink-muted font-mono text-xs h-48 flex items-center justify-center border border-dashed border-line rounded-sm bg-surface2/20">
                          Ningún juego de tu radar coincide con los filtros aplicados.
                        </div>
                      ) : (
                        cronogramaGames.map(g => {
                          const isSelected = selectedGameId === g.id;
                          return (
                            <div 
                              key={g.id}
                              onClick={() => setSelectedGameId(g.id)}
                              className={cn(
                                "p-3 rounded-sm flex items-center justify-between gap-3 border border-line bg-surface2/30 hover:bg-surface2/60 transition-all cursor-pointer",
                                isSelected && "border-brand bg-brand/5 shadow-[0_0_12px_rgba(225,29,72,0.15)]"
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="h-12 w-12 rounded-sm border border-line shrink-0" style={coverStyle(g.seed, g.coverUrl)} />
                                <div className="min-w-0">
                                  <h4 className="font-display font-bold uppercase text-sm text-ink truncate">{g.title}</h4>
                                  <p className="font-mono text-[10px] text-ink-muted truncate uppercase mt-0.5">{g.studio}</p>
                                </div>
                              </div>
                              <span className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 border rounded-[2px] shrink-0 border-line text-ink-muted uppercase">
                                {g.releaseLabel}
                              </span>
                            </div>
                          );
                        })
                      )
                    )}

                    {/* OFERTAS LIST */}
                    {activeTab === "ofertas" && (
                      OFFERS_LIST.map(o => {
                        const g = gameById(o.gameId);
                        if (!g) return null;
                        const isSelected = selectedGameId === o.gameId;
                        return (
                          <div
                            key={o.gameId}
                            onClick={() => setSelectedGameId(o.gameId)}
                            className={cn(
                              "p-3 rounded-sm flex items-center justify-between gap-3 border border-line bg-surface2/30 hover:bg-surface2/60 transition-all cursor-pointer",
                              isSelected && "border-brand bg-brand/5 shadow-[0_0_12px_rgba(225,29,72,0.15)]"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-12 w-12 rounded-sm border border-line shrink-0" style={coverStyle(g.seed, g.coverUrl)} />
                              <div className="min-w-0">
                                <h4 className="font-display font-bold uppercase text-sm text-ink truncate">{o.title}</h4>
                                <p className="font-mono text-[10px] text-ink-muted truncate uppercase mt-0.5">{o.desc}</p>
                              </div>
                            </div>
                            <span className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 border rounded-[2px] shrink-0 border-brand text-brand bg-brand/10">
                              {o.type}
                            </span>
                          </div>
                        );
                      })
                    )}

                    {/* NOTICIAS LIST */}
                    {activeTab === "noticias" && (
                      filteredNews.length === 0 ? (
                        <div className="p-8 text-center text-ink-muted font-mono text-xs h-48 flex flex-col items-center gap-2 justify-center border border-dashed border-line rounded-sm bg-surface2/20">
                          No hay noticias de tus juegos seguidos hoy.
                        </div>
                      ) : (
                        filteredNews.map(n => {
                          const g = gameById(n.gameId || "");
                          const imgUrl = n.coverUrl || g?.coverUrl || "";
                          const isSelected = selectedGameId === n.gameId;
                          return (
                            <div
                              key={n.id}
                              onClick={() => {
                                if (n.gameId) setSelectedGameId(n.gameId);
                              }}
                              className={cn(
                                "p-3 rounded-sm flex items-center justify-between gap-3 border border-line bg-surface2/30 hover:bg-surface2/60 transition-all cursor-pointer",
                                isSelected && "border-brand bg-brand/5 shadow-[0_0_12px_rgba(225,29,72,0.15)]"
                              )}
                            >
                              <Link href={`/noticias/${n.slug}`} className="flex items-center gap-3 min-w-0 flex-1" data-cursor="read">
                                <div className="h-12 w-12 rounded-sm border border-line shrink-0" style={coverStyle(n.seed, imgUrl)} />
                                <div className="min-w-0">
                                  <h4 className="font-display font-semibold text-sm text-ink line-clamp-2 leading-tight">{n.title}</h4>
                                  <p className="font-mono text-[10px] text-brand truncate uppercase mt-1">
                                    {n.category} • {g?.title || "Radar"}
                                  </p>
                                </div>
                              </Link>
                              <Link href={`/noticias/${n.slug}`} className="text-ink-faint hover:text-brand transition-colors shrink-0">
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </div>
                          );
                        })
                      )
                    )}

                    {/* BITACORA LIST */}
                    {activeTab === "bitacora" && (
                      LOGS_LIST.map((l, idx) => (
                        <div key={idx} className="p-3 border border-line bg-surface2/20 rounded-sm flex items-center justify-between gap-3 font-mono text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0 animate-pulse" />
                            <span className="text-ink-muted truncate">{l.text}</span>
                          </div>
                          <span className="text-[10px] text-ink-faint shrink-0">{l.date}</span>
                        </div>
                      ))
                    )}

                  </div>
                </div>

                {/* Right Panel: Satellite Link Sidebar */}
                <div className="border border-line rounded-md bg-surface2/50 p-4 hidden lg:flex flex-col gap-4 relative min-h-[350px]">
                  
                  {/* Game Banner card */}
                  <div className="relative h-28 w-full overflow-hidden rounded-sm border border-line bg-black/40">
                    <div 
                      className="absolute inset-0 opacity-65 bg-cover bg-center"
                      style={coverStyle(activeSelectedGame.seed, activeSelectedGame.coverUrl)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface2/95 via-surface2/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-3 z-10">
                      <span className="font-mono text-[9px] text-brand tracking-widest uppercase">// CONEXIÓN ESTABLECIDA</span>
                      <h3 className="font-display text-lg font-bold uppercase text-ink leading-tight truncate max-w-[280px]">{activeSelectedGame.title}</h3>
                      <p className="font-mono text-[9px] text-ink-muted truncate">{activeSelectedGame.studio}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-[11px] border-b border-line pb-3">
                    <div className="border border-line bg-surface1/40 p-2.5 rounded-sm">
                      <p className="text-[9px] text-ink-faint uppercase tracking-wider">Lanzamiento</p>
                      <p className="font-bold text-brand mt-0.5">{activeSelectedGame.releaseLabel}</p>
                    </div>
                    <div className="border border-line bg-surface1/40 p-2.5 rounded-sm">
                      <p className="text-[9px] text-ink-faint uppercase tracking-wider">Hype score</p>
                      <p className="font-bold text-ink mt-0.5">▲ {activeSelectedGame.hypeCount?.toLocaleString() || "42.000"} pts</p>
                    </div>
                    <div className="col-span-2 border border-line bg-surface1/40 p-2.5 rounded-sm">
                      <p className="text-[9px] text-ink-faint uppercase tracking-wider mb-1">Plataformas</p>
                      <div className="flex flex-wrap gap-1">
                        {activeSelectedGame.platformIds.map(pid => (
                          <span 
                            key={pid} 
                            className="bg-surface3 border border-line rounded-[2px] px-1.5 py-0.5 text-[9px] font-bold text-ink"
                          >
                            {platformById(pid)?.short || pid.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar control actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => s.toggleFollow(activeSelectedGame.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 rounded-sm text-xs font-bold uppercase h-10 transition-colors border",
                        isSelectedGameFollowed 
                          ? "bg-brand text-white hover:bg-brand-hover border-brand shadow-[0_0_8px_rgba(225,29,72,0.2)]" 
                          : "border-line bg-surface3 text-ink hover:bg-surface2"
                      )}
                    >
                      {isSelectedGameFollowed ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {isSelectedGameFollowed ? "Seguido" : "Seguir"}
                    </button>

                    <button
                      onClick={() => s.toggleAlert(activeSelectedGame.id)}
                      title="Alertas de precio y actualizaciones"
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-colors",
                        isSelectedGameAlertActive 
                          ? "border-brand text-brand bg-brand/10 shadow-[0_0_8px_rgba(225,29,72,0.15)]" 
                          : "border-line text-ink-muted bg-surface3 hover:text-ink hover:bg-surface2"
                      )}
                    >
                      {isSelectedGameAlertActive ? <Bell className="h-4.5 w-4.5" /> : <BellOff className="h-4.5 w-4.5" />}
                    </button>

                    <Link
                      href={`/juegos/${activeSelectedGame.slug}`}
                      className="flex items-center justify-center rounded-sm border border-line bg-surface3 px-4 h-10 text-xs font-bold uppercase text-ink hover:bg-surface2 transition-colors"
                    >
                      Ficha
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </LuCard>
      </LuContainer>
    </section>
  );
}
