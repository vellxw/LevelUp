# Typeset — Typography Audit

**Fecha:** 2026-06-18
**Scope:** `app/`, `components/`, `app/globals.css`
**Veredicto:** Sistema tipográfico con ADN propio (Rajdhani + Inter + IBM Plex Mono), bien cargado, bien aplicado. Pero tiene **fracasos sistemáticos en eyebrows, captions y micro-texto decorativo** que rompen legibilidad y AA.

---

## Font Inventory

| Familia              | Rol                  | Pesos cargados                          | Uso                          |
| -------------------- | -------------------- | --------------------------------------- | ---------------------------- |
| **Rajdhani**         | Display, headlines   | 500, 600, 700                           | h1, h2, h3, hero, sección    |
| **Inter**            | Body, UI             | 400, 500, 600, 700                      | párrafos, botones, nav       |
| **IBM Plex Mono**    | Datos, micro         | 400, 500, 600                           | ticker, countdown, eyebrows, scores, "lu-mono" |

**Cargado desde Google Fonts en `app/globals.css` línea 1.** Sin preload, sin `font-display: swap` explícito (lo gestiona Google Fonts).

**Positivo:** 3 familias bien diferenciadas con roles claros. NO es el "todo Inter" genérico.

**Riesgo:** Rajdhani se carga solo en 3 pesos (500/600/700), pero se usa 500 en headlines de cards. 500 es Medium y para titulares puede verse débil. Verificar.

---

## Type Sizes Inventariados (en `text-[Npx]`)

| Tamaño | Ocurrencias | Rol                                     |
| ------ | ----------- | --------------------------------------- |
| 9px    | 13+         | Micro-texto decorativo (radar labels, cursor, countdown labels) |
| 10px   | 4           | Preloader HUD, mobile nav, tags         |
| 11px   | 14          | **Eyebrows, captions, badges, ticker items, footer, header meta** |
| 12px   | 8           | Ticker items, section actions, hint cards |
| 13px   | 5           | Buttons sm, chips, news title mobile    |
| 14px   | 2           | Nav items, GameTabs                     |
| 15px   | 1           | Button md                               |
| 16px   | 1           | Button lg, body default                 |
| 18px+  | varios      | Headings (1.6rem-4.2rem con clamp)      |

**Observación:** Demasiado texto en 9-11px. WCAG SC 1.4.4 (Resize text) recomienda respetar zoom 200%, lo cual 9px no hace.

---

## P0 — Critical (legibilidad rota)

### TYPE-001 · Texto decorativo a 9px
- **Location:** `components/ui/InteractiveRadar.tsx` (líneas 149, 150, 151, 152, 240, 246, 255, 273, 274, 302, 344, 352) y `components/ui/CustomCursor.tsx:125`, `LuCountdownTimer.tsx:27`
- **Impact:** 9px es ilegible para mayoría de usuarios. WCAG SC 1.4.4 no se cumple (no se puede escalar bien).
- **Fix:** Subir a 10px mínimo. En datos muy decorativos (radar), 10px con `font-mono` sigue siendo "técnico" y se ve bien.
- **Tradeoff:** El radar se ve un poco más denso. Es OK, mantiene la sensación técnica.

### TYPE-002 · `lu-eyebrow` a 11px con contraste roto
- **Location:** `app/globals.css` línea 64-69, usado en TODA `LuSectionHeader` y badges
- **Code:** `font-size: 11px; color: var(--c-text-3); letter-spacing: 0.22em;`
- **Impact:** 11px + #6F7378 = 3.89:1 (falla AA). Doble falla.
- **Fix:** `font-size: 12px; color: var(--c-text-2); letter-spacing: 0.16em;`
- **Beneficio:** 12px + #A7A7A7 = 7.85:1 (AAA pass), letter-spacing 0.16em sigue dando sensación editorial sin saturar.

### TYPE-003 · Captions de cards (relative time, replies, vistas) en 11px con `text-ink-faint`
- **Location:**
  - `cards/LuNewsCard.tsx` líneas 25, 50
  - `cards/LuVideoCard.tsx` línea 35
  - `home/OffersStrip.tsx` líneas 19, 22, 26
  - `shell/Footer.tsx` líneas 15, 29
  - `shell/Header.tsx` línea 54
  - `ui/LuMetricCard.tsx` línea 22
- **Impact:** Estos textos dan contexto ("hace 6 días", "842.0K vistas"). Si no se leen, el dato pierde valor. Falla AA.
- **Fix:** Una vez arreglado el token `--c-text-3` (NORM-001), esto se arregla en cascada. Adicional: subir a 12px donde el espacio lo permita (cards con espacio), mantener 11px solo donde es dense data (footer copyright, header meta).

---

## P1 — High (consistencia / peso)

### TYPE-004 · Escala tipográfica sin modular
- **Location:** sistema general
- **Impact:** Tamaños arbitrarios (9, 10, 11, 12, 13, 14, 15, 16, 18+). Sin ratio (1.25 / 1.333 / 1.5). La jerarquía entre niveles no es predecible.
- **Fix sugerido:** Adoptar escala modular 1.25 desde 12px base:
  - 12 (caption)
  - 14 (body small)
  - 16 (body)
  - 20 (h4)
  - 24 (h3)
  - 32 (h2)
  - 48+ (h1)
- **Esfuerzo:** Mapear en `tailwind.config.ts` o como CSS variables tipográficas. No requiere reescribir componentes.

### TYPE-005 · Botones sm: 13px y md: 15px — diferencia mínima
- **Location:** `ui/LuButton.tsx` líneas 22-24
- **Impact:** 13 → 15 es solo 2px. Visualmente idéntico. Jerarquía muerta.
- **Fix:** sm = 13px, md = 15px, lg = 18px. O sm=13, md=15 OK, lg=18. No lg=16.

