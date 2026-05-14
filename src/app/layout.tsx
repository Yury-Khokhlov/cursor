import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioPlayerShell } from "@/components/AudioPlayerShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product thesis — Yury / Cursor",
  description:
    "An application in the form of a product thesis: fork the user experience, not the mission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AudioPlayerShell>{children}</AudioPlayerShell>
      </body>
    </html>
  );
}
