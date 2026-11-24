import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { empresa, preguntas, sitioUrl } from "@/lib/empresa";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700", "800"], display: "swap" });

const titulo = "WolfCore Systems | Páginas web premium para clínicas y negocios en Escazú y Santa Ana";

export const metadata: Metadata = {
  metadataBase: new URL(sitioUrl),
  title: { default: titulo, template: "%s | WolfCore Systems" },
  description: empresa.descripcion,
  applicationName: empresa.nombre,
  keywords: [
    "diseño web Escazú",
    "páginas web Santa Ana Costa Rica",
    "página web para clínica estética",
    "página web para clínica dental",
    "diseño web inmobiliaria Costa Rica",
    "citas por WhatsApp",
    "páginas web Costa Rica",
    "automatización para clínicas",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "/",
    siteName: empresa.nombre,
    title: titulo,
    description: empresa.lema,
  },
  twitter: { card: "summary_large_image", title: titulo, description: empresa.lema },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#03050b",
  colorScheme: "dark",
};

// Datos estructurados para Google (negocio + preguntas frecuentes)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${sitioUrl}/#empresa`,
      name: empresa.nombre,
      description: empresa.descripcion,
      url: sitioUrl,
      email: empresa.correo,
      areaServed: { "@type": "Country", name: "Costa Rica" },
      address: { "@type": "PostalAddress", addressCountry: "CR" },
      sameAs: [empresa.instagram],
      ...(empresa.whatsapp ? { telephone: `+${empresa.whatsapp}` } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: preguntas.map((p) => ({
        "@type": "Question",
        name: p.pregunta,
        acceptedAnswer: { "@type": "Answer", text: p.respuesta },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript, para activar animaciones sin ocultar contenido si no lo hay */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('wcs-intro'))document.documentElement.classList.add('sin-intro')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
