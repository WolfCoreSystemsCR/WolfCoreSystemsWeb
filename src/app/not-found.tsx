import { Logo } from "@/components/Logo";

export default function NoEncontrado() {
  return (
    <main className="cuadricula grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <Logo className="justify-center" />
        <p className="mt-10 font-display text-7xl font-extrabold text-electrico-400">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Esta página se perdió de la manada</h1>
        <p className="mt-3 text-acero">La dirección no existe o fue movida.</p>
        <a href="/" className="boton-primario mt-8">
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
