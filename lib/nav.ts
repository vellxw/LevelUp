export interface NavItem {
  href: string;
  label: string;
}

export const primaryNav: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/mi-radar", label: "Mi Radar" },
  { href: "/noticias", label: "Noticias" },
  { href: "/juegos", label: "Juegos" },
  { href: "/reviews", label: "Reviews" },
  { href: "/videos", label: "Videos" },
  { href: "/comunidad", label: "Comunidad" },
];
