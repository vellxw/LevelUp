# Harden — Robustez, edge cases, error states

**Fecha:** 2026-06-18
**Scope:** Componentes con estado, async logic, datos mock, edge cases, a11y resilience, i18n básico (es/en), errores de carga
**Veredicto:** El proyecto es **mock-only** (no backend real), lo que evita muchos errores reales, pero tiene **edge cases cosméticos** que se ven rotos: countdowns en 0:0:0:0, fechas pasadas, mobile nav apretado, falta loading/error states en algunos lugares. Sin embargo, la arquitectura está bien preparada para endurecer.

---

## Inventario de resiliencia actual

| Componente              | Loading | Error | Empty | Hydration | Veredicto |
| ----------------------- | ------- | ----- | ----- | --------- | --------- |
| `Preloader`             | n/a     | n/a   | n/a   | ✅        | ⚠️ Bloqueante, sin skip |
| `MiRadarPreview`        | ✅      | n/a   | ✅    | ✅        | ✅ Bien |
| `MiRadarPage`           | ✅      | n/a   | ✅    | ✅        | ✅ Bien |
| `LuCountdownTimer`      | ✅ mount| n/a   | n/a   | ✅ suppressHydrationWarning | ⚠️ Fechas pasadas = 0:0:0:0 |
| `LuLiveTicker`          | n/a     | n/a   | n/a   | ✅        | ✅ motion-reduce OK |
| `Reveal`                | n/a     | n/a   | n/a   | ✅        | ✅ |
| `Magnetic`              | n/a     | n/a   | n/a   | ✅        | ✅ pointer:coarse skip |
| `SplitText`             | n/a     | n/a   | n/a   | ✅        | ✅ IO |
| `InteractiveRadar`      | n/a     | n/a   | n/a   | ⚠️ revisar | n/a |
| `LuGameCard`            | n/a     | n/a   | n/a   | ✅        | ✅ line-clamp-2 |
| `LuNewsCard`            | n/a     | n/a   | n/a   | ✅        | ✅ |
| `LuReviewCard`          | n/a     | n/a   | n/a   | ✅        | ✅ |
| `FollowButton`          | n/a     | n/a   | n/a   | ✅        | ⚠️ Sin success feedback |
| `SaveButton`            | n/a     | n/a   | n/a   | ✅        | ⚠️ Sin success feedback |
| `Header` follow count   | ✅      | n/a   | ✅    | ✅        | ✅ |

**Positivo:** el equipo pensó en hydration (`useHydrated`), IO disconnect, motion-reduce, suppressHydrationWarning. Buena base.

---

## P0 — Critical

### HARD-001 · LuCountdownTimer muestra 0:0:0:0 para fechas pasadas
- **Location:** `components/ui/LuCountdownTimer.tsx`
- **Impact:** Cosmético pero obvio. Para juegos con `releaseDate` < hoy, el contador muestra 4 ceros. Visualmente roto.
- **Fix:**
```tsx
if (mounted && t.d === 0 && t.h === 0 && t.m === 0 && t.s === 0) {
  return <span className="lu-mono text-xs text-positive">DISPONIBLE</span>;
}
```
- **Beneficio:** Se ve intencional, no roto.

### HARD-002 · `Preloader` sin opción "saltar" y sin timeout de seguridad
- **Location:** `components/ui/Preloader.tsx`
- **Impact:** Si JS tarda o falla, usuario ve 1.2s de preloader. Aceptable, pero para mobile lento o low-end podría sentirse largo. No hay forma de skip.
- **Fix:** 
  - Agregar `<button onClick={finish}>Saltar</button>` visible después de 0.5s
  - Si después de 2s no terminó, forzar fin
- **Beneficio:** Resiliencia.

### HARD-003 · CustomCursor global no respeta `prefers-reduced-motion` ni pointer:coarse
- **Location:** `components/ui/CustomCursor.tsx`
- **Impact:** Mobile (touch) ve un cursor flotante fantasma. Usuarios con motion sensitivity ven animación constante.
- **Fix:** Mismo check que `Magnetic`:
```ts
const isTouch = window.matchMedia("(pointer: coarse)").matches;
if (isTouch) return null;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) return null;
```

---

## P1 — High

### HARD-004 · Sin success feedback en FollowButton / SaveButton
- **Location:** `components/actions/FollowButton.tsx`, `SaveButton.tsx`
- **Impact:** Click → estado cambia, pero no hay confirmación visual. El usuario no sabe si se guardó.
- **Fix:** Toast o check animation breve (300ms).
- **Beneficio:** UX confianza.

### HARD-005 · LuButton `loading` state no se usa
- **Location:** `components/ui/LuButton.tsx` (línea 8: `loading` prop existe)
- **Impact:** Spinner está implementado pero nadie lo usa. Si se agrega async (guardar en backend real), hay que decidir.
- **Severidad:** Baja. No es bug actual.
- **Fix:** Documentar cuándo se usará.

### HARD-006 · `Text overflow` en mobile nav 5 items
- **Location:** `components/shell/MobileNav.tsx`
- **Impact:** 5 items en mobile puede ser apretado. Nombres largos (Inicio, Mi Radar, Noticias, Juegos, Perfil) → texto truncado o wrap.
- **Fix:** Verificar truncamiento y target size ≥44px (ya tiene `min-h-[56px]` ✅).

### HARD-007 · Sin error boundary global
- **Location:** `app/layout.tsx` no tiene `<ErrorBoundary>` o `error.tsx`
- **Impact:** Si un componente client crashea, se rompe toda la app.
- **Fix:** Agregar `app/error.tsx` y `app/not-found.tsx` con diseño coherente.

