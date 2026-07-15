import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shomzy.pk | Premium Store",
  description: "Your luxury multi-category store in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} min-h-full flex flex-col font-sans bg-brand-cream dark:bg-brand-black text-brand-black dark:text-brand-cream`}>
        {children}
      </body>
    </html>
  );
}
