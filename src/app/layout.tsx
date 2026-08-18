import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientExtras } from "@/components/layout/ClientExtras";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ConsentProvider, ConsentBanner, ScriptGater, PosthogAnalytics } from "@/components/consent";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const CANONICAL_BASE = 'https://www.danielkliewer.com';

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: {
    default: 'Daniel Kliewer — Sovereign Agent Fleet',
    template: '%s | Daniel Kliewer',
  },
  description: 'A Sovereign Agent Fleet: one frozen governance substrate, exercised across many domains, with zero security invariants depending on model behavior. We compile knowledge into provenanced, inspectable artifacts at build time — not prompts rediscovered on every query.',
  keywords: ['knowledge compilation', 'compile-time AI', 'knowledge engineering', 'scientific knowledge systems', 'semantic infrastructure', 'knowledge representation', 'learning systems', 'local-first AI', 'research automation', 'human-centered AI', 'Daniel Kliewer', 'cognitive tools', 'scientific acceleration', 'knowledge preservation'],
  authors: [{ name: 'Daniel Kliewer' }],
  creator: 'Daniel Kliewer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_BASE,
    siteName: 'Daniel Kliewer',
    title: 'Daniel Kliewer — Sovereign Agent Fleet',
    description: 'A Sovereign Agent Fleet: one frozen governance substrate across many domains, with zero security invariants depending on model behavior.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Kliewer — Sovereign Agent Fleet',
    description: 'Knowledge compilation, compile-time AI, semantic infrastructure, and cognitive tools for understanding human knowledge.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
    <head>
      <Script id="theme-detection" strategy="beforeInteractive">
        {`(function() {
          var t = localStorage.getItem('theme');
          if (t === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();`}
      </Script>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Daniel Kliewer — Sovereign AI Research" href="/feed.xml" />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        <ConsentProvider>
          <ConsentBanner />
          <ScriptGater />
          <PosthogAnalytics />
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <ClientExtras />
          <ScrollReveal />
        </ConsentProvider>
      </body>
    </html>
  );
}
