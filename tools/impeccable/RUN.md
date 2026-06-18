# Impeccable — Ruta de auditoría UI para LevelUp

Orden de ejecución de skills para revisar y mejorar toda la UI. **Lee siempre `.impeccable.md` antes de invocar cualquier skill.**

## Orden de fases

| # | Skill      | Foco                                  | Output                              |
| - | ---------- | ------------------------------------- | ----------------------------------- |
| 0 | setup      | Crear estructura + tracking           | `tools/impeccable/`                 |
| 1 | audit      | a11y, perf, theming, responsive       | `findings/audit.md`                 |
| 2 | critique   | Jerarquía, IA, resonancia             | `findings/critique.md`              |
| 3 | normalize  | Consistencia con design system        | `findings/normalize.md`             |
| 4 | typeset    | Tipografía, pesos, jerarquía          | `findings/typeset.md`               |
| 5 | arrange    | Layout, espaciado, ritmo              | `findings/arrange.md`               |
| 6 | colorize   | Color estratégico                     | `findings/colorize.md`              |
| 6 | bolder     | Intensidad visual                     | `findings/bolder.md`                |
| 6 | quieter    | Calmar agresividad                    | `findings/quieter.md`               |
| 7 | animate    | Motion, microinteracciones            | `findings/animate.md`               |
| 8 | delight    | Personalidad, momentos memorables     | `findings/delight.md`               |
| 9 | harden     | Robustez, error states, i18n          | `findings/harden.md`                |
| 10| adapt      | Responsive, touch, viewports          | `findings/adapt.md`                 |
| 11| onboard    | Empty states, primer uso              | `findings/onboard.md`               |
| 12| extract    | Sistematizar patrones                 | updates a design-system             |
| 13| polish     | QA final                              | `findings/polish.md`                |

## Reglas

1. **Una skill a la vez** — completa la fase antes de pasar a la siguiente.
2. **Documenta hallazgos** en `findings/<skill>.md` con severidad P0/P1/P2.
3. **Actualiza el log** en `audit-log.md` después de cada fase.
4. **Aplica fixes** de P0 antes de seguir (P1/P2 puede esperar).
5. **Captura evidencia visual** en `tools/impeccable/screenshots/` cuando aplique.

## Severidad

- **P0** — bloquea release, accesibilidad rota, contraste falla, no usable
- **P1** — afecta experiencia significativa, debe arreglarse pronto
- **P2** — mejora, nice-to-have, polish

## Contexto del proyecto (resumen rápido)

- Stack: Next.js 16 App Router + React 19 + TS strict + Tailwind v3 + Zustand
- Tokens: CSS variables en `app/globals.css`, mapeados en `tailwind.config.ts`
- Tipografía: Rajdhani (display) / Inter (body) / IBM Plex Mono (data)
- Paleta: dark editorial (`#060607` bg, `#E50914` rojo acento, `#59D65C` verde, `#E7A83A` ámbar)
- Accesibilidad objetivo: WCAG AAA
- Componentes clave: `LuButton`, `LuBadge`, `LuCard`, `LuChip`, `LuSectionHeader`, `LuCorners`, `LuDivider`, `LuScoreBadge`, `LuPlatformTag`, `LuSection`, `LuContainer`, `LuGrid`, `LuCol`, `LuStack`, `LuNewsCard`, `LuGameCard`, `LuReviewCard`, `LuVideoCard`, `LuFilterBar`, `LuCountdownTimer`, `LuLiveTicker`, `LuMetricCard`

## Rutas a revisar

- `/` home
- `/onboarding`
- `/mi-radar`
- `/noticias` + `/noticias/[slug]`
- `/juegos` + `/juegos/[slug]`
- `/reviews` + `/reviews/[slug]`
- `/videos`
- `/comunidad`
- `/buscar`
- `/perfil`
- `/notificaciones`
- `/design-system`
