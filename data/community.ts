import type { Debate } from "@/lib/types";

export const debates: Debate[] = [
  { id: "d-1", slug: "gta-6-vale-la-espera", title: "¿GTA VI va a estar a la altura de tantos años de espera?", author: "NeoVice", excerpt: "Con la fecha confirmada, debate abierto sobre expectativas y miedo al hype.", category: "Debate", replies: 342, likes: 1280, dateISO: "2026-06-12T20:00:00Z", gameId: "g-gta6" },
  { id: "d-2", slug: "mejor-roguelike-2026", title: "Hades II vs el resto: ¿el mejor roguelike de la generación?", author: "MeliMain", excerpt: "Tras la 1.0, la comunidad discute si destrona a todos sus rivales.", category: "Debate", replies: 198, likes: 870, dateISO: "2026-06-10T19:00:00Z", gameId: "g-hades2" },
  { id: "d-3", slug: "valorant-meta-injugable", title: "El nuevo meta de VALORANT: ¿más táctico o más lento?", author: "ClutchAR", excerpt: "Opiniones divididas sobre los cambios de economía y utilidades.", category: "Competitivo", replies: 421, likes: 1530, dateISO: "2026-06-09T21:00:00Z", gameId: "g-valorant" },
  { id: "d-4", slug: "ports-pc-sony", title: "Los ports de Sony a PC están cada vez mejores", author: "FrameChaser", excerpt: "Stellar Blade reabre el debate sobre la estrategia de PlayStation en PC.", category: "Industria", replies: 156, likes: 640, dateISO: "2026-06-06T18:30:00Z", gameId: "g-stellar" },
  { id: "d-5", slug: "cooperativos-imprescindibles", title: "Cooperativos imprescindibles para jugar de a dos en 2026", author: "DuoQueen", excerpt: "Split Fiction, Helldivers 2 y más: armemos la lista definitiva.", category: "Recomendaciones", replies: 233, likes: 910, dateISO: "2026-06-04T17:00:00Z", gameId: "g-split" },
  { id: "d-6", slug: "terror-japones-silent-hill", title: "Silent Hill f y el regreso del terror japonés", author: "FogWalker", excerpt: "Expectativas sobre la nueva ambientación y el trabajo de Ryukishi07.", category: "Debate", replies: 187, likes: 720, dateISO: "2026-06-02T22:00:00Z", gameId: "g-silenthill" },
];

export function debateBySlug(slug: string): Debate | undefined {
  return debates.find((d) => d.slug === slug);
}
