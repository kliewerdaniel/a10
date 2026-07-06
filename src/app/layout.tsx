import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientExtras } from "@/components/layout/ClientExtras";
import { Analytics } from "@/components/layout/Analytics";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://danielkliewer.com"),
  title: {
    default: "Daniel Kliewer — Architectures for Computational Sovereignty",
    template: "%s | Daniel Kliewer",
  },
  description: "Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents, and the engineering of AI systems you actually own. By Daniel Kliewer.",
  keywords: ["computational sovereignty", "local-first AI", "cognitive architectures", "memory systems", "knowledge graphs", "autonomous agents", "synthetic intelligence", "Daniel Kliewer", "graph reasoning", "inspectable AI", "sovereign AI"],
  authors: [{ name: "Daniel Kliewer" }],
  creator: "Daniel Kliewer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danielkliewer.com",
    siteName: "Daniel Kliewer",
    title: "Daniel Kliewer — Architectures for Computational Sovereignty",
    description: "Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents, and the engineering of AI systems you actually own.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Kliewer — Architectures for Computational Sovereignty",
    description: "Investigating architectures for local-first intelligence — cognitive memory, graph reasoning, autonomous agents.",
    images: ["/images/og-image.png"],
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
    <html lang="en" data-scroll-behavior="smooth" className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
       
        <script type="text/javascript">
          var _iub = _iub || [];
          _iub.csConfiguration = {"siteId":4597774,"cookiePolicyId":43314476,"lang":"en","storage":{"useSiteId":true}};
          </script>
          <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4597774.js"></script>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js"></script>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-02N9FT7XP5"></script>

        
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5368889366103187" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <ClientExtras />
        <Analytics />
      </body>
    </html>
  );
}
