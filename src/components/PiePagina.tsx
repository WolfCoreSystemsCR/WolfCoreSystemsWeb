import { Logo } from "./Logo";
import { Icono } from "./Icono";
import { empresa } from "@/lib/empresa";

const columnas = [
  {
    titulo: "Servicios",
    enlaces: [
      ["Automatización", "/#servicios"],
      ["Chatbots e IA", "/#servicios"],
      ["Apps web y móviles", "/#servicios"],
      ["Páginas web", "/#servicios"],
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      ["Cómo trabajamos", "/#proceso"],
      ["Proyectos", "/#proyectos"],
      ["Planes", "/#planes"],
      ["Preguntas frecuentes", "/#preguntas"],
    ],
  },
];

export function PiePagina() {
  return (
    <footer className="border-t border-linea bg-noche-900">
      <div className="contenedor grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <a href="/" aria-label="WolfCore Systems, inicio">
            <Logo />
          </a>
          <p className="mt-5 max-w-xs leading-relaxed text-acero">{empresa.lema}</p>
          <a
            href={empresa.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de WolfCore Systems"
            className="mt-6 inline-grid h-11 w-11 place-items-center rounded-lg border border-linea text-hielo transition-colors hover:border-electrico-400 hover:text-electrico-300"
          >
            <Icono nombre="instagram" />
          </a>
        </div>

        {columnas.map((c) => (
          <nav key={c.titulo} aria-label={c.titulo}>
            <p className="font-display font-semibold text-white">{c.titulo}</p>
            <ul className="mt-4 space-y-3">
              {c.enlaces.map(([texto, href]) => (
                <li key={texto}>
                  <a href={href} className="text-acero transition-colors hover:text-electrico-300">
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="font-display font-semibold text-white">Contacto</p>
          <ul className="mt-4 space-y-3 text-acero">
            <li>
              <a href={`mailto:${empresa.correo}`} className="break-all transition-colors hover:text-electrico-300">
                {empresa.correo}
              </a>
            </li>
            <li>{empresa.horario}</li>
            <li>{empresa.ubicacion}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-linea">
        <div className="contenedor flex flex-col gap-3 py-6 text-sm text-acero sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {empresa.nombre}. Hecho con orgullo en Costa Rica.
          </p>
          <a href="/privacidad" className="transition-colors hover:text-electrico-300">
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
