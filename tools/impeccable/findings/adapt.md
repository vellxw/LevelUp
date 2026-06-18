# Adapt — Responsive, Touch, Viewports

**Fecha:** 2026-06-18
**Scope:** Mobile (390px), Tablet (768px), Desktop (1440px)
**Screenshots:** `screenshots/home-mobile-390.png`, `juegos-tablet-768.png`, `onboarding-tablet-768.png`, `onboarding-mobile-390.png`, `home-desktop.png`
**Veredicto:** El proyecto **falla en mobile** en varios puntos críticos. La home es OK en desktop pero en mobile se ve apretada y la navegación inferior no tiene la prominencia que debería. El sistema de grid 4/8/12 está bien pero los breakpoints de cards (sm/md/lg) no se aprovechan siempre. Touch targets en mobile nav son 56px ✅ pero la UX inferior puede mejorar.

---

## Inventario responsive

| Componente       | Mobile 390 | Tablet 768 | Desktop 1440 | Veredicto |
| ---------------- | ---------- | ---------- | ------------ | --------- |
| Header           | ⚠️ nav oculto, icons ok | ✅ nav inline | ✅ nav full | OK con mobile nav |
| Hero             | ⚠️ apilado, scroll vertical largo | ✅ 65/35 | ✅ 65/35 | OK mobile |
| Ticker           | ✅ anim ok | ✅ | ✅ | OK |
| MiRadarPreview   | ⚠️ padding apretado | ✅ | ✅ | Mejorar padding mobile |
| LuMetricCard     | ⚠️ grid 2-col OK pero labels apretados | ✅ 2-col | ✅ 4-col | OK |
| Próximos lanzamientos rail | ✅ scroll horizontal | ✅ | ✅ | OK pattern |
| Ofertas strip    | ✅ | ✅ | ✅ | OK |
| Reviews grid     | ⚠️ 1-col, cards muy grandes | ⚠️ 2-col, OK | ✅ 4-col | OK |
| Lo importante de hoy | ⚠️ 1-col stack | ✅ 1+3 (pero 1 + 3 cards horizontales) | ✅ 2+3 | OK |
| Videos grid      | ⚠️ 1-col | ✅ 2-col | ✅ 4-col | OK |
| Comunidad grid   | ⚠️ 1-col | ✅ 2-col | ✅ 3-col | OK |
| CTA final        | ⚠️ botones wrap | ✅ | ✅ | OK |
| Footer           | ✅ stacked | ✅ | ✅ | OK |
| MobileNav        | ✅ 56px targets, 5 items | n/a | n/a | OK |
| Onboarding       | ⚠️ 2-col games apretadas | ✅ 3-col | ✅ 3-col | Mejorar mobile |
| MiRadar empty    | ✅ centrado | ✅ | ✅ | OK |

---

## P0 — Critical (mobile-first rompe)

### ADAPT-001 · Hero en mobile muy alto, scroll cansado
- **Location:** `components/home/Hero.tsx` línea 12
- **Code:** `min-h-[420px]` mobile, `min-h-[640px]` desktop
- **Impact:** 420px en 390 viewport = todo el viewport. El usuario debe scrollear para ver el resto del hero (3 cards secundarias debajo). Cansado.
- **Fix:** En mobile, hacer el hero `min-h-[60vh]` o `aspect-ratio` para que sea 1 sola toma. O reducir min-h a 360px.
- **Beneficio:** Hero "toma completa" en mobile.

### ADAPT-002 · CustomCursor visible en mobile
- **Location:** `components/ui/CustomCursor.tsx`
- **Impact:** El cursor custom se renderiza en touch devices (pointer:coarse) y crea un fantasma visual. (También reportado en harden-003).
- **Fix:** Gate por `pointer: fine and (hover: hover)`.
- **Beneficio:** No más fantasma en touch.

