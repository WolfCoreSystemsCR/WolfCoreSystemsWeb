// Logo temporal en SVG. Reemplazar por el logo oficial (public/img/logo.png) cuando esté disponible.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9 shrink-0">
        <defs>
          <linearGradient id="lobo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#bae6fd" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <path d="M10 8l12 14h20L54 8l-2 26-20 24-20-24z" fill="url(#lobo)" />
        <path d="M22 22h20l-10 17z" fill="#03050b" />
        <circle cx="23" cy="30" r="2.2" fill="#e6f1ff" />
        <circle cx="41" cy="30" r="2.2" fill="#e6f1ff" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-lg font-extrabold tracking-wide text-white">WOLFCORE</span>
        <span className="block font-mono text-[0.6rem] tracking-[0.42em] text-electrico-300">SYSTEMS</span>
      </span>
    </span>
  );
}
