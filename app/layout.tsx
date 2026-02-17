import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CursorGradient } from "@/components/CursorGradient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phùng Tiến Thành | AI Engineer",
  description: "Minimalist AI Engineer Portfolio showcasing Computer Vision and AI expertise",
  icons: {
    icon: "/favicon/3.svg",
  },
  openGraph: {
    title: "Phùng Tiến Thành | AI Engineer",
    description: "Minimalist AI Engineer Portfolio showcasing Computer Vision and AI expertise",
    type: "website",
    url: "/",
    siteName: "PT Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phùng Tiến Thành | AI Engineer",
    description: "Minimalist AI Engineer Portfolio showcasing Computer Vision and AI expertise",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PT Portfolio",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#f8faf6] via-[#f0f5f0] to-[#e8f1eb] text-gray-900`}>
        <Navbar />
        <CursorGradient />
        {children}
      </body>
    </html>
  );
}