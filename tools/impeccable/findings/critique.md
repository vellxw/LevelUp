# Design Critique — LevelUp Home & Key Surfaces

**Fecha:** 2026-06-18
**Scope:** Home (`/`), `/onboarding`, `/juegos`, `/reviews/[slug]`, `/noticias/[slug]`
**Perspective:** Design director feedback

---

## Anti-Patterns Verdict — PASS

**¿Se ve AI-generado? No.** El proyecto tiene identidad propia: tipografía display (Rajdhani), mono (IBM Plex) y body (Inter) trabajando en capas, paleta oscura restringida con rojo como acento, micro-detalles de revista gaming (ticker, scanlines, countdown con mono). El "radar" como metáfora del producto no es cliché.

**Tells de AI que evitó correctamente:**
- Sin glassmorphism
- Sin gradient text
- Sin gradient backgrounds (más allá del hero overlay)
- Sin "Get started" hero CTA
- Sin card grid perfecto y monótono (mezcla horizontales + 2-col + 3-col)
- Sin tipografía Inter-only
- Sin métricas de hero genéricas
- Sin ilustración isométrica de stock

**Riesgo:** over-engineering decorativo. Hay 7+ capas de motion (Glitch, Scanlines, CustomCursor, Preloader, Magnetic, Reveal, Marquee). El intento de parecer Awwwards-quality puede alejar al usuario real (gamer latino que quiere decidir qué jugar).

---

## Overall Impression

**Lo que funciona:** Hay un ADN editorial claro. La home comunica "esto es un medio serio, no un feed" en menos de 2 segundos. El ticker con la tipografía mono y los `//` separadores es el detalle más propio del proyecto. El countdown con `00 DÍAS : 00 HS : 00 MIN : 00 SEG` en IBM Plex Mono es exactamente la sensación de "radar en vivo" que el producto promete. El hero con SplitText y 65/35 ratio es editorial.

**Lo que no funciona:** Saturación de "wow factor" compite con la lectura. El CustomCursor global es una postura, no un feature. El LuButton primary con `shadow-soft` se ve lavado contra el surface-1; el CTA real no destaca tanto como debería. La home tiene 9 secciones + 2 CTAs de "Configurar Mi Radar" (uno en MiRadarPreview, otro en "Armá tu radar" final) — el mismo mensaje se repite.

