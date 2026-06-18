# Arrange — Layout, Spacing & Rhythm Audit

**Fecha:** 2026-06-18
**Scope:** Home, listados (`/juegos`, `/reviews`, `/videos`, `/noticias`), detalle (`/noticias/[slug]`, `/reviews/[slug]`, `/juegos/[slug]`), componentes atómicos y layout.
**Veredicto:** Sistema de grid y containers bien diseñado (LuGrid 4/8/12, LuContainer con max-shell). Cards bien proporcionadas. Pero la **home tiene 9 secciones apiladas sin ritmo, sin alternancia de densidad** y la sección final duplica el mensaje del MiRadarPreview. El grid de "Estado del juego" usa números como hero metrics genéricos (anti-pattern).

---

## Layout System Reference

- `LuContainer` — `max-w-shell` (1440px) + padding 4/6/10
- `LuSection` — `py-10 sm:py-14`
- `LuGrid` — 4/8/12 cols responsive
- `LuCol` — span 1-12 con mapa responsive
- `LuStack` — flex-col con gap 2/3/4/6/8

**Positivo:** Sistema atómico claro. La grid 4/8/12 da buen control. Container max-shell = 1440 es razonable para editorial.

**Riesgo:** `LuGrid` base es 4 columnas mobile. Puede ser tight en mobile (4 cols no es lo mismo que 2 cols con `gap-3`). Verificar.

---

## P0 — Critical (rompe flujo)

### ARR-001 · Home tiene 9 secciones sin ritmo — fatiga de scroll
- **Location:** `app/page.tsx`
- **Sections en orden:**
  1. Hero (full-bleed, 65/35 grid)
  2. Ticker (full-bleed band)
  3. MiRadarPreview
  4. "Estado del juego" + 4 LuMetricCard
  5. "Pr\u00f3ximos lanzamientos" + HorizontalRail
  6. "Ofertas y recomendados"
  7. "Reviews destacadas" (grid 4)
  8. "Lo importante de hoy" (3-col)
  9. "Videos" (grid 4)
  10. "En debate" (3-col)
  11. CTA final "Arm\u00e1 tu radar"
- **Impact:** 11 bloques visuales sin pausa. Todas las secciones tienen estructura similar: header (eyebrow + h2) + grid/rail. Monotonía.
- **Fix:** Reducir a 6-7 secciones clave. Combinar "Estado del juego" + "Pr\u00f3ximos lanzamientos" en un "Estado del juego" compuesto. Quitar "En debate" de la home (mover a `/comunidad` o agregar como rail secundario). Quitar CTA final (duplica MiRadarPreview).
- **Resultado esperado:** Home respira, cada sección se siente intencional.

### ARR-002 · CTA "Arm\u00e1 tu radar" duplica "Configurar Mi Radar" de MiRadarPreview
- **Location:** `app/page.tsx` última sección
- **Impact:** Mismo mensaje 2 veces en misma página. Diluye CTA principal.
- **Fix:** Eliminar la sección final O transformarla en algo distinto ("Sobre LevelUp", "Newsletter", "Síguenos en X").
- **Skill:** `distill`.

### ARR-003 · LuMetricCard con número pequeño como hero metric genérico
- **Location:** `components/ui/LuMetricCard.tsx`, sección "Estado del juego"
- **Impact:** "12 / Fichas vivas activas" es exactamente el anti-pattern de **hero metric layout** (big number, small label, stats). Lighthouse lo marca como anti-pattern en el skill de frontend-design.
- **Fix:** Reemplazar por contenido editorial: "Esta semana en la industria: GTA VI confirma fecha, Black Myth llega a Xbox, Microsoft invierte en Xbox." Sin números prominentes. Si el dato numérico importa, mostrarlo como secundario, no como hero.

---

## P1 — High (jerarquía / consistencia)

### ARR-004 · `LuSection` padding fijo `py-10 sm:py-14` no escala
- **Location:** `components/layout/LuLayout.tsx`
- **Impact:** Todas las secciones tienen el mismo espaciado vertical. Sin alternancia tight/generous. Pierde ritmo.
- **Fix:** Aceptar prop `density` ("tight" | "default" | "loose") con valores:
  - tight: `py-6 sm:py-8`
  - default: `py-10 sm:py-14` (actual)
  - loose: `py-16 sm:py-24`
- **Uso:** ticker = tight; secciones de cards = default; CTA final = loose.

### ARR-005 · Cards tienen el mismo alto fijo (h-40, h-44, h-36) según tipo, sin variación visual
- **Location:** `LuNewsCard`, `LuGameCard`, `LuReviewCard`, `LuVideoCard`
- **Impact:** En un grid 4-col, todas las cards son visualmente idénticas en altura. Falta jerarquía de "card destacada" vs "card regular".
- **Fix:** Permitir prop `size` ("sm" | "md" | "lg") o usar `aspect-ratio` variable. La primera card de cada grid puede ser más alta (span-2) para crear énfasis.

### ARR-006 · News "Lo importante de hoy" 2-col + 3-col con `lg:col-span-2` no se ve jerarquizado
- **Location:** `app/page.tsx` sección "Lo importante de hoy"
- **Code:** `<div className="lg:col-span-2"><Reveal><LuNewsCard item={news[0]} /></Reveal></div>` y 3 cards horizontales
- **Impact:** El intent es "1 grande + 3 chicas" pero en práctica la grande es del mismo tamaño que las otras. El `col-span-2` solo en lg, no se siente prominente.
- **Fix:** Hacer la primera card con `h-full` que ocupe más espacio visual. O usar `LuNewsCard` con variant "hero" que tenga cover más alto + texto más grande.

