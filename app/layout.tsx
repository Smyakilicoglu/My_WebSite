import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import CustomCursor from "../components/CustomCursor";
import PageTransition from "../components/PageTransition";
import Footer from "@/components/footer/Footer";
//import AnimatedCopy from "../components/AnimatedTextWrapperProps";
import { ReactNode } from "react";

import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";


export const metadata: Metadata = {
  title: "Sümeyra Kılıçoğlu",
  description: "Kişisel web sitem",
  icons: {
    icon: "/profile.jpg",   // favicon dosyasının yolu
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header her sayfada üstte */}
        <Header />
        
        {/* PageTransition: sayfa değişim animasyonları */}
        <PageTransition>
          {/*<AnimatedCopy> */}
          {children}
          {/*</AnimatedCopy> */}
        </PageTransition>
        <Footer />
        {/* Özel fare */}
        <CustomCursor />
        
      </body>
    </html>
  );
}
