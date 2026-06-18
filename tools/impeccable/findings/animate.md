# Animate — Motion Audit

**Fecha:** 2026-06-18
**Scope:** Reveal, SplitText, Magnetic, Preloader, CustomCursor, scanlines, marquee, animaciones CSS
**Veredicto:** El proyecto tiene un sistema de motion **técnicamente sólido** (easing correcto, IntersectionObserver, motion-reduce respetado en algunas partes) pero **estratégicamente sobreextendido**: 8+ capas de motion decorativo en home compiten entre sí. La fix list es "quitar y refinar" más que "agregar".

---

## Inventario de motion

| Componente / Patrón      | Tipo          | Easing                | Reduce-motion | Veredicto          |
| ------------------------ | ------------- | --------------------- | ------------- | ------------------ |
| `Reveal`                 | IO + opacity  | `ease-smooth` (cubic-bezier 0.22, 1, 0.36, 1) | ✅ sí         | ✅ Mantener, refinar |
| `SplitText`              | IO + translateY | `cubic-bezier(0.22, 1, 0.36, 1)`              | ❌ no         | ✅ Mantener (hero) |
| `Magnetic`               | mouse follow  | linear 0.1s / smooth 0.5s | ❌ no         | ⚠️ Quitar de nav    |
| `Preloader`              | counters + transition | `ease-smooth` 700ms | ❌ no         | ⚠️ Acotar          |
| `CustomCursor`           | mouse follow  | transition 300ms      | ❌ no         | ❌ Quitar o gate    |
| `lu-glitch` (keyframes)  | CSS keyframe  | linear                | ❌ no         | ❌ Quitar de uso    |
| `lu-scanlines`           | CSS keyframe (scanlines-sweep) | linear | ❌ no  | ⚠️ Reducir a hero   |
| `lu-grid-texture`        | static        | —                     | n/a           | ✅ OK               |
| `lu-noise`               | static        | —                     | n/a           | ✅ OK               |
| `marquee` (Tailwind)     | CSS keyframe  | linear                | ❌ no         | ⚠️ Reducir         |
| `radarsweep`             | CSS keyframe  | linear                | ❌ no         | ⚠️ Solo en /mi-radar|
| `pulsedot`               | CSS keyframe  | ease-in-out           | ❌ no         | ✅ OK               |
| `fadein` (hero)          | CSS keyframe  | ease                  | ✅ sí (motion-reduce:animate-none) | ✅ OK    |

---

## P0 — Critical

### ANIM-001 · Saturación de motion decorativo en home
- **Location:** home (`app/page.tsx`) acumula: Glitch + Scanlines (Hero) + CustomCursor (global) + Preloader (global) + Magnetic (5+ en nav) + Reveal (cada sección) + Marquee (ticker) + hover transforms (cards) + SplitText (hero h1)
- **Impact:** Compite con la lectura. El usuario recurrente no quiere preloader + custom cursor + glitch + scanlines cada visita. Lighthouse no lo marca, pero UX sí.
- **Fix:** Reducir a:
  - Preloader (solo primera visita, ya implementado con `sessionStorage` ✅)
  - Reveal (en secciones, no en cards)
  - SplitText (solo en Hero h1)
  - Sin CustomCursor por defecto
  - Sin Magnetic en nav
  - Sin Glitch en producción
  - Scanlines solo en Hero (no en cards)
- **Beneficio:** Home se siente "editorial confiado", no "demo de Awwwards".

### ANIM-002 · `prefers-reduced-motion` no se respeta en 8+ componentes
- **Location:** Magnetic, SplitText, Preloader, CustomCursor, marquee, radarsweep, lu-glitch, lu-scanlines
- **Impact:** WCAG SC 2.3.3 (Animation from Interactions) requiere que usuarios con sensitivity puedan desactivar motion. La media query global en `globals.css` reduce durations a 0.001ms pero los componentes React siguen ejecutando su lógica y mutando el DOM.
- **Fix:**
  - `Reveal` ya respeta motion-reduce ✅
  - Agregar check `useReducedMotion()` o `window.matchMedia("(prefers-reduced-motion: reduce)")` en:
    - `Magnetic` → no hacer nada
    - `SplitText` → mostrar texto directo
    - `Preloader` → skip preloader
    - `CustomCursor` → no renderizar
    - `marquee`/`radarsweep` → `animation-play-state: paused`
