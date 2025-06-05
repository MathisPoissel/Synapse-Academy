"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

export default function ProjetPage({ params }) {
  const [projet, setProjet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // TODO: Remplacer par l'appel API réel
    const fetchProjet = async () => {
      try {
        // Simulation de données
        const mockProjet = {
          id: params.id,
          nom: "EcoTrack",
          image: "/images/login-illustration.jpg",
          description:
            "EcoTrack est une application web innovante permettant aux utilisateurs de calculer, visualiser et réduire leur empreinte carbone en temps réel, à partir de leurs habitudes de consommation (transport, alimentation, énergie, etc.).L’objectif du projet est de sensibiliser et accompagner les citoyens dans la transition écologique en leur proposant des recommandations personnalisées basées sur leurs données.",
          statut: "En cours",
          createur: {
            nom: "John Doe",
            avatar: "/images/testimonials/mathieu.png",
            id: "123",
          },
          dateCreation: "2024-01-15",
          visibilite: "Public",
          milestones: [
            {
              titre: "Concevoir un prototype UX",
              date: "2025-01-15",
              atteint: true,
            },
            {
              titre: "Présentation finale",
              date: "2025-03-01",
              atteint: false,
            },
          ],
          progression: 75,
          besoins: [
            {
              titre: "Création d'un design system",
              description: "Besoin d'aide pour créer un design system cohérent",
              competences: ["UX Design", "UI Design"],
              disponibilite: "Immédiate",
              statut: "Ouverte",
            },
          ],
          equipe: [
            {
              nom: "Alice Smith",
              role: "Chef de projet",
              avatar: "/images/testimonials/lea.png",
            },
            {
              nom: "Bob Johnson",
              role: "Développeur",
              avatar: "/images/testimonials/thomas.png",
            },
          ],
          budget: "5000€",
          technologies: ["Next.js", "React", "Node.js"],
          partenaires: ["Entreprise A", "Entreprise B"],
          commentaires: [],
        };
        setProjet(mockProjet);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        setLoading(false);
      }
    };

    fetchProjet();
  }, [params.id]);

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!projet) {
    return <div className={styles.error}>Projet non trouvé</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* En-tête du projet */}
        <div className={styles.header}>
          <div className={styles.banner}>
            <Image
              src={projet.image}
              alt={projet.nom}
              width={1200}
              height={400}
              className={styles.bannerImage}
            />
          </div>
          <div className={styles.headerContent}>
            <h1>{projet.nom}</h1>
            <div className={styles.metaInfo}>
              <span className={styles.statut}>{projet.statut}</span>
              <span className={styles.date}>
                Créé le {new Date(projet.dateCreation).toLocaleDateString()}
              </span>
              <span className={styles.visibilite}>{projet.visibilite}</span>
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className={styles.mainContent}>
          <div className={styles.section}>
            <h2>Description</h2>
            <p>{projet.description}</p>
          </div>

          {/* Créateur du projet */}
          <div className={styles.section}>
            <h2>Créateur du projet</h2>
            <Link
              href={`/etudiants/${projet.createur.id}`}
              className={styles.creator}
            >
              <Image
                src={projet.createur.avatar}
                alt={projet.createur.nom}
                width={50}
                height={50}
                className={styles.avatar}
              />
              <span>{projet.createur.nom}</span>
            </Link>
          </div>

          {/* Milestones */}
          <div className={styles.section}>
            <h2>Objectifs et étapes importantes</h2>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${projet.progression}%` }}
              />
              <span>{projet.progression}%</span>
            </div>
            <ul className={styles.milestones}>
              {projet.milestones.map((milestone, index) => (
                <li
                  key={index}
                  className={milestone.atteint ? styles.achieved : ""}
                >
                  {milestone.titre} -{" "}
                  {new Date(milestone.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>

          {/* Besoins d'aide */}
          <div className={styles.section}>
            <h2>Besoins d'aide</h2>
            <div className={styles.besoins}>
              {projet.besoins.map((besoin, index) => (
                <div key={index} className={styles.besoinCard}>
                  <h3>{besoin.titre}</h3>
                  <p>{besoin.description}</p>
                  <div className={styles.besoinMeta}>
                    <span>Compétences: {besoin.competences.join(", ")}</span>
                    <span>Disponibilité: {besoin.disponibilite}</span>
                    <span>Statut: {besoin.statut}</span>
                  </div>
                  <button className={styles.helpButton}>
                    Proposer mon aide
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe */}
          <div className={styles.section}>
            <h2>Équipe</h2>
            <div className={styles.team}>
              {projet.equipe.map((membre, index) => (
                <div key={index} className={styles.teamMember}>
                  <Image
                    src={membre.avatar}
                    alt={membre.nom}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <div className={styles.memberInfo}>
                    <span className={styles.memberName}>{membre.nom}</span>
                    <span className={styles.memberRole}>{membre.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className={styles.section}>
            <h2>Informations complémentaires</h2>
            <div className={styles.additionalInfo}>
              <div className={styles.infoItem}>
                <h3>Budget estimé</h3>
                <p>{projet.budget}</p>
              </div>
              <div className={styles.infoItem}>
                <h3>Technologies</h3>
                <div className={styles.techStack}>
                  {projet.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.infoItem}>
                <h3>Partenaires</h3>
                <div className={styles.partners}>
                  {projet.partenaires.map((partner, index) => (
                    <span key={index} className={styles.partner}>
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Commentaires */}
          <div className={styles.section}>
            <h2>Avis et commentaires</h2>
            <div className={styles.comments}>
              <textarea
                placeholder="Donnez votre avis ou proposez une idée d'amélioration pour le projet..."
                className={styles.commentInput}
              />
              <button className={styles.submitComment}>Publier</button>
            </div>
          </div>

          {/* Bouton de suivi */}
          <div className={styles.followSection}>
            <button
              className={`${styles.followButton} ${
                isFollowing ? styles.following : ""
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing
                ? "Se désinscrire des notifications"
                : "Suivre le projet"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
