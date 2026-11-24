"use client";

import { useEffect, useState } from "react";

/** Escribe y borra palabras una tras otra, como si alguien las tecleara. */
export function PalabraRotativa({ palabras, className = "" }: { palabras: readonly string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [texto, setTexto] = useState(palabras[0]);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setInterval(() => setI((v) => (v + 1) % palabras.length), 2600);
      return () => clearInterval(t);
    }
  }, [palabras.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTexto(palabras[i]);
      return;
    }
    const meta = palabras[i];
    let t: ReturnType<typeof setTimeout>;
    if (!borrando && texto === meta) t = setTimeout(() => setBorrando(true), 2200);
    else if (borrando && texto === "") {
      setBorrando(false);
      setI((v) => (v + 1) % palabras.length);
    } else
      t = setTimeout(
        () => setTexto(borrando ? texto.slice(0, -1) : meta.slice(0, texto.length + 1)),
        borrando ? 35 : 70,
      );
    return () => clearTimeout(t);
  }, [texto, borrando, i, palabras]);

  return (
    <span className={`cursor-escribir ${className}`} aria-hidden="true">
      {texto}
    </span>
  );
}
