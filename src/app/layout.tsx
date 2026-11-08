import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: "WolfCore Systems | Automatización, apps y sistemas a la medida",
  description:
    "Automatización, apps y sistemas para escalar tu negocio al mejor precio. Desarrollo de software a la medida en Costa Rica.",
  openGraph: {
    title: "WolfCore Systems",
    description: "Automatización, apps y sistemas para escalar tu negocio al mejor precio.",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
