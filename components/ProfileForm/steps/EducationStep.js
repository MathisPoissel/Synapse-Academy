// components/ProfileForm/steps/EducationStep.js
import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Steps.module.scss";

const EducationStep = ({ formikProps }) => {
  const { errors, touched } = formikProps;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className={styles.formStep}>
      <h2>Formation</h2>
      <p className={styles.stepDescription}>
        Partagez votre parcours académique pour aider les autres étudiants à
        mieux vous connaître.
      </p>

      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label htmlFor="education.school">École / Université</label>
          <Field
            type="text"
            id="education.school"
            name="education.school"
            className={
              errors.education?.school && touched.education?.school
                ? styles.inputError
                : styles.input
            }
            placeholder="Nom de votre établissement"
          />
          <ErrorMessage
            name="education.school"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="education.field">Domaine d'études</label>
          <Field
            type="text"
            id="education.field"
            name="education.field"
            className={
              errors.education?.field && touched.education?.field
                ? styles.inputError
                : styles.input
            }
            placeholder="Ex: Informatique, Design, Marketing..."
          />
          <ErrorMessage
            name="education.field"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="education.year">Année d'études</label>
          <Field
            as="select"
            id="education.year"
            name="education.year"
            className={
              errors.education?.year && touched.education?.year
                ? styles.selectError
                : styles.select
            }
          >
            <option value="">Sélectionnez une année</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="education.year"
            component="div"
            className={styles.error}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationStep;
