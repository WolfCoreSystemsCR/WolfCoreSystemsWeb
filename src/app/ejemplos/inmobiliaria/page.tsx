import type { Metadata } from "next";
import { foto } from "../foto";

export const metadata: Metadata = { title: "Cumbre Residences (muestra)" };

const propiedades = [
  { zona: "Bello Horizonte, Escazú", nombre: "Casa Mirador", precio: "$1,450,000", datos: "5 hab · 6 baños · 820 m²", img: "1613977257365-aaae5a9817ff" },
  { zona: "Pinares, Curridabat", nombre: "Residencia Bosque", precio: "$980,000", datos: "4 hab · 4.5 baños · 540 m²", img: "1599777560450-e462cffc5368" },
  { zona: "Lindora, Santa Ana", nombre: "Penthouse Altura", precio: "$690,000", datos: "3 hab · 3.5 baños · 310 m²", img: "1600121848594-d8644e57abab" },
];

const champan = "text-[#c9a96e]";

export default function Inmobiliaria() {
  return (
    <div className="min-h-screen bg-[#0f1412] font-sans text-[#ece6da] selection:bg-[#c9a96e] selection:text-[#0f1412]">
      {/* Portada a pantalla completa */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <img src={foto("1613977257365-aaae5a9817ff", 2000, 1300)} alt="Residencia de lujo con piscina al atardecer" className="acercar absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1412]/70 via-[#0f1412]/30 to-[#0f1412]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1412]/80 via-[#0f1412]/30 to-transparent" />

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7">
          <a href="#" className="font-serif text-2xl tracking-[0.3em] uppercase">Cumbre</a>
          <nav className="hidden gap-10 text-xs tracking-[0.25em] uppercase md:flex">
            <a href="#propiedades" className="hover:text-[#c9a96e]">Propiedades</a>
            <a href="#vender" className="hover:text-[#c9a96e]">Vender</a>
            <a href="#contacto" className="hover:text-[#c9a96e]">Contacto</a>
          </nav>
          <a href="#contacto" className="border border-[#ece6da]/40 px-5 py-2.5 text-xs tracking-[0.25em] uppercase transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]">
            Agendar visita
          </a>
        </header>

        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-6 pb-16">
          <p className={`aparecer text-xs tracking-[0.4em] uppercase ${champan}`}>Escazú · Santa Ana · Pinares</p>
          <h1 className="aparecer mt-5 max-w-4xl font-serif text-6xl leading-[0.95] font-medium md:text-8xl" style={{ "--d": "150ms" } as React.CSSProperties}>
            Propiedades que <em className={champan}>se recuerdan.</em>
          </h1>
          {/* Buscador */}
          <form className="aparecer mt-10 grid max-w-4xl gap-px overflow-hidden bg-[#ece6da]/20 backdrop-blur-md md:grid-cols-4" style={{ "--d": "350ms" } as React.CSSProperties}>
            {[["Zona", "Escazú"], ["Tipo", "Casa"], ["Presupuesto", "$500k – $1.5M"]].map(([l, v]) => (
              <label key={l} className="bg-[#0f1412]/60 px-5 py-4">
                <span className="block text-[0.65rem] tracking-[0.3em] text-[#ece6da]/60 uppercase">{l}</span>
                <span className="mt-1 block font-serif text-xl">{v}</span>
              </label>
            ))}
            <button type="button" className="bg-[#c9a96e] px-5 py-4 text-xs font-semibold tracking-[0.25em] text-[#0f1412] uppercase transition-colors hover:bg-[#ece6da]">
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section id="propiedades" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div data-revelar className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-serif text-5xl font-medium md:text-6xl">Selección <em className={champan}>exclusiva</em></h2>
            <a href="#" className="text-xs tracking-[0.25em] uppercase hover:text-[#c9a96e]">Ver las 48 propiedades →</a>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {propiedades.map((p, i) => (
              <li key={p.nombre} data-revelar style={{ "--retraso": `${i * 110}ms` } as React.CSSProperties} className="group">
                <div className="relative overflow-hidden">
                  <img src={foto(p.img, 800, 1000)} alt={p.nombre} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-[#0f1412]/80 px-3 py-1.5 text-[0.65rem] tracking-[0.25em] uppercase backdrop-blur">{p.zona}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl">{p.nombre}</h3>
                    <p className="mt-1 text-sm text-[#ece6da]/60">{p.datos}</p>
                  </div>
                  <p className={`font-serif text-2xl ${champan}`}>{p.precio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cifras */}
      <section className="border-y border-[#ece6da]/10 py-16">
        <dl data-revelar className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
          {[["$180M", "en propiedades vendidas"], ["21", "años en el mercado"], ["48", "propiedades disponibles"], ["3", "idiomas de atención"]].map(([v, t]) => (
            <div key={t} className="flex flex-col-reverse">
              <dt className="mt-2 text-xs tracking-[0.25em] text-[#ece6da]/60 uppercase">{t}</dt>
              <dd className={`font-serif text-5xl ${champan}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Vender */}
      <section id="vender" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <img data-revelar src={foto("1600121848594-d8644e57abab", 1000, 800)} alt="Sala de estar moderna" className="aspect-[5/4] w-full object-cover" />
          <div data-revelar>
            <p className={`text-xs tracking-[0.4em] uppercase ${champan}`}>Para propietarios</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight font-medium">Vendemos su propiedad como se merece.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#ece6da]/70">
              Fotografía y video profesional, recorrido virtual, presentación a compradores calificados de Estados Unidos,
              Canadá y Europa, y acompañamiento legal hasta la firma.
            </p>
            <a href="#contacto" className="mt-9 inline-block bg-[#c9a96e] px-7 py-4 text-xs font-semibold tracking-[0.25em] text-[#0f1412] uppercase transition-colors hover:bg-[#ece6da]">
              Solicitar avalúo
            </a>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="relative overflow-hidden py-28">
        <img src={foto("1599777560450-e462cffc5368", 1800, 900)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div data-revelar className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-5xl font-medium md:text-6xl">Su próxima casa le espera.</h2>
          <p className="mt-5 text-[#ece6da]/75">Agende una visita privada con uno de nuestros asesores.</p>
          <a href="#" className="mt-9 inline-block border border-[#c9a96e] px-8 py-4 text-xs tracking-[0.25em] text-[#c9a96e] uppercase transition-colors hover:bg-[#c9a96e] hover:text-[#0f1412]">
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-[#ece6da]/10 py-10 text-center text-xs tracking-[0.25em] text-[#ece6da]/50 uppercase">
        Cumbre Residences · Escazú, Costa Rica
      </footer>
    </div>
  );
}
