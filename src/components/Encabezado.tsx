"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icono } from "./Icono";
import { enlaceWolf } from "@/lib/empresa";

const enlaces = [
  { id: "servicios", texto: "Servicios" },
  { id: "proceso", texto: "Proceso" },
  { id: "proyectos", texto: "Proyectos" },
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
      <div className="contenedor flex h-20 items-center justify-between gap-4">
        <a href="#inicio" aria-label="WolfCore Systems, ir al inicio" className="transition-opacity hover:opacity-85">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-linea/70 bg-noche-900/60 p-1 text-[0.95rem] font-medium backdrop-blur">
            {enlaces.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  aria-current={activo === e.id ? "true" : undefined}
                  className={`block rounded-full px-4 py-2 transition-colors ${
                    activo === e.id
                      ? "bg-electrico-400/15 text-electrico-200"
                      : "text-hielo/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contacto" className="boton-borde min-h-11 px-5 py-2">
            Contacto
          </a>
          <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario min-h-11 px-5 py-2">
            <Icono nombre="mensaje" /> Escríbanos
          </a>
        </div>

        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-lg border border-linea text-hielo transition-colors hover:border-electrico-400/60 lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        hidden={!abierto}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-linea bg-noche-950 lg:hidden"
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
