import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Mirador Legal (muestra)" };

const areas = [
  ["Residencias e inmigración", "Rentista, pensionado, inversionista y nómada digital. Le acompañamos de principio a fin."],
  ["Derecho corporativo", "Constitución de sociedades, contratos y cumplimiento para su empresa."],
  ["Bienes raíces", "Estudio de títulos, compraventas, fideicomisos y condominios."],
  ["Notariado", "Escrituras, poderes y autenticaciones con agilidad y precisión."],
  ["Familia y sucesiones", "Testamentos, divorcios y procesos sucesorios con discreción."],
  ["Litigios", "Representación firme en procesos civiles, comerciales y laborales."],
];

const laton = "text-[#b08d57]";

export default function Abogados() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans text-[#14213d] selection:bg-[#14213d] selection:text-white">
      <header className="border-b border-[#14213d]/10 bg-[#f5f3ef]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-[#14213d] font-serif text-xl font-semibold">M</span>
            <span className="leading-tight">
              <span className="block font-serif text-xl font-semibold">Mirador Legal</span>
              <span className="block text-[0.65rem] tracking-[0.3em] text-[#14213d]/60 uppercase">Abogados &amp; Notarios</span>
            </span>
          </a>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#areas" className="hover:text-[#b08d57]">Áreas de práctica</a>
            <a href="#residencias" className="hover:text-[#b08d57]">Residencias</a>
            <a href="#firma" className="hover:text-[#b08d57]">La firma</a>
          </nav>
          <a href="#consulta" className="bg-[#14213d] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]">
            Agendar consulta
          </a>
        </div>
      </header>

      {/* Portada */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl md:grid-cols-[1.1fr_1fr]">
          <div className="px-6 py-20 md:py-28 md:pr-14">
            <p className={`aparecer text-xs font-semibold tracking-[0.35em] uppercase ${laton}`}>Escazú · Costa Rica · English spoken</p>
            <h1 className="aparecer mt-6 font-serif text-5xl leading-[1.02] font-semibold md:text-7xl" style={{ "--d": "120ms" } as React.CSSProperties}>
              Certeza jurídica para decisiones <em className={`font-medium ${laton}`}>importantes.</em>
            </h1>
            <p className="aparecer mt-7 max-w-lg text-lg leading-relaxed text-[#14213d]/70" style={{ "--d": "240ms" } as React.CSSProperties}>
              Asesoramos a familias, empresas y extranjeros que invierten y viven en Costa Rica, con respuestas claras y
              plazos que se cumplen.
            </p>
            <div className="aparecer mt-9 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
              <a href="#consulta" className="bg-[#b08d57] px-7 py-4 font-medium text-white transition-colors hover:bg-[#14213d]">Consulta inicial</a>
              <a href="#areas" className="border border-[#14213d]/30 px-7 py-4 font-medium transition-colors hover:border-[#14213d]">Áreas de práctica</a>
            </div>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden">
            <img src={foto("1505664194779-8beaceb93744", 1000, 1200)} alt="Biblioteca jurídica" className="acercar absolute inset-0 h-full w-full object-cover" />
            <div className="aparecer absolute right-6 bottom-6 left-6 bg-[#14213d]/90 p-6 text-white backdrop-blur" style={{ "--d": "600ms" } as React.CSSProperties}>
              <p className="font-serif text-4xl font-semibold">+1.200</p>
              <p className="text-sm text-white/70">trámites de residencia aprobados para clientes de 30 países</p>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="bg-[#14213d] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div data-revelar className="max-w-2xl">
            <p className={`text-xs font-semibold tracking-[0.35em] uppercase ${laton}`}>Áreas de práctica</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold">Un equipo para cada necesidad legal</h2>
          </div>
          <ul className="mt-14 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {areas.map(([t, d], i) => (
              <li key={t} data-revelar style={{ "--retraso": `${(i % 3) * 90}ms` } as React.CSSProperties} className="group bg-[#14213d] p-8 transition-colors hover:bg-[#1b2b4f]">
                <span className={`font-serif text-lg ${laton}`}>§ {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{t}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{d}</p>
                <span className="mt-6 block h-px w-10 bg-[#b08d57] transition-all duration-500 group-hover:w-24" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Residencias */}
      <section id="residencias" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div data-revelar>
            <p className={`text-xs font-semibold tracking-[0.35em] uppercase ${laton}`}>Residency in Costa Rica</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">Su residencia, en tres pasos claros</h2>
            <ol className="mt-10 space-y-8">
              {[
                ["Evaluación", "Revisamos su caso y le decimos qué categoría le conviene y qué documentos necesita."],
                ["Preparación", "Gestionamos apostillas, traducciones y requisitos para presentar sin errores."],
                ["Presentación y seguimiento", "Le acompañamos ante Migración y le informamos cada avance."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-6">
                  <span className={`font-serif text-5xl leading-none ${laton}`}>{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold">{t}</h3>
                    <p className="mt-2 text-[#14213d]/70">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <img data-revelar src={foto("1450101499163-c8848c66ca85", 1000, 1100)} alt="Firma de documentos legales" className="aspect-[10/11] w-full object-cover" />
        </div>
      </section>

      {/* Firma */}
      <section id="firma" className="border-y border-[#14213d]/10 bg-white py-20">
        <div data-revelar className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-serif text-3xl leading-snug md:text-4xl">
            “Nuestro compromiso es simple: que usted entienda su situación legal y sepa exactamente qué sigue.”
          </p>
          <p className={`mt-6 text-xs tracking-[0.35em] uppercase ${laton}`}>Socios fundadores</p>
        </div>
      </section>

      {/* Consulta */}
      <section id="consulta" className="py-24">
        <div data-revelar className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border border-[#14213d] p-10 md:flex-row md:items-center md:p-14">
          <div>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">¿Hablamos de su caso?</h2>
            <p className="mt-3 text-[#14213d]/70">Primera consulta de orientación en español o inglés, presencial o virtual.</p>
          </div>
          <a href="#" className="bg-[#14213d] px-8 py-4 font-medium text-white transition-colors hover:bg-[#b08d57]">Escribir por WhatsApp</a>
        </div>
      </section>

      <footer className="bg-[#14213d] py-10 text-center text-sm text-white/60">
        Mirador Legal · Abogados &amp; Notarios · Escazú, San José
      </footer>
    </div>
  );
}
