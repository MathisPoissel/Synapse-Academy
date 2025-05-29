// utils/AuthContext.js (modification)
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Crée le contexte
const AuthContext = createContext(null);

// Fournisseur du contexte
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = sessionStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userWithProfile = await syncUserWithFirestore(currentUser);
        sessionStorage.setItem("user", JSON.stringify(userWithProfile));
        setUser(userWithProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fonction pour synchroniser l'utilisateur avec Firestore
  const syncUserWithFirestore = async (currentUser) => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);

    let userData = {
      ...currentUser,
      isProfileComplete: false,
    };

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
        isProfileComplete: false,
      });
    } else {
      // Si l'utilisateur existe déjà, on met à jour `lastLoginAt`
      await setDoc(
        userRef,
        { lastLoginAt: serverTimestamp() },
        { merge: true }
      );

      // Récupérer l'état de complétion du profil
      userData = {
        ...currentUser,
        isProfileComplete: userDoc.data().isProfileComplete || false,
      };
    }

    return userData;
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      sessionStorage.removeItem("user");
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}
