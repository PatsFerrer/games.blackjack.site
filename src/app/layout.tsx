import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blackjack Game",
  description: "Play free online blackjack - also called '21' - the classic casino card game of luck and skill!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
