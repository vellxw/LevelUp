# Delight — Personalidad, Copy, Empty States

**Fecha:** 2026-06-18
**Scope:** Mi Radar (con estado vacío), Onboarding, copy general, success/error states, micro-interacciones
**Veredicto:** El proyecto tiene **ADN propio** (tagline "La competencia informa. LevelUp acompaña", preloader con coordenadas latinas, eyebrows en mono) pero **falta polish en los empty states reales** y la copy es a veces genérica. Hay 1 gran oportunidad de delight: el primer fill del radar.

---

## Inventario de copy & personality

| Pieza                       | Texto actual                                        | Veredicto |
| --------------------------- | --------------------------------------------------- | --------- |
| Tagline                     | "La competencia informa. LevelUp acompa\u00f1a."    | ✅ Buen ADN |
| Hero meta                   | "DESTACADO" / "01 / 05"                             | ✅ Coherente |
| Ticker items                | Titles de noticias reales                           | ✅ Funciona |
| MiRadarPreview empty        | "A\u00fan no configuraste tu radar..."              | ⚠️ Genérico |
| MiRadar empty state         | "Tu radar est\u00e1 vac\u00edo" + "Configur\u00e1..." | ⚠️ Frío |
| Onboarding step labels      | "Plataformas / G\u00e9neros / Juegos / Confirmar"   | ✅ Claro |
| Onboarding step 1           | "\u00bfEn qu\u00e9 jug\u00e1s?"                      | ✅ Bien |
| Onboarding step 2           | "\u00bfQu\u00e9 te gusta jugar?"                    | ✅ Bien |
| Onboarding step 3           | "Segu\u00ed tus juegos"                              | ✅ Bien |
| Onboarding step 4 confirm   | "Confirm\u00e1 tus intereses"                       | ⚠️ Frío |
| Preloader                   | "SYSTEM INIT: LEVELUP V1.0.0" + coordenadas         | ✅ Buen ADN |
| Reviews                     | "VEREDICTOS" eyebrow                                | ✅ Editorial |
| News                        | "HOY" eyebrow                                       | ⚠️ Genérico |
| Comunidad                   | "EN DEBATE" eyebrow                                 | ✅ Editorial |
| Configurar Mi Radar CTA     | "Configurar Mi Radar" (repetido 2x)                 | ❌ Redundante |
| Final CTA                   | "Arm\u00e1 tu radar gamer"                          | ⚠️ "Gamer" es gastado |
| 404/empty pages             | No audité (no leí todas las rutas)                  | n/a       |
| Error states                | No audité                                          | n/a       |

---

## P0 — Critical (repite contenido / pierde identidad)

### DEL-001 · CTA "Configurar Mi Radar" aparece 2 veces en home
- **Location:** `app/page.tsx` MiRadarPreview sección + última sección
- **Impact:** Mismo mensaje, mismo target. En un medio "editorial confiado" se siente como banner ad.
- **Fix:** Eliminar la sección final "Arm\u00e1 tu radar gamer". Reemplazar por algo distinto o dejarla solo si el usuario ya completó onboarding.
- **Beneficio:** Home con 1 CTA principal claro.

### DEL-002 · Onboarding "Configuraci\u00f3n inicial" + "Arm\u00e1 tu radar" — copy en español neutro pero falta punch
- **Location:** `app/onboarding/page.tsx`
- **Impact:** Funciona pero es formal. Para "gamers hispanohablantes 18-35" podría ser más cercano.
- **Fix:** Mantenerlo. La formalidad funciona con el tono "editorial". Cambiar solo si hay feedback.
- **Severidad:** Baja. No es P0.

---

## P1 — High (empty states necesitan polish)

### DEL-003 · MiRadar empty state es frío
- **Location:** `app/mi-radar/page.tsx` líneas 50-58
- **Code:** 
```jsx
<h2>Tu radar est\u00e1 vac\u00edo</h2>
<p>Configur\u00e1 tus plataformas, g\u00e9neros y juegos para empezar a recibir recomendaciones y seguimiento.</p>
<LuButton>Configurar Mi Radar</LuButton>
```
- **Impact:** El primer fill es el momento más importante. Aquí se gana o se pierde el usuario. El copy es funcional, no memorable.
- **Fix sugerido:** Algo como:
  - h2: "Tu radar est\u00e1 en blanco"
  - p: "Lleva 60 segundos. Eleg\u00eds plataformas, temas y juegos. Despu\u00e9s, la home se acomoda a lo que te importa."
  - CTA: "Armar mi radar" (más acción, menos "configurar")
- **Beneficio:** El usuario siente que va a invertir 60s, no algo vago.

### DEL-004 · MiRadarPreview empty state en home
- **Location:** `components/home/MiRadarPreview.tsx` (no leído, inferencia)
- **Code:** "A\u00fan no configuraste tu radar. Eleg\u00ed plataformas, g\u00e9neros y juegos para transformar la home en una experiencia personalizada."
- **Impact:** Es OK pero podría ser más directo.
- **Fix:** Cambiar a "Tu radar a\u00fan no est\u00e1 calibrado. 60s y la home se vuelve tuya." o similar.
- **Beneficio:** Más promesa, menos explicación.

