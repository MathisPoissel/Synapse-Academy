import React from "react";
import Image from "next/image";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.scss";

export default function About() {
  return (
    <>
      <Header />
      <main className={styles.aboutPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>
                À propos de{" "}
                <span className={styles.highlight}>Synapse Academy</span>
              </h1>
              <p>
                La plateforme créée par des étudiants, pour des étudiants. Ici,
                on croit au pouvoir des rencontres et à la force des projets
                collaboratifs.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Mission */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Notre mission</span>
              <h2>Connecter les étudiants autour de projets qui comptent</h2>
              <p>
                Synapse Academy est née d’un constat simple : les idées ne
                manquent pas, mais il est souvent difficile de trouver les
                bonnes personnes avec qui les concrétiser. Notre mission est de
                faciliter les connexions, stimuler la créativité, et créer des
                synergies entre profils variés.
              </p>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className={styles.sectionAlt}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Nos valeurs</span>
              <h2>Ce qui nous guide au quotidien</h2>
            </div>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <h3>Collaboration</h3>
                <p>Parce que c’est ensemble qu’on va plus loin.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Diversité</h3>
                <p>
                  Nous accueillons tous les profils et toutes les disciplines.
                </p>
              </div>
              <div className={styles.valueCard}>
                <h3>Accessibilité</h3>
                <p>
                  Une plateforme simple, intuitive et gratuite pour tous les
                  étudiants.
                </p>
              </div>
              <div className={styles.valueCard}>
                <h3>Bienveillance</h3>
                <p>
                  Un espace sans jugement pour apprendre, tester, se tromper et
                  réussir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* L'Équipe */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>L'équipe</span>
              <h2>Des étudiants comme toi</h2>
              <p>
                Nous sommes une petite équipe d'étudiants passionnés par
                l'entrepreneuriat, la tech, l'éducation et l'impact positif.
                Synapse Academy, c’est notre réponse à un besoin que nous avons
                ressenti nous-mêmes.
              </p>
              <Image
                src="/images/team-illustration.svg"
                alt="Illustration de l'équipe"
                width={700}
                height={350}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