### TYPE-006 · `lu-mono text-[12px]` en hero counter pero otros en 11px
- **Location:** Hero usa 12px para "01 / 05", tickers 12px, captions 11px
- **Impact:** El proyecto usa mono para datos, pero la escala de mono no es consistente.
- **Fix:** Definir `text-mono-xs` (10px), `text-mono-sm` (11px), `text-mono-base` (12px), `text-mono-md` (14px) como utilities. Documentar uso.

### TYPE-007 · `font-weight` no definido en `h1`/`h2`/`h3` global
- **Location:** `globals.css` línea 47 — `h1,h2,h3,h4 { font-family: var(--font-display); letter-spacing: -0.01em; }`
- **Impact:** El peso del h1/h2/h3 depende de la clase Tailwind (`font-bold`, `font-semibold`). Sin consistencia, algunas páginas pueden tener h2 en Regular si olvidan la clase.
- **Fix:** Agregar `font-weight: 600;` (semibold) a h1-h4 como base. Quita ambigüedad.

### TYPE-008 · `letter-spacing: -0.01em` en h1-h4 global + `uppercase` en títulos
- **Location:** `globals.css` líneas 47-48
- **Impact:** En uppercase, `letter-spacing` debería ser **positivo** (más abierto), no negativo. Estás cerrando el tracking en texto en mayúsculas que necesita más aire.
- **Fix:** Cambiar a `letter-spacing: 0` o `0.01em` (más abierto), o split: `h1 { letter-spacing: -0.02em }` (no uppercase) vs `text-uppercase { letter-spacing: 0.08em }`.

---

## P2 — Medium/Low (polish)

### TYPE-009 · `tabular-nums` no se usa en countdown ni score
- **Location:** `LuCountdownTimer.tsx`, `LuScoreBadge`
- **Impact:** Números de ancho variable (1 más angosto que 8) hacen que el countdown salte al actualizar.
- **Fix:** Agregar `font-variant-numeric: tabular-nums` o `font-feature-settings: "tnum"` en mono y score contexts.

### TYPE-010 · Body text line-height no definido global
- **Location:** `globals.css` línea 36-43 (`body`)
- **Impact:** El navegador usa default (1.5). Para dark mode + Inter, se recomienda 1.6-1.7.
- **Fix:** Agregar `line-height: 1.6;` a `body`.

### TYPE-011 · `text-[12vw]` en Preloader — tipografía responsiva extrema
- **Location:** `Preloader.tsx` línea 87
- **Impact:** Funciona para efecto "console boot", pero `vw` puro es independiente de container. En pantallas ultra-anchas puede ser absurdo.
- **Fix:** Cambiar a `text-[clamp(4rem,12vw,12rem)]` con cap.

### TYPE-012 · `font-bold uppercase` en headings — bold es weight 700
- **Location:** muchos sitios
- **Impact:** Rajdhani 700 en uppercase + clamp = OK. Pero Rajdhani 500 (medium) cargado no se usa casi nunca. ¿Es necesario?
- **Fix:** Considerar remover Rajdhani 500 del import (no se usa) → reduce payload.

---

## Patterns & Systemic Issues

1. **9-11px es el "second text layer" del proyecto** y es donde fallan accesibilidad. Todo lo que es mono data + caption vive ahí.
2. **No hay type scale documentado.** Tamaños arbitrarios proliferan (9, 10, 11, 12, 13, 14, 15, 16).
3. **`text-ink-faint` (token roto) se usa para captions** que son texto funcional, no decorativo. Token mal calibrado.
4. **Uppercase + tracking inconsistente.** `lu-eyebrow` 0.22em vs Hero h1 sin tracking. Hay convención implícita pero no documentada.
5. **Bold 700 cargado para Rajdhani pero se combina con Inter 400-700.** Carga de Google Fonts es ~3 families × 4 pesos = 12 fonts. Optimizar.

---

## Positive Findings

- **3 familias con roles claros** (no es todo Inter).
- **Mono para datos** funciona muy bien con la metáfora del radar.
- **Fluid sizing con `clamp()`** en headings (1.6rem-4.2rem) — buena decisión para editorial.
- **Font-display automático de Google Fonts** sin layout shift visible.
- **Display uppercase en h1-h2** da el "periódico" vibe buscado.
- **Hero h1 con `min-h-[1.1em]`** previene layout shift mientras SplitText anima.

---

## Recommendations by Priority

### Immediate (P0)
1. Subir eyebrow a 12px + color `--c-text-2` + tracking 0.16em.
2. Subir 9px → 10px en micro-texto decorativo.
3. Aplicar fix de token (NORM-001) — cascada resuelve 11px captions.

### Short-term (P1)
4. Documentar type scale: caption(12) / body(16) / h4(20) / h3(24) / h2(32) / h1(48+).
5. Subir LuButton lg a 18px.
6. Definir utilities tipográficas mono: `text-mono-xs`/`sm`/`base`/`md`.
7. Agregar `font-weight: 600` a h1-h4 global.
8. Arreglar letter-spacing: h1-h4 = 0 o 0.01em; uppercase explícito = 0.08em.

### Medium-term (P2)
9. Agregar `font-variant-numeric: tabular-nums` a mono contexts.
10. Agregar `line-height: 1.6` a body.
11. Preloader con clamp.
12. Remover Rajdhani 500 si no se usa → reduce payload.

---

## Suggested Commands

- `normalize` — el fix de eyebrow color es parte del fix de tokens.
- `arrange` — la jerarquía headings afecta el layout.
- `polish` — pass final.
