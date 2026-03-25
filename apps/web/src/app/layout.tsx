import type { Metadata } from "next";
import "./globals.css";
import { Particles } from "@/components/shared/Particles";

export const metadata: Metadata = {
  title: "Sem Recaída — Clareza, Dignidade e Paz",
  description: "Supere o término sem recaídas e sem se humilhar. Seu companheiro de reconstrução emocional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <Particles />
        {children}
      </body>
    </html>
  );
}