### HARD-008 · Sin loading state para navegación entre rutas
- **Location:** Global
- **Impact:** Click en link → Next.js muestra loading.tsx si existe. Sin loading.tsx, hay un momento de "nada".
- **Fix:** Agregar `app/loading.tsx` global con skeleton coherente con el sistema.

---

## P2 — Medium/Low

### HARD-009 · `line-clamp-2` en cards pero no en section titles largos
- **Location:** LuSectionHeader h2 — no tiene clamp
- **Impact:** Título largo en eyebrow puede romper layout. (Probable, pero no verificado con data.)
- **Fix:** Agregar `line-clamp-2` a h2 de LuSectionHeader como defensa.

### HARD-010 · Fechas pasadas en home "Próximos lanzamientos"
- **Location:** `app/page.tsx` `upcomingReleases().slice(0, 6)`
- **Impact:** Mezcla juegos con fecha pasada. Verificar si el selector filtra.
- **Fix:** Si no, filtrar `releaseDate >= hoy` en `lib/selectors.ts`.

### HARD-011 · Currency format hardcoded USD/US$
- **Location:** `lib/utils.ts` `priceFormat` (probablemente)
- **Impact:** Para LATAM sería ARS/MXN/CLP/etc. Decisión de producto, no bug.
- **Severidad:** Baja. No aplica si target es solo USD.

### HARD-012 · Sin `lang` por bloque en nombres de juegos en inglés
- **Location:** Varios (LuGameCard title, LuNewsCard title)
- **Impact:** Screen reader lee "Grand Theft Auto VI" con fonética española. Antes audité esto.
- **Fix:** Wrap en `<span lang="en">{title}</span>`.
- **Beneficio:** Pronunciación correcta.

### HARD-013 · Sin aria-live para updates dinámicos
- **Location:** Ticker, countdown
- **Impact:** Screen reader no anuncia cambios. Pero el ticker es decorativo, no necesita. Countdown tampoco.
- **Severidad:** No es bug. OK.

### HARD-014 · `split-text` performance con títulos muy largos
- **Location:** SplitText crea N spans por palabra
- **Impact:** Título de 15 palabras = 15 spans + IO + transition delay. Marginal, no es problema.
- **Severidad:** No es bug. OK.

### HARD-015 · `prefers-reduced-motion` solo en CSS, no en JS
- **Location:** Múltiple (ya documentado en animate)
- **Impact:** Componentes React siguen ejecutando lógica. Media query global reduce durations a 0.001ms pero no previene ejecución.
- **Fix:** Check `matchMedia("(prefers-reduced-motion: reduce)")` en componentes client críticos.

### HARD-016 · Sin `<noscript>` fallback
- **Location:** Global
- **Impact:** Si JS deshabilitado, todo el sitio es estático. Aceptable para un medio.
- **Severidad:** No es bug. No prioritario.

### HARD-017 · Race condition en `useEffect` de Reveal y SplitText
- **Location:** Reveal.tsx, SplitText.tsx
- **Impact:** Si el componente se desmonta antes de que IO dispare, no hay cleanup problemático (disconnect en cleanup). ✅ Bien.
- **Severidad:** No es bug.

### HARD-018 · `number locale` en count views
- **Location:** `lib/utils.ts` `formatViews` — formatea "842.0K" con punto decimal
- **Impact:** En español se usa coma (842,0K) o "842 mil". Para LATAM, "842.0K" puede ser confuso.
- **Fix:** Usar `Intl.NumberFormat('es', { notation: 'compact' })` para formato compacto.
- **Beneficio:** Más correcto para audiencia.

---

## Patterns & Systemic Issues

1. **Sin `error.tsx` / `not-found.tsx`** → app puede romperse en silencio.
2. **Sin `loading.tsx`** → navegación sin feedback.
3. **Preloader bloqueante sin skip** → usuarios recurrentes sufren.
4. **Countdown edge case** (fechas pasadas) no manejadas.
5. **Hydration manejada correctamente** con `useHydrated()` pattern. ✅ Bien.
6. **Motion-reduce parcialmente implementado** — CSS sí, JS no.

---

## Positive Findings

- **`useHydrated` + `suppressHydrationWarning`** — pattern correcto para Zustand con localStorage.
- **IO disconnect en Reveal/SplitText** — no leak.
- **Motion-reduce en CSS animations** (marquee, fadein).
- **Empty states presentes** en MiRadar y MiRadarPreview.
- **Magnetic pointer:coarse skip** — no se activa en touch.
- **`line-clamp-N`** correctamente aplicado en cards.
- **No hay `dangerouslySetInnerHTML`** — sin XSS.
- **No hay eval** ni innerHTML manipulation.

---

## Recommendations by Priority

### Immediate (P0)
1. LuCountdownTimer: 0:0:0:0 → "DISPONIBLE" (HARD-001).
2. CustomCursor: gate por media queries (HARD-003).
3. Preloader: agregar "Saltar" y timeout safety (HARD-002).

### Short-term (P1)
4. Success feedback en FollowButton/SaveButton (HARD-004).
5. Crear `app/error.tsx` y `app/not-found.tsx` (HARD-007).
6. Crear `app/loading.tsx` global (HARD-008).
7. Mobile nav: verificar targets ≥44px (HARD-006).
8. `lang="en"` en títulos de juegos (HARD-012).

### Medium-term (P2)
9. `line-clamp-2` en LuSectionHeader h2 (HARD-009).
10. Filtrar fechas pasadas en upcoming (HARD-010).
11. `Intl.NumberFormat` para formatViews (HARD-018).
12. prefers-reduced-motion checks en JS components (HARD-015).

---

## Suggested Commands

- `adapt` — para mobile.
- `animate` — para prefers-reduced-motion en JS.
- `delight` — para success states.
- `polish` — pass final.
