// components/ProfileForm/steps/SkillsStep.js
import React, { useState } from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import styles from "./Steps.module.scss";

const skillLevels = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "expert", label: "Expert" },
];

const SkillsStep = ({ formikProps }) => {
  const { values, errors, touched } = formikProps;
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [error, setError] = useState("");

  const handleAddSkill = (arrayHelpers) => {
    if (!newSkill.trim()) {
      setError("Veuillez entrer un nom de compétence");
      return;
    }

    if (!newLevel) {
      setError("Veuillez sélectionner un niveau");
      return;
    }

    // Vérifier si la compétence existe déjà
    const skillExists = values.skills.some(
      (skill) => skill.name.toLowerCase() === newSkill.toLowerCase()
    );

    if (skillExists) {
      setError("Cette compétence existe déjà dans votre liste");
      return;
    }

    arrayHelpers.push({
      name: newSkill.trim(),
      level: newLevel,
    });

    // Réinitialiser les champs
    setNewSkill("");
    setNewLevel("");
    setError("");
  };

  return (
    <div className={styles.formStep}>
      <h2>Compétences</h2>
      <p className={styles.stepDescription}>
        Ajoutez au moins 3 compétences avec votre niveau pour aider les autres à
        vous trouver pour leurs projets.
      </p>

      <div className={styles.formFields}>
        <FieldArray name="skills">
          {(arrayHelpers) => (
            <>
              <div className={styles.addSkillForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="newSkill">Nouvelle compétence</label>
                    <input
                      type="text"
                      id="newSkill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className={styles.input}
                      placeholder="Ex: React, Photoshop, Gestion de projet..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="newLevel">Niveau</label>
                    <select
                      id="newLevel"
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      className={styles.select}
                    >
                      <option value="">Sélectionnez un niveau</option>
                      {skillLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => handleAddSkill(arrayHelpers)}
                >
                  Ajouter
                </button>

                {error && <div className={styles.error}>{error}</div>}
              </div>

              {errors.skills &&
                touched.skills &&
                typeof errors.skills === "string" && (
                  <div className={styles.error}>{errors.skills}</div>
                )}

              <div className={styles.skillsList}>
                {Array.isArray(values.skills) && values.skills.length === 0 ? (
                  <p className={styles.emptyList}>
                    Aucune compétence ajoutée. Ajoutez au moins 3 compétences.
                  </p>
                ) : (
                  values.skills.map((skill, index) => (
                    <div key={index} className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}</span>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => arrayHelpers.remove(index)}
                        aria-label={`Supprimer la compétence ${skill.name}`}
                      >
                        &times;
                      </button>
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

export default SkillsStep;
