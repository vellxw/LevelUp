# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# Communication
- Respond in Spanish (Latin American neutral) when user writes in Spanish. Confidence: 0.85
- Match user's terse, direct style — no over-explanation, no unnecessary preamble. Confidence: 0.70
- Accept informal/lowercase input as-is; don't correct typos or grammar. Confidence: 0.70

# Workflow
See [workflow/taste.md](workflow/taste.md)
# Tech Stack
- This is a Next.js 16 (App Router) + React 19 + TypeScript strict project. Confidence: 0.90
- Use Tailwind CSS v3 with CSS variables as the only source of color/spacing/radius/shadow tokens. Confidence: 0.90
- State management: Zustand with `localStorage` persistence (key `levelup-radar-v1`). Confidence: 0.85
- Never hardcode colors, radii, shadows, or fonts outside the token system. Confidence: 0.85

# Design System
See [design-system/taste.md](design-system/taste.md)
# Code Style
- TypeScript strict mode required. Confidence: 0.85
- Use `clsx` for conditional className composition. Confidence: 0.75
- Mock typed data with cross-references (news ↔ games ↔ reviews ↔ videos ↔ community) — no real backend yet. Confidence: 0.75
