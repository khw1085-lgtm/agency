import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Creative Portfolio | Turnkey & Emotion",
  description: "A showcase of creative projects with web and mobile responsive views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-[#1c1c1c] bg-[#f7f6f2]`}>
        {children}
      </body>
    </html>
  );
}
