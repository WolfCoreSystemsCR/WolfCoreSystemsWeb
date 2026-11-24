"use client";

import { useEffect, useRef } from "react";

type Particula = {
  x: number; y: number; // posición actual
  tx: number; ty: number; // destino (forma del lobo)
  vx: number; vy: number;
  color: string;
  tam: number;
  retraso: number;
};

type Anillo = { angulo: number; radio: number; vel: number; tam: number; color: string; y: number };

/**
 * Lobo de WolfCore hecho de "píxeles": las partículas llegan desde una esfera,
 * forman el lobo y se apartan del cursor. Un anillo de puntos orbita alrededor.
 */
export function LoboParticulas({
  className = "",
  explotar = false,
  rearmarConIntro = false,
}: {
  className?: string;
  /** Al pasar a true, los píxeles salen disparados hacia afuera y se desvanecen. */
  explotar?: boolean;
  /** Vuelve a armar el lobo cuando termina la pantalla de entrada. */
  rearmarConIntro?: boolean;
}) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const explotarRef = useRef(explotar);
  useEffect(() => {
    explotarRef.current = explotar;
  }, [explotar]);

  useEffect(() => {
    const canvas = lienzo.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particulas: Particula[] = [];
    let anillo: Anillo[] = [];
    let ancho = 0, alto = 0, dpr = 1, inicio = 0, cuadro = 0, visible = true, explosion = 0;
    const raton = { x: -9999, y: -9999 };

    const img = new Image();
    img.src = "/img/lobo.png";

    function construir() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = rect.width; alto = rect.height;
      canvas!.width = Math.round(ancho * dpr);
      canvas!.height = Math.round(alto * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Muestrea la imagen del lobo en una cuadrícula
      const lado = Math.min(ancho, alto) * 0.78;
      // Misma cantidad de píxeles en cualquier pantalla: en celular son más pequeños, no más gruesos
      const n = 64;
      const paso = lado / n;
      const off = document.createElement("canvas");
      off.width = n; off.height = n;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, n, n);
      const datos = octx.getImageData(0, 0, n, n).data;
      const ox = (ancho - lado) / 2, oy = (alto - lado) / 2;
      const cx = ancho / 2, cy = alto / 2;

      particulas = [];
      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          const k = (j * n + i) * 4;
          const r = datos[k], g = datos[k + 1], b = datos[k + 2], a = datos[k + 3];
          const luz = 0.299 * r + 0.587 * g + 0.114 * b;
          // Solo el lobo (descarta el fondo oscuro y el borde circular)
          const dx = i / n - 0.52, dy = j / n - 0.5;
          if (a < 128 || luz < 70 || dx * dx + dy * dy > 0.2) continue;
          const azul = b > r + 25;
          const color = azul ? `rgb(${Math.max(56, r)},${Math.max(170, g)},248)` : `rgb(${Math.min(255, luz + 30)},${Math.min(255, luz + 40)},255)`;
          // Punto de partida: sobre una esfera alrededor del centro
          const th = Math.random() * Math.PI * 2;
          const rad = lado * (0.55 + Math.random() * 0.25);
          particulas.push({
            x: cx + Math.cos(th) * rad, y: cy + Math.sin(th) * rad * 0.85,
            tx: ox + i * paso, ty: oy + j * paso,
            vx: 0, vy: 0, color, tam: paso * (0.62 + Math.random() * 0.2),
            retraso: Math.random() * 700,
          });
        }
      }

      anillo = Array.from({ length: 140 }, () => ({
        angulo: Math.random() * Math.PI * 2,
        radio: lado * (0.6 + Math.random() * 0.08),
        vel: 0.0016 + Math.random() * 0.0016,
        tam: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.8 ? "#e6f1ff" : "#38bdf8",
        y: (Math.random() - 0.5) * 10,
      }));

      if (reducir) for (const p of particulas) { p.x = p.tx; p.y = p.ty; }
      inicio = performance.now();
    }

    function dibujar(t: number) {
      ctx!.clearRect(0, 0, ancho, alto);
      const cx = ancho / 2, cy = alto / 2;
      const transcurrido = t - inicio;

      // Explosión: cada píxel sale disparado desde el centro y todo se desvanece
      if (explotarRef.current && !explosion) {
        explosion = t;
        for (const p of particulas) {
          const dx = p.x - cx, dy = p.y - cy;
          const d = Math.hypot(dx, dy) || 1;
          const fuerza = 6 + Math.random() * 14;
          p.vx = (dx / d) * fuerza + (Math.random() - 0.5) * 4;
          p.vy = (dy / d) * fuerza + (Math.random() - 0.5) * 4;
        }
      }
      const desvanecer = explosion ? Math.max(0, 1 - (t - explosion) / 900) : 1;

      // Anillo inclinado (parte de atrás, más tenue)
      for (const a of anillo) {
        if (!reducir) a.angulo += explosion ? a.vel * 6 : a.vel;
        if (explosion) a.radio *= 1.03;
        const s = Math.sin(a.angulo);
        const x = cx + Math.cos(a.angulo) * a.radio;
        const y = cy + s * a.radio * 0.22 + a.y - Math.cos(a.angulo) * a.radio * 0.18;
        ctx!.globalAlpha = (s < 0 ? 0.25 : 0.85) * desvanecer;
        ctx!.fillStyle = a.color;
        ctx!.fillRect(x, y, a.tam, a.tam);
      }

      ctx!.globalAlpha = desvanecer;
      for (const p of particulas) {
        if (explosion) {
          p.vx *= 1.04; p.vy *= 1.04;
          p.x += p.vx; p.y += p.vy;
        } else if (!reducir && transcurrido > p.retraso) {
          // Resorte hacia el destino + repulsión del cursor
          let fx = (p.tx - p.x) * 0.045, fy = (p.ty - p.y) * 0.045;
          const dx = p.x - raton.x, dy = p.y - raton.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const f = (9000 - d2) / 9000;
            fx += (dx / Math.sqrt(d2 + 0.01)) * f * 6;
            fy += (dy / Math.sqrt(d2 + 0.01)) * f * 6;
          }
          p.vx = (p.vx + fx) * 0.82;
          p.vy = (p.vy + fy) * 0.82;
          p.x += p.vx; p.y += p.vy;
        }
        // Leve respiración
        const resp = reducir ? 0 : Math.sin(t / 900 + p.tx * 0.02) * 0.4;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y + resp, p.tam, p.tam);
      }
      ctx!.globalAlpha = 1;
      const terminoExplosion = explosion && desvanecer === 0;
      if ((!reducir || explosion) && visible && !terminoExplosion) cuadro = requestAnimationFrame(dibujar);
    }

    // Devuelve los píxeles a la esfera para que el lobo se arme de nuevo frente al visitante
    function rearmar() {
      if (!particulas.length) return;
      const cx = ancho / 2, cy = alto / 2;
      const lado = Math.min(ancho, alto) * 0.78;
      for (const p of particulas) {
        const th = Math.random() * Math.PI * 2;
        const rad = lado * (0.55 + Math.random() * 0.25);
        p.x = cx + Math.cos(th) * rad; p.y = cy + Math.sin(th) * rad * 0.85;
        p.vx = 0; p.vy = 0;
      }
      inicio = performance.now();
    }
    const alTerminarIntro = () => { if (rearmarConIntro && !reducir) rearmar(); };
    window.addEventListener("wcs-intro-fin", alTerminarIntro);

    const alMover = (e: PointerEvent) => {
      // En pantallas táctiles el dedo no debe desarmar el lobo
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      raton.x = e.clientX - r.left; raton.y = e.clientY - r.top;
    };
    const alSalir = () => { raton.x = -9999; raton.y = -9999; };
    let temporizador: ReturnType<typeof setTimeout>;
    // En celular la barra del navegador cambia el alto al desplazarse: solo se reconstruye si cambia el ancho
    const alRedimensionar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        if (Math.abs(canvas.getBoundingClientRect().width - ancho) < 2) return;
        construir();
        if (reducir) dibujar(performance.now());
      }, 150);
    };

    // Pausa la animación cuando no se ve (ahorra batería)
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(cuadro);
      if (visible && !reducir && particulas.length) cuadro = requestAnimationFrame(dibujar);
    });

    img.onload = () => {
      construir();
      obs.observe(canvas);
      cuadro = requestAnimationFrame(dibujar);
    };
    window.addEventListener("pointermove", alMover, { passive: true });
    canvas.addEventListener("pointerleave", alSalir);
    window.addEventListener("resize", alRedimensionar);

    return () => {
      cancelAnimationFrame(cuadro);
      obs.disconnect();
      clearTimeout(temporizador);
      window.removeEventListener("pointermove", alMover);
      canvas.removeEventListener("pointerleave", alSalir);
      window.removeEventListener("resize", alRedimensionar);
      window.removeEventListener("wcs-intro-fin", alTerminarIntro);
    };
  }, [rearmarConIntro]);

  return <canvas ref={lienzo} className={className} aria-hidden="true" />;
}