- **Beneficio:** Accesibilidad AAA, batería en mobile, performance.

### ANIM-003 · `Magnetic` listeners no se limpian en navegación rápida
- **Location:** `components/ui/Magnetic.tsx` líneas 35-43
- **Impact:** En SPA navigation rápida, event listeners pueden quedar attached. Memory leak menor pero presente.
- **Fix:** El cleanup está bien con `useEffect`. Si se desmonta el componente, se ejecuta cleanup. Verificar que no haya re-mounts innecesarios.
- **Severidad:** Baja. No es P0 funcional. Pero añadir.

---

## P1 — High

### ANIM-004 · Hover transforms muy sutiles
- **Location:** `LuCard.tsx` línea 26 — `hover:-translate-y-1`
- **Impact:** 4px de movimiento es barely perceptible. Hover state no se siente.
- **Fix:** Aumentar a `-translate-y-2` (8px) o usar `hover:shadow-raised` para cambio de elevación claro.
- **Beneficio:** Feedback de hover significativo.

### ANIM-005 · `SplitText` no respeta reduce-motion
- **Location:** `components/ui/SplitText.tsx`
- **Impact:** El texto se ve "cortado" si reduce-motion está activo y el componente sigue ocultando con `translate-y-[105%]`.
- **Fix:** Agregar check en `useEffect`:
```ts
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) {
  setInView(true);
  return;
}
```

### ANIM-006 · `Preloader` no respeta reduce-motion
- **Location:** `components/ui/Preloader.tsx`
- **Impact:** Usuarios con motion sensitivity ven 1.2s de preloader con counters animados.
- **Fix:** 
```ts
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) {
  setIsFinished(true);
  setIsHidden(true);
  return;
}
```

### ANIM-007 · `CustomCursor` y `cursor: none` global rompen usuarios con motricidad reducida
- **Location:** `app/globals.css` + `components/ui/CustomCursor.tsx`
- **Impact:** Falla WCAG 2.2.1 y SC 2.4.7 (Focus Visible). Usuario que necesita cursor no lo tiene.
- **Fix:** Reemplazar `cursor: none !important` por:
```css
@media (pointer: fine) and (hover: hover) {
  body.has-custom-cursor { cursor: none; }
}
```
+ agregar clase `has-custom-cursor` solo si usuario opta in (toggle en footer o por primera visita).
- **Beneficio:** Default tiene cursor. Quien quiera custom, opt-in.

### ANIM-008 · `marquee` duración 30s demasiado rápida para ticker editorial
- **Location:** `app/globals.css` línea 47 — `marquee: "marquee 30s linear infinite"`
- **Impact:** Items pasan muy rápido. No se lee bien.
- **Fix:** 45-60s. Más "lectura", menos "feed".
- **Beneficio:** El ticker se siente "dato vivo" no "promo".

---

## P2 — Medium/Low

### ANIM-009 · Hover scale 1.05 en cards de video
- **Location:** `LuVideoCard.tsx` línea 20 — `group-hover:scale-110`
- **Impact:** 10% de scale es OK, pero combinado con la imagen que también escala 1.05 + scanlines + border change = motion overload.
- **Fix:** Mantener cover scale 1.05, quitar scale-110 del play button (o bajar a 1.08).

### ANIM-010 · Hover transform en `data-cursor` elementos
- **Location:** todos los `data-cursor="read"` `data-cursor="view"` `data-cursor="play"`
- **Impact:** Hay acoplamiento entre CustomCursor y motion. Si quitamos CustomCursor, los `data-cursor` quedan inertes.
- **Fix:** OK. Se pueden dejar. No rompen nada.

