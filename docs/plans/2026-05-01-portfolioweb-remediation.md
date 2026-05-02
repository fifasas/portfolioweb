# Portfolioweb Remediation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task where useful.

**Goal:** Fix the grounded technical, UX, and maintainability issues previously identified in the live personal portfolio site.

**Architecture:** Keep the existing Vite + React SPA architecture, but reduce drift by centralizing repeated data, tightening preload behavior, cleaning lint issues, and moving remaining user-facing strings into the i18n layer where the desired wording is clear.

**Tech Stack:** React 19, Vite, React Router, i18next, Tailwind, Framer Motion, ESLint.

---

### Task 1: Stabilize tooling baseline
- Fix all current ESLint errors.
- Re-run `npm run lint` until clean.

### Task 2: Fix preload and startup behavior
- Remove or reduce unnecessary initial blocking work in `src/App.jsx`.
- Keep visual polish while avoiding a loader that waits for non-essential assets.

### Task 3: Fix obvious UX correctness issues
- Make contact email and phone actionable.
- Replace brittle browser-history-only back navigation with safe internal fallback logic.
- Fix incorrect project tags rendered on the Web Creation page.

### Task 4: Reduce duplicated business/contact data
- Introduce a shared site/contact data module.
- Refactor Contact, Footer, and Links to use it.

### Task 5: Fix obvious i18n defects
- Replace broken `All` filter logic.
- Move clearly translatable remaining hardcoded UI labels into i18n.

### Task 6: Reduce project/content drift where straightforward
- Reuse canonical project data where possible for rendering.
- Avoid page-local duplicate project metadata when the same info already exists elsewhere.

### Task 7: Verify production readiness
- Run `npm run lint` and `npm run build`.
- Summarize what is fixed, what still needs user decisions, and any remaining non-trivial content questions.
