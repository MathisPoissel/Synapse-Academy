"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./page.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsRef = collection(db, "users");
        const q = query(studentsRef, where("isPublic", "==", true));
        const querySnapshot = await getDocs(q);
        const studentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Erreur lors de la récupération des étudiants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.studentsPage}>
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>Découvrez</span>
                <h1>Nos Étudiants</h1>
                <p>
                  Explorez les profils de nos étudiants talentueux et trouvez le
                  collaborateur idéal pour vos projets.
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
          <div className={styles.studentsContent}>
            {loading ? (
              <div className={styles.loading}>Chargement des profils...</div>
            ) : students.length === 0 ? (
              <div className={styles.noResults}>
                Aucun profil étudiant public n'est disponible pour le moment.
              </div>
            ) : (
              <div className={styles.studentsGrid}>
                {students.map((student) => (
                  <Link
                    key={student.id}
                    href={`/etudiants/${student.id}`}
                    className={styles.studentCard}
                  >
                    <div className={styles.studentAvatar}>
                      {student.photoURL ? (
                        <Image
                          src={student.photoURL}
                          alt={`${student.firstName} ${student.lastName}`}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {student.firstName?.charAt(0) || ""}
                          {student.lastName?.charAt(0) || ""}
                        </div>
                      )}
                    </div>
                    <h2
                      className={styles.studentName}
                    >{`${student.firstName} ${student.lastName}`}</h2>
                    <p className={styles.studentTitle}>{student.title}</p>

                    {student.skills && student.skills.length > 0 && (
                      <div className={styles.studentSkills}>
                        {student.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className={styles.skillTag}>
                            {skill.name}
                          </span>
                        ))}
                        {student.skills.length > 3 && (
                          <span className={styles.moreSkills}>
                            +{student.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className={styles.viewProfile}>
                      <span>Voir le profil</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentsPage;
