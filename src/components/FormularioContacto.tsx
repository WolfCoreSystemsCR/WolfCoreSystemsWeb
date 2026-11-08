"use client";

import { useEffect, useRef, useState } from "react";
import { Icono } from "./Icono";
import { canalWolf, empresa, enlaceWolf, opcionesServicio } from "@/lib/empresa";

type Estado = { tipo: "inicial" } | { tipo: "enviando" } | { tipo: "ok" } | { tipo: "error"; mensaje: string };
type Errores = Partial<Record<"nombre" | "correo" | "mensaje" | "consentimiento", string>>;

const MAX_MENSAJE = 2000;

function validar(f: FormData): Errores {
  const errores: Errores = {};
  const nombre = String(f.get("nombre") ?? "").trim();
  const correo = String(f.get("correo") ?? "").trim();
  const mensaje = String(f.get("mensaje") ?? "").trim();
  if (nombre.length < 2) errores.nombre = "Escriba su nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) errores.correo = "Revise que el correo esté bien escrito.";
  if (mensaje.length < 10) errores.mensaje = "Cuéntenos un poco más (mínimo 10 caracteres).";
  if (!f.get("consentimiento")) errores.consentimiento = "Necesitamos su autorización para responderle.";
  return errores;
}

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>({ tipo: "inicial" });
  const [errores, setErrores] = useState<Errores>({});
  const [largo, setLargo] = useState(0);
  const inicio = useRef(0);
  const exito = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inicio.current = Date.now();
  }, []);

  useEffect(() => {
    if (estado.tipo === "ok") exito.current?.focus();
  }, [estado.tipo]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = new FormData(form);
    const nuevos = validar(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nuevos)[0]}"]`)?.focus();
      return;
    }

    setEstado({ tipo: "enviando" });
    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(datos),
          consentimiento: datos.get("consentimiento") === "si",
          tiempo: Date.now() - inicio.current,
        }),
      });
      const cuerpo = (await respuesta.json().catch(() => ({}))) as { mensaje?: string };
      if (!respuesta.ok) {
        setEstado({ tipo: "error", mensaje: cuerpo.mensaje ?? "No pudimos enviar su mensaje." });
        return;
      }
      form.reset();
      setLargo(0);
      setEstado({ tipo: "ok" });
    } catch {
      setEstado({ tipo: "error", mensaje: "Revise su conexión a internet e intente de nuevo." });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div
        ref={exito}
        tabIndex={-1}
        role="status"
        className="tarjeta flex flex-col items-center justify-center p-10 text-center outline-none"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-electrico-400/15 text-electrico-300 ring-1 ring-electrico-400/40">
          <Icono nombre="check" className="h-8 w-8" />
        </span>
        <p className="mt-6 font-display text-2xl font-bold text-white">¡Mensaje recibido!</p>
        <p className="mt-2 max-w-sm text-hielo/70">
          Gracias por escribirnos. Le responderemos muy pronto al correo que nos dejó.
        </p>
        <button type="button" onClick={() => setEstado({ tipo: "inicial" })} className="boton-borde mt-8">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const campo = (error?: string) =>
    `mt-2 block w-full rounded-lg border bg-noche-900 px-4 py-3 text-base text-hielo transition-colors placeholder:text-acero/50 focus:outline-none focus:ring-2 ${
      error
        ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/30"
        : "border-linea hover:border-noche-700 focus:border-electrico-400 focus:ring-electrico-400/25"
    }`;
  const etiqueta = "block text-sm font-semibold text-hielo";
  const ayuda = (id: string, texto?: string) =>
    texto ? (
      <p id={id} className="mt-1.5 text-sm text-red-300">
        {texto}
      </p>
    ) : null;

  return (
    <form onSubmit={enviar} noValidate className="tarjeta grid gap-5 p-6 sm:p-8" aria-describedby="nota-form">
      <div>
        <h3 className="font-display text-xl font-semibold text-white">Cuéntenos su idea</h3>
        <p id="nota-form" className="mt-1 text-sm text-acero">
          Los campos con * son obligatorios. Respondemos en horario hábil.
        </p>
      </div>

      {/* Trampa para bots: invisible para personas */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          No llenar este campo
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-nombre" className={etiqueta}>
            Nombre *
          </label>
          <input
            id="f-nombre"
            name="nombre"
            maxLength={100}
            autoComplete="name"
            placeholder="Ej. María Rodríguez"
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "e-nombre" : undefined}
            className={campo(errores.nombre)}
          />
          {ayuda("e-nombre", errores.nombre)}
        </div>
        <div>
          <label htmlFor="f-negocio" className={etiqueta}>
            Negocio o empresa
          </label>
          <input
            id="f-negocio"
            name="negocio"
            maxLength={120}
            autoComplete="organization"
            placeholder="Ej. Soda La Esquina"
            className={campo()}
          />
        </div>
        <div>
          <label htmlFor="f-correo" className={etiqueta}>
            Correo *
          </label>
          <input
            id="f-correo"
            name="correo"
            type="email"
            inputMode="email"
            maxLength={150}
            autoComplete="email"
            placeholder="nombre@correo.com"
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "e-correo" : undefined}
            className={campo(errores.correo)}
          />
          {ayuda("e-correo", errores.correo)}
        </div>
        <div>
          <label htmlFor="f-telefono" className={etiqueta}>
            Teléfono o WhatsApp
          </label>
          <input
            id="f-telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            maxLength={20}
            autoComplete="tel"
            placeholder="8888 8888"
            className={campo()}
          />
        </div>
      </div>

      <div>
        <label htmlFor="f-servicio" className={etiqueta}>
          ¿Qué le interesa?
        </label>
        <select id="f-servicio" name="servicio" defaultValue="" className={`${campo()} cursor-pointer`}>
          <option value="">Seleccione una opción</option>
          {opcionesServicio.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="f-mensaje" className={etiqueta}>
            ¿Qué le gustaría mejorar en su negocio? *
          </label>
          <span className="font-mono text-xs text-acero" aria-hidden="true">
            {largo}/{MAX_MENSAJE}
          </span>
        </div>
        <textarea
          id="f-mensaje"
          name="mensaje"
          maxLength={MAX_MENSAJE}
          rows={5}
          onChange={(e) => setLargo(e.target.value.length)}
          placeholder="Ej. Recibimos pedidos por WhatsApp y se nos pierden; queremos ordenarlos y facturar más rápido."
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={errores.mensaje ? "e-mensaje" : undefined}
          className={`${campo(errores.mensaje)} resize-y`}
        />
        {ayuda("e-mensaje", errores.mensaje)}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-hielo/80">
          <input
            type="checkbox"
            name="consentimiento"
            value="si"
            aria-invalid={Boolean(errores.consentimiento)}
            aria-describedby={errores.consentimiento ? "e-consentimiento" : undefined}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-electrico-400"
          />
          <span>
            Autorizo a WolfCore Systems a usar estos datos solo para responder mi consulta, según la{" "}
            <a href="/privacidad" className="text-electrico-300 underline underline-offset-2 hover:text-electrico-200">
              política de privacidad
            </a>{" "}
            y la Ley 8968. *
          </span>
        </label>
        {ayuda("e-consentimiento", errores.consentimiento)}
      </div>

      <div aria-live="polite">
        {estado.tipo === "error" && (
          <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {estado.mensaje} Mientras tanto puede escribirnos a{" "}
            <a className="font-semibold underline" href={`mailto:${empresa.correo}`}>
              {empresa.correo}
            </a>{" "}
            o por{" "}
            <a className="font-semibold underline" href={enlaceWolf()} target="_blank" rel="noopener noreferrer">
              {canalWolf}
            </a>
            .
          </p>
        )}
      </div>

      <button type="submit" disabled={estado.tipo === "enviando"} className="boton-primario group w-full">
        {estado.tipo === "enviando" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-noche-950/30 border-t-noche-950" />
            Enviando…
          </>
        ) : (
          <>
            Enviar mensaje
            <Icono nombre="flecha" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
