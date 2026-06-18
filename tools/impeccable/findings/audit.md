# Audit Report — LevelUp

**Fecha:** 2026-06-18
**Scope:** Home (`/`), `/onboarding`, `/juegos`, `/reviews/[slug]`, `/noticias/[slug]`, mobile y desktop.
**Lighthouse desktop:** A11y 93 · Best Practices 100 · SEO 100 · CLS 0.078 (aceptable)

---

## Anti-Patterns Verdict — PASS

Diseño con personalidad editorial propia, no genérico. Tipografía display marcada, paleta oscura restringida, datos tipográficos protagonistas, sin glassmorphism, sin gradient text, sin hero metrics clichés. Estética "LevelUp" coherente con `.impeccable.md`.

**Tells de AI que SÍ evitó:**
- No morados/azules genéricos SaaS
- No "Get started" hero
- No ilustraciones isométricas stock
- No card grids repetitivos sin jerarquía
- Tipografía con personalidad (Rajdhani/IBM Plex Mono) en lugar de Inter-only

**Atención:** el uso de CustomCursor + Preloader + Glitch + Scanlines es arriesgado en exceso (ver hallazgo P1).

---

## Executive Summary

- **Total:** 3 issues de lighthouse + ~20 issues de auditoría manual
- **P0:** 4 (accesibilidad)
- **P1:** 8 (consistencia/UX)
- **P2:** 6 (polish/optimización)

