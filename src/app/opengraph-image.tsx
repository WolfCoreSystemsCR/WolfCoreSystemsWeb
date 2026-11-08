import { ImageResponse } from "next/og";

// Imagen que aparece al compartir el enlace en WhatsApp, Facebook, LinkedIn, etc.
export const alt = "WolfCore Systems — Automatización, apps y sistemas a la medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Imagen() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 70% 0%, #0c4a6e 0%, #03050b 60%)",
          color: "#e6f1ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <path d="M10 8l12 14h20L54 8l-2 26-20 24-20-24z" fill="#38bdf8" />
            <path d="M22 22h20l-10 17z" fill="#03050b" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>WOLFCORE</span>
            <span style={{ fontSize: 18, letterSpacing: 12, color: "#7dd3fc" }}>SYSTEMS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: "#ffffff" }}>
            Su negocio no necesita más herramientas.
          </span>
          <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, color: "#38bdf8" }}>Necesita un sistema.</span>
        </div>
        <span style={{ fontSize: 28, color: "#9fb0c8" }}>
          Automatización · Apps · Sistemas a la medida · Costa Rica
        </span>
      </div>
    ),
    size,
  );
}
