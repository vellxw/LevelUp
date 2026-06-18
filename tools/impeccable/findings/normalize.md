# Normalize — Token Usage Audit

**Fecha:** 2026-06-18
**Scope:** Todos los componentes en `components/` y `app/`
**Hallazgo principal:** El sistema de tokens está bien definido pero **se evade sistemáticamente con valores hardcoded**, especialmente en `bg-black`, `text-white`, `bg-[#...]` y `--c-text-3` que falla AA.

---

## Token System Reference

```
--c-bg:        #060607  (negro editorial)
--c-surface-1: #0D0F12
--c-surface-2: #111318
--c-surface-3: #16191D
--c-border:    #2A2D32
--c-text-1:    #F4F4F4  (ink DEFAULT)
--c-text-2:    #A7A7A7  (ink-muted)
--c-text-3:    #6F7378  (ink-faint)  ← PROBLEMA: 3.89:1 sobre surface-1
--c-red:       #E50914
--c-red-hover: #8F1118
--c-green:     #59D65C
--c-amber:     #E7A83A
```

`text-white` y `bg-black` no tienen token directo pero podrían mapearse a `text-ink` y `bg-bg`. El problema es que **se usan en lugares donde la intención es "neutro puro"** (botón primario, play button sobre imagen). Es decisión, no error. Pero hay inconsistencias.

---

## P0 — Critical (afectan accesibilidad o rompen sistema)

### NORM-001 · `text-ink-faint` (#6F7378) falla contraste AA
- **Location:** `app/globals.css` línea 17 + 31 ocurrencias en `components/`
- **Conteo:** 31 en `components/`, X en `app/` (no medido en `app/` por tiempo)
- **Impact:** Cualquier texto con `text-ink-faint` sobre `bg-surface-1` o `bg-surface-2` falla WCAG AA (3.89:1 y 4.02:1 respectivamente). Objetivo AAA (7:1) imposible.
- **Fix:** Subir `--c-text-3` de `#6F7378` → `#8a8e94` (5.0:1 sobre surface-1) o `#9aa0a6` (5.7:1). Esto arregla 31+ elementos en un solo cambio.
- **Validar:** No usar este color en texto <12px sin bold (no es el caso actual porque lu-eyebrow está en 11px → ver fix en typeset).

### NORM-002 · `bg-[#060607]` hardcoded en Preloader
- **Location:** `components/ui/Preloader.tsx` línea 71
- **Code:** `bg-[#060607]`
- **Impact:** Si el token `--c-bg` cambia, el preloader no se actualiza. Es exactamente lo que los tokens deben evitar.
- **Fix:** Reemplazar por `bg-bg` (token).
- **Esfuerzo:** 1 línea.

---

## P1 — High (inconsistencia visual)

### NORM-003 · `text-white` y `bg-black` usados para estados "puros"
- **Location:**
  - `components/cards/LuVideoCard.tsx` líneas 20, 21, 24 (play button + duration)
  - `components/home/Hero.tsx` líneas 43, 44 (carousel prev/next)
  - `components/ui/CustomCursor.tsx` líneas 113, 125
  - `components/ui/InteractiveRadar.tsx` línea 318
  - `components/actions/FollowButton.tsx` línea 21
  - `app/onboarding/page.tsx` líneas 59, 105
  - `app/videos/page.tsx` líneas 34, 54, 55
- **Conteo:** 16 ocurrencias
- **Impact:** No es un "error" porque el blanco y negro son colores universales, pero rompe la consistencia del sistema (que en surface usa `--c-text-1` y `--c-bg`). Si en el futuro se cambia a dark-mode-light, estos se quedan iguales.
- **Decisión recomendada:**
  - **Texto sobre rojo (primary):** mantener `text-white`. Contraste con #E50914 es 5.34:1, AA pass.
  - **Texto sobre negro puro (play button sobre imagen):** mantener `text-white`. Tiene sentido.
  - **Fondo negro puro (carousel controls con `bg-black/50`):** mantener. Es overlay sobre imagen.
- **Fix:** Ninguno obligatorio. Documentar la convención: `bg-black/50` para overlays sobre imágenes, `text-white` para texto sobre rojo o negro absoluto. Ya está implícito en el código.

