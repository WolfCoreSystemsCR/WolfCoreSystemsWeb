import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { opcionesServicio } from "@/lib/empresa";

const valido = {
  nombre: "Ana Mora",
  correo: "Ana@Clinica.cr",
  negocio: "Clínica Velora",
  telefono: "8888-8888",
  servicio: opcionesServicio[0],
  mensaje: "Queremos una página nueva para la clínica.",
  consentimiento: true,
  sitio_web: "",
  tiempo: 10_000,
};

let ip = 0;
function solicitud(cuerpo: unknown, headers: Record<string, string> = {}) {
  ip += 1;
  return new Request("https://wolfcoresystems-three.vercel.app/api/contacto", {
    method: "POST",
    headers: {
      host: "wolfcoresystems-three.vercel.app",
      origin: "https://wolfcoresystems-three.vercel.app",
      "content-type": "application/json",
      "x-real-ip": `10.0.0.${ip}`,
      ...headers,
    },
    body: typeof cuerpo === "string" ? cuerpo : JSON.stringify(cuerpo),
  });
}

async function cargarRuta() {
  vi.resetModules();
  return import("./route");
}

function configurarCorreo() {
  vi.stubEnv("RESEND_API_KEY", "k");
  vi.stubEnv("CONTACTO_PARA", "wolf@ejemplo.cr");
  vi.stubEnv("CONTACTO_DESDE", "web@ejemplo.cr");
}

describe("POST /api/contacto", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACTO_PARA", "");
    vi.stubEnv("CONTACTO_DESDE", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("rejects another origin (403) and missing origin", async () => {
    const { POST } = await cargarRuta();
    expect((await POST(solicitud(valido, { origin: "https://evil.example" }))).status).toBe(403);
    const sinOrigen = solicitud(valido);
    sinOrigen.headers.delete("origin");
    expect((await POST(sinOrigen)).status).toBe(403);
  });

  it("rejects non-JSON content (415)", async () => {
    const { POST } = await cargarRuta();
    expect((await POST(solicitud(valido, { "content-type": "text/plain" }))).status).toBe(415);
  });

  it("rejects bodies over 8 KB even without a truthful content-length (413)", async () => {
    const { POST } = await cargarRuta();
    const r = await POST(solicitud({ ...valido, mensaje: "x".repeat(9000) }));
    expect(r.status).toBe(413);
  });

  it("rejects malformed JSON and arrays (400)", async () => {
    const { POST } = await cargarRuta();
    expect((await POST(solicitud("{no json"))).status).toBe(400);
    expect((await POST(solicitud([valido]))).status).toBe(400);
  });

  it("silently accepts bot submissions without sending email", async () => {
    configurarCorreo();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await cargarRuta();
    expect((await POST(solicitud({ ...valido, sitio_web: "spam" }))).status).toBe(200);
    expect((await POST(solicitud({ ...valido, tiempo: 500 }))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates name, email, message length and consent (400)", async () => {
    const { POST } = await cargarRuta();
    expect((await POST(solicitud({ ...valido, nombre: "A" }))).status).toBe(400);
    expect((await POST(solicitud({ ...valido, correo: "no-es-correo" }))).status).toBe(400);
    expect((await POST(solicitud({ ...valido, mensaje: "corto" }))).status).toBe(400);
    expect((await POST(solicitud({ ...valido, consentimiento: "si" }))).status).toBe(400);
  });

  it("returns 503 when email is not configured", async () => {
    const { POST } = await cargarRuta();
    expect((await POST(solicitud(valido))).status).toBe(503);
  });

  it("sends escaped HTML, single-line subject and lowercased reply-to through Resend", async () => {
    configurarCorreo();
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await cargarRuta();
    const r = await POST(
      solicitud({ ...valido, nombre: "Ana\r\nBcc: x@evil.cr", mensaje: "<img src=x onerror=alert(1)> hola mundo", servicio: "inventado" }),
    );
    expect(r.status).toBe(200);
    const cuerpo = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(cuerpo.to).toEqual(["wolf@ejemplo.cr"]);
    expect(cuerpo.reply_to).toBe("ana@clinica.cr");
    expect(cuerpo.subject).not.toMatch(/[\r\n]/);
    expect(cuerpo.html).not.toContain("<img");
    expect(cuerpo.html).toContain("&lt;img");
    expect(cuerpo.text).toContain("Servicio: —");
  });

  it("returns 502 when Resend fails", async () => {
    configurarCorreo();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    const { POST } = await cargarRuta();
    expect((await POST(solicitud(valido))).status).toBe(502);
  });

  it("rate-limits repeated submissions from the same IP (429)", async () => {
    const { POST } = await cargarRuta();
    const mismaIp = { "x-real-ip": "203.0.113.9" };
    for (let i = 0; i < 5; i++) await POST(solicitud(valido, mismaIp));
    expect((await POST(solicitud(valido, mismaIp))).status).toBe(429);
  });
});
