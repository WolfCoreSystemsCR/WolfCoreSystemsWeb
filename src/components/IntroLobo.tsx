"use client";

import { useEffect, useRef, useState } from "react";
import { LoboParticulas } from "./LoboParticulas";

const CLAVE = "wcs-intro";

/**
 * Pantalla de entrada: el lobo de píxeles en grande y el botón "Iniciar".
 * Al iniciar, el lobo se dispersa y aparece la página. Se muestra una vez por visita.
 * Sin JavaScript no se muestra (ver .intro en globals.css), así nunca bloquea el contenido.
 */
export function IntroLobo() {
  const [estado, setEstado] = useState<"visible" | "saliendo" | "cerrada">("visible");
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Ya la vio en esta visita (el script del <head> marcó la página)
    if (document.documentElement.classList.contains("sin-intro")) {
      setEstado("cerrada");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    boton.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  function iniciar(rapido = false) {
    if (estado !== "visible") return;
    try {
      sessionStorage.setItem(CLAVE, "1");
    } catch {
      /* navegación privada: se mostrará de nuevo, no pasa nada */
    }
    setEstado("saliendo");
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(
      () => {
        document.documentElement.style.overflow = "";
        document.documentElement.classList.add("sin-intro");
        window.dispatchEvent(new Event("wcs-intro-fin"));
        setEstado("cerrada");
      },
      rapido || reducir ? 250 : 1100,
    );
  }

  useEffect(() => {
    if (estado !== "visible") return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && iniciar(true);
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  });

  if (estado === "cerrada") return null;
  const saliendo = estado === "saliendo";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a WolfCore Systems"
      className={`intro fixed inset-0 z-[80] flex-col items-center justify-center overflow-hidden bg-noche-950 transition-opacity duration-700 ${
        saliendo ? "pointer-events-none opacity-0 delay-500" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(14_165_233/0.22),transparent_55%)]" aria-hidden="true" />
      <div className="cuadricula absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_70%)]" aria-hidden="true" />

      <div
        className={`relative aspect-square w-[min(86vw,58vh)] transition-transform duration-[1100ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
          saliendo ? "scale-[1.6]" : "scale-100"
        }`}
      >
        <LoboParticulas className="h-full w-full" explotar={saliendo} />
      </div>

      <div className={`relative mt-2 flex flex-col items-center text-center transition-all duration-500 ${saliendo ? "translate-y-4 opacity-0" : ""}`}>
        <p className="aparecer font-display text-4xl font-extrabold tracking-[0.08em] text-white sm:text-6xl" style={{ "--d": "900ms" } as React.CSSProperties}>
          WOLF<span className="text-electrico-400">CORE</span>
        </p>
        <p className="aparecer mt-3 px-4 font-mono text-[0.62rem] tracking-[0.28em] text-acero uppercase sm:text-xs sm:tracking-[0.45em]" style={{ "--d": "1100ms" } as React.CSSProperties}>
          Páginas web premium · Costa Rica
        </p>
        <button
          ref={boton}
          type="button"
          onClick={() => iniciar()}
          className="aparecer group mt-9 inline-flex h-12 items-center gap-3 rounded-full border border-electrico-400/60 bg-electrico-400/10 px-7 font-mono text-sm font-semibold tracking-[0.2em] text-white uppercase shadow-[0_0_40px_-6px_rgb(56_189_248/0.7)] transition-colors hover:bg-electrico-400 hover:text-noche-950"
          style={{ "--d": "1300ms" } as React.CSSProperties}
        >
          <span className="pulso h-2 w-2 rounded-full bg-electrico-400 group-hover:bg-noche-950" aria-hidden="true" />
          Iniciar
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => iniciar(true)}
        className={`absolute right-5 bottom-5 rounded-md px-3 py-2 font-mono text-xs tracking-wider text-acero transition-colors hover:text-white ${saliendo ? "opacity-0" : ""}`}
      >
        Saltar animación
      </button>
    </div>
  );
}
