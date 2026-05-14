import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollTracker from "./components/ScrollTracker";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suor Society — Hybrid running culture. San Diego.",
  description: "Gear drops, crew runs, race days, coffee stops, and everything in between.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        "--font-bebas": bebasNeue.style.fontFamily,
        "--font-barlow": barlowCondensed.style.fontFamily,
        "--font-inter": inter.style.fontFamily,
        "--font-jetbrains": jetbrainsMono.style.fontFamily,
      } as React.CSSProperties}
    >
      <body>
        {children}
        <ScrollTracker />
      </body>
    </html>
  );
}