### ANIM-011 · `Reveal` con `delay: i * 0.05` en cada card
- **Location:** `app/page.tsx` Reveal en Reviews y Videos
- **Impact:** 4 cards × 0.05s = 0.2s total delay. El usuario lo siente como "cards apareciendo en cascada". Bonito pero dispensable.
- **Fix:** Mantenerlo en cards destacadas (≤4). En grids largos, hacer Reveal a nivel grid (todos aparecen juntos).

### ANIM-012 · `Radarsweep` 6s demasiado rápido
- **Location:** `app/globals.css` línea 50 — `radarsweep 6s linear infinite`
- **Impact:** El sweep del radar parece "girar rápido" = urgencia, no "monitoreo en vivo".
- **Fix:** 10-12s. Más "satélite", menos "timer".

### ANIM-013 · Faltan `prefers-reduced-motion` checks en componentes client
- **Location:** Magnetic, SplitText, Preloader, CustomCursor
- **Impact:** Si la media query global no captura algo (p.ej. setState que cambia clases), motion sigue.
- **Fix:** Agregar `useReducedMotion()` de `framer-motion` o check manual con `matchMedia`. (Si no hay framer-motion, manual.)

### ANIM-014 · `Reveal` con `rootMargin: "-60px"` activa antes que el usuario lo vea bien
- **Location:** `components/ui/Reveal.tsx` línea 18
- **Impact:** El elemento aparece 60px antes del viewport. Buen comportamiento para que no se sienta "tarde", pero con delays largos puede haber flicker.
- **Fix:** OK. Mantener.

---

## Patterns & Systemic Issues

1. **`prefers-reduced-motion` solo en CSS, no en JS** — la media query global reduce durations a 0.001ms, pero los componentes React siguen ejecutando su lógica. Esto es "menos motion" pero no "no motion". La diferencia importa para personas con sensitivity real.
2. **No hay "motion budget"** — el proyecto no tiene una política de "máximo N animaciones en una página". Home tiene 8+.
3. **Easing consistente** — todos usan `cubic-bezier(0.22, 1, 0.36, 1)` (ease-smooth) o linear. ✅ Bien.
4. **GPU acceleration** — usan `translate` y `opacity` correctamente. ✅ Bien.
5. **No hay spring physics** — todo es timing curves. Es decisión, no problema.
6. **Hover states funcionan bien en keyboard** (focus-visible). ✅

---

## Positive Findings

- **Reveal** está bien implementado: IO, motion-reduce, delay, easing correcto.
- **SplitText** es elegante para el hero (no abusar).
- **No bounce/elastic easing** — proyecto no cae en el anti-pattern.
- **Easing `ease-smooth` consistente** en todo el sistema.
- **GPU-accelerated** (transform + opacity) correctamente.
- **Preloader tiene `sessionStorage`** para no repetir en misma sesión.
- **Magnetic ya detecta pointer:coarse** ✅ y no se activa en touch.

---

## Recommendations by Priority

### Immediate (P0)
1. Quitar `Magnetic` del `Header` (todos los nav items y search/bell/user).
2. Gate `CustomCursor` por media query + opt-in.
3. Quitar `lu-glitch` del uso (keyframes pueden quedarse en CSS, no se usan).
4. Quitar `lu-scanlines` de LuGameCard, LuNewsCard, LuReviewCard, LuVideoCard (mantener en Hero).

### Short-term (P1)
5. Agregar `prefers-reduced-motion` checks en SplitText, Preloader, CustomCursor.
6. Aumentar hover transform a `-translate-y-2` o `hover:shadow-raised`.
7. Aumentar marquee a 45-60s, radarsweep a 10-12s.
8. Reemplazar `cursor: none !important` por opt-in media query.

### Medium-term (P2)
9. Reveal a nivel grid en listados largos (no por card).
10. Reducir hover scale 1.10 → 1.08 en play button.
11. Documentar "motion budget" del proyecto (ej. máximo 4-5 animaciones activas por página).

---

## Suggested Commands

- `quieter` (fase 6) — para quitar lo descrito arriba.
- `harden` — para `prefers-reduced-motion` checks.
- `polish` — pass final.
