import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SA'HI - Comida com Afeto",
  description: "Sistema de autoatendimento SA'HI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-apple-black text-apple-white">
        <main>{children}</main>
      </body>
    </html>
  );
}
