"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { db } from "../firebase.config"; // Import correct de Firestore
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"; // Firestore utilities

// Crée le contexte
const AuthContext = createContext(null);

// Fournisseur du contexte
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Synchronise l'utilisateur avec Firestore
        await syncUserWithFirestore(currentUser);
      }
      setUser(currentUser || null);
      setLoading(false); // Charge terminé
    });

    return () => unsubscribe(); // Nettoyage lors du démontage
  }, []);

  // Fonction pour synchroniser l'utilisateur avec Firestore
  const syncUserWithFirestore = async (currentUser) => {
    const userRef = doc(db, "users", currentUser.uid); // Utilisation de db
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Si l'utilisateur n'existe pas dans Firestore, on le crée
      await setDoc(userRef, {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        provider: currentUser.providerData[0]?.providerId || "unknown",
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        role: "user",
      });
    } else {
      // Si l'utilisateur existe déjà, on met à jour `lastLoginAt`
      await setDoc(
        userRef,
        { lastLoginAt: serverTimestamp() },
        { merge: true } // Met à jour uniquement les champs nécessaires
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}
