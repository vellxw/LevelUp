import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { MobileNav } from "@/components/shell/MobileNav";
import { Footer } from "@/components/shell/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LuLiveTicker } from "@/components/ui/LuLiveTicker";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: {
    default: "LevelUp - Tu radar gamer en Latinoamérica",
    template: "%s | LevelUp",
  },
  description:
    "LevelUp transforma la información gamer en una experiencia de seguimiento personalizada: seguí juegos, plataformas y temas para decidir mejor qué jugar, comprar o esperar.",
};

export const viewport: Viewport = {
  themeColor: "#060607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tickerItems = news.slice(0, 6).map((n) => n.title);
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-ink antialiased">
        <Preloader />
        <CustomCursor />
        <a href="#contenido" className="lu-skiplink">Saltar al contenido</a>
        <Header />
        <main id="contenido" className="pb-24 lg:pb-0">
          {children}
        </main>
        <LuLiveTicker items={tickerItems} />
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
