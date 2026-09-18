import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTransition from "@/components/BackgroundTransition";
import ParticleLayer from "@/components/ParticleLayer";
import { ReaderProvider } from "@/lib/reader-store";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Caverna do Estoico — Refúgio de Sabedoria Clássica e Filosofia Prática",
  description: "Reflexões, ensinamentos e práticas estoicas de Marco Aurélio, Sêneca, Epicteto e mestres clássicos para cultivar serenidade, disciplina e clareza mental.",
  keywords: ["estoicismo", "marco aurélio", "sêneca", "epicteto", "filosofia prática", "memento mori", "amor fati", "ansiedade", "disciplina", "livros de estoicismo"],
  authors: [{ name: "Caverna do Estoico" }],
  openGraph: {
    title: "Caverna do Estoico — Um refúgio para cultivar a serenidade",
    description: "Reflexões, ensinamentos e práticas estoicas para viver com mais clareza, disciplina e tranquilidade.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary relative bg-background text-foreground transition-colors duration-300">
        <ReaderProvider>
          <BackgroundTransition />
          <ParticleLayer />
          
          <Navbar />
          <main className="flex-grow relative z-10 flex flex-col">
            {children}
          </main>
          <Footer />
        </ReaderProvider>
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