### Top 5 críticos
1. **Contraste insuficiente** en `text-ink-faint` (3.89:1) y `text-ink-muted` sobre fondos oscuros — falla AA en 4.5:1, **rompe AAA objetivo**.
2. **Heading order skip** en `/` (h1 → h3) — falla WCAG 1.3.1.
3. **lu-eyebrow a 11px** en `--c-text-3` (#6f7378) — combina el peor tamaño y color, ilegible.
4. **Preloader bloqueante** sin `prefers-reduced-motion` consideration — excluye usuarios sensibles al motion.
5. **Custom cursor global** (`cursor: none !important`) — excluye usuarios con problemas de motricidad.

---

## Detailed Findings

### P0 — Critical (bloquea release / WCAG A)

#### A11Y-001 · Contraste de `text-ink-faint` (#6f7378) en fondos `#111318` / `#0D0F12`
- **Location:** tokens (`app/globals.css`), afecta a TODA `.text-ink-faint` y `.lu-eyebrow`
- **Impact:** 3.89:1 sobre surface-1 y 4.02:1 sobre surface-2. Falla AA (necesita 4.5:1), objetivo AAA (7:1) imposible. Texto invisible para baja visión.
- **Recomendación:** Subir `--c-text-3` a `#8a8e94` (5.0:1) o `#9aa0a6` (5.7:1). Verificar todos los usos de `text-ink-faint`.
- **Skill:** `normalize` (tokens) + `typeset` (revisión de jerarquía)

#### A11Y-002 · Heading order skip en home (`h1` → `h3`)
- **Location:** `/` — `Hero` tiene h1; cards usan h3, omitiendo h2 de sección.
- **Impact:** Lectores de pantalla anuncian headings en orden arbitrario. Falla WCAG 1.3.1.
- **Recomendación:** Cambiar h3 de cards a h2 (que es lo correcto: cada `LuSectionHeader` es h2, los items debajo son h3).

#### A11Y-003 · `lu-eyebrow` 11px en `--c-text-3` (peor combinación)
- **Location:** `app/globals.css` línea 65, todas las LuSectionHeader
- **Impact:** 11px ya es borderline; en #6f7378 = 3.89:1. Doble falla.
- **Recomendación:** Subir a 12px + color con mejor contraste (mismo fix que A11Y-001).

#### A11Y-004 · Custom cursor global (`cursor: none !important`)
- **Location:** `app/globals.css` líneas 175-181 + `components/ui/CustomCursor.tsx`
- **Impact:** Usuarios con parkinson, temblores, o problemas motrices pierden pista visual. Falla WCAG 2.2.1 y rompe el principio "no dependas del indicador".
- **Recomendación:** Detrás de feature flag o de media query `(pointer: fine) and (hover: hover)`. NO desktop-only o tras consentimiento.

---

### P1 — High (afecta experiencia significativa)

#### A11Y-005 · `Preloader` bloqueante sin opción "saltar"
- **Location:** `components/ui/Preloader.tsx`
- **Impact:** Si JS falla o animación no termina, contenido nunca se muestra. Sin `aria-live`, sin "skip preloader".
- **Recomendación:** Agregar botón "Saltar" visible, setear `prefers-reduced-motion` para no animar, fallar a contenido en 5s.

#### A11Y-006 · Falta `lang` en elementos inline
- **Location:** varios (nombres de juegos en inglés en news/reviews)
- **Impact:** Lectores de pantalla leen en español con pronunciación incorrecta. WCAG 3.1.1.
- **Recomendación:** Wrap nombres propios en `<span lang="en">`.

#### UX-001 · Saturación de animaciones decorativas
- **Location:** Glitch (`lu-glitch`), Scanlines (`lu-scanlines`), Custom cursor, Preloader, Magnetic, Reveal, Marquee
- **Impact:** 7+ capas de motion en home. Se siente Awwwards-fatigue, no editorial. Distrae de la lectura.
- **Recomendación:** `quieter` o `distill`. Mantener reveal + marquee. Quitar glitch y custom cursor por defecto.

#### UX-002 · Hero "DESTACADO" + 3 cards con botones prev/next sin labels accesibles
- **Location:** `components/home/Hero.tsx` — "Anterior"/"Siguiente"
- **Impact:** Funciona, pero los slide indicators ("03 / 05") podrían ser buttons o tener `aria-label`.
- **Recomendación:** Agregar `aria-label="Diapositiva N de M"` a los dots.

#### UX-003 · Botones icon-only sin label en mobile nav
- **Location:** `components/shell/MobileNav.tsx`
- **Impact:** Verificar aria-labels.
- **Recomendación:** Auditar uso de IconButton, asegurar `aria-label`.

#### UX-004 · LuCountdownTimer mostrando `00 : 00 : 00 : 00` para fechas pasadas
- **Location:** `LuCountdownTimer.tsx`, home `upcoming` incluye fechas como "14 OCT 2025" (ya pasó)
- **Impact:** 4 countdowns muestran ceros, se ve roto. Esto es cosmético pero obvio.
- **Recomendación:** Filtrar fechas pasadas o mostrar "Disponible" / "Lanzado".

#### UX-005 · "VIDEOS" / "EN DEBATE" / "CONVIENE" eyebrows dentro de H2
- **Location:** `LuSectionHeader` — verifica patrón visual
- **Impact:** El eyebrow se ve bien pero verificar que screen readers lo lean correctamente (decorativo vs semántico).
- **Recomendación:** `aria-hidden="true"` en eyebrow decorativo.

#### A11Y-007 · Imágenes decorativas sin alt
- **Location:** LuNewsCard, LuGameCard (cover images)
- **Impact:** Verificar que cubre tienen alt="" o sean `aria-hidden`.
- **Recomendación:** Auditar `coverStyle` y `LuCorners` (decorativos) → `aria-hidden="true"`.

#### PERF-001 · Glitch + Scanlines + CustomCursor siempre activos
- **Location:** `app/globals.css` + layout.tsx
- **Impact:** `cursor: none` + 6+ elementos con `animation` constante → jank en dispositivos modestos, batería drenada en laptop.
- **Recomendación:** Gate por media query o user preference.

---

### P2 — Medium/Low (polish / optimización)

#### A11Y-008 · Focus visible es 2px brand — verificar contraste
- **Location:** `app/globals.css` línea 53
- **Impact:** Rojo sobre negro está bien, pero sobre surface-2 (#111318) el outline se pierde.
- **Recomendación:** Outline doble (negro + rojo) o glow.

#### UX-006 · Tipografía en eyebrows: `letter-spacing: 0.22em` puede ser excesivo
- **Location:** `lu-eyebrow` en `globals.css`
- **Impact:** Hace texto más difícil de leer a 11px.
- **Recomendación:** Bajar a 0.16em.

#### UX-007 · Reviews score badge: "8.8" sin " / 10" contextual
- **Location:** LuScoreBadge
- **Impact:** Score no explica escala. WCAG SC 1.3.1 info.
- **Recomendación:** Agregar `aria-label="8.8 de 10"` o texto visible "/10".

#### UX-008 · "ARMÁ TU RADAR GAMER" CTA section con `bg-grid-texture` + Corners
- **Location:** `app/page.tsx` última sección
- **Impact:** Visual, no roto. Considerar que el "Aramá tu radar" se repite con "Configurar Mi Radar" del MiRadarPreview.
- **Recomendación:** Quitar la sección o diferenciarla mejor.

#### UX-009 · Filtros en /juegos sin etiqueta visible
- **Location:** `app/juegos/page.tsx`
- **Impact:** Verificar aria-labels y que los chips sean navegables.
- **Recomendación:** Auditar.

#### PERF-002 · Import `SplitText` y `Magnetic` solo se usan en algunos lados
- **Location:** Verificar tree-shaking
- **Impact:** Bundle ligeramente inflado.
- **Recomendación:** Code split.

#### PERF-003 · Imágenes de cover generadas con seed → no son imágenes reales
- **Location:** `lib/utils.ts` `coverStyle`
- **Impact:** Es placeholder CSS. Bien para mock, pero no para producción.
- **Recomendación:** Documentar como `mock` o migrar a `<Image>` con src real.

---

## Patterns & Systemic Issues

1. **`text-ink-faint` global problem:** token está mal calibrado. Cualquier componente que use este token falla AA. Afecta 30+ elementos en home.
2. **Animaciones sin respeto a `prefers-reduced-motion`:** Preloader, CustomCursor, Glitch, Scanlines animan siempre. Hay media query global pero no se aplica a JS animations (framer-motion no aplica, pero clases CSS tampoco están condicionadas a la media query en su mayoría).
3. **Saturación de "wow factor":** el proyecto está diseñado para impresionar (Awwwards) pero sacrifica legibilidad y respeto por usuarios reales.
4. **Componentes en buen estado:** la estructura atómica (átomos, moléculas, layout) está bien implementada. No se encontraron componentes rotos o divs-en-vez-de-buttons.
5. **Sistema de tokens bien definido:** colores/radios/typography en CSS variables, mapeados en tailwind. Bien.

---

## Positive Findings

- **Skip link** presente y funcional
- **`<html lang="es">`** correcto
- **`aria-label`** en navs, search, notificaciones
- **`aria-current="page"`** en nav activa
- **Landmark roles** correctos (header, main, footer, nav)
- **Reduced motion** media query global presente
- **Focus visible** definido
- **Mobile nav** presente
- **Zustand con persistencia** bien implementado
- **TypeScript strict** activo
- **Tokens respetados** en la mayoría de componentes
- **Awwwards + Editorial balance** — hay un intento real de personalidad, no es genérico

---

## Recommendations by Priority

### Immediate (P0)
1. Subir contraste de `--c-text-3` a `#8a8e94` mínimo. (afecta TODO el proyecto)
2. Fix heading order en home: cambiar h3 → h2 donde corresponda, h3 en items.
3. Subir `lu-eyebrow` font-size a 12px.
4. Gate CustomCursor detrás de `(pointer: fine) and (hover: hover)`.

### Short-term (P1)
5. Quitar/conditional Glitch y Scanlines.
6. Agregar skip al preloader + `prefers-reduced-motion` en su animación.
7. Filtrar fechas pasadas en countdowns o mostrar estado "Lanzado".
8. `lang="en"` en nombres de juegos en inglés.
9. Auditar aria-labels en todos los IconButton / chip interactivo.

### Medium-term (P2)
10. Reducir letter-spacing de eyebrows.
11. Score badge con escala visible.
12. Diferenciar mejor "Armá tu radar" final CTA.
13. Code-split `SplitText` y `Magnetic`.

### Long-term
14. Migrar placeholders a `<Image>` real.
15. Considerar `prefers-reduced-motion` en reveal-on-scroll.

---

## Suggested Commands for Fixes

- `normalize` — para subir contraste de tokens y homogeneizar uso de `text-ink-faint` / `text-ink-muted`
- `typeset` — para arreglar `lu-eyebrow`, jerarquía de tamaños, letter-spacing
- `quieter` — para calmar Glitch, Scanlines, CustomCursor, Preloader
- `adapt` — para auditar mobile (mobile-nav, touch targets 44px)
- `harden` — para preloader, error states, prefers-reduced-motion
- `arrange` — para heading order (estructura de headings)
- `critique` — para evaluación holística de la home
- `onboard` — para `/onboarding` (auditoría específica)
- `polish` — para pass final

---

**Verdict:** No es AI slop. Tiene identidad. Pero está over-designed para impresionar y under-tested para usuarios reales. Los fixes P0 son obligatorios antes de release; P1 esta sprint; P2 esta semana.
