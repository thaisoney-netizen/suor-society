import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollTracker from "@/components/ScrollTracker";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.suorsociety.com"),
  title: "Suor Society, hybrid running culture page",
  description:
    "A hybrid running culture page for people who run and lift around everything else. Race picks, gear, and the scene.",
  openGraph: {
    type: "website",
    siteName: "Suor Society",
    url: "https://www.suorsociety.com",
    title: "Suor Society, hybrid running culture page",
    description:
      "A hybrid running culture page for people who run and lift around everything else. Race picks, gear, and the scene.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suor Society, hybrid running culture page",
    description:
      "A hybrid running culture page for people who run and lift around everything else. Race picks, gear, and the scene.",
  },
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
      <body style={{ paddingBottom: "60px" }}>
        {children}
        <ScrollTracker />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XG414LX946"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XG414LX946');
          `}
        </Script>
      </body>
    </html>
  );
}
