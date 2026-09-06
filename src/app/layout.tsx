import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollTracker from "@/components/ScrollTracker";
import { SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Suor Society, hybrid training culture for people who don’t train for a living",
    template: "%s",
  },
  description:
    "Hybrid training culture for people who run and lift but don’t train for a living. Races, gear that earns its place, and training that fits the week you have.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt-br",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Suor Society",
    url: SITE_URL,
    title: "Suor Society, hybrid training culture for people who don’t train for a living",
    description:
      "Hybrid training culture for people who run and lift but don’t train for a living. Races, gear that earns its place, and training that fits the week you have.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suor Society, hybrid training culture for people who don’t train for a living",
    description:
      "Hybrid training culture for people who run and lift but don’t train for a living. Races, gear that earns its place, and training that fits the week you have.",
  },
  verification: {
    google: "YDm19JsCu27EgusYeNzYTF9-ztIk8kzRh4eFN2H1j40",
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
        {/*
          GA4 runs in its default state: analytics cookies are set on arrival,
          with no consent gate in front of it. The Consent Mode v2 defaults and
          the cookie bar that used to sit here were removed 2026-08-19 on the
          call that a site this size, with traffic that is overwhelmingly US,
          does not need the extra step. /privacy documents the cookies and
          points to Google's opt-out add-on instead. Putting the gate back means
          restoring the `consent default` script BEFORE gtag.js loads (it has to
          be beforeInteractive) along with a bar that flips analytics_storage.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XG414LX946"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Assigned explicitly because src/lib/analytics.ts calls
            // window.gtag to fire the sign_up / generate_lead / file_download
            // conversion events. The removed consent script used to set it.
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-XG414LX946');
          `}
        </Script>
      </body>
    </html>
  );
}