**La mayor oportunidad:** Recortar motion decorativo, fortalecer jerarquía del CTA primario, y arreglar la tipografía (eyebrow 11px + #6f7378 = ilegible).

---

## What's Working

1. **Ticker con mono + separador `//`** — establece el tono de "sistema en vivo" sin necesidad de explicarlo. Es la pieza más "LevelUp" del proyecto.
2. **CountdownTimer en IBM Plex Mono** — los datos se sienten como consola técnica. Coherente con la metáfora del radar.
3. **Hero 65/35 + 3 cards secundarias** — el ratio comunica jerarquía sin gritar. El badge "Destacado" + counter `01 / 05` es discreto y profesional.

---

## Priority Issues

### 1. El CTA primario no domina visualmente
- **What:** El botón "Configurar Mi Radar" en `MiRadarPreview` y "Leer nota completa" en hero compiten con elementos decorativos (lu-grid-texture, lu-scanlines, corners, marquee). El usuario que llega a la home no tiene una sola acción obvia.
- **Why it matters:** Sin CTA dominante, el usuario se queda en modo "exploración pasiva". El producto ES Mi Radar; el onboarding debería sentirse como la única decisión que importa.
- **Fix:** Hacer el CTA primary más grande y rojo más prominente. Reducir motion decorativo en su entorno. Un solo "Configurar Mi Radar" grande, no dos repetidos.
- **Command:** `bolder` (intensidad en CTA), `distill` (quitar la sección "Armá tu radar" final que repite el mensaje).

### 2. LuButton primary se pierde contra surface
- **What:** `bg-brand` (#E50914) con `shadow-soft` sobre `bg-bg` (#060607) o `bg-surface1` (#0D0F12). El contraste existe pero la sombra soft lo aplana visualmente.
- **Why it matters:** El botón primary es el "qué hago ahora". Si no se ve como botón, la home no convierte.
- **Fix:** Usar `shadow-glow` para el primary, o aumentar saturación en hover. Botones sobre surface-2 (offers) deben tener más peso.
- **Command:** `bolder` o `polish`.

### 3. Saturación de animaciones decorativas
- **What:** Glitch, Scanlines, CustomCursor, Preloader, Magnetic en TODOS los botones del header y hero. Reveal en cada sección.
- **Why it matters:** Es bonita la home al cargar, pero el usuario que vuelve a la página cada día va a sentir que el sitio está "luchando por impresionar" en lugar de servirle. Y los usuarios con `prefers-reduced-motion` ven una experiencia rota.
- **Fix:** Reservar Glitch y Scanlines para el hero (si acaso). Quitar CustomCursor por defecto (gate por media query). Quitar Magnetic del nav (no aporta). Reducir Reveal a las secciones principales, no a cada card.
- **Command:** `quieter`, `distill`.

### 4. Eyebrow typography doble falla
- **What:** `lu-eyebrow` es 11px en `#6f7378` con `letter-spacing: 0.22em`. Lighthouse ya lo marca como contraste insuficiente.
- **Why it matters:** El eyebrow es la pieza que categoriza secciones ("DESTACADO", "PANORAMA", "CALENDARIO", "CONVIENE", "VEREDICTOS", "HOY", "MIRAR", "COMUNIDAD"). Si no se lee, las secciones se sienten sin orden editorial.
- **Fix:** Subir a 12px, color `#8a8e94` (mejor contraste), letter-spacing `0.16em` (menos extenuante a tamaño pequeño).
- **Command:** `typeset` + `normalize`.

### 5. Repetición del CTA "Configurar Mi Radar"
- **What:** Aparece en `MiRadarPreview` (early en la home) y al final ("Armá tu radar"). El usuario lo ve 2 veces.
- **Why it matters:** En una home editorial, el mensaje debe aparecer 1 vez, fuerte. Repetir 2 veces lo diluye.
- **Fix:** Mantener `MiRadarPreview` (es contextual y útil), quitar o transformar la sección final en algo distinto (ej. "Síguenos en X" o "Sobre LevelUp").
- **Command:** `distill`.

---

## Minor Observations

- **Header logo "LevelUp"** se ve un poco infantil (el cursor rojo al lado parpadea). Para un medio "editorial confiado", un logo más sobrio funcionaría mejor. (`quieter` o `bolder`)
- **Hero "01 / 05" en mono** es perfecto, no tocar.
- **LuNewsCard con layout="horizontal"** se ve apretado. Considerar más espacio o usar `LuCard` surface-3 con padding. (`arrange`)
- **LuMetricCard** los 4 cards en grid 2/4 lucen bien, pero el "5" de "Pr\u00f3ximos lanzamientos" se ve chiquito. El valor debe dominar, no la label. (`typeset` o `bolder`)
- **Ticker** "EN VIVO" badge + `//` separator + items: funciona, pero considerar pausa en hover para legibilidad. (`animate`)
- **Preloader**: agregarle opción "saltar" o fallar rápido. (`harden`)
- **Search icon en header** sin label visible en mobile. (`adapt`)
- **Card hover `-translate-y-1`** es muy sutil, no se siente. (`bolder` o `polish`)

---

## Questions to Consider

1. **¿Y si el CTA primary fuera del 100% width en mobile y tuviera más presencia visual?** El usuario mobile es mayoría.
2. **¿Necesitamos realmente CustomCursor + Glitch + Scanlines + Preloader en producción?** El "factor Awwwards" debería ser opcional, no default.
3. **¿Qué pasaría si el ticker fuera más lento (60s en vez de 30s) y solo mostrara 3-4 items, pero más grandes?** Más editorial, menos feed.
4. **¿La sección "Estado del juego" con 4 métricas tiene sentido en una home?** Vs. usarla solo en `/mi-radar`?
5. **¿Y si en vez de 2 CTAs "Configurar Mi Radar", la home tuviera UNO al final, y la primera sección mostrara valor inmediato (ej. "Hoy en la industria: 3 titulares")?**
6. **¿Por qué el score en reviews es "8.8" sin "/10"?** Un gamer espera ver "8.8 / 10" — es convención. (`clarify`)
7. **¿"La competencia informa. LevelUp acompa\u00f1a"** funciona como tagline o suena a eslogan de teletienda? (`clarify`)
8. **¿Qué sentiría un usuario que entra por segunda vez?** La home debe sentirse "para él" no "para impresionar a un jurado".

---

## Conclusión

El proyecto está bien diseñado y tiene ADN propio. No es AI slop. Pero está over-tuned para impresionar en primera visita y under-tuned para servir al usuario recurrente. La fix list es más de "quitar y arreglar" que de "agregar":

- Quitar motion decorativo (Glitch, CustomCursor, Scanlines en exceso, Magnetic)
- Arreglar tipografía (eyebrow 12px, mejor color, mejor letter-spacing)
- Fortalecer CTA primary
- Quitar duplicación de "Configurar Mi Radar"
- Agrega escala a los scores
- Respetar `prefers-reduced-motion` de verdad

Después de esto, una pasada de `polish` y queda listo.
