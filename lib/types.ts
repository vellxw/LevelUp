export type GameStatus = "anunciado" | "proximo" | "disponible" | "actualizado";

export interface Platform {
  id: string;
  name: string;
  short: string;
  accent: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  studio: string;
  publisher: string;
  platformIds: string[];
  genreIds: string[];
  status: GameStatus;
  releaseDate: string;
  releaseLabel: string;
  summary: string;
  description: string[];
  tags: string[];
  editorialScore: number | null;
  communityScore: number | null;
  hypeCount: number;
  similarIds: string[];
  updateNote: string | null;
  seed: string;
  coverUrl?: string;
}

export interface NewsLevels {
  quePaso: string;
  porQueImporta: string;
  decidir: string;
  notaCompleta: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateISO: string;
  author: string;
  gameId: string | null;
  readTimeMin: number;
  levels: NewsLevels;
  seed: string;
  featured?: boolean;
  coverUrl?: string;
}

export interface Review {
  id: string;
  slug: string;
  gameId: string;
  title: string;
  editorialScore: number;
  userScore: number;
  pros: string[];
  cons: string[];
  verdict: string;
  body: string[];
  author: string;
  dateISO: string;
  platformTested: string;
  coverUrl?: string;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  durationSec: number;
  category: string;
  gameId: string | null;
  dateISO: string;
  views: number;
  seed: string;
  coverUrl?: string;
  youtubeId?: string;
}

export interface Debate {
  id: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  replies: number;
  likes: number;
  dateISO: string;
  gameId: string | null;
}

export interface Offer {
  id: string;
  gameId: string;
  store: string;
  price: number;
  oldPrice: number;
  discountPct: number;
  endsISO: string;
}

export interface AlertItem {
  id: string;
  gameId: string;
  kind: "lanzamiento" | "actualizacion" | "oferta" | "noticia";
  message: string;
  dateISO: string;
}

export type SavedType = "news" | "review" | "video" | "game" | "guide";

export interface SavedRef {
  id: string;
  type: SavedType;
  title: string;
  href: string;
  at: number;
}

export interface HistoryRef {
  id: string;
  type: SavedType;
  title: string;
  href: string;
  at: number;
}
