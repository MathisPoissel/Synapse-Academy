"use client";

import { Inter } from "next/font/google";
import { AuthProvider } from "../utils/AuthContext";
import { LazyMotion, domAnimation } from "framer-motion";
import LenisWrapper from "../components/LenisWrapper/LennisWrapper";

import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <AuthProvider>
          <LazyMotion features={domAnimation} strict>
            <LenisWrapper>{children}</LenisWrapper>
          </LazyMotion>
        </AuthProvider>
      </body>
    </html>
  );
}
