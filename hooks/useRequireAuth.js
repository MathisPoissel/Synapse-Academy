"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./../firebase.config.js";

export default function useRequireAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false); // Fin du chargement une fois que l'utilisateur est authentifié
      }
    });

    return () => unsubscribe(); // Nettoyage
  }, [router]);

  return { loading }; // Retourne l'état de chargement
}
