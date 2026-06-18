import type { Platform } from "@/lib/types";

export const platforms: Platform[] = [
  { id: "pc", name: "PC", short: "PC", accent: "#59D65C" },
  { id: "ps5", name: "PlayStation 5", short: "PS5", accent: "#4F8BFF" },
  { id: "xsx", name: "Xbox Series X|S", short: "XSX", accent: "#59D65C" },
  { id: "switch", name: "Nintendo Switch", short: "NSW", accent: "#E50914" },
  { id: "switch2", name: "Nintendo Switch 2", short: "NSW2", accent: "#E50914" },
  { id: "mobile", name: "Mobile", short: "MOB", accent: "#E7A83A" },
];

export function platformById(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id);
}
