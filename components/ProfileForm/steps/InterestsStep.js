// components/ProfileForm/steps/InterestsStep.js
import React, { useState } from "react";
import { FieldArray } from "formik";
import styles from "./Steps.module.scss";

const InterestsStep = ({ formikProps }) => {
  const { values } = formikProps;
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");

  const handleAddInterest = (arrayHelpers) => {
    if (!newInterest.trim()) {
      setError("Veuillez entrer un intérêt ou objectif");
      return;
    }

    // Vérifier si l'intérêt existe déjà
    const interestExists = values.interests.some(
      (interest) => interest.toLowerCase() === newInterest.toLowerCase()
    );

    if (interestExists) {
      setError("Cet intérêt existe déjà dans votre liste");
      return;
    }

    arrayHelpers.push(newInterest.trim());
    setNewInterest("");
    setError("");
  };

  return (
    <div className={styles.formStep}>
      <h2>Intérêts & Objectifs</h2>
      <p className={styles.stepDescription}>
        Partagez vos centres d'intérêt et les types de projets qui vous
        passionnent.
      </p>

      <div className={styles.formFields}>
        <FieldArray name="interests">
          {(arrayHelpers) => (
            <>
              <div className={styles.addInterestForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="newInterest">
                    Ajouter un intérêt ou objectif
                  </label>
                  <div className={styles.inputWithButton}>
                    <input
                      type="text"
                      id="newInterest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      className={styles.input}
                      placeholder="Ex: Développement durable, Intelligence artificielle, UX Design..."
                    />
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => handleAddInterest(arrayHelpers)}
                    >
                      Ajouter
                    </button>
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                </div>

                <div className={styles.interestsList}>
                  {values.interests.length === 0 ? (
                    <p className={styles.emptyList}>
                      Aucun intérêt ajouté. Partagez ce qui vous passionne !
                    </p>
                  ) : (
                    <div className={styles.interestTags}>
                      {values.interests.map((interest, index) => (
                        <div key={index} className={styles.tag}>
                          <span>{interest}</span>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className={styles.removeTag}
                            aria-label={`Supprimer l'intérêt ${interest}`}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default InterestsStep;
