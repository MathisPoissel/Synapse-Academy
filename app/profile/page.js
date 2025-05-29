// app/profile/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/AuthContext";
import { db } from "../../firebase.config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import styles from "./page.module.scss";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultProfile = {
    firstName: "",
    lastName: "",
    photoURL: user?.photoURL || "",
    title: "",
    bio: "",
    education: { school: "", field: "", year: null },
    skills: [], // ← veille à avoir un tableau vide
    interests: [],
    projects: [],
    availability: { days: [], hours: "" },
    location: "",
    links: { github: "", linkedin: "" },
    languages: [],
    isProfileComplete: false,
    createdAt: null,
    updatedAt: null,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!loading && !user) {
        router.push("/login");
        return;
      }

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            // On fusionne toujours avec defaultProfile pour garantir que
            // tous les champs (skills, etc.) existent
            setUserData({
              ...defaultProfile,
              ...userDoc.data(),
            });
          } else {
            // Profil tout neuf, on part du “template”
            setUserData({
              ...defaultProfile,
              createdAt: serverTimestamp(),
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil:", error);
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, loading, router]);

  const handleSaveProfile = async (profileData) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      // Vérifier si le profil est complet selon les critères
      const isProfileComplete = Boolean(
        profileData.firstName &&
          profileData.lastName &&
          profileData.photoURL &&
          profileData.title &&
          profileData.skills.length >= 3
      );

      await setDoc(
        userRef,
        {
          ...profileData,
          isProfileComplete,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Actualiser les données locales
      setUserData({
        ...profileData,
        isProfileComplete,
        updatedAt: new Date(),
      });

      return true;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du profil:", error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement de votre profil...</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.pageHeader}>
          <h1>Mon Profil</h1>
          <p>
            Complétez votre profil pour vous connecter avec d'autres étudiants
            et rejoindre des projets passionnants.
          </p>
        </div>

        {userData && (
          <ProfileForm
            initialValues={{
              ...defaultProfile,
              ...userData,
            }}
            onSave={handleSaveProfile}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
