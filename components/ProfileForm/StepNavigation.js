// components/ProfileForm/StepNavigation.js
import React from "react";
import styles from "./StepNavigation.module.scss";

const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  isSubmitting,
  values,
  errors,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  // Vérifier si l'étape actuelle a des erreurs
  const hasCurrentStepErrors = () => {
    if (currentStep === 0) {
      const hasErrors = Boolean(
        errors.firstName ||
          errors.lastName ||
          errors.photoURL ||
          errors.title ||
          errors.bio
      );

      const isMissingRequiredFields =
        !values.firstName ||
        !values.lastName ||
        !values.photoURL ||
        !values.title;

      return hasErrors || isMissingRequiredFields;
    }
    if (currentStep === 1) {
      return Boolean(errors.education);
    }
    if (currentStep === 2) {
      return Boolean(errors.skills);
    }
    if (currentStep === 3) {
      return Boolean(errors.interests);
    }
    if (currentStep === 4) {
      return Boolean(errors.projects);
    }
    if (currentStep === 5) {
      return Boolean(errors.availability || errors.location);
    }
    if (currentStep === 6) {
      return Boolean(errors.links);
    }
    if (currentStep === 7) {
      return Boolean(errors.languages);
    }
    return false;
  };

  // Vérifier si le formulaire global est valide
  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className={styles.navigation}>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className={styles.buttonGroup}>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onPrev}
            className={styles.prevButton}
            disabled={isSubmitting}
          >
            Précédent
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className={styles.nextButton}
            disabled={isSubmitting || hasCurrentStepErrors()}
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer mon profil"}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
