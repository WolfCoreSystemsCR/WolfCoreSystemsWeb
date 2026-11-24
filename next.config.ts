import type { NextConfig } from "next";

const esDesarrollo = process.env.NODE_ENV !== "production";

// Política de seguridad de contenido: solo se carga lo propio del sitio.
// 'unsafe-inline' en scripts es necesario para la hidratación de Next.js sin nonces
// (que obligarían a renderizar cada visita en el servidor). No hay HTML de usuarios en el sitio.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${esDesarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // Las páginas de ejemplo usan fotos de Unsplash (licencia libre)
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  `connect-src 'self'${esDesarrollo ? " ws: wss:" : ""}`,
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Solo nuestro propio sitio puede mostrar estas páginas en un marco (vitrina de ejemplos)
  "frame-ancestors 'self'",
  "manifest-src 'self'",
  ...(esDesarrollo ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const cabeceras = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [{ source: "/:path*", headers: cabeceras }];
  },
};

export default nextConfig;
