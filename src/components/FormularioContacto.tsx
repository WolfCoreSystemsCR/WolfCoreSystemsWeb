"use client";

import { useState } from "react";
import { empresa, enlaceWolf } from "@/lib/empresa";

type Estado = { tipo: "inicial" } | { tipo: "enviando" } | { tipo: "ok" } | { tipo: "error"; mensaje: string };

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>({ tipo: "inicial" });

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEstado({ tipo: "enviando" });
    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const datos = (await respuesta.json().catch(() => ({}))) as { mensaje?: string };
      if (!respuesta.ok) {
        setEstado({ tipo: "error", mensaje: datos.mensaje ?? "No pudimos enviar su mensaje." });
        return;
      }
      form.reset();
      setEstado({ tipo: "ok" });
    } catch {
      setEstado({ tipo: "error", mensaje: "Revise su conexión e intente de nuevo." });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div role="status" className="tarjeta p-8 text-center">
        <p className="font-display text-2xl font-bold text-white">¡Mensaje recibido!</p>
        <p className="mt-2 text-acero">Le responderemos lo antes posible. Gracias por confiar en WolfCore Systems.</p>
      </div>
    );
  }

  const campo =
    "mt-1.5 w-full rounded-md border border-linea bg-noche-900 px-4 py-3 text-hielo placeholder:text-acero/60 focus:border-electrico-400 focus:outline-none";

  return (
    <form onSubmit={enviar} className="tarjeta grid gap-5 p-6 sm:p-8" noValidate={false}>
      {/* Campo trampa para bots: los humanos no lo ven */}
      <div className="hidden" aria-hidden="true">
        <label>
          No llenar <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Nombre *
          <input name="nombre" required maxLength={100} autoComplete="name" className={campo} />
        </label>
        <label className="text-sm font-medium">
          Empresa o negocio
          <input name="negocio" maxLength={120} autoComplete="organization" className={campo} />
        </label>
        <label className="text-sm font-medium">
          Correo *
          <input name="correo" type="email" required maxLength={150} autoComplete="email" className={campo} />
        </label>
        <label className="text-sm font-medium">
          Teléfono / WhatsApp
          <input name="telefono" type="tel" maxLength={30} autoComplete="tel" className={campo} />
        </label>
      </div>

      <label className="text-sm font-medium">
        ¿Qué necesita?
        <select name="servicio" className={campo} defaultValue="">
          <option value="">Seleccione una opción</option>
          <option>Automatización de procesos</option>
          <option>Aplicación web o sistema</option>
          <option>App móvil</option>
          <option>Chatbot / inteligencia artificial</option>
          <option>Página web</option>
          <option>No estoy seguro, quiero asesoría</option>
        </select>
      </label>

      <label className="text-sm font-medium">
        Cuéntenos sobre su proyecto *
        <textarea name="mensaje" required minLength={10} maxLength={2000} rows={5} className={campo} />
      </label>

      {estado.tipo === "error" && (
        <p role="alert" className="rounded-md border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {estado.mensaje} También puede escribirnos a{" "}
          <a className="underline" href={`mailto:${empresa.correo}`}>
            {empresa.correo}
          </a>{" "}
          o{" "}
          <a className="underline" href={enlaceWolf()} target="_blank" rel="noopener noreferrer">
            por mensaje directo
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={estado.tipo === "enviando"} className="boton-primario disabled:opacity-60">
        {estado.tipo === "enviando" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
