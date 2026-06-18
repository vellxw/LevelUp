"use client";

import { useEffect } from "react";
import { useRadar } from "@/lib/store";
import type { SavedType } from "@/lib/types";

export function TrackView({ id, type, title, href }: { id: string; type: SavedType; title: string; href: string }) {
  const push = useRadar((s) => s.pushHistory);
  useEffect(() => {
    push({ id, type, title, href });
  }, [id, type, title, href, push]);
  return null;
}
