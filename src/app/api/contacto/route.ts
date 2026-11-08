import { NextResponse } from "next/server";

// Endpoint en Node.js que recibe el formulario de contacto y lo envía por correo con Resend.
// Variables de entorno (en .env.local y en Vercel):
//   RESEND_API_KEY  – clave de https://resend.com
//   CONTACTO_PARA   – correo que recibe los mensajes (ej. wolfcoresystemscr@gmail.com)
//   CONTACTO_DESDE  – remitente verificado en Resend (ej. "WolfCore Web <web@sudominio.com>")
export const runtime = "nodejs";

const limite = new Map<string, number[]>();

function texto(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  // Límite simple: 5 envíos por IP cada 10 minutos (por instancia del servidor).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const ahora = Date.now();
  const recientes = (limite.get(ip) ?? []).filter((t) => ahora - t < 10 * 60_000);
  if (recientes.length >= 5) {
    return NextResponse.json({ mensaje: "Demasiados envíos. Intente más tarde." }, { status: 429 });
  }
  limite.set(ip, [...recientes, ahora]);

  let datos: Record<string, unknown>;
  try {
    datos = await req.json();
  } catch {
    return NextResponse.json({ mensaje: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si un bot llenó el campo oculto, fingimos éxito.
  if (texto(datos.sitio_web, 200)) return NextResponse.json({ ok: true });

  const nombre = texto(datos.nombre, 100);
  const correo = texto(datos.correo, 150);
  const mensaje = texto(datos.mensaje, 2000);
  const negocio = texto(datos.negocio, 120);
  const telefono = texto(datos.telefono, 30);
  const servicio = texto(datos.servicio, 80);

  if (!nombre || mensaje.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return NextResponse.json({ mensaje: "Revise su nombre, correo y mensaje." }, { status: 400 });
  }

  const clave = process.env.RESEND_API_KEY;
  const para = process.env.CONTACTO_PARA;
  const desde = process.env.CONTACTO_DESDE;
  if (!clave || !para || !desde) {
    console.warn("[contacto] Falta configurar RESEND_API_KEY / CONTACTO_PARA / CONTACTO_DESDE");
    return NextResponse.json(
      { mensaje: "El formulario todavía no está activo." },
      { status: 503 },
    );
  }

  const filas: [string, string][] = [
    ["Nombre", nombre],
    ["Negocio", negocio || "—"],
    ["Correo", correo],
    ["Teléfono", telefono || "—"],
    ["Servicio", servicio || "—"],
  ];
  const html = `
    <h2>Nuevo contacto desde la web</h2>
    <table>${filas.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapar(v)}</td></tr>`).join("")}</table>
    <p style="white-space:pre-wrap">${escapar(mensaje)}</p>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: desde,
      to: [para],
      reply_to: correo,
      subject: `Nuevo contacto: ${nombre}${negocio ? ` (${negocio})` : ""}`,
      html,
    }),
  });

  if (!r.ok) {
    console.error("[contacto] Resend respondió", r.status, await r.text().catch(() => ""));
    return NextResponse.json({ mensaje: "No pudimos enviar su mensaje." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