### DEL-005 · LuCountdownTimer mostrando 00:00:00:00
- **Location:** home / Próximos lanzamientos
- **Impact:** Para juegos con fechas pasadas, el countdown muestra ceros. Cosmético pero obvio.
- **Fix:** Mostrar "DISPONIBLE" o "LANZADO" en vez de ceros.

### DEL-006 · "Lo importante de hoy" eyebrow
- **Location:** `app/page.tsx`
- **Code:** `eyebrow="Hoy"`
- **Impact:** Genérico. Otras secciones tienen "PANORAMA", "CALENDARIO", "VEREDICTOS" (más editoriales). "Hoy" se queda corto.
- **Fix:** Cambiar a "AHORA" o "EN ROTACIÓN" o "BREVES".

### DEL-007 · Final CTA copy "Arm\u00e1 tu radar gamer"
- **Location:** `app/page.tsx` última sección
- **Impact:** "Gamer" es adjetivo gastado. Suena a promo de Juegos R.
- **Fix:** Cambiar a "Arm\u00e1 tu radar" (sin "gamer") o directamente eliminar la sección (DEL-001).

---

## P2 — Medium/Low (micro-detalles)

### DEL-008 · Sin success state al guardar/seguir
- **Location:** `FollowButton`, `SaveButton`
- **Impact:** El usuario hace click y no hay feedback visual más allá del cambio de estado. ¿Se guardó? ¿Hubo error?
- **Fix:** Agregar toast o check animado. "Guardado ✓" o un check animation.

### DEL-009 · Sin celebration al completar onboarding
- **Location:** `app/onboarding/page.tsx`
- **Impact:** Después de 4 pasos, "Ver mi home personalizada" → redirect. Sin momento de "listo, lo lograste".
- **Fix:** Mostrar un micro-confetti o un check gigante o un "RADAR CALIBRADO" antes del redirect. Breve (1.5s).

### DEL-010 · Onboarding step 4 es solo confirmación textual
- **Location:** `app/onboarding/page.tsx` step 3
- **Impact:** Es la última vista. Sin visualización (ej. "tu radar verá: 5 plataformas, 3 géneros, 2 juegos"). Solo texto.
- **Fix:** Agregar visual: un mini-radar SVG con blips, o un "tu feed tendrá: 5 fuentes priorizadas".

### DEL-011 · No hay "tip of the day" / dato curioso en home
- **Location:** home
- **Impact:** Faltan momentos de descubrimiento. La home es informativa pero no enseña.
- **Fix:** Opcional. Agregar un bloque "¿Sabías que...?" con dato gaming random. No prioritario.

### DEL-012 · Tagline repetido 3 veces
- **Location:** home final CTA, footer, possibly más
- **Impact:** Saturación del claim. Pierde fuerza.
- **Fix:** Dejarlo solo en footer. En home, usar copy distinto.

### DEL-013 · "Fichas vivas activas" (LuMetricCard hint) — copy confuso
- **Location:** home "Estado del juego" → LuMetricCard
- **Impact:** "Fichas vivas" no es lenguaje que un gamer use. Suena a "base de datos".
- **Fix:** Cambiar a "Juegos en el radar" o "Juegos que seguimos".

---

## Patterns & Systemic Issues

1. **CTAs repetidos** en home: "Configurar Mi Radar" aparece 2+ veces.
2. **Empty states son "configur\u00e1 + ya est\u00e1"** sin invitar. Falta gancho.
3. **Sin success/celebration states** — las acciones (guardar, seguir, terminar onboarding) no tienen momento de "lo lograste".
4. **Tagline presente** pero repetido → diluido.
5. **Copy en español neutro** es funcional pero pierde sabor regional (LATAM/España).

---

## Positive Findings

- **Tagline "La competencia informa. LevelUp acompa\u00f1a."** es memorable, posiciona al medio.
- **Preloader con coordenadas latinas** — `34.6037 S, 58.3816 W` (Buenos Aires!) es un detalle único.
- **Eyebrows en mono** con `//` separador en ticker — editorial y propio.
- **Tono editorial confiado** se mantiene en la mayoría de copy.
- **Onboarding es claro** (4 pasos con progreso visible).
- **Microcopy en CTAs** es accionable ("Ver mi home personalizada" no "Submit").

---

## Recommendations by Priority

### Immediate (P0)
1. Eliminar duplicación de "Configurar Mi Radar" (DEL-001 + DEL-007).

### Short-term (P1)
2. Reposicionar copy de MiRadar empty state (DEL-003).
3. Reposicionar MiRadarPreview empty state (DEL-004).
4. LuCountdownTimer: 00:00:00:00 → "DISPONIBLE" (DEL-005).
5. Cambiar "Hoy" eyebrow por algo más editorial (DEL-006).

### Medium-term (P2)
6. Success/celebration states (DEL-008, DEL-009, DEL-010).
7. Tagline solo en footer (DEL-012).
8. Copy "fichas vivas" → "juegos en el radar" (DEL-013).
9. Tip of the day opcional (DEL-011).

---

## Suggested Commands

- `distill` — para quitar/quedar (Fase 6 ya cubre esto).
- `clarify` — para refinar copy específica.
- `delight` — para agregar success states y momentos memorables.
- `polish` — pass final.
