"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { SavedRef, HistoryRef } from "@/lib/types";

interface RadarState {
  followedGameIds: string[];
  platformIds: string[];
  genreIds: string[];
  saved: SavedRef[];
  alerts: Record<string, boolean>;
  history: HistoryRef[];
  onboardingComplete: boolean;
  toggleFollow: (gameId: string) => void;
  setFollowed: (ids: string[]) => void;
  togglePlatform: (id: string) => void;
  toggleGenre: (id: string) => void;
  setPlatforms: (ids: string[]) => void;
  setGenres: (ids: string[]) => void;
  toggleSave: (item: Omit<SavedRef, "at">) => void;
  toggleAlert: (gameId: string) => void;
  pushHistory: (item: Omit<HistoryRef, "at">) => void;
  completeOnboarding: (prefs: { platformIds: string[]; genreIds: string[]; followedGameIds: string[] }) => void;
  resetRadar: () => void;
}

const MAX_HISTORY = 24;

export const useRadar = create<RadarState>()(
  persist(
    (set) => ({
      followedGameIds: [],
      platformIds: [],
      genreIds: [],
      saved: [],
      alerts: {},
      history: [],
      onboardingComplete: false,
      toggleFollow: (gameId) =>
        set((s) => ({
          followedGameIds: s.followedGameIds.includes(gameId)
            ? s.followedGameIds.filter((g) => g !== gameId)
            : [...s.followedGameIds, gameId],
        })),
      setFollowed: (ids) => set({ followedGameIds: Array.from(new Set(ids)) }),
      togglePlatform: (id) =>
        set((s) => ({
          platformIds: s.platformIds.includes(id)
            ? s.platformIds.filter((p) => p !== id)
            : [...s.platformIds, id],
        })),
      toggleGenre: (id) =>
        set((s) => ({
          genreIds: s.genreIds.includes(id)
            ? s.genreIds.filter((g) => g !== id)
            : [...s.genreIds, id],
        })),
      setPlatforms: (ids) => set({ platformIds: Array.from(new Set(ids)) }),
      setGenres: (ids) => set({ genreIds: Array.from(new Set(ids)) }),
      toggleSave: (item) =>
        set((s) => {
          const exists = s.saved.some((x) => x.id === item.id && x.type === item.type);
          return {
            saved: exists
              ? s.saved.filter((x) => !(x.id === item.id && x.type === item.type))
              : [{ ...item, at: Date.now() }, ...s.saved],
          };
        }),
      toggleAlert: (gameId) =>
        set((s) => ({ alerts: { ...s.alerts, [gameId]: !s.alerts[gameId] } })),
      pushHistory: (item) =>
        set((s) => {
          const filtered = s.history.filter((h) => !(h.id === item.id && h.type === item.type));
          return { history: [{ ...item, at: Date.now() }, ...filtered].slice(0, MAX_HISTORY) };
        }),
      completeOnboarding: (prefs) =>
        set({
          platformIds: Array.from(new Set(prefs.platformIds)),
          genreIds: Array.from(new Set(prefs.genreIds)),
          followedGameIds: Array.from(new Set(prefs.followedGameIds)),
          onboardingComplete: true,
        }),
      resetRadar: () =>
        set({
          followedGameIds: [],
          platformIds: [],
          genreIds: [],
          saved: [],
          alerts: {},
          history: [],
          onboardingComplete: false,
        }),
    }),
    { name: "levelup-radar-v1" },
  ),
);

export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export function useIsFollowing(gameId: string): boolean {
  return useRadar((s) => s.followedGameIds.includes(gameId));
}

export function useIsSaved(id: string): boolean {
  return useRadar((s) => s.saved.some((x) => x.id === id));
}
