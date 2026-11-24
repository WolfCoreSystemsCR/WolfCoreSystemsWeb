import Image from "next/image";
import lobo from "../../public/img/lobo-nav-96.png";

/** Logo: lobo nítido (reducido desde el original, sin recomprimir) + nombre alineado al centro. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={lobo}
        alt=""
        width={40}
        height={40}
        priority
        unoptimized
        className="block h-10 w-10 shrink-0 [mask-image:radial-gradient(circle_at_52%_50%,black_56%,transparent_72%)]"
      />
      <span className="font-display text-lg leading-none font-extrabold tracking-wide text-white">
        WOLF<span className="text-electrico-400">CORE</span>
      </span>
    </span>
  );
}
