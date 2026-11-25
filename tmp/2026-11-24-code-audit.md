# WolfCore Systems web — code audit 2026-11-24

Skill: `ai-specs/skills/code-auditing`. Scope: `src/` (45 files, ~4.5k lines), `next.config.ts`, `package.json`, ignore files.
Rule for this pass: fix bugs, security and quality issues only. No copy, design or flow changes.

## Executive summary

The codebase is in good shape: strict TypeScript, strict CSP and security headers (COOP/CORP included), a contact API
with origin check, streamed body limit, honeypot, timing trap, rate limit, allow-list validation, HTML escaping and
header-injection protection, consent per Ley 8968, and logs without personal data. Animations clean up correctly and
respect reduced motion. `npm audit`: 0 vulnerabilities.

Two defects fixed, one quality gap closed.

## Findings

### 1. Medium — SEO URLs fall back to localhost
- **Where:** `src/lib/empresa.ts` (`sitioUrl`).
- **Problem:** without `NEXT_PUBLIC_SITIO_URL`, `metadataBase`, canonical, Open Graph, sitemap and robots pointed to
  `http://localhost:3000`. A missing variable in a Vercel environment would publish broken canonical URLs silently.
- **Fix:** fall back to `https://wolfcoresystems.vercel.app` (same value as `.env.example`). If the variable is set,
  nothing changes. Test: `src/lib/empresa.test.ts`.

### 2. Low — Showcase shows no loading state when switching device mode
- **Where:** `src/components/Vitrina.tsx`.
- **Problem:** switching "Computadora"/"Celular" remounts the iframe, but the spinner was only reset when changing tabs,
  so a blank frame showed while the demo reloaded.
- **Fix:** reset `cargando` when the mode actually changes (also for the automatic mobile switch on load).

### 3. Quality — No automated tests
- Added Vitest with 14 tests: the full validation chain of `/api/contacto` (origin, content type, streamed 8 KB limit,
  malformed JSON, bots, field rules, consent, missing config, Resend success with escaping and header-injection checks,
  Resend failure, rate limit) and content invariants in `empresa.ts`.
- `typecheck` now runs `next typegen` first so route types exist on a clean checkout.

## Checked, no change needed

- `LoboParticulas`: all listeners, observer, timer and frame cancelled on unmount; pauses off-screen.
- `IntroLobo`: `sessionStorage` guarded, no flash for returning visitors, `Escape`/skip button work.
- External links have `rel="noopener noreferrer"` (internal demo links use `noopener`).
- `href="#"` links exist only inside fictional demo pages, by design.

## Known limitation

In-memory rate limit is per serverless instance on Vercel (best-effort). Documented in `docs/backend-standards.md`.

## Pending business items

`[CONFIRMAR]` markers in `src/lib/empresa.ts`: schedule, benefits, figures and FAQ answers.
