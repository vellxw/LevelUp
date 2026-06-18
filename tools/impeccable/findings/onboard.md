# Onboard — Empty States, First-Time UX, Onboarding

**Fecha:** 2026-06-18
**Scope:** Onboarding (`/onboarding`), Mi Radar empty state, Perfil empty, Buscar empty state, Notificaciones
**Veredicto:** El sistema de onboarding es **estructuralmente sólido** (4 pasos, progress indicator, persistencia, validación). Los empty states existen pero son **fríos** — texto plano sin gancho, sin "next action" clara. Falta el "aha moment" celebratorio. Sin embargo, hay una **oportunidad enorme** en el primer fill del radar (que es el core del producto).

---

## Inventario de empty states

| Página / Componente        | Empty state actual                                        | Hook? | Veredicto |
| -------------------------- | --------------------------------------------------------- | ----- | --------- |
| `/onboarding` (step 3)     | "Elegí juegos para seguir" — funciona                      | ✅    | ✅ OK      |
| `/onboarding` (step 4)     | "Confirmá tus intereses" — funciona                       | ❌    | ⚠️ Frío   |
| `/mi-radar` (sin config)   | "Tu radar está vacío" + "Configurar Mi Radar"             | ❌    | ⚠️ Frío   |
| `MiRadarPreview` (home)    | "Aún no configuraste tu radar..." + "Configurar Mi Radar" | ❌    | ⚠️ Frío   |
| `/mi-radar` (sin seguidos) | "Aún no seguís juegos. Entrá al catálogo..."             | ❌    | ⚠️ Genérico |
| `/mi-radar` (sin alertas)  | "Segu\u00ed juegos para poder activar alertas"             | ❌    | ⚠️ Genérico |
| `/mi-radar` (sin guardados)| "Todav\u00eda no guardaste contenidos..."                 | ❌    | ⚠️ Genérico |
| `/perfil` (sin intereses)  | "Sin plataformas seleccionadas" / "Sin g\u00e9neros"      | ❌    | ⚠️ Frío   |
| `/perfil` (sin historial)  | "Tu historial aparecerá acá..."                           | ❌    | ⚠️ Genérico |
| `/perfil` (sin guardados)  | "No guardaste contenidos todav\u00eda"                     | ❌    | ⚠️ Genérico |
| `/perfil` (sin alertas)    | "Segu\u00ed juegos para configurar alertas"                | ❌    | ⚠️ Genérico |
| `/buscar` (sin query)      | "Escribí algo para buscar en todo LevelUp"                | ⚠️    | ⚠️ Frío   |
| `/buscar` (sin resultados) | "Sin resultados para [query]"                             | ❌    | ⚠️ Frío   |
| `/notificaciones`          | No tiene empty state (siempre hay seed)                    | n/a   | n/a       |

---

## P0 — Critical (core UX)

### ONB-001 · El "aha moment" del primer fill del radar no existe
- **Location:** Onboarding step 4 → redirect a `/mi-radar`
- **Impact:** El usuario completa 4 pasos y aterriza en su panel sin celebración. No hay "RADAR CALIBRADO" ni micro-confetti ni mini-radar visual. Es el momento más importante del producto.
- **Fix:** Agregar un paso intermedio o estado de éxito:
  - Opción A: Mostrar "RADAR CALIBRADO" full-screen 1.5s antes del redirect
  - Opción B: En `/mi-radar` después del redirect, mostrar banner celebratorio con CTA a home
  - Opción C: Mini-confetti CSS-only (no requiere librería)
- **Beneficio:** El usuario siente que logró algo. Es lo que retiene.

### ONB-002 · MiRadar empty state es frío
- **Location:** `app/mi-radar/page.tsx` líneas 50-58
- **Code:**
```
"Tu radar está vacío"
"Configurá tus plataformas, géneros y juegos para empezar a recibir recomendaciones y seguimiento."
[Configurar Mi Radar]
```
- **Impact:** El usuario que llega a `/mi-radar` por primera vez ve un mensaje funcional pero no memorable. No hay promesa de valor.
- **Fix:**
  - h2: "Tu radar está en blanco"
  - p: "60 segundos y la home se acomoda a lo que te importa. Empezá por las plataformas que usás."
  - bullets de lo que recibirá: "✓ Recomendaciones de juegos" "✓ Lanzamientos que te interesan" "✓ Noticias filtradas"
  - CTA: "Armar mi radar" (más acción)
- **Beneficio:** El usuario entiende qué gana en 60s.

### ONB-003 · MiRadarPreview empty state en home
- **Location:** `components/home/MiRadarPreview.tsx`
- **Code:** "Aún no configuraste tu radar. Elegí plataformas, géneros y juegos para transformar la home en una experiencia personalizada."
- **Impact:** Genérico. "Transformar la home en una experiencia personalizada" es abstracto.
- **Fix:** "Tu radar aún no está calibrado. 60s y la home prioriza lo que te importa."
- **Beneficio:** Promesa concreta.

---

## P1 — High (empty states secundarios)

### ONB-004 · Onboarding step 4 (confirm) sin visual
- **Location:** `app/onboarding/page.tsx` step 3 (índice 3)
- **Impact:** Solo muestra texto con chips. No hay visualización de "tu radar verá X".
- **Fix:** Agregar un mini-radar SVG con blips representando las selecciones. O texto: "Con esto verás: 3 fuentes de noticias, 5 recomendaciones, alertas de 2 juegos."
- **Beneficio:** El usuario ve el resultado antes de confirmar.

