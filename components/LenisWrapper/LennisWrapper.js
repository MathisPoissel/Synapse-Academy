"use client";
import { ReactLenis, useLenis } from "lenis/react";

export default function LenisWrapper({ children }) {
  useLenis(({ scroll }) => {
    // called every scroll
  });

  return <ReactLenis root>{children}</ReactLenis>;
}
