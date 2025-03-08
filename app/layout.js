"use client";

import { AuthProvider } from "../utils/AuthContext";
import { LazyMotion, domAnimation } from "framer-motion";

import LenisWrapper from "../components/LenisWrapper/LennisWrapper";

import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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
