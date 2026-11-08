"use client";

import { useEffect, useState } from "react";
import { Icono } from "./Icono";
import { canalWolf, enlaceWolf } from "@/lib/empresa";

/** Botón flotante para escribir "Wolf". Aparece al bajar y se oculta en la sección de contacto. */
export function BotonFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contacto = document.getElementById("contacto");
    let enContacto = false;
    const actualizar = () => setVisible(window.scrollY > 700 && !enContacto);
    const obs = new IntersectionObserver(([e]) => {
      enContacto = e.isIntersecting;
      actualizar();
    });
    if (contacto) obs.observe(contacto);
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", actualizar);
    };
  }, []);

  return (
    <a
      href={enlaceWolf()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir "Wolf" por ${canalWolf}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-electrico-400 py-3 pr-5 pl-4 font-semibold text-noche-950 shadow-[0_10px_40px_-8px_rgb(56_189_248/0.8)] transition-all duration-300 hover:bg-electrico-300 sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="relative grid h-6 w-6 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-noche-950/25" aria-hidden="true" />
        <Icono nombre="mensaje" className="relative h-5 w-5" />
      </span>
      Escriba “Wolf”
    </a>
  );
}
