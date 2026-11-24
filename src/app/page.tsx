import { BotonFlotante } from "@/components/BotonFlotante";
import { EfectosPagina } from "@/components/EfectosPagina";
import { Encabezado } from "@/components/Encabezado";
import { EscenaPantallas } from "@/components/EscenaPantallas";
import { FormularioContacto } from "@/components/FormularioContacto";
import { Icono } from "@/components/Icono";
import { IntroLobo } from "@/components/IntroLobo";
import { LoboParticulas } from "@/components/LoboParticulas";
import { PalabraRotativa } from "@/components/PalabraRotativa";
import { PiePagina } from "@/components/PiePagina";
import { Vitrina } from "@/components/Vitrina";
import {
  beneficios,
  canalWolf,
  cifras,
  empresa,
  enlaceWolf,
  modalidades,
  nichos,
  nichosTitulo,
  pilares,
  preguntas,
  proceso,
  servicioPrincipal,
  servicios,
} from "@/lib/empresa";

const num = (i: number) => String(i + 1).padStart(2, "0");
const retraso = (i: number) => ({ "--retraso": `${i * 90}ms` }) as React.CSSProperties;

function Encabezamiento({
  ceja,
  titulo,
  texto,
  centrado = false,
}: {
  ceja: string;
  titulo: React.ReactNode;
  texto?: string;
  centrado?: boolean;
}) {
  return (
    <div data-revelar className={centrado ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="ceja mb-4">
        <span className="h-px w-6 bg-electrico-400" aria-hidden="true" />
        {ceja}
      </p>
      <h2 className="titulo-seccion">{titulo}</h2>
      {texto && <p className={`subtitulo mt-5 ${centrado ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{texto}</p>}
    </div>
  );
}

export default function Inicio() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-electrico-400 focus:px-4 focus:py-3 focus:font-semibold focus:text-noche-950"
      >
        Saltar al contenido
      </a>
      <IntroLobo />
      <Encabezado />
      <EfectosPagina />

      <main id="contenido">
        {/* ───────── Inicio ───────── */}
        <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12">
          <div
            className="cuadricula absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black,transparent)]"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 right-[-10%] -z-10 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-electrico-600/20 blur-[140px]"
            aria-hidden="true"
          />

          <div className="contenedor grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 rounded-full border border-electrico-400/30 bg-electrico-400/10 px-4 py-1.5 text-sm font-medium text-electrico-200">
                <span className="pulso h-2 w-2 rounded-full bg-electrico-400" aria-hidden="true" />
                Escazú · Santa Ana · Pinares · Belén
              </p>
              <h1 className="mt-6 font-display text-[2.5rem] leading-[1.04] font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
                <span className="sr-only">
                  Páginas web premium para clínicas estéticas, clínicas dentales, inmobiliarias, bufetes, veterinarias y
                  academias de trading.
                </span>
                <span aria-hidden="true">
                  Su{" "}
                  <span className="texto-brillo block min-h-[1.05em] whitespace-nowrap">
                    <PalabraRotativa palabras={nichosTitulo} />
                  </span>
                  merece una página a su altura.
                </span>
              </h1>
              <p className="subtitulo mt-6 max-w-xl sm:text-xl">
                Diseñamos páginas web únicas, con animaciones y citas automáticas por WhatsApp, para negocios que quieren
                verse como lo que valen.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario text-lg">
                  <Icono nombre="mensaje" /> Cotizar por WhatsApp
                </a>
                <a href="#ejemplos" className="boton-borde group text-lg">
                  Ver diseños
                  <Icono nombre="flecha" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-hielo/70">
                {beneficios.map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <Icono nombre="check" className="h-4 w-4 text-electrico-400" /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative order-1 mx-auto -mb-4 aspect-square w-full max-w-[13rem] sm:max-w-[26rem] lg:order-2 lg:mb-0 lg:max-w-none">
              <LoboParticulas className="h-full w-full" rearmarConIntro />
            </div>
          </div>

          <a
            href="#ejemplos"
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs tracking-widest text-acero uppercase transition-colors hover:text-electrico-300 sm:flex"
          >
            Ver diseños
            <span className="h-10 w-px animate-pulse bg-gradient-to-b from-electrico-400 to-transparent" aria-hidden="true" />
          </a>
        </section>

        {/* ───────── Vitrina de ejemplos ───────── */}
        <section id="ejemplos" className="seccion border-t border-linea bg-noche-900">
          <div className="contenedor">
            <Encabezamiento
              ceja="Diseños de muestra"
              titulo={
                <>
                  Así se vería <span className="texto-brillo">su página</span>
                </>
              }
              texto="Páginas de ejemplo hechas por WolfCore Systems para negocios de alto nivel. Elija un tipo de negocio y navéguela como lo haría su cliente."
            />
            <div className="mt-12" data-revelar>
              <Vitrina />
            </div>
          </div>
        </section>

        {/* ───────── Escena: se adapta a cada pantalla ───────── */}
        <EscenaPantallas src="/ejemplos/dental" />

        {/* ───────── Clientes ideales ───────── */}
        <section id="clientes" className="seccion border-t border-linea">
          <div className="contenedor">
            <Encabezamiento
              ceja="Especialistas en negocios premium"
              titulo="Trabajamos con negocios donde cada cliente vale mucho"
              texto="Nos enfocamos en la zona oeste de San José: negocios donde un solo cliente nuevo paga la página."
            />
            <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {nichos.map((n, i) => (
                <li
                  key={n.titulo}
                  data-revelar
                  style={retraso(i % 3)}
                  className="foco tarjeta group flex flex-col p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-electrico-400/50"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-electrico-400/10 text-electrico-300 ring-1 ring-electrico-400/30 transition-colors group-hover:bg-electrico-400 group-hover:text-noche-950">
                    <Icono nombre={n.icono} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{n.titulo}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-hielo/70">{n.porque}</p>
                  <p className="mt-5 border-t border-linea pt-4 text-sm font-medium text-electrico-200">{n.vendemos}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Servicios ───────── */}
        <section id="servicios" className="seccion border-t border-linea bg-noche-900">
          <div className="contenedor">
            <Encabezamiento
              ceja="Servicios"
              titulo="Una página que vende y un negocio que trabaja solo"
              texto="Usted se enfoca en sus clientes. Nosotros nos encargamos de que lo encuentren, confíen y reserven."
            />

            <article
              data-revelar
              className="foco relative mt-12 overflow-hidden rounded-3xl border border-electrico-400/30 bg-gradient-to-br from-noche-800 via-noche-850 to-noche-900 p-7 sm:p-10"
            >
              <div
                className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-electrico-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-electrico-400 px-3 py-1 text-xs font-bold tracking-wide text-noche-950 uppercase">
                    <Icono nombre="rayo" className="h-3.5 w-3.5" /> Servicio principal
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-balance text-white sm:text-3xl">
                    {servicioPrincipal.titulo}
                  </h3>
                  <p className="subtitulo mt-4">{servicioPrincipal.texto}</p>
                  <a
                    href="#contacto"
                    data-servicio={servicioPrincipal.titulo}
                    className="boton-primario group mt-8 w-full sm:w-auto"
                  >
                    Quiero mi página
                    <Icono nombre="flecha" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                <ul className="grid gap-3">
                  {servicioPrincipal.puntos.map((p) => (
                    <li key={p} className="flex gap-3 rounded-xl border border-linea bg-noche-950/60 p-4">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electrico-400/15 text-electrico-300">
                        <Icono nombre="check" className="h-4 w-4" />
                      </span>
                      <span className="text-hielo/85">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicios.map((s, i) => (
                <li
                  key={s.titulo}
                  data-revelar
                  style={retraso(i % 3)}
                  className="foco tarjeta group flex flex-col p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-electrico-400/50"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-electrico-400/10 text-electrico-300 ring-1 ring-electrico-400/30 transition-colors group-hover:bg-electrico-400 group-hover:text-noche-950">
                    <Icono nombre={s.icono} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.titulo}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-hielo/70">{s.texto}</p>
                  <a
                    href="#contacto"
                    data-servicio={s.titulo}
                    className="boton-texto mt-6 self-start"
                    aria-label={`Me interesa: ${s.titulo}`}
                  >
                    Me interesa
                    <Icono nombre="flecha" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Proceso ───────── */}
        <section id="proceso" className="seccion">
          <div className="contenedor">
            <Encabezamiento
              centrado
              ceja="Cómo trabajamos"
              titulo="De la idea a su página publicada"
              texto="Usted sabe en todo momento en qué etapa va su proyecto, cuánto falta y qué sigue."
            />
            <ol className="relative mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proceso.map((p, i) => (
                <li key={p.titulo} data-revelar style={retraso(i % 3)} className="group relative pl-16">
                  <span className="absolute top-0 left-0 grid h-12 w-12 place-items-center rounded-full border border-electrico-400/40 bg-noche-900 font-mono text-sm font-semibold text-electrico-300 shadow-[0_0_0_6px_var(--color-noche-950)] transition-colors group-hover:bg-electrico-400 group-hover:text-noche-950">
                    {num(i)}
                  </span>
                  {i < proceso.length - 1 && (
                    <span
                      className="absolute top-14 bottom-[-2rem] left-6 w-px bg-gradient-to-b from-electrico-400/50 to-transparent sm:hidden"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="pt-2.5 font-display text-xl font-semibold text-white">{p.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-hielo/70">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Por qué WolfCore ───────── */}
        <section id="porque" className="seccion border-t border-linea bg-noche-900">
          <div className="contenedor">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Encabezamiento
                  ceja="Por qué WolfCore"
                  titulo="Diseño de alto nivel, trato cercano"
                  texto="Como una manada: estrategia, fuerza y trabajo en equipo. Su negocio tiene un equipo que lo conoce y le responde rápido."
                />
                <a href="#contacto" className="boton-primario group mt-8 hidden lg:inline-flex">
                  Hablemos de su negocio
                  <Icono nombre="flecha" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2">
                {pilares.map((p, i) => (
                  <li key={p.titulo} data-revelar style={retraso(i % 2)} className="foco tarjeta p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-electrico-400/10 text-electrico-300 ring-1 ring-electrico-400/25">
                      <Icono nombre={p.icono} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.titulo}</h3>
                    <p className="mt-2 leading-relaxed text-hielo/70">{p.texto}</p>
                  </li>
                ))}
              </ul>
            </div>

            <dl
              data-revelar
              className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-linea bg-linea lg:grid-cols-4"
            >
              {cifras.map((c) => (
                <div key={c.etiqueta} className="flex flex-col-reverse bg-noche-850 px-6 py-8 text-center">
                  <dt className="mt-2 text-sm text-acero">{c.etiqueta}</dt>
                  <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{c.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────── Planes ───────── */}
        <section id="planes" className="seccion">
          <div className="contenedor">
            <Encabezamiento
              centrado
              ceja="Formas de trabajar"
              titulo="Elija cómo quiere trabajar con nosotros"
              texto="Cada negocio es distinto. Por eso cotizamos a la medida, con precio cerrado por escrito antes de empezar."
            />
            <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {modalidades.map((m, i) => (
                <li
                  key={m.titulo}
                  data-revelar
                  style={retraso(i)}
                  className={`foco relative flex flex-col rounded-3xl border p-8 ${
                    m.destacado
                      ? "border-electrico-400/60 bg-gradient-to-b from-noche-700/80 to-noche-850 shadow-[0_20px_60px_-20px_rgb(56_189_248/0.45)] lg:-my-3 lg:py-11"
                      : "border-linea bg-noche-850/70"
                  }`}
                >
                  <span
                    className={`self-start rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                      m.destacado ? "bg-electrico-400 text-noche-950" : "bg-noche-700 text-electrico-200"
                    }`}
                  >
                    {m.etiqueta}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">{m.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-hielo/70">{m.texto}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-linea pt-6">
                    {m.incluye.map((x) => (
                      <li key={x} className="flex gap-3 text-hielo/85">
                        <Icono nombre="check" className="mt-0.5 h-5 w-5 shrink-0 text-electrico-400" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contacto"
                    data-servicio={m.destacado ? servicioPrincipal.titulo : undefined}
                    className={`${m.destacado ? "boton-primario" : "boton-borde"} mt-8 w-full`}
                  >
                    Solicitar cotización
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Preguntas frecuentes ───────── */}
        <section id="preguntas" className="seccion border-t border-linea bg-noche-900">
          <div className="contenedor grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Encabezamiento
                ceja="Preguntas frecuentes"
                titulo="Lo que más nos preguntan"
                texto="¿No encuentra su pregunta? Escríbanos y le respondemos con gusto."
              />
              <a
                href={enlaceWolf()}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-borde mt-8 w-full sm:w-auto"
              >
                <Icono nombre="mensaje" /> Preguntar por {canalWolf}
              </a>
            </div>
            <div className="grid gap-3">
              {preguntas.map((p, i) => (
                <details
                  key={p.pregunta}
                  data-revelar
                  style={retraso(i % 3)}
                  className="group tarjeta overflow-hidden transition-colors open:border-electrico-400/40 open:bg-noche-850"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-display text-lg font-semibold text-white transition-colors hover:text-electrico-200">
                    {p.pregunta}
                    <span className="icono-mas grid h-8 w-8 shrink-0 place-items-center rounded-full border border-linea text-electrico-300 transition-transform duration-300">
                      <Icono nombre="mas" className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-hielo/75">{p.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Contacto ───────── */}
        <section id="contacto" className="seccion relative overflow-hidden border-t border-linea">
          <div
            className="absolute bottom-0 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-electrico-600/20 blur-[130px]"
            aria-hidden="true"
          />
          <div className="contenedor grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <Encabezamiento
                ceja="Contacto"
                titulo="Cuéntenos de su negocio y le mostramos cómo se vería su página"
                texto="Le respondemos con una propuesta concreta y sin compromiso."
              />

              <a
                href={enlaceWolf()}
                target="_blank"
                rel="noopener noreferrer"
                data-revelar
                className="foco group mt-10 flex items-center gap-4 rounded-2xl border border-electrico-400/40 bg-electrico-400/10 p-5 transition-colors hover:bg-electrico-400/15"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-electrico-400 text-noche-950">
                  <Icono nombre="mensaje" className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-white">La forma más rápida</span>
                  <span className="block text-sm text-hielo/75">
                    Envíe “Wolf” por {canalWolf} y le atendemos.
                  </span>
                </span>
                <Icono
                  nombre="flecha"
                  className="h-5 w-5 text-electrico-300 transition-transform group-hover:translate-x-1"
                />
              </a>

              <ul data-revelar className="mt-8 space-y-5 text-hielo/85">
                <li className="flex items-center gap-4">
                  <Icono nombre="mensaje" className="h-6 w-6 shrink-0 text-electrico-400" />
                  <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="hover:text-electrico-300">
                    WhatsApp {empresa.telefono}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Icono nombre="correo" className="h-6 w-6 shrink-0 text-electrico-400" />
                  <a href={`mailto:${empresa.correo}`} className="break-all hover:text-electrico-300">
                    {empresa.correo}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Icono nombre="instagram" className="h-6 w-6 shrink-0 text-electrico-400" />
                  <a href={empresa.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-electrico-300">
                    {empresa.instagramUsuario}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Icono nombre="reloj" className="h-6 w-6 shrink-0 text-electrico-400" />
                  {empresa.horario}
                </li>
                <li className="flex items-center gap-4">
                  <Icono nombre="ubicacion" className="h-6 w-6 shrink-0 text-electrico-400" />
                  Escazú, Santa Ana y Belén · Atención presencial y virtual
                </li>
              </ul>
            </div>
            <div data-revelar style={retraso(1)}>
              <FormularioContacto />
            </div>
          </div>
        </section>
      </main>

      <PiePagina />
      <BotonFlotante />
    </>
  );
}