### NORM-004 · `text-ink-muted` (#A7A7A7) sobre surface-1 = 7.85:1 (AAA pass)
- **Location:** global
- **Status:** OK. No requiere cambio.
- **Nota:** Confirma que `text-ink` (#F4F4F4) y `text-ink-muted` (#A7A7A7) son seguros. Solo `text-ink-faint` (#6F7378) está mal calibrado.

### NORM-005 · Border color en LuCard hover es `border-ink-faint`
- **Location:** `components/ui/LuCard.tsx` línea 27
- **Code:** `hover:border-ink-faint`
- **Impact:** Hover state con borde casi invisible. UX feedback pobre.
- **Fix:** Cambiar a `hover:border-ink-muted` (más visible) o agregar `hover:border-brand` para feedback más fuerte.

### NORM-006 · `bg-brand/12` no es token
- **Location:** `components/actions/FollowButton.tsx` línea 21 + posiblemente más
- **Impact:** Tailwind opacities hardcoded. Si se cambia el rojo, no se actualiza el "rojo al 12%".
- **Fix:** Documentar como convención (`brand/12` = surface tint de marca) y crear tokens para los opacities más usados (12%, 15%, 50%).

---

## P2 — Medium/Low

### NORM-007 · `shadow-soft` aplicado a LuButton primary lo aplana
- **Location:** `components/ui/LuButton.tsx` línea 14
- **Code:** `primary: "bg-brand text-white hover:bg-brand-hover shadow-soft"`
- **Impact:** El botón primary necesita más peso visual (ver critique-002). `shadow-soft` lo hace ver lavado.
- **Fix:** Reemplazar por `shadow-glow` o `shadow-raised` o none + border más fuerte. Decisión pendiente.

### NORM-008 · `text-brand-hover` no existe como token
- **Location:** varios botones
- **Code:** `hover:bg-brand-hover` → `--c-red-hover` = #8F1118
- **Impact:** Existe el token `--c-red-hover` y el mapeo `brand.hover`. OK. No requiere cambio.

### NORM-009 · `lu-eyebrow` color es `text-ink-faint` → falla contraste
- **Location:** `app/globals.css` línea 65
- **Code:** `color: var(--c-text-3);`
- **Impact:** 11px + #6F7378 = peor combinación. Doble falla.
- **Fix:** Cambiar a `var(--c-text-2)` (#A7A7A7) que es AA pass. Esto NO requiere tocar el token global, solo la regla de eyebrow.
- **Tradeoff:** Eyebrow será más prominente, pero es coherente con su rol de categorizar secciones.

### NORM-010 · `border-line/30` o similar en opacities custom
- **Location:** varios
- **Impact:** No es un problema. Es la forma estándar de Tailwind.

---

## Patterns & Systemic Issues

1. **Token evading con Tailwind utilities:** El equipo usa `bg-black`, `text-white`, `bg-[#060607]` en lugar de tokens. Es decisión consciente en la mayoría, pero el caso del Preloader es literal hardcoded del token.
2. **`text-ink-faint` está calibrado para decoración, no para texto.** Fue pensado para "watermark" / "línea decorativa" pero se usa como `text-ink-muted`'s little brother y rompe AA. Necesita subir a `#8a8e94` mínimo o crear un nuevo token `text-ink-disabled` que sí pueda ser #6F7378.
3. **Opacities de marca** (`bg-brand/12`, `bg-positive/12`, `text-positive`, etc.) no son tokens formales. Funcionan por convención pero no hay guía.

---

## Positive Findings

- **Componentes UI (LuButton, LuCard, LuBadge) usan tokens correctamente** vía `cn()` y clases Tailwind que mapean a variables CSS.
- **Tailwind config** mapea todos los tokens a utilities. Bien.
- **No hay colores hex hardcoded en `app/page.tsx`, `noticias`, `reviews`** (verificado). Solo en `Preloader` y los casos justificados arriba.
- **Sistema de tokens extensible:** agregar `--c-text-disabled` o subir `--c-text-3` es 1 línea.

---

## Recommendations by Priority

### Immediate (P0)
1. Cambiar `--c-text-3` de `#6F7378` → `#8a8e94` en `globals.css`. Afecta 31+ elementos. Solución 1 línea.
2. Reemplazar `bg-[#060607]` por `bg-bg` en `Preloader.tsx` línea 71.

### Short-term (P1)
3. Cambiar `text-ink-faint` → `text-ink-muted` en `lu-eyebrow`.
4. Cambiar `hover:border-ink-faint` → `hover:border-ink-muted` en `LuCard.tsx` línea 27.
5. Documentar convenciones:
   - `bg-black/*` y `bg-white/*` solo para overlays/elementos sobre imágenes
   - `text-white` solo sobre rojo o negro absoluto
   - `brand/*N` opacities como convención para "surface tints"

### Medium-term (P2)
6. Considerar `shadow-glow` para LuButton primary en vez de `shadow-soft`.
7. Evaluar nuevo token `--c-text-disabled` (#6F7378) para casos de "inactivo, no énfasis" si se quiere mantener la jerarquía.

---

## Suggested Commands

- `typeset` — para subir tamaño de eyebrow y arreglar el binomio tamaño/color
- `bolder` — para `LuButton` primary con más peso
- `polish` — para pass final post-fixes de tokens
