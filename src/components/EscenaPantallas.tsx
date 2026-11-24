"use client";

import { useEffect, useRef, useState } from "react";

const MAX = 1280;
const MIN = 390;
const ALTO = 720;

/**
 * Escena con desplazamiento: la misma página se va angostando de computadora a celular
 * mientras el visitante baja, y se ve cómo se reacomoda sola.
 */
export function EscenaPantallas({ src }: { src: string }) {
  const seccion = useRef<HTMLElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(MAX);
  const [disponible, setDisponible] = useState(900);
  const [cargar, setCargar] = useState(false);
  const [altoVentana, setAltoVentana] = useState(900);

  useEffect(() => {
    const sec = seccion.current, c = caja.current;
    if (!sec || !c) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cuadro = 0;

    const calcular = () => {
      cuadro = 0;
      const r = sec.getBoundingClientRect();
      const recorrido = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, recorrido)));
      // Pausas al inicio y al final para que se aprecie cada tamaño
      const q = Math.min(1, Math.max(0, (p - 0.12) / 0.7));
      const suave = q * q * (3 - 2 * q);
      setAncho(reducir ? MIN : Math.round(MAX - (MAX - MIN) * suave));
      setAltoVentana(window.innerHeight);
    };
    const alDesplazar = () => { if (!cuadro) cuadro = requestAnimationFrame(calcular); };
    const ro = new ResizeObserver(([e]) => setDisponible(e.contentRect.width));
    ro.observe(c);
    // Carga la página de muestra solo cuando el visitante se acerca
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCargar(true); io.disconnect(); } }, { rootMargin: "600px" });
    io.observe(sec);

    calcular();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      cancelAnimationFrame(cuadro);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", alDesplazar);
    };
  }, []);

  // La página se dibuja a su ancho real y se reduce visualmente para caber en pantalla
  // 16 px = el borde del marco (8 px por lado)
  const escala = Math.min(1, Math.max(0.1, disponible - 16) / ancho);
  // En celular el texto va arriba, así que el marco ocupa menos alto
  const altoVisible = Math.min(ALTO, Math.round(altoVentana * (disponible < 700 ? 0.45 : 0.62)));
  const dispositivo = ancho > 1000 ? "Computadora" : ancho > 700 ? "Tablet" : "Celular";
  const redondeo = ancho > 1000 ? 16 : ancho > 700 ? 28 : 40;

  return (
    <section ref={seccion} aria-labelledby="titulo-pantallas" className="relative h-[260vh] border-t border-linea">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Piso en perspectiva */}
        <div className="pointer-events-none absolute inset-x-[-50%] bottom-[-10%] h-[55%]" aria-hidden="true">
          <div className="piso h-full w-full" />
        </div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-noche-950 to-transparent" aria-hidden="true" />

        <div className="contenedor relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <div>
            <p className="ceja mb-4"><span className="h-px w-6 bg-electrico-400" aria-hidden="true" />Siempre se ve bien</p>
            <h2 id="titulo-pantallas" className="titulo-seccion">Se adapta sola a cada pantalla.</h2>
            <p className="subtitulo mt-5 hidden sm:block">
              En la computadora luce completa. En el celular, donde lo buscan sus clientes, todo se reacomoda para leerse y
              tocarse con el pulgar.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-electrico-400/40 bg-electrico-400/10 px-4 py-2 font-mono text-sm text-electrico-200" aria-live="off">
              <span className="font-semibold text-white">{dispositivo}</span>
              <span className="text-electrico-400/60">·</span>
              {ancho} px de ancho
            </p>
          </div>

          <div ref={caja} className="flex min-w-0 justify-center">
            <div
              className="overflow-hidden border-[8px] border-noche-700 bg-white shadow-[0_40px_120px_-30px_rgb(56_189_248/0.55)]"
              style={{ width: ancho * escala + 16, height: altoVisible + 16, borderRadius: redondeo }}
            >
              {cargar && (
                <iframe
                  src={src}
                  title="La misma página de muestra en distintos tamaños de pantalla"
                  tabIndex={-1}
                  className="origin-top-left border-0"
                  style={{ width: ancho, height: altoVisible / escala, transform: `scale(${escala})` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
