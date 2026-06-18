"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Radar, Gamepad2, Star, User } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Inicio", Icon: Home },
  { href: "/mi-radar", label: "Mi Radar", Icon: Radar },
  { href: "/juegos", label: "Juegos", Icon: Gamepad2 },
  { href: "/reviews", label: "Reviews", Icon: Star },
  { href: "/perfil", label: "Perfil", Icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed inset-x-0 bottom-0 z-nav border-t border-line bg-bg/95 backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {items.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
                  active ? "text-brand" : "text-ink-faint hover:text-ink-muted",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
