import Link from "next/link";
import { Logo } from "@/components/shell/Logo";
import { primaryNav } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-surface1">
      <div className="mx-auto max-w-shell px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm text-ink-muted">
              El medio gamer latinoamericano que transforma la información en una experiencia de seguimiento personalizada.
            </p>
            <p className="mt-4 lu-mono text-[11px] uppercase tracking-wider text-ink-faint">
              La competencia informa. LevelUp acompaña.
            </p>
          </div>
          <nav aria-label="Pie" className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {primaryNav.map((i) => (
              <Link key={i.href} href={i.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                {i.label}
              </Link>
            ))}
            <Link href="/design-system" className="text-sm text-ink-muted transition-colors hover:text-ink">Sistema de diseño</Link>
            <Link href="/buscar" className="text-sm text-ink-muted transition-colors hover:text-ink">Buscar</Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 lu-mono text-[11px] uppercase tracking-wider text-ink-faint sm:flex-row sm:justify-between">
          <span>// LevelUp 2026 - Proyecto editorial</span>
          <span>México - Latinoamérica</span>
        </div>
      </div>
    </footer>
  );
}
