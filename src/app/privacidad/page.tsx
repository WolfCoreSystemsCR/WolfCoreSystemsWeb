import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { PiePagina } from "@/components/PiePagina";
import { empresa } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo WolfCore Systems trata los datos personales que recibe por su sitio web.",
  alternates: { canonical: "/privacidad" },
};

// [CONFIRMAR] Revisar este texto con la realidad de la empresa (y, si es posible, con un abogado).
export default function Privacidad() {
  return (
    <>
      <header className="border-b border-linea">
        <div className="contenedor flex h-20 items-center justify-between">
          <a href="/" aria-label="WolfCore Systems, volver al inicio">
            <Logo />
          </a>
          <a href="/" className="boton-borde min-h-11 py-2">
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="contenedor max-w-3xl py-16 sm:py-24">
        <p className="ceja">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">Política de privacidad</h1>
        <p className="mt-3 text-acero">Última actualización: noviembre de 2026</p>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-hielo/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white">
          <section>
            <h2>1. Responsable</h2>
            <p className="mt-3">
              {empresa.nombre} ({empresa.ubicacion}) es responsable de los datos personales que usted nos envía por este
              sitio. Puede contactarnos en{" "}
              <a className="text-electrico-300 underline" href={`mailto:${empresa.correo}`}>
                {empresa.correo}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>2. Qué datos recogemos</h2>
            <p className="mt-3">
              Solo los que usted escribe en el formulario de contacto: nombre, negocio, correo, teléfono y el mensaje.
              No usamos cookies de rastreo ni publicidad.
            </p>
          </section>
          <section>
            <h2>3. Para qué los usamos</h2>
            <p className="mt-3">
              Únicamente para responder su consulta y, si usted lo desea, preparar una propuesta. No vendemos, cedemos ni
              compartimos sus datos con terceros para fines comerciales.
            </p>
          </section>
          <section>
            <h2>4. Sus derechos</h2>
            <p className="mt-3">
              De acuerdo con la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales, usted
              puede pedir en cualquier momento acceder, corregir o eliminar sus datos escribiendo a nuestro correo.
            </p>
          </section>
          <section>
            <h2>5. Conservación y seguridad</h2>
            <p className="mt-3">
              Guardamos los mensajes solo el tiempo necesario para atender su solicitud. Los datos viajan cifrados
              (HTTPS) y se manejan con acceso restringido.
            </p>
          </section>
        </div>
      </main>
      <PiePagina />
    </>
  );
}
