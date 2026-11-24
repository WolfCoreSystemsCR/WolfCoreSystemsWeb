"use client";

import { useEffect, useRef, useState } from "react";
import { demos } from "@/lib/empresa";
import { Icono } from "./Icono";

const ANCHO_PC = 1280;
const ALTO_PC = 760;

/** Vitrina de páginas de muestra: pestañas por nicho y un navegador con la página en vivo. */
export function Vitrina() {
  const [activo, setActivo] = useState(0);
  const [modo, setModo] = useState<"pc" | "cel">("pc");
  const [escala, setEscala] = useState(0.6);
  const [cargando, setCargando] = useState(true);
  const marco = useRef<HTMLDivElement>(null);
  const demo = demos[activo];

  // En celular se muestra de entrada la versión para celular
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCargando(true);
      setModo("cel");
    }
  }, []);

  // Escala la página de 1280 px para que quepa en el recuadro
  useEffect(() => {
    const el = marco.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEscala(Math.min(1, e.contentRect.width / ANCHO_PC)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const elegir = (i: number) => {
    if (i === activo) return;
    setCargando(true);
    setActivo(i);
  };

  // Flechas del teclado entre pestañas
  const alTeclear = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const sig = (activo + (e.key === "ArrowRight" ? 1 : demos.length - 1)) % demos.length;
    elegir(sig);
    document.getElementById(`pestana-${sig}`)?.focus();
  };

  const src = `/ejemplos/${demo.slug}`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Tipos de negocio" className="flex flex-wrap gap-2" onKeyDown={alTeclear}>
          {demos.map((d, i) => (
            <button
              key={d.slug}
              id={`pestana-${i}`}
              role="tab"
              type="button"
              aria-selected={i === activo}
              aria-controls="panel-vitrina"
              tabIndex={i === activo ? 0 : -1}
              onClick={() => elegir(i)}
              className="pestana min-h-11 rounded-full border border-linea bg-noche-850 px-4 text-sm font-semibold text-hielo/80 transition-colors hover:border-electrico-400/60 hover:text-white"
            >
              {d.nicho}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-linea bg-noche-850 p-1 lg:self-auto">
          {(["pc", "cel"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={modo === m}
              onClick={() => {
                if (m === modo) return;
                // Cambiar de modo vuelve a cargar el iframe: se muestra el indicador de carga
                setCargando(true);
                setModo(m);
              }}
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${
                modo === m ? "bg-white text-noche-950" : "text-hielo/70 hover:text-white"
              }`}
            >
              {m === "pc" ? "Computadora" : "Celular"}
            </button>
          ))}
        </div>
      </div>

      <div id="panel-vitrina" role="tabpanel" aria-labelledby={`pestana-${activo}`} className="mt-6">
        {/* Ventana de navegador */}
        <div
          className={`mx-auto overflow-hidden border border-linea bg-noche-900 shadow-[0_40px_120px_-40px_rgb(56_189_248/0.45)] transition-[max-width,border-radius] duration-500 ${
            modo === "pc" ? "max-w-full rounded-2xl" : "max-w-[400px] rounded-[2.5rem] border-[10px] border-noche-700"
          }`}
        >
          {modo === "pc" && (
            <div className="flex items-center gap-3 border-b border-linea bg-noche-850 px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-noche-950 px-3 py-1.5 font-mono text-xs text-acero">
                <Icono nombre="escudo" className="h-3.5 w-3.5 shrink-0 text-electrico-400" />
                <span className="truncate">{demo.dominio}</span>
              </span>
              <a
                href={src}
                target="_blank"
                rel="noopener"
                className="hidden items-center gap-1.5 text-xs font-semibold text-electrico-300 hover:text-electrico-200 sm:inline-flex"
              >
                Pantalla completa <Icono nombre="flecha" className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          <div
            ref={marco}
            className="relative w-full overflow-hidden bg-white"
            style={{ height: modo === "pc" ? ALTO_PC * escala : 720 }}
          >
            {cargando && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-noche-900" aria-hidden="true">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-electrico-400/30 border-t-electrico-400" />
              </div>
            )}
            <iframe
              key={`${demo.slug}-${modo}`}
              src={src}
              title={`Página de muestra: ${demo.nicho}`}
              loading="lazy"
              onLoad={() => setCargando(false)}
              className="absolute top-0 left-0 origin-top-left border-0"
              style={
                modo === "pc"
                  ? { width: ANCHO_PC, height: ALTO_PC, transform: `scale(${escala})` }
                  : { width: "100%", height: "100%" }
              }
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 text-sm text-acero sm:flex-row">
          <p>
            Diseño de muestra hecho por WolfCore Systems para <b className="text-hielo">{demo.nicho.toLowerCase()}</b>.
            Puede navegarlo dentro del recuadro.
          </p>
          <a href={src} target="_blank" rel="noopener" className="boton-texto">
            Abrir en pantalla completa <Icono nombre="flecha" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
