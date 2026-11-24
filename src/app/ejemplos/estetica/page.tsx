import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Velora · Estética Médica (muestra)" };

const tratamientos = [
  { nombre: "Toxina botulínica", texto: "Suaviza líneas de expresión con un resultado natural y descansado.", desde: "$280" },
  { nombre: "Ácido hialurónico", texto: "Labios, ojeras y contorno facial con volumen armónico.", desde: "$390" },
  { nombre: "Bioestimuladores", texto: "Estimulan su propio colágeno para una piel más firme.", desde: "$450" },
  { nombre: "Láser y luz pulsada", texto: "Manchas, rojeces y textura, con mínima recuperación.", desde: "$180" },
  { nombre: "Facial profundo", texto: "Limpieza, hidratación y brillo inmediato para su piel.", desde: "$120" },
  { nombre: "Armonización facial", texto: "Un plan completo, pensado para usted y sus proporciones.", desde: "Valoración" },
];

const oro = "text-[#a07a45]";

export default function Estetica() {
  return (
    <div className="min-h-screen bg-[#f7f2ec] font-sans text-[#2b211c] selection:bg-[#a07a45] selection:text-white">
      {/* Navegación */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#" className="font-serif text-3xl font-semibold tracking-wide">
            Velora<span className={oro}>.</span>
          </a>
          <nav className="hidden gap-8 text-sm tracking-wide md:flex">
            <a href="#tratamientos" className="hover:text-[#a07a45]">Tratamientos</a>
            <a href="#clinica" className="hover:text-[#a07a45]">La clínica</a>
            <a href="#resultados" className="hover:text-[#a07a45]">Resultados</a>
          </nav>
          <a href="#reservar" className="rounded-full bg-[#2b211c] px-5 py-2.5 text-sm font-medium text-[#f7f2ec] transition-colors hover:bg-[#a07a45]">
            Reservar valoración
          </a>
        </div>
      </header>

      {/* Portada */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className={`aparecer text-xs font-semibold tracking-[0.35em] uppercase ${oro}`}>Estética médica · Escazú</p>
            <h1 className="aparecer mt-6 font-serif text-6xl leading-[0.95] font-medium md:text-7xl lg:text-8xl" style={{ "--d": "120ms" } as React.CSSProperties}>
              Su mejor versión, <em className={`font-normal ${oro}`}>con criterio médico.</em>
            </h1>
            <p className="aparecer mt-7 max-w-md text-lg leading-relaxed text-[#5c4d43]" style={{ "--d": "240ms" } as React.CSSProperties}>
              Tratamientos faciales y corporales con resultados naturales, en manos de médicos certificados y en un espacio
              pensado para su tranquilidad.
            </p>
            <div className="aparecer mt-9 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
              <a href="#reservar" className="rounded-full bg-[#a07a45] px-7 py-3.5 font-medium text-white shadow-lg shadow-[#a07a45]/30 transition-transform hover:-translate-y-0.5">
                Agendar por WhatsApp
              </a>
              <a href="#tratamientos" className="rounded-full border border-[#2b211c]/25 px-7 py-3.5 font-medium transition-colors hover:border-[#2b211c]">
                Ver tratamientos
              </a>
            </div>
            <dl className="aparecer mt-12 flex gap-10 border-t border-[#2b211c]/10 pt-8" style={{ "--d": "480ms" } as React.CSSProperties}>
              {[["12", "años de experiencia"], ["4.9★", "en Google"], ["+8 mil", "pacientes felices"]].map(([v, t]) => (
                <div key={t} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs tracking-wide text-[#7d6b5f] uppercase">{t}</dt>
                  <dd className="font-serif text-4xl font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="aparecer overflow-hidden rounded-t-[14rem] rounded-b-3xl shadow-2xl shadow-[#a07a45]/20" style={{ "--d": "200ms" } as React.CSSProperties}>
              <img src={foto("1577746838851-816a43ca8733", 900, 1150)} alt="Paciente con piel luminosa" className="acercar aspect-[4/5] w-full object-cover" />
            </div>
            <div className="aparecer absolute -bottom-6 -left-6 rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur" style={{ "--d": "650ms" } as React.CSSProperties}>
              <p className="font-serif text-2xl font-semibold">Valoración</p>
              <p className="text-sm text-[#7d6b5f]">sin costo esta semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section id="tratamientos" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-revelar className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-5xl leading-tight font-medium md:text-6xl">
              Tratamientos <em className={oro}>a su medida</em>
            </h2>
            <p className="max-w-sm text-[#5c4d43]">Cada plan empieza con una valoración médica. Nada de paquetes genéricos.</p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-[#2b211c]/10 md:grid-cols-2 lg:grid-cols-3">
            {tratamientos.map((t, i) => (
              <li key={t.nombre} data-revelar style={{ "--retraso": `${(i % 3) * 90}ms` } as React.CSSProperties} className="group bg-[#f7f2ec] p-8 transition-colors hover:bg-white">
                <p className={`font-serif text-lg ${oro}`}>0{i + 1}</p>
                <h3 className="mt-4 font-serif text-3xl font-medium">{t.nombre}</h3>
                <p className="mt-3 leading-relaxed text-[#5c4d43]">{t.texto}</p>
                <p className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-[#7d6b5f]">desde <b className="text-[#2b211c]">{t.desde}</b></span>
                  <span className={`translate-x-0 transition-transform group-hover:translate-x-1 ${oro}`}>→</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La clínica */}
      <section id="clinica" className="bg-[#2b211c] py-24 text-[#f7f2ec]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div data-revelar className="grid grid-cols-2 gap-4">
            <img src={foto("1781513144825-aa1e284c5950", 600, 800)} alt="Recepción de la clínica" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            <img src={foto("1552693673-1bf958298935", 600, 800)} alt="Tratamiento facial" className="mt-12 aspect-[3/4] w-full rounded-2xl object-cover" />
          </div>
          <div data-revelar>
            <p className="text-xs font-semibold tracking-[0.35em] text-[#d6b98a] uppercase">La clínica</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight font-medium">Un espacio privado, sereno y seguro.</h2>
            <ul className="mt-8 space-y-5">
              {[
                ["Médicos certificados", "Cada procedimiento lo realiza un médico con formación en estética."],
                ["Tecnología de primer nivel", "Equipos aprobados y protocolos de higiene hospitalaria."],
                ["Resultados naturales", "Buscamos que se vea como usted, solo que descansada."],
              ].map(([t, d]) => (
                <li key={t} className="border-l border-[#d6b98a]/50 pl-5">
                  <p className="font-serif text-2xl">{t}</p>
                  <p className="mt-1 text-[#f7f2ec]/70">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonio */}
      <section id="resultados" className="py-24">
        <div data-revelar className="mx-auto max-w-4xl px-6 text-center">
          <p className={`font-serif text-7xl leading-none ${oro}`} aria-hidden="true">“</p>
          <blockquote className="font-serif text-3xl leading-snug md:text-4xl">
            Me sentí escuchada desde la primera cita. El resultado es tan natural que solo me dicen que me veo descansada.
          </blockquote>
          <p className="mt-6 text-sm tracking-[0.25em] text-[#7d6b5f] uppercase">Mariana R. · Santa Ana</p>
        </div>
      </section>

      {/* Reservar */}
      <section id="reservar" className="px-6 pb-24">
        <div data-revelar className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#e9dccb]">
          <img src={foto("1616394584738-fc6e612e71b9", 1400, 700)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="relative px-8 py-16 text-center md:py-24">
            <h2 className="font-serif text-5xl font-medium md:text-6xl">Agende su valoración</h2>
            <p className="mx-auto mt-4 max-w-md text-[#5c4d43]">Le respondemos por WhatsApp en minutos y elegimos juntos el mejor horario.</p>
            <a href="#" className="mt-8 inline-block rounded-full bg-[#2b211c] px-8 py-4 font-medium text-white transition-colors hover:bg-[#a07a45]">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2b211c]/10 py-10 text-center text-sm text-[#7d6b5f]">
        <p className="font-serif text-2xl text-[#2b211c]">Velora<span className={oro}>.</span></p>
        <p className="mt-2">San Rafael de Escazú · Lunes a sábado, 9:00 a. m. – 7:00 p. m.</p>
      </footer>
    </div>
  );
}
