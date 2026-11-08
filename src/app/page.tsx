import { Encabezado } from "@/components/Encabezado";
import { FormularioContacto } from "@/components/FormularioContacto";
import { Icono } from "@/components/Icono";
import { Logo } from "@/components/Logo";
import { PanelAutomatizacion } from "@/components/PanelAutomatizacion";
import {
  cifras,
  empresa,
  enlaceWolf,
  modalidades,
  pilares,
  proceso,
  proyectos,
  servicioPrincipal,
  servicios,
} from "@/lib/empresa";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main>
        {/* ───────── Hero ───────── */}
        <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
          <div className="cuadricula absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
          <div
            className="absolute top-0 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-electrico-600/20 blur-[120px]"
            aria-hidden="true"
          />
          <div className="contenedor">
            <div className="max-w-3xl">
              <p className="ceja mb-6">Automatización · Apps · Sistemas</p>
              <h1 className="font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl">
                <span className="text-electrico-400">_</span> Su negocio no necesita sumar más herramientas.{" "}
                <span className="bg-gradient-to-r from-electrico-200 to-electrico-500 bg-clip-text text-transparent">
                  Necesita un sistema.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-hielo/75">
                En WolfCore Systems creamos automatizaciones, aplicaciones y sistemas a la medida para que su negocio
                trabaje solo, venda más y crezca sin desorden, al mejor precio.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario">
                  <Icono nombre="mensaje" /> Envíe “Wolf” para empezar
                </a>
                <a href="#servicios" className="boton-borde">
                  Ver servicios <Icono nombre="flecha" />
                </a>
              </div>
            </div>

            <div className="mt-16 sm:mt-20">
              <PanelAutomatizacion />
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-linea bg-linea lg:grid-cols-4">
              {cifras.map((c) => (
                <div key={c.etiqueta} className="bg-noche-900 px-6 py-7">
                  <dt className="ceja text-[0.65rem] text-acero">{c.etiqueta}</dt>
                  <dd className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{c.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────── Por qué WolfCore ───────── */}
        <section className="border-t border-linea bg-noche-900 py-24">
          <div className="contenedor grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="ceja mb-4">Por qué WolfCore</p>
              <h2 className="titulo-seccion">Tecnología seria para negocios que quieren crecer</h2>
              <p className="mt-6 text-lg leading-relaxed text-hielo/70">
                Trabajamos con emprendedores y pymes que necesitan orden, velocidad y resultados. Como una manada:
                estrategia, fuerza y trabajo en equipo para que su negocio llegue más lejos.
              </p>
            </div>
            <ol className="grid gap-4">
              {pilares.map((p, i) => (
                <li key={p.titulo} className="tarjeta flex gap-5 p-6">
                  <span className="font-mono text-sm font-semibold text-electrico-400">{num(i)}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{p.titulo}</h3>
                    <p className="mt-2 leading-relaxed text-hielo/70">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Proceso ───────── */}
        <section id="proceso" className="relative py-24">
          <div className="contenedor">
            <div className="mx-auto max-w-2xl text-center">
              <p className="ceja mb-4">Cómo trabajamos</p>
              <h2 className="titulo-seccion">Un proceso claro, de la idea al resultado</h2>
              <p className="mt-5 text-lg text-hielo/70">
                Usted sabe en todo momento en qué etapa va su proyecto y qué sigue.
              </p>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-3">
              {proceso.map((p, i) => (
                <li key={p.titulo} className="group relative bg-noche-900 p-7 transition-colors hover:bg-noche-850">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-electrico-400/40 font-mono text-sm text-electrico-300 transition-colors group-hover:bg-electrico-400 group-hover:text-noche-950">
                      {num(i)}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">{p.titulo}</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-hielo/70">{p.texto}</p>
                  {i === proceso.length - 1 && (
                    <p className="mt-4 font-mono text-xs text-electrico-400">↻ y el ciclo vuelve a empezar</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Servicios ───────── */}
        <section id="servicios" className="border-t border-linea bg-noche-900 py-24">
          <div className="contenedor">
            <div className="max-w-2xl">
              <p className="ceja mb-4">Servicios</p>
              <h2 className="titulo-seccion">Todo lo que su negocio necesita para operar en digital</h2>
            </div>

            <article className="relative mt-12 overflow-hidden rounded-2xl border border-electrico-400/30 bg-gradient-to-br from-noche-800 to-noche-900 p-8 sm:p-10">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-electrico-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="ceja mb-3">Servicio principal</p>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{servicioPrincipal.titulo}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-hielo/75">{servicioPrincipal.texto}</p>
                  <a href="#contacto" className="boton-primario mt-7">
                    Cotizar mi sistema <Icono nombre="flecha" />
                  </a>
                </div>
                <ul className="grid gap-3">
                  {servicioPrincipal.puntos.map((p) => (
                    <li key={p} className="flex gap-3 rounded-lg border border-linea bg-noche-950/50 p-4">
                      <Icono nombre="check" className="mt-0.5 h-5 w-5 shrink-0 text-electrico-400" />
                      <span className="text-hielo/85">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicios.map((s) => (
                <li
                  key={s.titulo}
                  className="tarjeta group flex flex-col p-7 transition-all hover:-translate-y-1 hover:border-electrico-400/50"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-electrico-400/10 text-electrico-300 ring-1 ring-electrico-400/30">
                    <Icono nombre={s.icono} className="h-6 w-6" />
                  </span>
                  <p className="ceja mt-6 text-[0.65rem] text-acero">Servicio</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{s.titulo}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-hielo/70">{s.texto}</p>
                  <a
                    href="#contacto"
                    className="mt-6 inline-flex items-center gap-1.5 font-semibold text-electrico-300 hover:text-electrico-200"
                  >
                    Me interesa <Icono nombre="flecha" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Proyectos ───────── */}
        <section id="proyectos" className="py-24">
          <div className="contenedor">
            <div className="max-w-2xl">
              <p className="ceja mb-4">Proyectos</p>
              <h2 className="titulo-seccion">Resultados reales</h2>
              <p className="mt-5 text-lg text-hielo/70">Algunos de los sistemas que hemos construido.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {proyectos.map((p) => (
                <article key={p.titulo} className="tarjeta overflow-hidden">
                  <div className="cuadricula relative grid h-44 place-items-center border-b border-linea bg-noche-800">
                    <Icono nombre="grafico" className="h-14 w-14 text-electrico-400/80" />
                  </div>
                  <div className="p-7">
                    <p className="ceja text-[0.65rem]">{p.categoria}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{p.titulo}</h3>
                    <p className="mt-3 leading-relaxed text-hielo/70">{p.texto}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.etiquetas.map((t) => (
                        <li key={t} className="rounded-full border border-linea px-3 py-1 font-mono text-xs text-acero">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
              <article className="flex flex-col items-start justify-center rounded-xl border border-dashed border-electrico-400/40 p-8">
                <p className="ceja text-[0.65rem]">Su negocio aquí</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">¿El próximo caso de éxito?</h3>
                <p className="mt-3 leading-relaxed text-hielo/70">
                  Cuéntenos qué le quita tiempo hoy y le mostramos cómo lo resolveríamos.
                </p>
                <a href={enlaceWolf()} target="_blank" rel="noopener noreferrer" className="boton-primario mt-6">
                  <Icono nombre="mensaje" /> Envíe “Wolf”
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ───────── Modalidades ───────── */}
        <section id="modalidades" className="border-t border-linea bg-noche-900 py-24">
          <div className="contenedor">
            <div className="mx-auto max-w-2xl text-center">
              <p className="ceja mb-4">Modalidades</p>
              <h2 className="titulo-seccion">Trabajemos como a usted le funcione</h2>
              <p className="mt-5 text-lg text-hielo/70">
                Un proyecto puntual, soporte mensual o un aliado tecnológico de largo plazo. En todos los casos: trato
                directo, calidad y precio justo.
              </p>
            </div>
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {modalidades.map((m, i) => (
                <li
                  key={m.titulo}
                  className={`rounded-2xl border p-8 ${
                    i === 1
                      ? "border-electrico-400/50 bg-gradient-to-b from-noche-800 to-noche-900 shadow-lg shadow-electrico-500/10"
                      : "border-linea bg-noche-850/60"
                  }`}
                >
                  <p className="ceja text-[0.65rem]">{m.etiqueta}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">{m.titulo}</h3>
                  <p className="mt-4 leading-relaxed text-hielo/70">{m.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Contacto ───────── */}
        <section id="contacto" className="relative overflow-hidden py-24">
          <div
            className="absolute bottom-0 left-1/2 -z-10 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-electrico-600/15 blur-[120px]"
            aria-hidden="true"
          />
          <div className="contenedor grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="ceja mb-4">Contacto</p>
              <h2 className="titulo-seccion">¿Listo para hablar de su proyecto?</h2>
              <p className="mt-6 text-lg leading-relaxed text-hielo/70">
                Cuéntenos sus metas, su presupuesto y sus tiempos. Le respondemos con el siguiente paso concreto, sin
                compromiso.
              </p>
              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={enlaceWolf()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-hielo hover:text-electrico-300"
                  >
                    <Icono nombre="mensaje" className="h-6 w-6 text-electrico-400" />
                    Envíe “Wolf” por {empresa.whatsapp ? "WhatsApp" : "mensaje directo"}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${empresa.correo}`}
                    className="flex items-center gap-3 break-all text-hielo hover:text-electrico-300"
                  >
                    <Icono nombre="correo" className="h-6 w-6 shrink-0 text-electrico-400" />
                    {empresa.correo}
                  </a>
                </li>
                <li>
                  <a
                    href={empresa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-hielo hover:text-electrico-300"
                  >
                    <Icono nombre="instagram" className="h-6 w-6 text-electrico-400" />
                    @wolfcoresystems
                  </a>
                </li>
              </ul>
            </div>
            <FormularioContacto />
          </div>
        </section>
      </main>

      <footer className="border-t border-linea bg-noche-900">
        <div className="contenedor flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-acero">{empresa.lema}</p>
          </div>
          <p className="text-sm text-acero">
            © {new Date().getFullYear()} {empresa.nombre} · {empresa.ubicacion}
          </p>
        </div>
      </footer>
    </>
  );
}
