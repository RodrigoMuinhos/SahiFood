import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SA´HI - FOOD STREET",
  description: "Sistema de autoatendimento SA´HI - FOOD STREET",
  icons: {
    icon: "/logo/mono-logo.png",
    shortcut: "/logo/mono-logo.png",
    apple: "/logo/mono-logo.png",
  },
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
