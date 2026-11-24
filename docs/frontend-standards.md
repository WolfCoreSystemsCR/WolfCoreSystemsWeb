---
description: Frontend standards for the WolfCore Systems site — Next.js App Router structure, Server and Client Components, Tailwind CSS 4, animations, accessibility, SEO and the demo showcase.
globs: ["src/app/**/*.tsx", "src/components/**/*.tsx", "src/app/globals.css"]
alwaysApply: true
---

# Frontend Standards

## 1. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16, App Router (`src/app/`) |
| UI | React 19, function components only |
| Styling | Tailwind CSS 4; tokens in `src/app/globals.css` (`noche-*`, `electrico-*`, `hielo`, `acero`, `linea`) |
| Fonts | `next/font/google`: Inter (`--font-inter`), Sora (`--font-sora`); Cormorant Garamond in `/ejemplos` |
| Animation | CSS classes (`aparecer`, `pulso`, `orbe`, `[data-revelar]`) + one canvas (`LoboParticulas`) |
| Language | Spanish (Costa Rica), formal "usted". `<html lang="es-CR">`, dark theme |

## 2. Structure

```
src/
  app/
    page.tsx             One-page site: #inicio, #ejemplos, #clientes, #servicios, #proceso, #porque, #planes, #preguntas, #contacto
    ejemplos/<nicho>/    Fictional demo sites (noindex), shown in the Vitrina iframe and full screen
    privacidad/          Privacy policy (Ley 8968)
    api/contacto/        Contact route handler (see backend-standards.md)
    opengraph-image.tsx  Social share image
    layout.tsx           Fonts, metadata, JSON-LD, intro flag script
  components/            Spanish PascalCase names (Encabezado, Vitrina, FormularioContacto, IntroLobo)
  lib/empresa.ts         All editable content and helpers (enlaceWolf, sitioUrl, opcionesServicio)
```

## 3. Content

- All copy that the owner may edit lives in `src/lib/empresa.ts`. Values marked `[CONFIRMAR]` must be verified before publishing; promises on a services page must be true.
- Demo pages use fictional brands and Unsplash photos (`foto()` in `ejemplos/foto.ts`). They stay `noindex` and show the "Diseño de muestra" badge.

## 4. Server vs Client Components

- Pages are Server Components. `"use client"` only for state, effects, browser APIs or handlers (`IntroLobo`, `LoboParticulas`, `Vitrina`, `FormularioContacto`, `EfectosPagina`, `BotonFlotante`, `Encabezado`, `PalabraRotativa`, `EscenaPantallas`).
- Read `window`, `sessionStorage` or `matchMedia` only inside effects or handlers to avoid hydration mismatches.
- The intro screen is shown once per session (`sessionStorage` key `wcs-intro`); the inline script in `layout.tsx` adds `sin-intro` before paint so returning visitors never see a flash. Without JavaScript the intro is hidden by CSS and never blocks content.

## 5. Animation and performance

- Respect `prefers-reduced-motion` in CSS and in canvas code.
- Canvas/RAF loops pause when off-screen (`IntersectionObserver`) and clean up every listener, observer, timer and frame in the effect cleanup.
- Touch input must not distort interactive art (`pointerType !== "mouse"`).
- Only rebuild expensive layouts on width changes (mobile toolbars change height on scroll).

## 6. Forms

- `noValidate` + client validation with Spanish messages, `aria-invalid`, `aria-describedby`, focus on the first invalid field.
- Client rules mirror server rules (name ≥ 2, valid email, message ≥ 10, consent).
- On server failure show the message plus email and WhatsApp/Instagram alternatives.

## 7. Accessibility

- Landmarks, `main#contenido`, labeled navigation.
- Tabs (`Vitrina`): `role="tablist"`, roving `tabIndex`, arrow-key navigation, `aria-selected`, `aria-controls`.
- Dialog (intro): `role="dialog"`, `aria-modal`, focus on the main button, `Escape` and "Saltar animación" close it.
- Hidden elements are not focusable (`tabIndex={-1}` + `aria-hidden` on the floating button when hidden).
- External links use `target="_blank" rel="noopener noreferrer"`.

## 8. SEO

- `metadataBase` from `sitioUrl` (`NEXT_PUBLIC_SITIO_URL`, falls back to the production domain).
- JSON-LD `ProfessionalService` + `FAQPage` in `layout.tsx`, serialized with the `<` escape.
- `sitemap.ts` lists `/` and `/privacidad`; `/ejemplos/*` are excluded and `noindex`. `robots.ts` disallows `/api/`.

## 9. Testing

- Unit-test logic in `src/lib/` and route handlers with Vitest.
- For UI changes, run `npm run dev` and check: intro (first visit and return), showcase tabs in both modes, contact form errors and success, mobile width 360 px. The `playwright-skill` can automate these checks.
