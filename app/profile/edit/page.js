"use client";

import { useAuth } from "../../../utils/AuthContext";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";

export default function EditProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setName(userDoc.data().name || "");
          } else {
            setError("Les données utilisateur n'ont pas été trouvées.");
          }
        } catch (err) {
          setError("Erreur lors du chargement des données utilisateur.");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name });
      setSuccess(true);
    } catch (err) {
      setError("Erreur lors de la mise à jour des données utilisateur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return (
      <main>
        <h1>Erreur</h1>
        <p>Vous devez être connecté pour accéder à cette page.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Modifier le profil</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Données mises à jour avec succès !</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Enregistrer"}
        </button>
      </form>
    </main>
  );
}
