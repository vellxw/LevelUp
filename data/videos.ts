import type { VideoItem } from "@/lib/types";

export const videos: VideoItem[] = [
  {
    id: "v-wukong",
    slug: "wukong-trailer-xbox",
    title: "Black Myth: Wukong - Tráiler oficial de lanzamiento",
    durationSec: 154,
    category: "Tráiler",
    gameId: "g-wukong",
    dateISO: "2026-06-12T15:00:00Z",
    views: 842000,
    seed: "vwukong",
    youtubeId: "5530I_pYlhg",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg"
  },
  {
    id: "v-gta6",
    slug: "gta-6-segundo-trailer",
    title: "Grand Theft Auto VI - Tráiler de revelación oficial 1",
    durationSec: 90,
    category: "Tráiler",
    gameId: "g-gta6",
    dateISO: "2026-06-07T16:00:00Z",
    views: 210000000,
    seed: "vgta",
    youtubeId: "QdBZY2fkU-0",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png"
  },
  {
    id: "v-hades",
    slug: "hades-ii-analisis-video",
    title: "Hades II - Tráiler de revelación del acceso anticipado",
    durationSec: 135,
    category: "Gameplay",
    gameId: "g-hades2",
    dateISO: "2026-06-08T12:00:00Z",
    views: 2840000,
    seed: "vhades",
    youtubeId: "l-p5Z_Xk1dI",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg"
  },
  {
    id: "v-mhwilds",
    slug: "monster-hunter-wilds-mejores-armas",
    title: "Monster Hunter Wilds - Tráiler oficial de gameplay",
    durationSec: 180,
    category: "Tráiler",
    gameId: "g-mhwilds",
    dateISO: "2026-06-05T14:00:00Z",
    views: 1350000,
    seed: "vmh",
    youtubeId: "nQ9-pX2y9wM",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg"
  },
  {
    id: "v-stellar",
    slug: "stellar-blade-pc-tech",
    title: "Stellar Blade - Tráiler oficial de jugabilidad de PlayStation",
    durationSec: 258,
    category: "Análisis",
    gameId: "g-stellar",
    dateISO: "2026-06-06T13:00:00Z",
    views: 4500000,
    seed: "vstellar",
    youtubeId: "t778zMst1r4",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg"
  },
  {
    id: "v-doom",
    slug: "doom-the-dark-ages-reveal",
    title: "DOOM: The Dark Ages - Tráiler de revelación mundial oficial",
    durationSec: 114,
    category: "Tráiler",
    gameId: "g-doom",
    dateISO: "2026-06-09T10:00:00Z",
    views: 6800000,
    seed: "vdoom",
    youtubeId: "4Gp050gY5e8",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg"
  },
  {
    id: "v-cyberpunk",
    slug: "cyberpunk-phantom-liberty",
    title: "Cyberpunk 2077: Phantom Liberty - Tráiler oficial de lanzamiento",
    durationSec: 160,
    category: "Gameplay",
    gameId: "g-cyberpunk",
    dateISO: "2026-06-11T12:00:00Z",
    views: 12500000,
    seed: "vcyber",
    youtubeId: "j20BqGZpGso",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg"
  }
];

export function videoBySlug(slug: string): VideoItem | undefined {
  return videos.find((v) => v.slug === slug);
}
