import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollTracker from "@/components/ScrollTracker";
import CookieConsent from "@/components/CookieConsent";
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
    default: "Suor Society, hybrid running culture for people who don’t train for a living",
    template: "%s",
  },
  description:
    "Hybrid running culture for people who run and lift but don’t train for a living. Race picks, gear that earns its place, training that fits the week you have.",
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
    title: "Suor Society, hybrid running culture for people who don’t train for a living",
    description:
      "Hybrid running culture for people who run and lift but don’t train for a living. Race picks, gear that earns its place, training that fits the week you have.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suor Society, hybrid running culture for people who don’t train for a living",
    description:
      "Hybrid running culture for people who run and lift but don’t train for a living. Race picks, gear that earns its place, training that fits the week you have.",
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
        <CookieConsent />
        {/*
          Google Consent Mode v2. This has to run BEFORE gtag.js loads, which is
          why it is beforeInteractive: it is injected into the initial HTML and
          executes ahead of any Next module. Every visitor starts denied, so GA4
          sends cookieless pings and sets no _ga cookie until the consent bar is
          accepted. wait_for_update gives that click a window to land before the
          first hit goes out. A stored "accepted" is replayed here so returning
          visitors are not asked again.
        */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            try {
              if (localStorage.getItem('ss-cookie-consent') === 'accepted') {
                gtag('consent', 'update', { analytics_storage: 'granted' });
              }
            } catch (e) {}
          `}
        </Script>
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