### ADAPT-003 · Mobile nav: badges "EN VIVO" / "Hoy" se truncan
- **Location:** `components/shell/MobileNav.tsx`
- **Impact:** 5 items en 390px = 78px por item. Texto "Mi Radar" cabe pero "Notificaciones" no. Sin label se vuelve confuso.
- **Fix:** Verificar truncamiento con `text-[10px]` o usar icon-only con tooltip/aria-label.
- **Beneficio:** Claridad.

---

## P1 — High (mejorar mobile)

### ADAPT-004 · Reviews grid mobile 1-col hace cards muy altas
- **Location:** `app/page.tsx` Reviews grid `grid-cols-2 sm:grid-cols-2 lg:grid-cols-4`
- **Impact:** En mobile (390px) cada card toma ~360px de ancho. Card completa (cover h-36 + title + verdict) = ~340px de alto. Scroll largo.
- **Fix:** Considerar 2-col en mobile (cover más pequeño). O usar `layout="horizontal"` en mobile.
- **Beneficio:** Más cards visibles por scroll.

### ADAPT-005 · Lo importante de hoy 2+3 en lg, 1+1 en mobile
- **Location:** `app/page.tsx` 
- **Code:** `<div className="lg:col-span-2">` y 3 horizontales
- **Impact:** En mobile se apila en 4 cards. Funciona, pero pierde la jerarquía "1 grande + 3 standard".
- **Fix:** En mobile, primera card con `h-56` (cover más alto) + 3 horizontales debajo.
- **Beneficio:** Mantiene jerarquía visual mobile.

### ADAPT-006 · Mobile nav home button no tiene label
- **Location:** `MobileNav.tsx` línea ~25
- **Impact:** Si el ícono no es obvio, usuario no sabe qué hace. (Verificar aria-label).
- **Severidad:** Verificar accesibilidad.

### ADAPT-007 · Onboarding step 3 (games) en mobile 2-col muy apretado
- **Location:** `app/onboarding/page.tsx` línea 119
- **Code:** `grid-cols-2 sm:grid-cols-3`
- **Impact:** 6 juegos visibles en 2 columnas = filas de 2. Card de cada juego tiene `h-24` cover + `p-3 py-2` texto. En 390/2 = 195px ancho. Apretado pero funciona.
- **Fix:** Opcional: pasar a 1-col en mobile. Pero 2-col es OK para escaneo.
- **Severidad:** No es bug. Borderline.

### ADAPT-008 · Header en mobile: solo logo + icons
- **Location:** `components/shell/Header.tsx`
- **Impact:** Funciona. Pero logo "LevelUp" en `text-xl` (20px) puede ser chico en mobile. "LevelUp" + dot rojo. OK.
- **Severidad:** No es bug.

### ADAPT-009 · Footer en mobile: 2-col nav puede apretar
- **Location:** `components/shell/Footer.tsx`
- **Code:** `grid-cols-2 sm:grid-cols-3`
- **Impact:** En 390/2 = 195px por col, los labels caben. OK.
- **Severidad:** No es bug.

---

## P2 — Medium/Low (polish responsive)

### ADAPT-010 · HorizontalRail mobile scroll snap
- **Location:** `components/ui/HorizontalRail.tsx` (no leído)
- **Impact:** En mobile, scroll horizontal puede ser confuso sin snap. Agregar `scroll-snap-type: x mandatory` en el contenedor.
- **Beneficio:** Cards "saltan" al pasar.

### ADAPT-011 · Tablas y datos en mobile
- **Location:** LuCountdownTimer es horizontal, podría apretar.
- **Code:** 4 cells × (3 sep + cell) = muchos items en mobile.
- **Fix:** Considerar versión 2x2 grid en mobile.

### ADAPT-012 · `text-[clamp()]` funciona bien en todos los viewports
- **Location:** Hero h1, LuSectionHeader h2, PageHeader h1
- **Veredicto:** ✅ Bien. Sistema fluido funcionando.

### ADAPT-013 · Light mode no existe (decisión)
- **Location:** `app/globals.css` solo define `:root` con dark
- **Impact:** No hay toggle. Decisión de marca. OK.

### ADAPT-014 · No hay `meta viewport` problemático
- **Verificado:** layout.tsx tiene `width: "device-width", initialScale: 1`. ✅

