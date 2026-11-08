"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icono } from "./Icono";
import { enlaceWolf } from "@/lib/empresa";

const enlaces = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#proceso", texto: "Proceso" },
  { href: "#proyectos", texto: "Proyectos" },
  { href: "#modalidades", texto: "Modalidades" },
];

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const [conSombra, setConSombra] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setConSombra(window.scrollY > 8);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        conSombra || abierto ? "border-linea bg-noche-950/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="contenedor flex h-18 items-center justify-between gap-4">
        <a href="#inicio" aria-label="WolfCore Systems, ir al inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.95rem] font-medium text-hielo/80">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="transition-colors hover:text-electrico-300">
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contacto" className="boton-borde py-2.5">
            Contacto
          </a>
          <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario py-2.5">
            <Icono nombre="mensaje" /> Envíe “Wolf”
          </a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-hielo lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} className="h-7 w-7" />
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Móvil" className="border-t border-linea lg:hidden">
          <ul className="contenedor flex flex-col gap-1 py-4">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-md px-2 py-3 text-lg font-medium hover:bg-noche-800"
                >
                  {e.texto}
                </a>
              </li>
            ))}
            <li className="mt-3 grid gap-3 sm:grid-cols-2">
              <a href="#contacto" onClick={() => setAbierto(false)} className="boton-borde">
                Contacto
              </a>
              <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario">
                <Icono nombre="mensaje" /> Envíe “Wolf”
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
