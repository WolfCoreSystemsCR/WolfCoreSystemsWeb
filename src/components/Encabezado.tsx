"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icono } from "./Icono";
import { enlaceWolf } from "@/lib/empresa";

const enlaces = [
  { id: "ejemplos", texto: "Ejemplos" },
  { id: "clientes", texto: "Clientes" },
  { id: "servicios", texto: "Servicios" },
  { id: "planes", texto: "Planes" },
  { id: "preguntas", texto: "Preguntas" },
];

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const [activo, setActivo] = useState("");

  // Fondo al desplazar
  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 12);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // Resalta la sección visible
  useEffect(() => {
    const secciones = enlaces
      .map((e) => document.getElementById(e.id))
      .filter((s): s is HTMLElement => Boolean(s));
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActivo(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secciones.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Menú móvil: Escape para cerrar y bloquear el desplazamiento del fondo
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        conFondo || abierto ? "border-linea/80 bg-noche-950/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      {/* Tres columnas iguales: logo a la izquierda, menú centrado de verdad, botones a la derecha */}
      <div className="contenedor grid h-16 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#inicio"
          aria-label="WolfCore Systems, ir al inicio"
          className="flex items-center justify-self-start rounded-md transition-opacity hover:opacity-85"
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex h-10 items-center gap-0.5 rounded-full border border-linea/70 bg-noche-900/60 p-1 text-sm font-medium backdrop-blur">
            {enlaces.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  aria-current={activo === e.id ? "true" : undefined}
                  className={`flex h-8 items-center rounded-full px-3.5 transition-colors ${
                    activo === e.id
                      ? "bg-electrico-400/15 text-electrico-200"
                      : "text-hielo/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-2 lg:flex">
          <a
            href="#contacto"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-hielo/15 bg-white/[0.03] px-3.5 text-sm font-semibold text-hielo transition-colors hover:border-electrico-400/60 hover:bg-electrico-400/10 hover:text-white"
          >
            <Icono nombre="correo" className="h-4 w-4 text-electrico-300" /> Contacto
          </a>
          <a
            href={enlaceWolf()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-electrico-400 px-3.5 text-sm font-semibold text-noche-950 shadow-[0_0_0_1px_rgb(125_211_252/0.4),0_6px_20px_-8px_rgb(56_189_248/0.7)] transition-colors hover:bg-electrico-300"
          >
            <Icono nombre="mensaje" className="h-4 w-4" /> Escríbanos
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center justify-self-end rounded-lg border border-linea text-hielo transition-colors hover:border-electrico-400/60 lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        hidden={!abierto}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-linea bg-noche-950 lg:hidden"
      >
        <ul className="contenedor flex flex-col gap-1 py-6">
          {enlaces.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                onClick={() => setAbierto(false)}
                className="flex items-center justify-between rounded-lg px-3 py-4 font-display text-xl font-semibold text-white hover:bg-noche-800"
              >
                {e.texto} <Icono nombre="flecha" className="h-5 w-5 text-electrico-400" />
              </a>
            </li>
          ))}
          <li className="mt-6 grid gap-3">
            <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario">
              <Icono nombre="mensaje" /> Escriba “Wolf” y empezamos
            </a>
            <a href="#contacto" onClick={() => setAbierto(false)} className="boton-borde">
              Llenar formulario
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
