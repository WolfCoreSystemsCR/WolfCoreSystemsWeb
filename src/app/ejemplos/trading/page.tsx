import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Kappa Mercados · Educación en trading (muestra)" };

// Velas de ejemplo generadas con una semilla fija (siempre iguales, sin datos reales)
function velas(n: number) {
  let s = 7, precio = 100;
  const azar = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => {
    const abre = precio;
    const cierra = abre + (azar() - 0.42) * 6;
    const alto = Math.max(abre, cierra) + azar() * 3;
    const bajo = Math.min(abre, cierra) - azar() * 3;
    precio = cierra;
    return { abre, cierra, alto, bajo };
  });
}

const datos = velas(42);
const min = Math.min(...datos.map((d) => d.bajo));
const max = Math.max(...datos.map((d) => d.alto));
const y = (v: number) => 260 - ((v - min) / (max - min)) * 240;

const mercados = [
  ["Divisas (Forex)", "EUR/USD, GBP/USD y los pares más líquidos del mundo."],
  ["Índices", "S&P 500, Nasdaq y Dow Jones: el pulso de la economía."],
  ["Acciones", "Empresas globales y cómo leer sus movimientos."],
  ["Materias primas", "Oro, petróleo y su relación con el dólar."],
];

const programa = [
  ["01", "Fundamentos", "Cómo funcionan los mercados, plataformas, tipos de órdenes y vocabulario."],
  ["02", "Análisis técnico", "Tendencias, soportes, resistencias y patrones de velas japonesas."],
  ["03", "Gestión de riesgo", "Tamaño de posición, stop loss y cómo proteger su capital primero."],
  ["04", "Psicología del trader", "Disciplina, diario de operaciones y control emocional."],
];

const cinta = [["EUR/USD", "1.0842", "+0.12%"], ["S&P 500", "5,612.4", "+0.48%"], ["ORO", "2,384.1", "-0.21%"], ["NASDAQ", "19,804.7", "+0.66%"], ["GBP/USD", "1.2710", "+0.05%"], ["PETRÓLEO", "78.42", "-0.37%"]];

