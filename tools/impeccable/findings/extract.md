# Extract — Sistematizar patrones nuevos

**Fecha:** 2026-06-18
**Scope:** Patrones recurrentes identificados en las 11 fases previas que deberían consolidarse en componentes o utilidades reutilizables.

---

## Patrones a extraer

### EXT-001 · Empty State component
- **Ubicaciones duplicadas:** 8+ empty states en `app/mi-radar/page.tsx`, `app/perfil/page.tsx`, `app/buscar/page.tsx`, `app/onboarding/page.tsx`, `MiRadarPreview`, `LuCountdownTimer`
- **Patrón común:** Icono + h2 + descripción + CTA + (opcional) bullets
- **Componente sugerido:** `<LuEmptyState icon heading description bullets? action />`
- **Beneficio:** DRY, consistencia, escalable.
- **Prioridad:** P1 (corto plazo)

### EXT-002 · Section Density variant
- **Ubicación:** `LuSection` solo tiene padding default
- **Variantes necesarias:** tight, default, loose (ver arrange-004)
- **Componente sugerido:** `<LuSection density="tight|default|loose">`
- **Beneficio:** Ritmo de página.
- **Prioridad:** P1

### EXT-003 · Touch target wrapper
- **Ubicación:** LuButton sm (36px), FollowButton sm (36px), Hero carousel (40px), Header icons (40px), LuChip (30px) — 6+ elementos <44px
- **Patrón:** botón o link con target físico menor a 44px
- **Componente sugerido:** envoltura CSS `min-h-[44px] min-w-[44px]` o utility `touch-target`
- **Beneficio:** Cumple WCAG 2.5.5 en mobile.
- **Prioridad:** P0 (inmediato)

### EXT-004 · Celebration/Success component
- **Ubicación:** No existe. Necesario en onboarding finish (ONB-001), FollowButton (HARD-004), SaveButton (HARD-004)
- **Componente sugerido:** `<LuToast>` o `<LuCelebration icon text duration />`
- **Beneficio:** Feedback consistente post-acción.
- **Prioridad:** P1

### EXT-005 · Type scale tokens
- **Ubicación:** Tamaños arbitrarios (9, 10, 11, 12, 13, 14, 15, 16) en muchos componentes
- **Tokens sugeridos:**
  - `--text-xs: 11px` (caption)
  - `--text-sm: 12px` (caption strong)
  - `--text-base: 14px` (body small)
  - `--text-md: 16px` (body)
  - `--text-lg: 18px`
  - `--text-xl: 20px` (h4)
  - `--text-2xl: 24px` (h3)
  - `--text-3xl: 32px` (h2)
  - `--text-4xl: 48px` (h1)
- **Beneficio:** Escala predecible, una fuente de verdad.
- **Prioridad:** P1

### EXT-006 · useReducedMotion hook
- **Ubicación:** Reveal, SplitText, Preloader, CustomCursor, Magnetic — todos deberían usar el mismo hook
- **Hook sugerido:** `lib/hooks/useReducedMotion.ts`
- **Beneficio:** DRY, una implementación, fácil de testear.
- **Prioridad:** P1

### EXT-007 · Card size variant
- **Ubicación:** LuCard tiene surface, falta size/featured
- **Variantes necesarias:** "sm" (compact horizontal), "md" (default), "lg" (hero con cover más alto)
- **Beneficio:** Pattern "1 hero + 3 standard" (ver arrange-005).
- **Prioridad:** P2

### EXT-008 · Score con escala
- **Ubicación:** LuScoreBadge y score inline en LuGameCard, LuReviewCard
- **Patrón:** El score debería siempre tener "X.X / 10" o aria-label descriptivo
- **Componente sugerido:** wrapper `<LuScore>` que siempre incluye escala
- **Beneficio:** Consistencia semántica + accesibilidad.
- **Prioridad:** P2

### EXT-009 · LuSectionHeader con action variant
- **Ubicación:** Usado en 8+ lugares con `actionLabel` + `actionHref`
- **Variante nueva:** `actionVariant="link" | "button"` y `icon` opcional
- **Beneficio:** Más flexible.
- **Prioridad:** P3

### EXT-010 · LuCountdownTimer con empty/expired
- **Ubicación:** `LuCountdownTimer.tsx` muestra 0:0:0:0 para fechas pasadas
- **Variante nueva:** Si target ya pasó, mostrar badge "DISPONIBLE" o "LANZADO"
- **Beneficio:** Cosmético obvio (HARD-001).
- **Prioridad:** P0

---

## Patrones ya bien sistematizados (no tocar)

- `LuButton` (5 variants × 3 sizes) — bien
- `LuBadge` (7 kinds) — bien
- `LuCard` (3 surfaces) — bien
- `LuChip` (active/inactive, count) — bien
- `LuMetricCard` — bien
- `LuCorners` — bien
- `Reveal` / `SplitText` — bien

---

## Patterns & Systemic Issues

1. **Empty states**: 8+ implementaciones inline. DRY violation.
2. **Touch targets**: 6+ elementos sin sistema. Necesita utility global.
3. **Motion respect**: 5+ componentes duplicando el mismo check de `prefers-reduced-motion`. Necesita hook.
4. **Type scale**: ad-hoc, sin tokens.
5. **Density**: LuSection no tiene variantes.
6. **Celebration**: 0 implementaciones, pero 3 lugares donde falta.

---

## Positive Findings

- Sistema atómico bien establecido (átomos, moléculas, layout).
- Tailwind config mapea tokens correctamente.
- `cn()` utility para composición de clases.
- `lib/utils.ts` con `coverStyle`, `relativeTime`, `scoreTone`, `priceFormat`, `formatViews`, `formatDuration` — buena systematización.
- `useHydrated` hook de Zustand.
- `useRadar` selector.

---

## Recommendations by Priority

### Immediate (P0)
1. Crear `lib/hooks/useReducedMotion.ts` (EXT-006).
2. Crear utility `touch-target` o agregar a LuButton/LuChip (EXT-003).
3. LuCountdownTimer: empty state "DISPONIBLE" (EXT-010).

### Short-term (P1)
4. Crear `<LuEmptyState>` (EXT-001).
5. LuSection con prop `density` (EXT-002).
6. Documentar type scale en `tailwind.config.ts` o CSS variables (EXT-005).
7. Crear `<LuToast>` o `<LuCelebration>` (EXT-004).

### Medium-term (P2)
8. LuCard con prop `size` (EXT-007).
9. LuScoreBadge con escala visible / aria-label (EXT-008).
10. LuSectionHeader con más variants (EXT-009).

---

## Suggested Commands

- (interno, no es skill)
- `polish` — para pass final.
