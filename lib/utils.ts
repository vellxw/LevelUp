import clsx from "clsx";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function coverStyle(seed: string, coverUrl?: string): React.CSSProperties {
  if (coverUrl) {
    return {
      backgroundImage: `url(${coverUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  const h = hashString(seed);
  const a = h % 360;
  const b = (a + 40 + (h % 60)) % 360;
  return {
    backgroundImage:
      `radial-gradient(120% 120% at 18% 12%, hsl(${a} 58% 22%) 0%, transparent 55%),` +
      `radial-gradient(120% 120% at 85% 88%, hsl(${b} 52% 16%) 0%, transparent 60%),` +
      `linear-gradient(135deg, #0c0d10 0%, #16181d 100%)`,
  };
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

export function relativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.round((then - now) / 1000);
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  return rtf.format(Math.round(diff / 86400), "day");
}

export function formatViews(n: number): string {
  return new Intl.NumberFormat("es", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function scoreTone(score: number): "high" | "mid" | "low" {
  if (score >= 8) return "high";
  if (score >= 6) return "mid";
  return "low";
}

export function priceFormat(value: number): string {
  return value.toLocaleString("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function isLikelyEnglish(text: string): boolean {
  return /[A-Za-z]/.test(text) && !/[áéíóúñüÁÉÍÓÚÑÜ]/.test(text);
}
