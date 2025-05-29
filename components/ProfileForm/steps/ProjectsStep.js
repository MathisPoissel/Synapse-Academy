// components/ProfileForm/steps/ProjectsStep.js
import React, { useState } from "react";
import { FieldArray } from "formik";
import styles from "./Steps.module.scss";

const ProjectsStep = ({ formikProps }) => {
  const { values } = formikProps;
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    role: "",
    year: "",
  });
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = (arrayHelpers) => {
    if (!newProject.title.trim()) {
      setError("Le titre du projet est requis");
      return;
    }

    if (!newProject.description.trim()) {
      setError("La description du projet est requise");
      return;
    }

    arrayHelpers.push({
      ...newProject,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      role: newProject.role.trim(),
      year: newProject.year || "",
    });

    // Réinitialiser le formulaire
    setNewProject({
      title: "",
      description: "",
      role: "",
      year: "",
    });
    setError("");
  };

  return (
    <div className={styles.formStep}>
      <h2>Projets & Expériences</h2>
      <p className={styles.stepDescription}>
        Partagez vos projets et expériences pour montrer vos réalisations et ce
        que vous avez appris.
      </p>

      <div className={styles.formFields}>
        <FieldArray name="projects">
          {(arrayHelpers) => (
            <>
              <div className={styles.addProjectForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="title">Titre du projet</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Ex: Application de gestion de tâches, Portfolio personnel..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder="Décrivez brièvement le projet, ses objectifs et technologies utilisées..."
                    rows={3}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="role">Votre rôle</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={newProject.role}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ex: Développeur frontend, Chef de projet..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="year">Année</label>
                    <select
                      id="year"
                      name="year"
                      value={newProject.year}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Sélectionnez une année</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                      <option value="En cours">En cours</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => handleAddProject(arrayHelpers)}
                  >
                    Ajouter ce projet
                  </button>
                  {error && <div className={styles.error}>{error}</div>}
                </div>
              </div>

              <div className={styles.projectsList}>
                {values.projects.length === 0 ? (
                  <p className={styles.emptyList}>
                    Aucun projet ajouté. Partagez vos réalisations et
                    expériences!
                  </p>
                ) : (
                  values.projects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                      <div className={styles.projectHeader}>
                        <h3>{project.title}</h3>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => arrayHelpers.remove(index)}
                          aria-label={`Supprimer le projet ${project.title}`}
                        >
                          &times;
                        </button>
                      </div>
                      <p className={styles.projectDescription}>
                        {project.description}
                      </p>
                      <div className={styles.projectMeta}>
                        {project.role && (
                          <span className={styles.projectRole}>
                            {project.role}
                          </span>
                        )}
                        {project.year && (
                          <span className={styles.projectYear}>
                            {project.year}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default ProjectsStep;
