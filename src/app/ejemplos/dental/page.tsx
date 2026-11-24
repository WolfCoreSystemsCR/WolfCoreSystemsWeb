import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Bruma Dental Studio (muestra)" };

const servicios = [
  { t: "Diseño de sonrisa", d: "Carillas de porcelana planificadas en 3D antes de tocar un diente.", i: "✦" },
  { t: "Implantes dentales", d: "Recupere piezas perdidas con implantes de marcas premium.", i: "◆" },
  { t: "Ortodoncia invisible", d: "Alineadores transparentes, cómodos y casi imperceptibles.", i: "◇" },
  { t: "Blanqueamiento", d: "Hasta 8 tonos más blanco en una sola sesión en clínica.", i: "○" },
  { t: "Rehabilitación total", d: "Sonrisa completa nueva en pocos días, con sedación consciente.", i: "■" },
  { t: "Odontología general", d: "Limpiezas, resinas y controles para toda la familia.", i: "□" },
];

const precios = [
  ["Implante + corona", "$3,500 – $5,000", "$1,150"],
  ["Carilla de porcelana", "$1,200 – $2,500", "$450"],
  ["Corona de zirconio", "$1,500 – $2,000", "$480"],
];

export default function Dental() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0b2239] selection:bg-[#14b8a6] selection:text-white">
      <div className="bg-[#0b2239] px-6 py-2 text-center text-xs text-white/80">
        <b className="text-[#5eead4]">International patients:</b> free virtual consultation in English ·
        <span className="ml-1 underline">Book now</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#0b2239]/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#0e7490] text-white">B</span>
            Bruma<span className="font-medium text-[#0e7490]">Dental</span>
          </a>
          <nav className="hidden gap-7 text-sm font-medium text-[#0b2239]/70 md:flex">
            <a href="#servicios" className="hover:text-[#0e7490]">Tratamientos</a>
            <a href="#turismo" className="hover:text-[#0e7490]">Pacientes internacionales</a>
            <a href="#equipo" className="hover:text-[#0e7490]">Clínica</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-[#0b2239]/15 p-0.5 text-xs font-semibold sm:flex">
              <span className="rounded-full bg-[#0b2239] px-2.5 py-1 text-white">ES</span>
              <span className="px-2.5 py-1">EN</span>
            </span>
            <a href="#cita" className="rounded-xl bg-[#0e7490] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b2239]">
              Agendar cita
            </a>
          </div>
        </div>
      </header>

      {/* Portada */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-[#ccfbf1] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="aparecer inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-1.5 text-sm font-semibold text-[#0e7490] ring-1 ring-[#99f6e4]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#14b8a6]" /> Santa Ana, Costa Rica
            </p>
            <h1 className="aparecer mt-6 font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-6xl" style={{ "--d": "120ms" } as React.CSSProperties}>
              La sonrisa que siempre quiso, <span className="bg-gradient-to-r from-[#14b8a6] to-[#0e7490] bg-clip-text text-transparent">en pocos días.</span>
            </h1>
            <p className="aparecer mt-6 max-w-lg text-lg leading-relaxed text-[#0b2239]/70" style={{ "--d": "240ms" } as React.CSSProperties}>
              Diseño de sonrisa, implantes y carillas con tecnología digital. Pacientes de Costa Rica y de todo el mundo
              confían en nuestro equipo.
            </p>
            <div className="aparecer mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
              <a href="#cita" className="rounded-xl bg-[#0b2239] px-6 py-3.5 font-semibold text-white shadow-xl shadow-[#0b2239]/20 transition-transform hover:-translate-y-0.5">
                Valoración gratuita
              </a>
              <a href="#turismo" className="rounded-xl border border-[#0b2239]/15 px-6 py-3.5 font-semibold transition-colors hover:border-[#0e7490] hover:text-[#0e7490]">
                I&apos;m traveling from abroad
              </a>
            </div>
            <div className="aparecer mt-10 flex items-center gap-4" style={{ "--d": "480ms" } as React.CSSProperties}>
              <div className="flex -space-x-3">
                {["#0e7490", "#14b8a6", "#5eead4", "#0b2239"].map((c) => (
                  <span key={c} className="h-10 w-10 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <p className="text-sm text-[#0b2239]/70"><b className="text-[#0b2239]">4.9/5</b> en más de 600 reseñas</p>
            </div>
          </div>
          <div className="relative">
            <div className="aparecer overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0e7490]/20" style={{ "--d": "200ms" } as React.CSSProperties}>
              <img src={foto("1489278353717-f64c6ee8a4d2", 900, 1000)} alt="Paciente sonriendo" className="acercar aspect-[9/10] w-full object-cover" />
            </div>
            <div className="aparecer absolute top-8 -left-6 rounded-2xl bg-white p-4 shadow-xl" style={{ "--d": "700ms" } as React.CSSProperties}>
              <p className="text-xs font-semibold text-[#0b2239]/60 uppercase">Ahorro promedio</p>
              <p className="font-display text-3xl font-extrabold text-[#0e7490]">70 %</p>
              <p className="text-xs text-[#0b2239]/60">vs. Estados Unidos</p>
            </div>
            <div className="aparecer absolute -right-4 bottom-10 rounded-2xl bg-[#0b2239] p-4 text-white shadow-xl" style={{ "--d": "850ms" } as React.CSSProperties}>
              <p className="font-display text-lg font-bold">Sonrisa digital 3D</p>
              <p className="text-xs text-white/70">Vea su resultado antes de empezar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-revelar className="max-w-2xl">
            <p className="text-sm font-bold tracking-widest text-[#0e7490] uppercase">Tratamientos</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Todo para su sonrisa, en un solo lugar</h2>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, i) => (
              <li key={s.t} data-revelar style={{ "--retraso": `${(i % 3) * 90}ms` } as React.CSSProperties} className="group rounded-3xl border border-[#0b2239]/5 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0e7490]/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f0fdfa] text-xl text-[#0e7490] transition-colors group-hover:bg-[#0e7490] group-hover:text-white">{s.i}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-[#0b2239]/65">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Turismo dental */}
      <section id="turismo" className="relative overflow-hidden bg-[#0b2239] py-24 text-white">
        <img src={foto("1598256989800-fe5f95da9787", 1600, 900)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div data-revelar>
            <p className="text-sm font-bold tracking-widest text-[#5eead4] uppercase">Dental tourism</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">World-class care. A fraction of the price.</h2>
            <p className="mt-5 text-lg text-white/70">
              We coordinate your treatment, hotel and airport transfer. Most patients finish in one trip of 7 to 10 days.
            </p>
            <ol className="mt-8 space-y-4">
              {["Free video consultation", "Personalized plan & quote", "Treatment in Santa Ana + recovery"].map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#14b8a6] font-bold text-[#0b2239]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
          <div data-revelar className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
            <table className="w-full text-left text-sm">
              <caption className="pb-4 text-left font-display text-lg font-bold">Comparación de precios (referencia)</caption>
              <thead className="text-white/60">
                <tr><th className="pb-3 font-medium">Tratamiento</th><th className="pb-3 font-medium">EE. UU.</th><th className="pb-3 font-medium text-[#5eead4]">Bruma</th></tr>
              </thead>
              <tbody>
                {precios.map(([t, us, cr]) => (
                  <tr key={t} className="border-t border-white/10">
                    <td className="py-4 font-semibold">{t}</td>
                    <td className="py-4 text-white/60 line-through decoration-white/30">{us}</td>
                    <td className="py-4 font-display text-lg font-bold text-[#5eead4]">{cr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Clínica */}
      <section id="equipo" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div data-revelar className="grid grid-cols-2 gap-4">
            <img src={foto("1629909613654-28e377c37b09", 700, 900)} alt="Consultorio moderno" className="row-span-2 h-full w-full rounded-3xl object-cover" />
            <img src={foto("1606811841689-23dfddce3e95", 600, 450)} alt="Dentista atendiendo a un paciente" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            <div className="grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br from-[#14b8a6] to-[#0e7490] p-5 text-center text-white">
              <div><p className="font-display text-4xl font-extrabold">15+</p><p className="text-sm text-white/80">años transformando sonrisas</p></div>
            </div>
          </div>
          <div data-revelar>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Tecnología que se nota en el resultado</h2>
            <ul className="mt-8 space-y-4 text-[#0b2239]/75">
              {["Escáner intraoral: adiós a los moldes incómodos", "Planificación 3D de implantes y carillas", "Laboratorio propio para entregas más rápidas", "Sedación consciente para pacientes con miedo"].map((x) => (
                <li key={x} className="flex gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ccfbf1] text-xs text-[#0e7490]">✓</span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cita */}
      <section id="cita" className="px-6 pb-24">
        <div data-revelar className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-[#0e7490] to-[#14b8a6] px-8 py-12 text-white md:flex-row md:px-14">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Su valoración es gratuita</h2>
            <p className="mt-2 text-white/85">Escríbanos y le damos espacio esta misma semana.</p>
          </div>
          <a href="#" className="rounded-xl bg-white px-7 py-4 font-semibold text-[#0b2239] transition-transform hover:-translate-y-0.5">Agendar por WhatsApp</a>
        </div>
      </section>

      <footer className="border-t border-[#0b2239]/5 py-10 text-center text-sm text-[#0b2239]/60">
        Bruma Dental Studio · Santa Ana, San José · Lunes a sábado
      </footer>
    </div>
  );
}
