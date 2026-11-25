# Data Model

The site has **no database**. Content is static TypeScript in `src/lib/empresa.ts`. The only user data is a contact message, emailed through Resend and not stored by the site.

## 1. Business data (`empresa`)

| Field | Notes |
| --- | --- |
| `nombre`, `lema`, `descripcion` | Brand texts, also used in metadata and JSON-LD |
| `instagram`, `instagramUsuario`, `instagramMensaje` | Profile, handle and direct-message link |
| `correo` | Public email |
| `whatsapp` | Digits with country code (`506…`). Empty → `enlaceWolf()` falls back to Instagram DM |
| `telefono` | Display format |
| `ubicacion`, `horario` | `horario` marked `[CONFIRMAR]` |

Derived: `sitioUrl` (from `NEXT_PUBLIC_SITIO_URL`, default `https://wolfcoresystems-three.vercel.app`), `enlaceWolf()`, `canalWolf`.

## 2. Content collections

| Export | Shape | Used in |
| --- | --- | --- |
| `beneficios` | `string[]` | Hero |
| `nichosTitulo` | `string[]` | Rotating hero word |
| `demos` | `{ slug, nicho, marca, dominio }[]` (readonly) | Showcase tabs; `slug` = route under `/ejemplos` |
| `nichos` | `{ icono, titulo, porque, vendemos }[]` | Target clients |
| `servicioPrincipal` | `{ titulo, texto, puntos[] }` | Main service |
| `servicios` | `{ icono, titulo, texto }[]` | Services grid |
| `opcionesServicio` | `string[]` = main service + services + "No estoy seguro…" | Contact select; validated by the API |
| `proceso`, `pilares`, `cifras`, `modalidades`, `preguntas` | Display lists | Home sections, FAQ JSON-LD |

`IconoNombre` is the closed set of icon names accepted by `Icono.tsx`.

## 3. Contact message (`POST /api/contacto`)

| Field | Rule |
| --- | --- |
| `nombre` | Required, 2..100, single line |
| `correo` | Required, email, ≤150, lowercased |
| `negocio` | Optional, ≤120 |
| `telefono` | Optional, ≤20, digits and `+ ( ) -` |
| `servicio` | Optional, must be one of `opcionesServicio` |
| `mensaje` | Required, 10..2000, newlines kept |
| `consentimiento` | Must be `true` |
| `sitio_web` | Honeypot, must be empty |
| `tiempo` | ms since the form loaded, must be ≥ 3000 |
