"use client";

import { useAuth } from "../../utils/AuthContext";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";

async function fetchUsersForAdmin(currentUser) {
  const userRef = doc(db, "users", currentUser.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("Document utilisateur introuvable.");
  }

  if (userDoc.data().role !== "admin") {
    throw new Error("Permissions insuffisantes.");
  }

  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default function MatchPage() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUsersForAdmin(user)
        .then((fetchedUsers) => setUsers(fetchedUsers))
        .catch((err) => setError(err.message));
    }
  }, [user]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return (
      <main>
        <h1>Erreur</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <h1>Erreur</h1>
        <p>Utilisateur non connecté.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Liste des utilisateurs</h1>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
