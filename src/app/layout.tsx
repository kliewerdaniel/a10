import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientExtras } from "@/components/layout/ClientExtras";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Sovereign AI — Your AI. Your Hardware. Your Rules.",
    template: "%s | Sovereign AI",
  },
  description: "Stop renting intelligence. The complete guide to building AI systems that run on your hardware, keep your data private, and answer only to you. By Daniel Kliewer.",
  keywords: ["sovereign AI", "local-first AI", "Ollama", "RAG", "knowledge graphs", "AI agents", "privacy", "data sovereignty", "Daniel Kliewer", "local LLM", "build your own AI"],
  authors: [{ name: "Daniel Kliewer" }],
  creator: "Daniel Kliewer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danielkliewer.com",
    siteName: "Sovereign AI",
    title: "Sovereign AI — Your AI. Your Hardware. Your Rules.",
    description: "Stop renting intelligence. The complete guide to building AI systems that run on your hardware, keep your data private, and answer only to you.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign AI — Your AI. Your Hardware. Your Rules.",
    description: "Stop renting intelligence. The complete guide to building AI systems that run on your hardware.",
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
