// components/Header/Header.js
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useRouter } from "next/navigation";

import HeaderWrapper from "../HeaderWrapper/HeaderWrapper";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";
import ProfileCompletionBanner from "../ProfileCompletionBanner/ProfileCompletionBanner";

import styles from "./Header.module.scss";

const Header = () => {
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (loading) return null; // Show nothing or a loader while loading

  // Vérifier si l'utilisateur est connecté et si son profil est incomplet
  const showProfileBanner = user && user.isProfileComplete === false;

  return (
    <>
      {showProfileBanner && <ProfileCompletionBanner />}
      <HeaderWrapper scrollThreshold={300} ease="easeInOut" duration={0.55}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="Logo Student Connect"
                width={120}
                height={40}
                priority
              />
            </Link>
          </div>

          <Navigation
            isAuthenticated={!!user}
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />

          <div className={styles.headerActions}>
            {user ? (
              <>
                <UserProfileIcon />
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                  aria-label="Se déconnecter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span className={styles.logoutText}>Déconnexion</span>
                </button>
              </>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.loginButton}>
                  Connexion
                </Link>
              </div>
            )}

            {/* Hamburger menu for mobile */}
            <button
              className={`${styles.mobileMenuButton} ${
                mobileMenuOpen ? styles.active : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
};

const Navigation = ({ isAuthenticated, mobileMenuOpen, toggleMobileMenu }) => (
  <nav
    className={`${styles.mainNav} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
  >
    <ul>
      <li className={styles.headerLink}>
        <Link href="/" onClick={toggleMobileMenu}>
          Accueil
        </Link>
      </li>
      <li className={styles.headerLink}>
        <Link href="/etudiants" onClick={toggleMobileMenu}>
          Étudiants
        </Link>
      </li>
      <li className={styles.headerLink}>
        <Link href="/projets" onClick={toggleMobileMenu}>
          Projets
        </Link>
      </li>
      {/* {isAuthenticated && (
        <>
          <li className={styles.headerLink}>
            <Link href="/profile" onClick={toggleMobileMenu}>
              Mon Profil
            </Link>
          </li>
          <li className={styles.headerLink}>
            <Link href="/dashboard" onClick={toggleMobileMenu}>
              Dashboard
            </Link>
          </li>
          <li className={styles.headerLink}>
            <Link href="/messages" onClick={toggleMobileMenu}>
              Messages
            </Link>
          </li>
        </>
      )} */}
      <li className={styles.headerLink}>
        <Link href="/a-propos" onClick={toggleMobileMenu}>
          À Propos
        </Link>
      </li>
      <li className={styles.headerLink}>
        <Link href="/contact" onClick={toggleMobileMenu}>
          Contact
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