---

## Touch targets audit

| Elemento                  | Tamaño actual | Mínimo WCAG | OK? |
| ------------------------- | ------------- | ----------- | --- |
| MobileNav item            | min-h-[56px] | 44px        | ✅   |
| LuButton sm               | h-9 (36px)    | 44px        | ❌   |
| LuButton md               | h-11 (44px)   | 44px        | ✅ borderline |
| LuButton lg               | h-12 (48px)   | 44px        | ✅   |
| Hero carousel prev/next   | h-10 w-10 (40px) | 44px     | ❌   |
| Header search/notification/user | h-10 w-10 (40px) | 44px | ❌ |
| LuChip                    | py-1.5 (30px content) | 44px | ❌ |
| FollowButton              | h-9 (36px)    | 44px        | ❌   |

**Hallazgo:** 6+ elementos con touch target <44px en mobile. Falla WCAG 2.5.5 (Target Size).

### P0 ADAPT-015 · Touch targets <44px en varios botones críticos
- **Location:** 
  - LuButton sm (h-9 = 36px) ❌
  - Hero carousel buttons (40px) ❌
  - Header icons (40px) ❌
  - LuChip (30px content) ❌
  - FollowButton sm (36px) ❌
- **Impact:** Falla WCAG 2.5.5 (AAA, pero 44px es best practice en mobile). Apple HIG pide 44pt, Material 48dp.
- **Fix:**
  - LuButton sm: h-9 → h-10 (40px) o h-11 (44px) en mobile
  - Hero carousel: h-10 w-10 → h-11 w-11
  - Header icons: h-10 w-10 → h-11 w-11 con mx-1
  - LuChip: agregar `min-h-[44px]` mobile
  - FollowButton sm: h-9 → h-10
- **Beneficio:** Cumple WCAG AAA, mejor experiencia touch.

---

## Patterns & Systemic Issues

1. **Touch targets no se auditan sistemáticamente** — varios están en 36-40px.
2. **Mobile nav funciona pero hay overflow potencial** si se agregan items.
3. **Hero muy alto en mobile** — no se siente "portada" sino "rectángulo".
4. **Cards 1-col en mobile** son altas, el usuario scrollea mucho.
5. **CustomCursor no se gatea** → visible en touch.
6. **Tablet (768) está bien** — breakpoint funciona.
7. **Desktop está excelente** — el sistema brilla en desktop.

---

## Positive Findings

- **Mobile nav presente** con 5 items principales.
- **Touch targets ≥56px en mobile nav** (mejor que mínimo).
- **Container responsive** con `max-w-shell: 1440px` + `px-4 sm:px-6 lg:px-10`.
- **Clamp typography** funciona en todos los viewports.
- **Grid 4/8/12 mobile-first** que escala bien.
- **Skip link** presente.
- **`<html lang="es">`** correcto.
- **meta viewport** correcto.
- **Tablet breakpoint funciona** sin issues.

---

## Recommendations by Priority

### Immediate (P0)
1. CustomCursor: gate por pointer:fine (ADAPT-002).
2. Touch targets ≥44px en LuButton sm, FollowButton sm, Hero carousel, Header icons, LuChip (ADAPT-015).
3. Hero mobile: `min-h-[420px]` → `min-h-[60vh]` o `aspect-ratio` (ADAPT-001).

### Short-term (P1)
4. Reviews grid mobile: 1-col → 2-col o usar `layout="horizontal"` (ADAPT-004).
5. "Lo importante de hoy" mobile: cover más alto en primera card (ADAPT-005).
6. Verificar aria-label en mobile nav (ADAPT-006).

### Medium-term (P2)
7. HorizontalRail: `scroll-snap-type: x mandatory` (ADAPT-010).
8. LuCountdownTimer: 1x4 → 2x2 grid en mobile (ADAPT-011).
9. Verificar que text-[10px] mobile no esté en critical info (ADAPT-003).

---

## Suggested Commands

- `harden` — para touch targets.
- `quieter` — para CustomCursor.
- `polish` — pass final.