export default function Trading() {
  return (
    <div className="min-h-screen bg-[#05080d] font-sans text-[#e5edf5] selection:bg-[#22c55e] selection:text-[#05080d]">
      {/* Cinta de cotizaciones ilustrativas */}
      <div className="overflow-hidden border-b border-white/5 bg-[#0a1018] py-2" aria-hidden="true">
        <div className="flex w-max animate-[desplazar-cinta_30s_linear_infinite] gap-10 font-mono text-xs">
          {[...cinta, ...cinta].map(([s, p, c], i) => (
            <span key={i} className="flex gap-2 whitespace-nowrap">
              <b className="text-white/80">{s}</b>{p}
              <span className={c.startsWith("+") ? "text-[#22c55e]" : "text-[#f43f5e]"}>{c}</span>
            </span>
          ))}
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#22c55e] font-black text-[#05080d]">κ</span>
          Kappa<span className="text-[#22c55e]">Mercados</span>
        </a>
        <nav className="hidden gap-8 text-sm text-white/70 md:flex">
          <a href="#mercados" className="hover:text-white">Mercados</a>
          <a href="#programa" className="hover:text-white">Programa</a>
          <a href="#riesgo" className="hover:text-white">Gestión de riesgo</a>
        </nav>
        <a href="#info" className="rounded-lg border border-[#22c55e]/50 px-4 py-2.5 text-sm font-semibold text-[#22c55e] transition-colors hover:bg-[#22c55e] hover:text-[#05080d]">
          Solicitar información
        </a>
      </header>

      {/* Portada con gráfico animado */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#22c55e]/10 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
          <div>
            <p className="aparecer font-mono text-xs tracking-[0.3em] text-[#22c55e] uppercase">Educación financiera · Costa Rica</p>
            <h1 className="aparecer mt-5 font-display text-5xl leading-[1.04] font-extrabold tracking-tight md:text-6xl" style={{ "--d": "120ms" } as React.CSSProperties}>
              Aprenda a leer los mercados <span className="text-[#22c55e]">con método,</span> no con suerte.
            </h1>
            <p className="aparecer mt-6 max-w-lg text-lg leading-relaxed text-white/65" style={{ "--d": "240ms" } as React.CSSProperties}>
              Formación en trading desde cero, con clases en vivo, análisis semanal y una comunidad que aprende con
              disciplina y gestión del riesgo.
            </p>
            <div className="aparecer mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
              <a href="#programa" className="rounded-lg bg-[#22c55e] px-6 py-3.5 font-semibold text-[#05080d] shadow-[0_0_40px_-8px_#22c55e] transition-transform hover:-translate-y-0.5">Ver el programa</a>
              <a href="#riesgo" className="rounded-lg border border-white/15 px-6 py-3.5 font-semibold transition-colors hover:border-white/40">Cómo cuidamos el riesgo</a>
            </div>
          </div>

          <div className="aparecer relative rounded-2xl border border-white/10 bg-[#0a1018]/80 p-5 shadow-2xl backdrop-blur" style={{ "--d": "300ms" } as React.CSSProperties}>
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-white/50">
              <span><b className="text-white">EUR/USD</b> · H1 · gráfico ilustrativo</span>
              <span className="flex items-center gap-1.5 text-[#22c55e]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" /> en vivo (demo)</span>
            </div>
            <svg viewBox="0 0 420 270" className="w-full" role="img" aria-label="Gráfico de velas de ejemplo">
              {[60, 120, 180, 240].map((g) => <line key={g} x1="0" x2="420" y1={g} y2={g} stroke="white" strokeOpacity="0.05" />)}
              {datos.map((d, i) => {
                const x = 6 + i * 10;
                const sube = d.cierra >= d.abre;
                const color = sube ? "#22c55e" : "#f43f5e";
                const top = y(Math.max(d.abre, d.cierra));
                const alto = Math.max(1.5, Math.abs(y(d.abre) - y(d.cierra)));
                return (
                  <g key={i} className="origin-bottom animate-[crecer-vela_0.6s_ease-out_both]" style={{ animationDelay: `${300 + i * 45}ms`, transformBox: "fill-box" }}>
                    <line x1={x + 3} x2={x + 3} y1={y(d.alto)} y2={y(d.bajo)} stroke={color} strokeWidth="1" />
                    <rect x={x} y={top} width="6" height={alto} fill={color} rx="1" />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Mercados */}
      <section id="mercados" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 data-revelar className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Los mercados que estudiamos</h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {mercados.map(([t, d], i) => (
              <li key={t} data-revelar style={{ "--retraso": `${i * 90}ms` } as React.CSSProperties} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-colors hover:border-[#22c55e]/50">
                <h3 className="font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programa */}
      <section id="programa" className="py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.2fr]">
          <div data-revelar className="md:sticky md:top-10 md:self-start">
            <img src={foto("1611974789855-9c2a0a7236a3", 900, 700)} alt="Pantalla con gráfico de velas" className="aspect-[9/7] w-full rounded-2xl object-cover opacity-90" />
            <p className="mt-6 text-white/60">Clases en vivo dos veces por semana, grabaciones disponibles y sesiones de análisis de mercado los lunes.</p>
          </div>
          <ol className="space-y-4">
            {programa.map(([n, t, d], i) => (
              <li key={t} data-revelar style={{ "--retraso": `${i * 90}ms` } as React.CSSProperties} className="group flex gap-6 rounded-2xl border border-white/10 p-7 transition-colors hover:border-[#22c55e]/50 hover:bg-white/[0.02]">
                <span className="font-mono text-3xl font-bold text-[#22c55e]/60 group-hover:text-[#22c55e]">{n}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{t}</h3>
                  <p className="mt-2 leading-relaxed text-white/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Riesgo */}
      <section id="riesgo" className="border-y border-white/5 bg-[#0a1018] py-24">
        <div data-revelar className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[#f43f5e] uppercase">Primero, proteger el capital</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Aquí no vendemos promesas de ganancia.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Enseñamos a operar con un plan, a arriesgar solo una pequeña parte del capital por operación y a llevar un
            registro honesto de cada decisión.
          </p>
        </div>
      </section>

      {/* Información */}
      <section id="info" className="py-24">
        <div data-revelar className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#22c55e]/30 bg-[#22c55e]/[0.06] p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">¿Quiere conocer el programa?</h2>
            <p className="mt-2 text-white/65">Le enviamos el temario, horarios y la próxima fecha de inicio.</p>
          </div>
          <a href="#" className="rounded-lg bg-[#22c55e] px-7 py-4 font-semibold text-[#05080d]">Escribir por WhatsApp</a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 text-xs leading-relaxed text-white/45">
          <p className="font-semibold text-white/70">Advertencia de riesgo</p>
          <p className="mt-2">
            Contenido exclusivamente educativo e informativo. No constituye asesoría financiera ni recomendación de
            inversión. Operar en mercados financieros implica un alto riesgo de pérdida y no es adecuado para todas las
            personas. Los resultados pasados no garantizan resultados futuros. Las cotizaciones mostradas son ilustrativas.
          </p>
          <p className="mt-6 text-white/30">Kappa Mercados · San José, Costa Rica</p>
        </div>
      </footer>
    </div>
  );
}
