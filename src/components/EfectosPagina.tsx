"use client";

import { useEffect } from "react";

/**
 * Efectos globales, montados una sola vez:
 *  - Aparición suave de los elementos con [data-revelar] al entrar en pantalla.
 *  - Luz que sigue el cursor en las tarjetas .foco.
 *  - Botones "Me interesa" ([data-servicio]) que preseleccionan el servicio en el formulario.
 */
export function EfectosPagina() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>("[data-revelar]");
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observador.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elementos.forEach((el) => observador.observe(el));

    const alMover = (ev: PointerEvent) => {
      const el = (ev.target as Element | null)?.closest?.<HTMLElement>(".foco");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      el.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };

    const alClic = (ev: MouseEvent) => {
      const enlace = (ev.target as Element | null)?.closest?.<HTMLElement>("[data-servicio]");
      if (!enlace) return;
      const servicio = enlace.dataset.servicio;
      const select = document.querySelector<HTMLSelectElement>("select[name='servicio']");
      if (select && servicio) select.value = servicio;
    };

    document.addEventListener("pointermove", alMover, { passive: true });
    document.addEventListener("click", alClic);
    return () => {
      observador.disconnect();
      document.removeEventListener("pointermove", alMover);
      document.removeEventListener("click", alClic);
    };
  }, []);

  return null;
}
