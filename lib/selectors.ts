import { games, gameById } from "@/data/games";
import { news } from "@/data/news";
import { reviews } from "@/data/reviews";
import { videos } from "@/data/videos";
import { debates } from "@/data/community";
import type { Game, NewsItem, Review, VideoItem, Debate } from "@/lib/types";

export interface RadarPrefs {
  followedGameIds: string[];
  platformIds: string[];
  genreIds: string[];
}

export function upcomingReleases(): Game[] {
  return games
    .filter((g) => g.status === "proximo" || g.status === "anunciado")
    .slice()
    .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
}

export function availableGames(): Game[] {
  return games.filter((g) => g.status === "disponible" || g.status === "actualizado");
}

export function topRatedGames(): Game[] {
  return games
    .filter((g) => g.editorialScore !== null)
    .slice()
    .sort((a, b) => (b.editorialScore ?? 0) - (a.editorialScore ?? 0));
}

export function scoreGameForPrefs(game: Game, prefs: RadarPrefs): number {
  let score = 0;
  for (const p of game.platformIds) if (prefs.platformIds.includes(p)) score += 2;
  for (const g of game.genreIds) if (prefs.genreIds.includes(g)) score += 3;
  if (game.editorialScore) score += game.editorialScore / 10;
  return score;
}

export function recommendedGames(prefs: RadarPrefs, limit = 6): Game[] {
  const hasPrefs = prefs.platformIds.length > 0 || prefs.genreIds.length > 0;
  const pool = games.filter((g) => !prefs.followedGameIds.includes(g.id));
  if (!hasPrefs) return topRatedGames().filter((g) => !prefs.followedGameIds.includes(g.id)).slice(0, limit);
  return pool
    .map((g) => ({ g, s: scoreGameForPrefs(g, prefs) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.g);
}

export function followedGames(prefs: RadarPrefs): Game[] {
  return prefs.followedGameIds
    .map((id) => gameById(id))
    .filter((g): g is Game => Boolean(g));
}

export function newsForGame(gameId: string): NewsItem[] {
  return news.filter((n) => n.gameId === gameId);
}

export function radarNews(prefs: RadarPrefs, limit = 5): NewsItem[] {
  const followed = new Set(prefs.followedGameIds);
  const matched = news.filter((n) => n.gameId && followed.has(n.gameId));
  const rest = news.filter((n) => !matched.includes(n));
  return [...matched, ...rest].slice(0, limit);
}

export function videosForGame(gameId: string): VideoItem[] {
  return videos.filter((v) => v.gameId === gameId);
}

export function debatesForGame(gameId: string): Debate[] {
  return debates.filter((d) => d.gameId === gameId);
}

export function similarGames(game: Game): Game[] {
  return game.similarIds.map((id) => gameById(id)).filter((g): g is Game => Boolean(g));
}

export function reviewForGame(gameId: string): Review | undefined {
  return reviews.find((r) => r.gameId === gameId);
}

export interface SearchResults {
  games: Game[];
  news: NewsItem[];
  reviews: Review[];
  videos: VideoItem[];
  debates: Debate[];
  total: number;
}

export function searchAll(query: string): SearchResults {
  const q = query.trim().toLowerCase();
  if (!q) return { games: [], news: [], reviews: [], videos: [], debates: [], total: 0 };
  const g = games.filter((x) => (x.title + " " + x.tags.join(" ") + " " + x.studio).toLowerCase().includes(q));
  const n = news.filter((x) => (x.title + " " + x.excerpt + " " + x.category).toLowerCase().includes(q));
  const r = reviews.filter((x) => x.title.toLowerCase().includes(q));
  const v = videos.filter((x) => (x.title + " " + x.category).toLowerCase().includes(q));
  const d = debates.filter((x) => (x.title + " " + x.excerpt).toLowerCase().includes(q));
  return { games: g, news: n, reviews: r, videos: v, debates: d, total: g.length + n.length + r.length + v.length + d.length };
}
