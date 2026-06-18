import type { Genre } from "@/lib/types";

export const genres: Genre[] = [
  { id: "shooter", name: "Shooter" },
  { id: "moba", name: "MOBA" },
  { id: "rpg", name: "RPG" },
  { id: "accion", name: "Acción" },
  { id: "aventura", name: "Aventura" },
  { id: "indie", name: "Indie" },
  { id: "deportes", name: "Deportes" },
  { id: "estrategia", name: "Estrategia" },
  { id: "terror", name: "Terror" },
  { id: "mundo-abierto", name: "Mundo abierto" },
  { id: "coop", name: "Cooperativo" },
];

export function genreById(id: string): Genre | undefined {
  return genres.find((g) => g.id === id);
}
