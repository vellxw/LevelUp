# Colorize + Bolder + Quieter — Reporte consolidado

**Fecha:** 2026-06-18
**Scope:** Sistema de color, peso visual, intensidad de motion
**Veredicto general:** El proyecto está **más cerca de "quieter"** que de "bolder/colorize". El sistema de color es correcto (paleta oscura editorial, rojo acento), pero la ejecución está **over-decorada** con motion y efectos que compiten con el contenido. Hay que **quitar y refinar**, no agregar.

---

## Diagnóstico

### Estado actual de color
- **Paleta:** negra + grises + rojo (#E50914) + verde/ámbar para estado. Cumple `.impeccable.md` (restricción cromática).
- **Distribución:**
  - 90% superficies oscuras (correcto)
  - 8% grises text hierarchy (correcto)
  - 2% rojo acento + verde/ámbar estado (correcto)
- **Problema:** el rojo se usa **solo en CTA primary y badges "live/new"**. No hay jerarquía de color significativa. El `text-ink-faint` (3.89:1) está mal calibrado (ver NORM-001).

### Estado actual de boldness
- **Tipografía:** Rajdhani Bold 700 en headings funciona, da el "editorial" buscado.
- **Color:** Paleta monocromática + 1 acento. Correcto.
- **Escala:** Hero h1 con `clamp(2rem, 5vw, 4.2rem)` es dramatic. LuSectionHeader h2 con `clamp(1.6rem, 3vw, 2.4rem)` es similar.
- **Problema:** scale jumps no son tan dramáticos como podrían. El "1 + 3" card patterns no existen. La card 1 de cada grid se ve igual a las demás.

### Estado actual de motion (intensidad)
- **Capas activas en home:** Glitch + Scanlines + CustomCursor + Preloader + Magnetic (5+ elementos) + Reveal + Marquee + Hover transforms.
- **Total: 8+ capas de motion decorativo en home.**
- **Problema:** Saturación. Ver critique-003 y audit UX-001.

---

## Fase QUIETER — Acciones prioritarias

### P0 — Quitar

#### QUIET-001 · CustomCursor global
- **Location:** `app/globals.css` + `components/ui/CustomCursor.tsx`
- **Acción:** Gate por media query `(pointer: fine) and (hover: hover)`. Solo desktop con mouse. NO en touch.
- **Beneficio:** Accesibilidad (motricidad), batería, performance, "menos Awwwards, más editorial".

#### QUIET-002 · Preloader bloqueante
- **Location:** `components/ui/Preloader.tsx`
- **Acción:** 
  - Reducir duración máxima a 1.5s (forzar fin con timeout)
  - Agregar botón "Saltar preloader" visible
  - `prefers-reduced-motion: reduce` → skip directo al contenido
- **Beneficio:** Accesibilidad + UX (usuarios recurrentes no quieren preloader cada vez).

#### QUIET-003 · Glitch effect (`lu-glitch` y animaciones)
- **Location:** `app/globals.css` líneas 108-150 (keyframes `glitch-anim` y `glitch-anim2`)
- **Acción:** Mantener definidos pero **NO usar en producción**. Reemplazar uso actual (verificar dónde se aplica).
- **Beneficio:** El "wow factor" no compensa la ilegibilidad temporal que introduce.

#### QUIET-004 · Scanlines en exceso
- **Location:** `app/globals.css` + LuGameCard, LuNewsCard, LuReviewCard, LuVideoCard, Hero
- **Acción:** Mantener solo en Hero. Quitar de cards.
- **Beneficio:** Cards ya tienen cover image. Scanlines sobre cover compite con la imagen.

#### QUIET-005 · Magnetic en nav
- **Location:** `components/shell/Header.tsx`
- **Acción:** Quitar Magnetic de los nav items. Es decorativo y agrega jank.
- **Beneficio:** Nav limpio, focus en contenido.

### P1 — Reducir

#### QUIET-006 · Reveal en cada card
- **Location:** `app/page.tsx` y listados
- **Acción:** Reveal solo a nivel sección, no por card. Una sección aparece junta.
- **Beneficio:** Sensación de "sección" en vez de "items apareciendo uno a uno".

#### QUIET-007 · Hover transforms muy sutiles
- **Location:** LuCard `-translate-y-1` (4px) en hover
- **Acción:** Aumentar a `-translate-y-2` (8px) O agregar cambio de color más fuerte (`hover:border-brand`).
- **Beneficio:** Hover state se siente intencional. Combina con QUIET-005.

#### QUIET-008 · Animaciones de Marquee largas
- **Location:** `LuLiveTicker.tsx` (animation `marquee 30s`)
- **Acción:** Considerar 45-60s para que sea "lectura" no "feed". 
- **Beneficio:** Más editorial.

---

## Fase BOLDER — Acciones puntuales (no widespread)

### P1 — Jerarquizar

#### BOLD-001 · LuButton primary necesita más peso
- **Location:** `components/ui/LuButton.tsx`
- **Acción:** Cambiar `shadow-soft` → `shadow-glow`. Aumentar contraste.
- **Beneficio:** CTA primary se ve como CTA primary. Ver critique-002.

#### BOLD-002 · Score badge más prominente
- **Location:** `LuReviewCard.tsx`, `LuGameCard.tsx`
- **Acción:** Score badge de 12x12 (w-12 h-12) → 14x14, agregar `shadow-glow` para scores >8.0.
- **Beneficio:** El "9.3" o "9.5" se siente como celebrarlo.

#### BOLD-003 · Primera card de cada grid = hero card
- **Location:** listados (`/juegos`, `/reviews`, `/videos`, `/noticias`)
- **Acción:** Permitir prop `featured` o usar índice 0 con `col-span-2 row-span-2` o aspect distinto.
- **Beneficio:** Pattern de "1 destacado + 3 standard" crea jerarquía.

#### BOLD-004 · Hero section más dramática
- **Location:** `components/home/Hero.tsx`
- **Acción:** Considerar expandir el hero a full-bleed (100vw, edge-to-edge) en lugar de constrained en container. El ratio 65/35 está bien.
- **Beneficio:** Hero se siente como portada de revista, no como sección más.

### P2 — Detalles

#### BOLD-005 · Hover en cards con shadow-raised
- **Location:** LuCard
- **Acción:** `hover:shadow-raised` (no `-translate-y-1` solo).
- **Beneficio:** Sombra dramática en hover, no solo movimiento.

#### BOLD-006 · Eyebrow con color brand
- **Location:** `LuSectionHeader` cuando la sección es de "actualidad"
- **Acción:** `eyebrowColor="brand"` opcional. Default muted. Secciones "INDUSTRIA" o "EN VIVO" → brand.
- **Beneficio:** El rojo aparece en más lugares con propósito, no solo en CTAs.

---

## Fase COLORIZE — Limitado (paleta ya está bien)

### P1 — Semántica de color más rica

#### COLOR-001 · Categorías con color
- **Location:** LuBadge `kind="category"` actualmente usa `text-ink-muted bg-surface3`
- **Acción:** Mapear categoría → color (Industry = brand, Esports = amber, Lanzamientos = positive, etc.)
- **Beneficio:** El usuario escanea más rápido. "Quiero ver INDUSTRIA" salta a la vista.

#### COLOR-002 · Status de juegos con color semántico
- **Location:** LuGameCard badge status
- **Acción:**
  - "Anunciado" = ink-muted (gris)
  - "Próximo" = warning (ámbar) - expectación
  - "Disponible" = positive (verde) - éxito
  - "Actualizado" = brand live (rojo pulsante) - en vivo
- **Beneficio:** Escaneo visual de estado de catálogo instantáneo.

#### COLOR-003 · CountdownTimer con color dinámico
- **Location:** `LuCountdownTimer.tsx`
- **Acción:** 
  - >30 días: ink (gris, no urge)
  - 7-30 días: warning (ámbar, expectación)
  - <7 días: brand (rojo, urgente)
- **Beneficio:** El usuario sabe qué lanzamiento está por salir.

---

## Resumen ejecutivo

| Categoría | Acción principal                                     |
| --------- | ---------------------------------------------------- |
| Quieter   | Quitar 5 motion decorativos (CustomCursor, Preloader, Glitch, Scanlines, Magnetic) |
| Quieter   | Reducir Reveal scope y hover subtles                 |
| Bolder    | Fortalecer CTA primary + score badges + primera card |
| Bolder    | Hero más full-bleed                                  |
| Colorize  | Categorías y status con color semántico              |
| Colorize  | Countdown con urgencia por color                     |

**Net effect:** Menos motion, más color con propósito, jerarquía más fuerte. El proyecto se siente "editorial confiado" en lugar de "Awwwards-wannabe".

---

## Suggested Commands

- `distill` — para quitar/quedar.
- `polish` — para pass final.
- `clarify` — para la copy de CTAs duplicados.
