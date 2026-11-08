import Image from "next/image";
import lobo from "../../public/img/lobo.png";

/** Logo oficial: cabeza del lobo + nombre en texto (nítido en cualquier tamaño). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Sin marco: los bordes se desvanecen para fundirse con el fondo */}
      <Image
        src={lobo}
        alt=""
        width={64}
        height={64}
        priority
        className="-my-2 h-16 w-16 shrink-0 [mask-image:radial-gradient(circle_at_52%_50%,black_50%,transparent_72%)] sm:h-[4.5rem] sm:w-[4.5rem]"
      />
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-wide text-white sm:text-2xl">
          WOLF<span className="text-electrico-400">CORE</span>
        </span>
        <span className="mt-1.5 block font-mono text-[0.68rem] tracking-[0.5em] text-electrico-300 sm:text-xs">
          SYSTEMS
        </span>
      </span>
    </span>
  );
}
