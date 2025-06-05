import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Button/Button";
import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import FeatureCard from "../components/FeatureCard/FeatureCard";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.scss";

/*export const metadata = {
  title: "Auto complete CV",
  description: "Home page",
};*/

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.homePage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1>
                  Rencontre des étudiants qui partagent
                  <span className={styles.highlight}> ta passion</span> et
                  <span className={styles.highlight}> tes ambitions</span>
                </h1>
                <p>
                  Synapse Academy, la plateforme pour connecter les talents et
                  monter des projets ensemble.
                </p>
                <Button
                  variant="primary"
                  href="/community"
                  aria-label="Découvrir la communauté Synapse Academy"
                >
                  Découvrir la communauté
                </Button>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/hero-illustration.jpg"
                    alt=""
                    width={500}
                    height={500}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroDecoration}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorks}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Fonctionnement</span>
              <h2>Comment ça fonctionne ?</h2>
            </div>
            <div className={styles.columns}>
              <div className={styles.column}>
                <div className={styles.columnHeader}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="/icons/create.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3>Je monte un projet</h3>
                </div>
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>01</span>
                    <p>
                      Décris ton idée : objectif, type de projet, compétences
                      recherchées
                    </p>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>02</span>
                    <p>Crée ta fiche projet</p>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>03</span>
                    <p>
                      Reçois des candidatures ou des messages d'étudiants
                      motivés
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  href="/create-project"
                  aria-label="Créer mon projet sur Synapse Academy"
                >
                  Créer mon projet
                </Button>
              </div>
              <div className={styles.column}>
                <div className={styles.columnHeader}>
                  <div className={styles.iconWrapper} data-type="secondary">
                    <Image
                      src="/icons/search.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3>Je cherche un projet à rejoindre</h3>
                </div>
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>01</span>
                    <p>
                      Explore les projets par thématique, niveau ou type de
                      mission
                    </p>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>02</span>
                    <p>Trouve un projet qui t'inspire</p>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>03</span>
                    <p>Contacte le porteur pour en discuter</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  href="/projects"
                  aria-label="Parcourir les projets disponibles"
                >
                  Parcourir les projets
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Avantages</span>
              <h2>Pourquoi choisir Synapse Academy ?</h2>
            </div>
            <div className={styles.featureGrid}>
              <FeatureCard
                icon="filter"
                title="Rencontres ciblées"
                description="Filtres intelligents pour trouver rapidement étudiants et projets adaptés."
              />
              <FeatureCard
                icon="users-diverse"
                title="Multidisciplinaire"
                description="Profils tech, design, business, impact social, arts créatifs…"
              />
              <FeatureCard
                icon="clock"
                title="Simple et rapide"
                description="Création de profil ou fiche projet en quelques minutes seulement."
              />
              <FeatureCard
                icon="heart"
                title="Ambiance bienveillante"
                description="Communauté d'étudiants motivés, cadre positif, sans jugement."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Témoignages</span>
              <h2>Ceux qui en parlent le mieux !</h2>
            </div>
            <div className={styles.testimonialGrid}>
              <TestimonialCard
                image="/images/testimonials/lea.png"
                name="Léa"
                program="étudiante en design"
                quote="Grâce à Synapse Academy, j'ai pu rejoindre un projet qui correspond parfaitement à mes compétences et mes valeurs."
              />
              <TestimonialCard
                image="/images/testimonials/thomas.png"
                name="Thomas"
                program="étudiant en développement web"
                quote="J'ai pu constituer une équipe pluridisciplinaire en moins d'une semaine pour mon projet de fin d'études."
              />
              <TestimonialCard
                image="/images/testimonials/sarah.png"
                name="Sarah"
                program="étudiante en marketing"
                quote="La plateforme est intuitive et la communauté est vraiment accueillante. Exactement ce dont j'avais besoin !"
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.finalCta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Prêt·e à rencontrer ta future équipe ?</h2>
              <p>
                Inscris-toi gratuitement et connecte-toi à des étudiants qui
                partagent tes envies.
              </p>
              <Button
                variant="primary"
                href="/signup"
                size="large"
                aria-label="S'inscrire sur Synapse Academy"
              >
                S'inscrire
              </Button>
              <div className={styles.ctaBackground}>
                <Image
                  src="/images/cta-background.svg"
                  alt=""
                  width={1000}
                  height={400}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
