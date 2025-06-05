"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Données fictives des projets
const sampleProjects = [
  {
    id: "1",
    title: "Plateforme de Gestion des Stages",
    description:
      "Une application web complète pour gérer les stages des étudiants, du dépôt des offres à l'évaluation finale.",
    image: "/images/placeholder-1.jpg",
    date: "2024",
    status: "completed",
    tags: ["React", "Node.js", "MongoDB", "Firebase"],
  },
  {
    id: "2",
    title: "Application Mobile de Suivi des Cours",
    description:
      "Application mobile permettant aux étudiants de suivre leurs cours, prendre des notes et organiser leur emploi du temps.",
    image: "/images/placeholder-2.jpg",
    date: "2024",
    status: "inProgress",
    tags: ["React Native", "Redux", "Firebase"],
  },
  {
    id: "3",
    title: "Système de Gestion des Ressources",
    description:
      "Plateforme de gestion des ressources pédagogiques et administratives pour les établissements d'enseignement.",
    image: "/images/placeholder-3.jpg",
    date: "2024",
    status: "planned",
    tags: ["Vue.js", "Django", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Portail Étudiant Intégré",
    description:
      "Interface unifiée pour les étudiants regroupant toutes les fonctionnalités essentielles de leur parcours académique.",
    image: "/images/placeholder-4.jpg",
    date: "2024",
    status: "inProgress",
    tags: ["Next.js", "TypeScript", "GraphQL"],
  },
  {
    id: "5",
    title: "Système d'Évaluation en Ligne",
    description:
      "Plateforme d'évaluation et de notation permettant aux enseignants de créer et gérer des examens en ligne.",
    image: "/images/placeholder-5.jpg",
    date: "2024",
    status: "completed",
    tags: ["Angular", "Express", "MongoDB"],
  },
  {
    id: "6",
    title: "Application de Collaboration Étudiante",
    description:
      "Outil de collaboration permettant aux étudiants de travailler ensemble sur des projets et partager des ressources.",
    image: "/images/placeholder-6.jpg",
    date: "2024",
    status: "planned",
    tags: ["React", "Socket.io", "Redis"],
  },
];

const ProjectsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.projectsPage}>
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Découvrez</span>
                <h1>Nos Projets</h1>
                <p>
                  Explorez notre portefeuille de projets innovants développés
                  par nos étudiants talentueux.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.heroDecoration}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.projectsContent}>
            <div className={styles.projectsGrid}>
              {sampleProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projets/${project.id}`}
                  className={styles.projectCard}
                >
                  <div className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectDate}>{project.date}</span>
                    <span
                      className={`${styles.projectStatus} ${
                        styles[project.status]
                      }`}
                    >
                      {project.status === "completed"
                        ? "Terminé"
                        : project.status === "inProgress"
                        ? "En cours"
                        : "Planifié"}
                    </span>
                  </div>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={styles.projectTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.viewProject}>
                    <span>Voir le projet</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
