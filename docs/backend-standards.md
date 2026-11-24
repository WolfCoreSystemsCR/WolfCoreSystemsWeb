---
description: Server-side standards for the WolfCore Systems site — Next.js route handlers, validation, security, configuration and testing.
globs: ["src/app/api/**/*.ts", "src/lib/**/*.ts", "src/app/opengraph-image.tsx", "next.config.ts"]
alwaysApply: true
---

# Backend Standards

There is no separate backend and no database. "Backend" means:

- Next.js **route handlers** under `src/app/api/` (today only `POST /api/contacto`).
- Server-rendered and build-time code: `opengraph-image.tsx` (`next/og` + `node:fs`), `sitemap.ts`, `robots.ts`, metadata.
- **Content and helpers** in `src/lib/empresa.ts`.
- **HTTP security configuration** in `next.config.ts`.

Do not add a database, CRM integration or external backend without an OpenSpec change that justifies it.

## 1. Stack

| Concern | Choice | Evidence |
| --- | --- | --- |
| Runtime | Node.js (Vercel serverless) | `export const runtime = "nodejs"` in `route.ts` |
| Framework | Next.js 16 App Router route handlers | `src/app/api/contacto/route.ts` |
| Language | TypeScript, `strict: true` | `tsconfig.json` |
| Email | Resend REST API via `fetch` | `route.ts`, `.env.example` |
| Tests | Vitest, `environment: "node"` | `vitest.config.ts` |

Runtime dependencies are only `next`, `react` and `react-dom`. Prefer platform APIs over new packages.

## 2. Route handler rules

Follow `src/app/api/contacto/route.ts`:

1. `export const runtime = "nodejs"` and `export const dynamic = "force-dynamic"`.
2. Fail fast, in this order:
   - Same-origin `Origin` header (CSRF) → `403`.
   - `Content-Type: application/json` → `415`.
   - Declared `Content-Length` over 8 KB → `413`.
   - Per-IP rate limit (5 per 10 minutes) → `429`.
   - Body read as a stream and cut at 8 KB (`leerCuerpo`) → `413`; not a JSON object → `400`.
3. Treat every field as `unknown`. Sanitize with `linea` (single line, no control chars) and `parrafo` (keeps newlines), then cap length.
4. Closed sets (`servicio`) are validated against `opcionesServicio` from `src/lib/empresa.ts`.
5. Consent is required: `consentimiento === true` (Ley 8968), otherwise `400`.
6. Respond with `NextResponse.json` and `Cache-Control: no-store`. Error bodies carry a Spanish `mensaje` safe to show to visitors.
7. Never log personal data or upstream bodies; log a tag and status only.
8. Outbound calls use `AbortSignal.timeout(10_000)`.
9. Missing configuration returns `503` ("El formulario todavía no está activo.") and the form offers email and WhatsApp/Instagram instead.

## 3. Security

- `next.config.ts` sets CSP (`default-src 'self'`; images also from `https://images.unsplash.com` for demos; `frame-ancestors 'self'` so the showcase can embed `/ejemplos/*`), HSTS, `X-Frame-Options: SAMEORIGIN`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP and CORP. Any new external resource requires updating the CSP in the same change.
- Escape user text before inserting it into HTML (`escapar`). Remove line breaks from single-line fields to prevent email header injection. JSON-LD is serialized with the `<` escape.
- Bots: hidden honeypot `sitio_web` plus minimum fill time (`tiempo >= 3000` ms). Bot submissions get a fake `200`.
- Secrets live only in environment variables. Only `NEXT_PUBLIC_*` may be read in client code.
- `.vercelignore` keeps `documentos/` (internal price sheets), `.env*` and `.claude/` out of CLI deploys; `.gitignore` keeps `documentos/` out of Git.

### Known limitation

The rate limit is an in-memory `Map`, so on Vercel it is per serverless instance (best-effort). Move it to a shared store (for example Upstash Redis) through an OpenSpec change if spam becomes a problem.

## 4. Testing

- Unit tests sit next to the code as `*.test.ts`.
- Route handlers are tested by importing `POST` and calling it with a `Request`; use `vi.stubEnv`, `vi.stubGlobal("fetch", ...)` and `vi.resetModules()` (to reset the rate-limit map).
- Every validation branch needs a test.
- Run `npm test` and `npm run typecheck` before every commit.

## 5. Manual endpoint check (curl)

```bash
curl -i -X POST http://localhost:3000/api/contacto \
  -H 'content-type: application/json' -H 'origin: http://localhost:3000' \
  -d '{"nombre":"Ana","correo":"ana@ejemplo.cr","mensaje":"Quiero una página para mi clínica","consentimiento":true,"tiempo":9000}'
```

Without Resend variables this returns `503`, which is the expected local behavior.
