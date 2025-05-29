// components/ProfileForm/steps/LanguagesStep.js
import React, { useState } from "react";
import { FieldArray } from "formik";
import styles from "./Steps.module.scss";

const languageLevels = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "natif", label: "Natif / Bilingue" },
];

const LanguagesStep = ({ formikProps }) => {
  const { values } = formikProps;
  const [newLanguage, setNewLanguage] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [error, setError] = useState("");

  const handleAddLanguage = (arrayHelpers) => {
    if (!newLanguage.trim()) {
      setError("Veuillez entrer une langue");
      return;
    }

    if (!newLevel) {
      setError("Veuillez sélectionner un niveau");
      return;
    }

    // Vérifier si la langue existe déjà
    const languageExists = values.languages.some(
      (lang) => lang.name.toLowerCase() === newLanguage.toLowerCase()
    );

    if (languageExists) {
      setError("Cette langue existe déjà dans votre liste");
      return;
    }

    arrayHelpers.push({
      name: newLanguage.trim(),
      level: newLevel,
    });

    // Réinitialiser les champs
    setNewLanguage("");
    setNewLevel("");
    setError("");
  };

  return (
    <div className={styles.formStep}>
      <h2>Langues</h2>
      <p className={styles.stepDescription}>
        Indiquez les langues que vous parlez et votre niveau de maîtrise pour
        favoriser la communication.
      </p>

      <div className={styles.formFields}>
        <FieldArray name="languages">
          {(arrayHelpers) => (
            <>
              <div className={styles.addLanguageForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="newLanguage">Langue</label>
                    <input
                      type="text"
                      id="newLanguage"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      className={styles.input}
                      placeholder="Ex: Français, Anglais, Espagnol..."
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
                      {languageLevels.map((level) => (
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
                  onClick={() => handleAddLanguage(arrayHelpers)}
                >
                  Ajouter
                </button>

                {error && <div className={styles.error}>{error}</div>}
              </div>

              <div className={styles.languagesList}>
                {values.languages.length === 0 ? (
                  <p className={styles.emptyList}>
                    Aucune langue ajoutée. Ajoutez les langues que vous parlez
                    et votre niveau.
                  </p>
                ) : (
                  values.languages.map((language, index) => (
                    <div key={index} className={styles.languageItem}>
                      <div className={styles.languageInfo}>
                        <span className={styles.languageName}>
                          {language.name}
                        </span>
                        <span className={styles.languageLevel}>
                          {language.level}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => arrayHelpers.remove(index)}
                        aria-label={`Supprimer la langue ${language.name}`}
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

export default LanguagesStep;
