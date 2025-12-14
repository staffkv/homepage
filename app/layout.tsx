import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Kanit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/providers/theme-providers";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
        className={`${kanit.variable} antialiased`}
      >
        <ThemeProvider
         attribute='class'
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
        >
        <Header />
        {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
