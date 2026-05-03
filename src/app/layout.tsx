import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackgroundTransition from "@/components/BackgroundTransition";
import ParticleLayer from "@/components/ParticleLayer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Caverna do Estoico",
  description: "Citações estoicas aleatórias de Marco Aurélio, Sêneca e Epicteto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary relative bg-black">
        <BackgroundTransition />
        <ParticleLayer />
        
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 relative z-10 flex flex-col min-h-[80vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
