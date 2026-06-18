import type { Offer } from "@/lib/types";

export const offers: Offer[] = [
  { id: "o-1", gameId: "g-stellar", store: "Steam", price: 41.99, oldPrice: 59.99, discountPct: 30, endsISO: "2026-06-20T23:59:00Z" },
  { id: "o-2", gameId: "g-helldivers", store: "PS Store", price: 27.99, oldPrice: 39.99, discountPct: 30, endsISO: "2026-06-18T23:59:00Z" },
  { id: "o-3", gameId: "g-mhwilds", store: "Steam", price: 53.99, oldPrice: 69.99, discountPct: 23, endsISO: "2026-06-22T23:59:00Z" },
  { id: "o-4", gameId: "g-elden", store: "Xbox Store", price: 29.99, oldPrice: 39.99, discountPct: 25, endsISO: "2026-06-19T23:59:00Z" },
  { id: "o-5", gameId: "g-split", store: "Steam", price: 35.99, oldPrice: 49.99, discountPct: 28, endsISO: "2026-06-21T23:59:00Z" },
];

export function offerByGame(gameId: string): Offer | undefined {
  return offers.find((o) => o.gameId === gameId);
}
