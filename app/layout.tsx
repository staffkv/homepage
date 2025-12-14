import type { Metadata } from "next";
import { Inter, Kanit, Karla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/providers/theme-providers";
import { Footer } from "@/components/footer";
import Script from "next/script";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Kevin Ferreira",
  description: "Engenheiro de Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${karla.variable} antialiased`}
      >
        <ThemeProvider
         attribute='class'
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
        >
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="3a6ca941-026a-45f8-a1b2-623f06b1c804"></Script>
        <Header />
        {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
