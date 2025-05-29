// components/ProfileCompletionBanner/ProfileCompletionBanner.js
import React from "react";
import Link from "next/link";
import styles from "./ProfileCompletionBanner.module.scss";

const ProfileCompletionBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.message}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={styles.icon}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Votre profil n'est pas complet ! Ajoutez vos compétences et
            expériences pour attirer plus de candidatures.
          </span>
        </div>
        <Link href="/profile/edit" className={styles.actionButton}>
          Compléter mon profil
        </Link>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;
