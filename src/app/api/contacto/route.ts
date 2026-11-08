import { NextResponse } from "next/server";
import { opcionesServicio } from "@/lib/empresa";

/**
 * Formulario de contacto (Node.js). Envía el mensaje por correo con Resend.
 *
 * Variables de entorno (en .env.local y en Vercel; NUNCA en el código):
 *   RESEND_API_KEY  – clave de https://resend.com
 *   CONTACTO_PARA   – correo que recibe los mensajes
 *   CONTACTO_DESDE  – remitente verificado en Resend
 *   NEXT_PUBLIC_SITIO_URL – dominio público, para validar el origen de las peticiones
 *
 * Defensas: solo POST + JSON, verificación de origen (CSRF), límite de tamaño, honeypot,
 * trampa de tiempo, límite de envíos por IP, validación estricta y lista blanca, escape
 * de HTML y limpieza de saltos de línea (evita inyección de cabeceras de correo).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024;
const VENTANA_MS = 10 * 60_000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

const sinCache = { "Cache-Control": "no-store" };
const responder = (cuerpo: object, status = 200) => NextResponse.json(cuerpo, { status, headers: sinCache });

function permitirIp(ip: string): boolean {
  const ahora = Date.now();
  // Limpieza para que el mapa no crezca sin control (fuga de memoria)
  if (envios.size > 5000) {
    for (const [k, v] of envios) if (v.every((t) => ahora - t > VENTANA_MS)) envios.delete(k);
  }
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_ENVIOS) return false;
  recientes.push(ahora);
  envios.set(ip, recientes);
  return true;
}

function origenValido(req: Request): boolean {
  const origen = req.headers.get("origin");
  if (!origen) return false;
  let hostOrigen: string;
  try {
    hostOrigen = new URL(origen).host;
  } catch {
    return false;
  }
  const permitidos = new Set<string>();
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) permitidos.add(host);
  if (process.env.NEXT_PUBLIC_SITIO_URL) {
    try {
      permitidos.add(new URL(process.env.NEXT_PUBLIC_SITIO_URL.trim()).host);
    } catch {
      /* URL mal configurada: se ignora */
    }
  }
  return permitidos.has(hostOrigen);
}

/** Texto de una sola línea: sin caracteres de control ni saltos. */
function linea(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}
/** Texto multilínea: conserva saltos de línea, quita otros caracteres de control. */
function parrafo(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ").trim().slice(0, max);
}
const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  if (!origenValido(req)) return responder({ mensaje: "Origen no permitido." }, 403);

  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return responder({ mensaje: "Formato no válido." }, 415);
  }

  const declarado = Number(req.headers.get("content-length") ?? 0);
  if (declarado > MAX_BYTES) return responder({ mensaje: "El mensaje es demasiado largo." }, 413);

  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!permitirIp(ip)) {
    return responder({ mensaje: "Recibimos varios mensajes seguidos. Intente de nuevo en unos minutos." }, 429);
  }

  let datos: Record<string, unknown>;
  try {
    const texto = await req.text();
    if (Buffer.byteLength(texto) > MAX_BYTES) return responder({ mensaje: "El mensaje es demasiado largo." }, 413);
    const parsed: unknown = JSON.parse(texto);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("no es objeto");
    datos = parsed as Record<string, unknown>;
  } catch {
    return responder({ mensaje: "Solicitud no válida." }, 400);
  }

  // Bots: campo oculto lleno o envío en menos de 3 segundos → se finge éxito y se descarta.
  const tiempo = typeof datos.tiempo === "number" ? datos.tiempo : 0;
  if (linea(datos.sitio_web, 200) || tiempo < 3000) return responder({ ok: true });

  const nombre = linea(datos.nombre, 100);
  const correo = linea(datos.correo, 150).toLowerCase();
  const negocio = linea(datos.negocio, 120);
  const telefono = linea(datos.telefono, 20).replace(/[^\d+\s()-]/g, "");
  const servicioCrudo = linea(datos.servicio, 120);
  const servicio = opcionesServicio.includes(servicioCrudo) ? servicioCrudo : "";
  const mensaje = parrafo(datos.mensaje, 2000);

  if (nombre.length < 2 || mensaje.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return responder({ mensaje: "Revise su nombre, correo y mensaje." }, 400);
  }
  if (datos.consentimiento !== true) {
    return responder({ mensaje: "Necesitamos su autorización para responderle." }, 400);
  }

  const clave = process.env.RESEND_API_KEY;
  const para = process.env.CONTACTO_PARA;
  const desde = process.env.CONTACTO_DESDE;
  if (!clave || !para || !desde) {
    console.warn("[contacto] Falta configurar RESEND_API_KEY / CONTACTO_PARA / CONTACTO_DESDE");
    return responder({ mensaje: "El formulario todavía no está activo." }, 503);
  }

  const filas: [string, string][] = [
    ["Nombre", nombre],
    ["Negocio", negocio || "—"],
    ["Correo", correo],
    ["Teléfono", telefono || "—"],
    ["Servicio", servicio || "—"],
  ];
  const html = `<h2>Nuevo contacto desde wolfcore</h2>
<table cellpadding="6">${filas.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapar(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${escapar(mensaje)}</p>`;
  const textoPlano = `${filas.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${mensaje}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: desde,
        to: [para],
        reply_to: correo,
        subject: `Nuevo contacto web: ${nombre}${negocio ? ` (${negocio})` : ""}`.slice(0, 180),
        html,
        text: textoPlano,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) {
      // No se registran datos personales en los logs, solo el estado.
      console.error("[contacto] Resend respondió", r.status);
      return responder({ mensaje: "No pudimos enviar su mensaje." }, 502);
    }
  } catch {
    console.error("[contacto] Error de red o tiempo agotado con Resend");
    return responder({ mensaje: "No pudimos enviar su mensaje." }, 502);
  }

  return responder({ ok: true });
}
