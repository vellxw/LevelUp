# Workflow
- Use `agents.md` (not `CLAUDE.md`) as the project's AI config / instructions file. Confidence: 0.85
- When the user says "borra todo y dejale read X", clear the file and make it read/append from X. Confidence: 0.85
- Persist design context to `.impeccable.md` in project root for design decisions. Confidence: 0.80
- Use impeccable skills/commands when user requests UI/UX audits or design reviews. Confidence: 0.70
- For multi-fix refactors, work through P0 fixes in numbered order using a todo list, then validate with `npm run typecheck` → `npm run lint` → lighthouse before declaring done. Confidence: 0.75
- Document sprint results in `tools/impeccable/audit-log.md` with before/after metric tables (Lighthouse scores, touch targets, contrast issues, etc.). Confidence: 0.75
