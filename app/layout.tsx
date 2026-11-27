import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";
import { LanguageProvider } from "@/providers/language-provider";
import { Footer } from "@/components/footer";
import { Dock } from "@/components/dock";
import Script from "next/script";
import { GlyphField } from "@/components/glyph-field";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Ferreira",
  description: "Engenheiro de Software",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} noise-backdrop relative min-h-screen overflow-x-clip bg-bg font-sans leading-[1.55] text-ink`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <GlyphField />
            <Script defer src="https://cloud.umami.is/script.js" data-website-id="7799254c-00a1-4a75-8aef-0be742d698bd"></Script>
            <main className="relative z-10 mx-auto max-w-[40rem] px-6 pt-20 pb-32">
              {children}
              <Footer />
            </main>
            <Dock />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
