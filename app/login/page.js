"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.config"; // Assure-toi que le chemin est correct
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Utilisateur connecté :", user);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <div>
      <h1>Connexion avec Google</h1>
      <button onClick={handleGoogleLogin}>Connexion avec Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}
