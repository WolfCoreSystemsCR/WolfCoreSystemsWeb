import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Aldea Vet (muestra)" };

const servicios = [
  { t: "Medicina preventiva", d: "Vacunas, desparasitación y chequeos con recordatorio automático.", c: "#fde68a" },
  { t: "Cirugía y odontología", d: "Quirófano equipado y anestesia monitoreada por especialistas.", c: "#bbf7d0" },
  { t: "Emergencias", d: "Atención prioritaria cuando más lo necesita, con médico de guardia.", c: "#fecaca" },
  { t: "Grooming & spa", d: "Baño, corte y consentimiento con productos dermatológicos.", c: "#bfdbfe" },
  { t: "Hotel boutique", d: "Habitaciones amplias, paseos y fotos diarias para usted.", c: "#e9d5ff" },
  { t: "Nutrición", d: "Planes de alimentación según edad, raza y condición.", c: "#fed7aa" },
];

export default function Veterinaria() {
  return (
    <div className="min-h-screen bg-[#fbf7f0] font-sans text-[#1f3a2d] selection:bg-[#f97352] selection:text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1f3a2d] text-lg text-[#fbf7f0]" aria-hidden="true">🐾</span>
          Aldea<span className="text-[#f97352]">Vet</span>
        </a>
        <nav className="hidden gap-8 font-medium md:flex">
          <a href="#servicios" className="hover:text-[#f97352]">Servicios</a>
          <a href="#equipo" className="hover:text-[#f97352]">Equipo</a>
          <a href="#cita" className="hover:text-[#f97352]">Contacto</a>
        </nav>
        <a href="#cita" className="rounded-full bg-[#f97352] px-5 py-3 font-semibold text-white shadow-lg shadow-[#f97352]/30 transition-transform hover:-translate-y-0.5">
          Reservar cita
        </a>
      </header>

      {/* Portada */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-6 pb-20 md:grid-cols-2 md:pt-12">
        <div>
          <p className="aparecer inline-block rounded-full bg-[#1f3a2d] px-4 py-1.5 text-sm font-semibold text-[#fbf7f0]">Pinares · Curridabat</p>
          <h1 className="aparecer mt-6 font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-7xl" style={{ "--d": "120ms" } as React.CSSProperties}>
            Porque son <span className="relative inline-block text-[#f97352]">familia<svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" aria-hidden="true"><path d="M2 9 Q 100 -2 198 8" stroke="#f97352" strokeWidth="4" fill="none" strokeLinecap="round" /></svg></span>.
          </h1>
          <p className="aparecer mt-7 max-w-md text-lg leading-relaxed text-[#1f3a2d]/75" style={{ "--d": "240ms" } as React.CSSProperties}>
            Medicina veterinaria de alto nivel con el cariño de siempre. Su mascota en las mejores manos, con usted
            informado en cada paso.
          </p>
          <div className="aparecer mt-9 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
            <a href="#cita" className="rounded-full bg-[#1f3a2d] px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">Agendar por WhatsApp</a>
            <a href="#servicios" className="rounded-full border-2 border-[#1f3a2d]/15 px-7 py-4 font-semibold transition-colors hover:border-[#1f3a2d]">Ver servicios</a>
          </div>
        </div>
        <div className="relative">
          <div className="aparecer absolute -top-6 -right-4 h-40 w-40 rounded-full bg-[#fde68a]" style={{ "--d": "100ms" } as React.CSSProperties} aria-hidden="true" />
          <div className="aparecer absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[#bbf7d0]" style={{ "--d": "200ms" } as React.CSSProperties} aria-hidden="true" />
          <div className="aparecer relative overflow-hidden rounded-[3rem] shadow-2xl" style={{ "--d": "250ms" } as React.CSSProperties}>
            <img src={foto("1630438994394-3deff7a591bf", 900, 900)} alt="Perro en consulta veterinaria" className="acercar aspect-square w-full object-cover" />
          </div>
          <div className="aparecer absolute bottom-8 -left-2 rounded-2xl bg-white p-4 shadow-xl md:-left-10" style={{ "--d": "700ms" } as React.CSSProperties}>
            <p className="text-sm font-semibold">Próxima vacuna de Luna</p>
            <p className="text-xs text-[#1f3a2d]/60">Le recordamos por WhatsApp ✓</p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 data-revelar className="text-center font-display text-4xl font-extrabold tracking-tight md:text-5xl">Todo lo que su mascota necesita</h2>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, i) => (
              <li key={s.t} data-revelar style={{ "--retraso": `${(i % 3) * 90}ms` } as React.CSSProperties} className="group transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02]">
                <div className="rounded-[2rem] p-8" style={{ background: s.c }}>
                  <h3 className="font-display text-2xl font-extrabold">{s.t}</h3>
                  <p className="mt-3 leading-relaxed text-[#1f3a2d]/75">{s.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <img data-revelar src={foto("1654895716780-b4664497420d", 1000, 800)} alt="Veterinaria atendiendo a un perro" className="aspect-[5/4] w-full rounded-[2.5rem] object-cover" />
          <div data-revelar>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Un equipo que los quiere tanto como usted</h2>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {[["9", "médicos veterinarios"], ["24/7", "médico de guardia"], ["+15 mil", "pacientes peludos"], ["4.9★", "en Google"]].map(([v, t]) => (
                <li key={t} className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="font-display text-3xl font-extrabold text-[#f97352]">{v}</p>
                  <p className="text-sm text-[#1f3a2d]/70">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cita */}
      <section id="cita" className="px-6 pb-24">
        <div data-revelar className="mx-auto max-w-6xl rounded-[3rem] bg-[#1f3a2d] px-8 py-16 text-center text-white md:py-20">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">¿Le damos espacio esta semana?</h2>
          <p className="mx-auto mt-4 max-w-md text-white/75">Reserve en segundos por WhatsApp. Le confirmamos y le recordamos la cita.</p>
          <a href="#" className="mt-9 inline-block rounded-full bg-[#f97352] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">Reservar cita</a>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-[#1f3a2d]/60">Aldea Vet · Pinares, Curridabat · Abierto todos los días</footer>
    </div>
  );
}
