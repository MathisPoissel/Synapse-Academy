"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";

import styles from "./page.module.scss";

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirection vers le dashboard après connexion réussie
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginContent}>
          <h1>
            Bienvenue sur <span>Synapse Academy</span>
          </h1>

          <p className={styles.subtitle}>
            Connectez-vous pour rejoindre notre communauté d'étudiants
            passionnés et trouver votre prochain projet collaboratif.
          </p>

          <div className={styles.authOptions}>
            <button
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
            >
              <Image
                src="/icons/google-logo.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
              <span>Se connecter avec Google</span>
            </button>

            <div className={styles.divider}>
              <span>ou</span>
            </div>

            {/* Si vous avez d'autres méthodes d'authentification à l'avenir */}
            <p className={styles.comingSoon}>
              D'autres options de connexion seront disponibles prochainement.
            </p>
          </div>

          <div className={styles.termsText}>
            En vous connectant, vous acceptez nos{" "}
            <Link href="/terms">conditions d'utilisation</Link> et notre{" "}
            <Link href="/privacy">politique de confidentialité</Link>.
          </div>
        </div>

        <div className={styles.loginVisual}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/login-illustration.svg"
              alt="Illustration de collaboration entre étudiants"
              fill
              priority
              className={styles.loginImage}
            />
          </div>
          <div className={styles.visualText}>
            <h2>Connectez-vous pour collaborer</h2>
            <p>
              Rejoignez d'autres étudiants passionnés et développez vos
              compétences ensemble.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
