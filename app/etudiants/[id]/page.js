// app/etudiants/[id]/page.js

import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { getProfileById } from "../../../utils/firebaseHelpers";
import Header from "../../../components/Header/Header";

export default async function ProfilePage({ params }) {
  const profile = await getProfileById(params.id);

  if (!profile) {
    // Affiche la page 404 de Next.js
    notFound();
  }

  const {
    firstName,
    lastName,
    photoURL,
    title,
    bio,
    education = {},
    skills = [],
    interests = [],
    projects = [],
    availability = { days: [], hours: "" },
    location = "",
    links = {},
    languages = [],
    isProfileComplete,
  } = profile;

  return (
    <>
      <Header />
      <div className={styles.profilePage}>
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImageWrapper}>
                <Image
                  src={photoURL}
                  alt={`${firstName} ${lastName}`}
                  width={180}
                  height={180}
                  className={styles.profileImage}
                />
                {!isProfileComplete && (
                  <span className={styles.incompleteBadge}>
                    Profil incomplet
                  </span>
                )}
              </div>
              <div className={styles.profileInfo}>
                <h1
                  className={styles.fullName}
                >{`${firstName} ${lastName}`}</h1>
                <p className={styles.title}>{title}</p>

                <div className={styles.profileMeta}>
                  {location && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>📍</span>
                      <span>{location}</span>
                    </div>
                  )}

                  {availability.days.length > 0 && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>🕒</span>
                      <span>
                        {availability.days.join(", ")} • {availability.hours}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.profileLinks}>
                  {links.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="GitHub"
                    >
                      GitHub
                    </a>
                  )}
                  {links.linkedin && (
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="LinkedIn"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroDecoration}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.profileContent}>
            {bio && (
              <section className={styles.bioSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTag}>À propos</span>
                  <h2>Biographie</h2>
                </div>
                <p className={styles.bioText}>{bio}</p>
              </section>
            )}

            <div className={styles.profileColumns}>
              <div className={styles.mainColumn}>
                {projects.length > 0 && (
                  <section className={styles.projectsSection}>
                    <div className={styles.sectionHeader}>
                      <span className={styles.sectionTag}>Réalisations</span>
                      <h2>Projets</h2>
                    </div>
                    <div className={styles.projectsList}>
                      {projects.map((project, i) => (
                        <div key={i} className={styles.projectCard}>
                          <h3 className={styles.projectTitle}>
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.name}
                              </a>
                            ) : (
                              project.name
                            )}
                          </h3>
                          <p className={styles.projectDescription}>
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.school && (
                  <section className={styles.educationSection}>
                    <div className={styles.sectionHeader}>
                      <span className={styles.sectionTag}>Parcours</span>
                      <h2>Formation</h2>
                    </div>
                    <div className={styles.educationCard}>
                      <h3 className={styles.schoolName}>{education.school}</h3>
                      <p className={styles.fieldOfStudy}>{education.field}</p>
                      {education.year && (
                        <p className={styles.graduationYear}>
                          {education.year}
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </div>

              <div className={styles.sideColumn}>
                {skills.length > 0 && (
                  <section className={styles.skillsSection}>
                    <div className={styles.sectionHeader}>
                      <h2>Compétences</h2>
                    </div>
                    <div className={styles.skillsList}>
                      {skills.map((skill, i) => (
                        <div key={i} className={styles.skillTag}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {languages.length > 0 && (
                  <section className={styles.languagesSection}>
                    <div className={styles.sectionHeader}>
                      <h2>Langues</h2>
                    </div>
                    <div className={styles.languagesList}>
                      {languages.map((lang, i) => (
                        <div key={i} className={styles.languageItem}>
                          <span className={styles.languageName}>
                            {lang.name}
                          </span>
                          <div className={styles.languageLevel}>
                            <div
                              className={styles.languageLevelBar}
                              style={{
                                width:
                                  lang.level === "débutant"
                                    ? "25%"
                                    : lang.level === "intermédiaire"
                                    ? "50%"
                                    : lang.level === "avancé"
                                    ? "75%"
                                    : "100%",
                              }}
                            />
                          </div>
                          <span className={styles.languageLevelText}>
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {interests.length > 0 && (
                  <section className={styles.interestsSection}>
                    <div className={styles.sectionHeader}>
                      <h2>Centres d'intérêt</h2>
                    </div>
                    <div className={styles.interestsList}>
                      {interests.map((interest, i) => (
                        <span key={i} className={styles.interestTag}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
