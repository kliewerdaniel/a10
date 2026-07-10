import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientExtras } from "@/components/layout/ClientExtras";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ConsentProvider, ConsentBanner, ScriptGater } from "@/components/consent";
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

const CANONICAL_BASE = 'https://www.danielkliewer.com';

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: {
    default: 'Daniel Kliewer — Architectures for Computational Sovereignty',
    template: '%s | Daniel Kliewer',
  },
  description: 'Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents, and the engineering of AI systems you actually own. By Daniel Kliewer.',
  keywords: ['computational sovereignty', 'local-first AI', 'cognitive architectures', 'memory systems', 'knowledge graphs', 'autonomous agents', 'synthetic intelligence', 'Daniel Kliewer', 'graph reasoning', 'inspectable AI', 'sovereign AI'],
  authors: [{ name: 'Daniel Kliewer' }],
  creator: 'Daniel Kliewer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_BASE,
    siteName: 'Daniel Kliewer',
    title: 'Daniel Kliewer — Architectures for Computational Sovereignty',
    description: 'Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents, and the engineering of AI systems you actually own.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Kliewer — Architectures for Computational Sovereignty',
    description: 'Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents.',
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
    <html lang="en" data-scroll-behavior="smooth" className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <Script id="theme-detection" strategy="beforeInteractive">
          {`(function() {
            var t = localStorage.getItem('theme');
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            }
          })();`}
        </Script>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        <ConsentProvider>
          <ConsentBanner />
          <ScriptGater />
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
