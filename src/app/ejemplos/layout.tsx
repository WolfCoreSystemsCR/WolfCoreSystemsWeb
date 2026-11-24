import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { EfectosPagina } from "@/components/EfectosPagina";

// Son diseños de muestra con marcas ficticias: no deben aparecer en Google.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function LayoutEjemplos({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} min-h-screen`}>
      <EfectosPagina />
      {children}
      <a
        href="/#ejemplos"
        target="_top"
        className="fixed right-4 bottom-4 z-[100] inline-flex items-center gap-2 rounded-full bg-[#03050b]/90 px-3.5 py-2 font-sans text-xs font-semibold text-white shadow-lg ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-[#0284c7]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" aria-hidden="true" />
        Diseño de muestra · WolfCore Systems
      </a>
    </div>
  );
}