### ARR-007 · Reviews grid 4-col + Videos grid 4-col + News 3-col: variety OK, pero falta "1 hero + 3 standard"
- **Location:** home, varios
- **Impact:** Las 3 secciones finales son todas "grid de 4". Estructura repetida.
- **Fix:** Alternar: reviews 1 grande + 3 chicas, videos grid 4 (OK), debates grid 3 (OK). Variar la primera card de cada grid.

### ARR-008 · Mobile nav (`MobileNav`) texto a 10px
- **Location:** `components/shell/MobileNav.tsx:33`
- **Code:** `text-[10px] font-medium`
- **Impact:** 10px es borderline para touch UI. WCAG SC 1.4.4 lo cuestiona.
- **Fix:** Subir a 11px o 12px.

---

## P2 — Medium/Low (polish)

### ARR-009 · Cards padding `p-4` constante — falta variación interna
- **Location:** LuGameCard, LuNewsCard, LuReviewCard, LuVideoCard
- **Impact:** `p-4` = 16px. Consistente pero plano. Las cards con cover image se sienten apretadas al lado del cover.
- **Fix:** `p-5` (20px) en cards con cover + contenido largo (News, Review). Mantener `p-4` en cards de plataforma/tag.

### ARR-010 · HorizontalRail gap default
- **Location:** `components/ui/HorizontalRail.tsx` (no leído)
- **Impact:** Si gap es muy chico, cards se ven amontonadas en mobile.
- **Fix:** Verificar y ajustar a `gap-4` o `gap-3`.

### ARR-011 · Container padding `px-4 sm:px-6 lg:px-10` — no escala fluid
- **Location:** LuContainer
- **Impact:** Salto de 6 a 10 entre sm y lg. OK, pero podría ser `clamp(1rem, 3vw, 2.5rem)`.
- **Fix:** Opcional. Actual es funcional.

### ARR-012 · Z-index `z-[99999]` en Preloader
- **Location:** `components/ui/Preloader.tsx:71`
- **Impact:** Magic number. No usa el sistema de tokens z-index (`--z-modal: 70`).
- **Fix:** Usar `z-toast` o `z-modal` (ya están en tokens). O definir `--z-preloader: 90` en CSS.

### ARR-013 · Magnetic strength hardcoded `0.2` / `0.25`
- **Location:** varios
- **Impact:** Si el sistema cambia, no escala.
- **Fix:** Aceptable. Es UI micro. Dejar.

### ARR-014 · `gap-3` vs `gap-4` inconsistente
- **Location:** home, mobile grid 2-col
- **Impact:** A veces 3, a veces 4. Sin sistema claro.
- **Fix:** Documentar convención: `gap-3` para items pequeños (chips), `gap-4` para cards, `gap-6` para secciones internas.

---

## Patterns & Systemic Issues

1. **Home horizontal scroll fatigue** — 11 secciones sin pausa. La home no es la única página, pero es la primera impresión.
2. **Card grid monotony** — todas las cards tienen la misma estructura (cover + título + meta). Sin variantes de tamaño.
3. **No "hero card" pattern** — la primera card de cada grid no se diferencia visualmente.
4. **Magazine layout 65/35 en hero** — buena decisión, mantener y replicar en otras secciones.
5. **Container bien dimensionado** — `max-w-shell: 1440px` + padding fluido. OK.
6. **Magazine "wide" sections alternan con "narrow"** — ticker (wide) vs metric grid (narrow) — funciona, pero inconscientemente.
7. **No asymmetric compositions** — todo está centrado o grid-igual. Falta "1 + 2", "1 + 3", o "1 dominante + 3 secundarias".

---

## Positive Findings

- **LuGrid 4/8/12** — sistema de grid editorial correcto.
- **LuContainer max-shell 1440px** — buena decisión para contenido editorial.
- **HorizontalRail** — patrón de "scroll horizontal" para cards en mobile es inteligente (ahorra vertical space).
- **Magazine-style hero 65/35** — jerarquía clara, no genérico.
- **Ticker full-bleed** — buena ruptura del ritmo de la home.
- **Cards tienen aspect-ratios fijos** (h-40, h-44, h-36) — predecible, fácil de escanear.

---

## Recommendations by Priority

### Immediate (P0)
1. Reducir home de 11 a 7 secciones. Combinar "Estado del juego" + "Pr\u00f3ximos lanzamientos" en una sola sección editorial.
2. Eliminar CTA final "Arm\u00e1 tu radar" (duplica MiRadarPreview).
3. Reemplazar LuMetricCard hero metrics por contenido editorial.

### Short-term (P1)
4. Agregar `density` prop a LuSection.
5. Variar altura de cards en grid: primera card 1.5x o span-2.
6. Subir mobile nav de 10px → 11px.
7. Hacer "Lo importante de hoy" 1 hero + 3 standard en lugar de 2-col + 3-col.

### Medium-term (P2)
8. Padding cards: `p-5` para News/Review, `p-4` para Game/Video.
9. Z-index preloader usar token.
10. Documentar gap convention: 3=chips, 4=cards, 6=secciones.

---

## Suggested Commands

- `distill` — para reducir la home.
- `bolder` — para jerarquizar cards.
- `adapt` — para auditar mobile.
- `polish` — pass final.
