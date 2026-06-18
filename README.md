# LevelUp

Medio gamer latinoamericano de nueva generación. No es solo un feed de noticias: convierte la información gamer en una experiencia de seguimiento personalizada con **Mi Radar**, donde cada usuario sigue juegos, plataformas y temas para decidir mejor qué jugar, comprar o esperar.

> La competencia informa. LevelUp acompaña.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** estricto
- **Tailwind CSS v3** con sistema de tokens (sin colores/estilos hardcodeados fuera de tokens)
- **Zustand** + persistencia en `localStorage` (estado de Mi Radar)
- Animaciones con **CSS + IntersectionObserver** (reveal, hover, ticker, radar), respetando `prefers-reduced-motion`
- Iconos SVG propios (sin dependencias pesadas)
- Datos **mock tipados** con relaciones (noticias <-> juegos <-> reviews <-> videos <-> comunidad)

## Scripts

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción
npm run start      # servir build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Home editorial y modular con hero, ticker en vivo, preview de Mi Radar, lanzamientos, ofertas, reviews, videos y comunidad |
| `/onboarding` | Configuración inicial de Mi Radar (plataformas -> géneros -> juegos -> confirmar) |
| `/mi-radar` | Panel personalizado: seguidos, plataformas, temas, alertas, recomendaciones, guardados |
| `/noticias` | Listado con filtros por categoría |
| `/noticias/[slug]` | Nota con **lectura por niveles** (Qué pasó / Por qué importa / Decidir / Nota completa) |
| `/juegos` | Catálogo con filtros por plataforma, género y estado |
| `/juegos/[slug]` | Ficha viva: resumen, noticias, review, videos, lanzamiento, comunidad, similares |
| `/reviews` | Listado de reviews |
| `/reviews/[slug]` | Review detallada (puntaje editorial y de comunidad, pros/contras, veredicto) |
| `/videos` | Hub de videos con reproductor destacado y filtros |
| `/comunidad` | Debates y actividad |
| `/buscar` | Búsqueda global (juegos, noticias, reviews, videos) |
| `/perfil` | Intereses, historial, guardados, alertas, configuración |
| `/notificaciones` | Alertas mock de la industria y de juegos seguidos |
| `/design-system` | Documentación visual del diseño atómico (tokens, átomos, moléculas) |

## Sistema de diseño

Tokens en `app/globals.css` (CSS variables) mapeados en `tailwind.config.ts`. Paleta oscura editorial (rojo `#E50914` como acento de actualidad, verde solo para estado positivo). Tipografías: **Rajdhani** (display), **Inter** (cuerpo), **IBM Plex Mono** (datos).

Átomos: `LuButton`, `LuBadge`, `LuCard`, `LuChip`, `LuSectionHeader`, `LuCorners`, `LuDivider`, `LuScoreBadge`, `LuPlatformTag`. Layout: `LuSection`, `LuContainer`, `LuGrid`, `LuCol`, `LuStack`. Moléculas: `LuNewsCard`, `LuGameCard`, `LuReviewCard`, `LuVideoCard`, `LuFilterBar`, `LuCountdownTimer`, `LuLiveTicker`, `LuMetricCard`.

## Mi Radar (personalización)

El store de Zustand (`lib/store.ts`) persiste en `localStorage` (clave `levelup-radar-v1`): juegos seguidos, plataformas, géneros, guardados, alertas, historial y estado de onboarding. La home y las recomendaciones cambian según estos intereses; el seguimiento persiste al recargar.

## Accesibilidad

Contraste AA, navegación por teclado, focus visible, `aria-*` y roles donde corresponde, skip link, targets táctiles >=44px, soporte de `prefers-reduced-motion`, y no se depende solo del color.
