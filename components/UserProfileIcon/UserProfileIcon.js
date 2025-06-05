"use client";

import { useAuth } from "../../utils/AuthContext.js";
import { auth, db } from "../../firebase.config.js"; // Assure-toi d'importer db
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link.js";
import styles from "./UserProfileIcon.module.scss";

export default function UserProfileIcon() {
  const { user, loading } = useAuth();
  const [firestoreUser, setFirestoreUser] = useState(null);

  useEffect(() => {
    const fetchFirestoreUser = async () => {
      if (user) {
        // Utilise `user.uid` pour récupérer les données Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setFirestoreUser(userDoc.data());
        } else {
          console.error("Utilisateur introuvable dans Firestore.");
        }
      }
    };

    fetchFirestoreUser();
  }, [user]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Aucun utilisateur connecté.</p>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={user.photoURL} alt="Avatar" />
      <div className={styles.userInfo}>
        <p>{firestoreUser?.name || user.displayName}</p>
        <p className={styles.mail}>{firestoreUser?.email || user.email}</p>
        <p>
          Dernière connexion :{" "}
          {firestoreUser?.lastLoginAt?.toDate().toLocaleString()}
        </p>
        <Link href={"/profile"}>Editer</Link>
      </div>
    </div>
  );
}
