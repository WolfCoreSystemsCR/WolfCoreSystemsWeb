# Development Guide

## Requirements

- Node.js 20.19+ and npm (`package-lock.json` is committed; use `npm ci`).
- Optional: OpenSpec CLI (`npm install -g @fission-ai/openspec@latest`).

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITIO_URL` | Recommended | Public domain for metadata, sitemap, OG and the form origin check. Defaults to `https://wolfcoresystems.vercel.app` |
| `RESEND_API_KEY` | For the form | Without it the form answers 503 and shows email/WhatsApp alternatives |
| `CONTACTO_PARA` | For the form | Inbox that receives messages |
| `CONTACTO_DESDE` | For the form | Sender verified in Resend |

Never commit `.env.local`. Set production values in Vercel → Project → Settings → Environment Variables.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (also re-adds the Next.js agent block to `AGENTS.md` if missing) |
| `npm run build` / `npm start` | Production build / serve (build needs access to Google Fonts) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run test:watch` | Vitest watch mode |

Before every commit: `npm test && npm run typecheck`. Before a pull request: also `npm run build`.

## Workflow

1. Branch from `main` (`feature/<name>` or `fix/<name>`).
2. Non-trivial work goes through OpenSpec: `/opsx:propose` → review → `/opsx:apply` → `/opsx:archive`.
3. Failing test first for logic and route handlers.
4. Update affected docs (`documentation-standards.md`).
5. Pull request → Vercel preview → review → merge (= production deploy).

## Internal documents

`documentos/` holds internal price sheets and quotes. It is ignored by Git and by `.vercelignore`; never move its content into `src/` or `public/`.

## Before publishing changes to content

Search for `[CONFIRMAR]` in `src/lib/empresa.ts` (schedule, benefits, figures, FAQ answers).
