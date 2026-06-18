# Design System
- Dark editorial aesthetic: near-black backgrounds (`#060607`), red `#E50914` accent, green only for positive state. Confidence: 0.90
- Typography stack: Rajdhani (display), Inter (body), IBM Plex Mono (data). Confidence: 0.85
- Use atomic design with `Lu*` prefixed components (LuButton, LuCard, LuNewsCard, etc.). Confidence: 0.85
- Animation easing: `cubic-bezier(0.22, 1, 0.36, 1)` (defined as `ease-smooth`). Confidence: 0.75
- Always respect `prefers-reduced-motion`. Confidence: 0.85
- Accessibility target: WCAG AAA (contrast 7:1, focus visible, keyboard nav, aria-*, targets ≥44px). Confidence: 0.85
