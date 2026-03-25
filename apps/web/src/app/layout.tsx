import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sem Recaída",
  description: "Supere o término sem recaídas e sem se humilhar. Clareza, dignidade e paz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
