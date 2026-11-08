import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagen que aparece al compartir el enlace en WhatsApp, Facebook, LinkedIn, etc.
export const alt = "WolfCore Systems — Automatización, apps y sistemas a la medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagen() {
  const logo = await readFile(join(process.cwd(), "public/img/logo-wolfcore.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 72,
          background: "radial-gradient(circle at 80% 0%, #0c4a6e 0%, #03050b 60%)",
          color: "#e6f1ff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={421} height={397} style={{ borderRadius: 32 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.08, color: "#ffffff" }}>
            Su negocio no necesita más herramientas.
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15, color: "#38bdf8" }}>
            Necesita un sistema.
          </span>
          <span style={{ marginTop: 32, fontSize: 26, color: "#9fb0c8" }}>
            Automatización · Apps · Sistemas a la medida · Costa Rica
          </span>
        </div>
      </div>
    ),
    size,
  );
}