### ONB-005 · `/buscar` empty states
- **Location:** `app/buscar/page.tsx`
- **Impact:** 
  - "Escribí algo para buscar" — funcional pero frío
  - "Sin resultados para X" — sin sugerencias
- **Fix:**
  - Empty (sin query): "Buscá juegos, noticias, reviews y videos. Probá con 'Hades' o 'GTA'."
  - No results: "Nada para '[q]'. Probá con otro t\u00e9rmino o [explorá el cat\u00e1logo]."
- **Beneficio:** Guía al usuario.

### ONB-006 · `/perfil` empty states
- **Location:** varios
- **Impact:** Todos dicen "Sin X" o "Todav\u00eda no...". Son correctos pero fríos.
- **Fix:** Para historial: "Tu actividad aparecerá acá. Empezá explorando el [catálogo de juegos]." Para guardados: "Guardá noticias, reviews y videos con el botón ⭐. Los encontrarás acá."
- **Beneficio:** Enseña el patrón "guardar" antes de que el usuario lo descubra solo.

### ONB-007 · Onboarding step 3 (games) no muestra preview de "lo que verás"
- **Location:** `app/onboarding/page.tsx` step 2
- **Impact:** El usuario elige juegos sin saber qué gana.
- **Fix:** Subtítulo: "Con estos juegos vas a recibir: alertas de actualizaciones, fechas de lanzamiento, ofertas y noticias relacionadas."
- **Beneficio:** Promesa antes del commit.

### ONB-008 · Sin "Skip" o "Lo haré después" en onboarding
- **Location:** `app/onboarding/page.tsx`
- **Impact:** El step 0 requiere seleccionar plataforma (canNext false si vacío). El usuario no puede explorar la app sin completar el radar.
- **Fix:** Agregar link "Explorar LevelUp sin personalizar →" en step 0.
- **Beneficio:** No bloquea al usuario curioso.

---

## P2 — Medium/Low (polish)

### ONB-009 · MiRadar "Configurar Mi Radar" CTA vs "Reconfigurar"
- **Location:** MiRadar vs Onboarding
- **Impact:** En MiRadar hay botón "Reconfigurar" pero no es claro que va a `/onboarding`. 
- **Severidad:** No es bug. Etiquetar como "Editar intereses" o "Reconfigurar Mi Radar" sería más claro.

### ONB-010 · Onboarding no muestra tiempo estimado
- **Location:** step 0
- **Impact:** El usuario no sabe cuánto falta.
- **Fix:** "Paso 1 de 4 · 60 segundos" arriba.
- **Beneficio:** Reduce ansiedad.

### ONB-011 · LuCountdownTimer sin empty state para fechas pasadas
- **Location:** `LuCountdownTimer.tsx`
- **Impact:** Muestra 0:0:0:0 en lugar de "DISPONIBLE".
- **Severidad:** Bug cosmético (HARD-001). Reportado en harden.

### ONB-012 · Notificaciones no tiene empty state
- **Location:** `app/notificaciones/page.tsx`
- **Impact:** Siempre hay `alertsSeed` data. No hay momento "no hay notificaciones".
- **Severidad:** No es bug. Si el usuario limpia, no pasa nada porque es seed. OK.

### ONB-013 · Step 3 (games) — selección no muestra contador
- **Location:** `app/onboarding/page.tsx`
- **Impact:** El usuario no sabe cuántos lleva seleccionados. Hay contador en step 4.
- **Fix:** Mostrar "X seleccionados" en step 3.
- **Beneficio:** Feedback de progreso.

---

## Patterns & Systemic Issues

1. **Empty states sin "value proposition"** — dicen "no hay X" pero no enseñan por qué importa.
2. **CTAs repetidos** entre MiRadar y MiRadarPreview y Onboarding final.
3. **Onboarding lineal** sin "skip" o "después".
4. **Sin celebration state** al completar acciones.
5. **Copy "Todav\u00eda no..." / "Sin X"** es patrón repetido en 8+ empty states.

---

## Positive Findings

- **Onboarding 4 pasos con progress visible** — buena estructura.
- **Validación por paso** (canNext) — previene saltar sin datos.
- **Persistencia con Zustand** — el usuario no pierde su progreso.
- **MiRadar y MiRadarPreview tienen empty states** (no son páginas en blanco).
- **Onboarding es claro y accionable**.
- **LuButton tiene `loading` prop** (no usado aún, pero listo).

---

## Recommendations by Priority

### Immediate (P0)
1. Agregar celebration state al completar onboarding (ONB-001).
2. Reposicionar copy de MiRadar empty state con bullets de valor (ONB-002).
3. Reposicionar MiRadarPreview empty state con promesa concreta (ONB-003).

### Short-term (P1)
4. Mini-radar visual en step 4 de onboarding (ONB-004).
5. Sugerencias en `/buscar` empty states (ONB-005).
6. Enseñar el patrón "guardar" en perfil/empty states (ONB-006).
7. Subtítulo de "qué verás" en step 3 onboarding (ONB-007).
8. "Skip / Lo haré después" en onboarding (ONB-008).

### Medium-term (P2)
9. Tiempo estimado en onboarding (ONB-010).
10. Contador de selección en step 3 (ONB-013).
11. LuCountdownTimer empty state (HARD-001).

---

## Suggested Commands

- `delight` — celebration states, copy memorable.
- `clarify` — refinar copy de empty states.
- `distill` — reducir CTAs repetidos.
- `polish` — pass final.
