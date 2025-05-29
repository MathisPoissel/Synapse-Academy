// components/ProfileForm/steps/LinksStep.js
import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Steps.module.scss";

const LinksStep = ({ formikProps }) => {
  const { errors, touched } = formikProps;

  return (
    <div className={styles.formStep}>
      <h2>Liens Externes</h2>
      <p className={styles.stepDescription}>
        Ajoutez des liens vers vos profils professionnels, portfolio ou réseaux
        sociaux.
      </p>

      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label htmlFor="links.github">
            GitHub
            <span className={styles.optionalTag}>(optionnel)</span>
          </label>
          <div className={styles.inputWithIcon}>
            <Field
              type="text"
              id="links.github"
              name="links.github"
              className={
                errors.links?.github && touched.links?.github
                  ? styles.inputError
                  : styles.input
              }
              placeholder="https://github.com/votre-username"
            />
            <span className={styles.inputIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </span>
          </div>
          <ErrorMessage
            name="links.github"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="links.linkedin">
            LinkedIn
            <span className={styles.optionalTag}>(optionnel)</span>
          </label>
          <div className={styles.inputWithIcon}>
            <Field
              type="text"
              id="links.linkedin"
              name="links.linkedin"
              className={
                errors.links?.linkedin && touched.links?.linkedin
                  ? styles.inputError
                  : styles.input
              }
              placeholder="https://linkedin.com/in/votre-profil"
            />
            <span className={styles.inputIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </span>
          </div>
          <ErrorMessage
            name="links.linkedin"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="links.portfolio">
            Portfolio / Site Personnel
            <span className={styles.optionalTag}>(optionnel)</span>
          </label>
          <div className={styles.inputWithIcon}>
            <Field
              type="text"
              id="links.portfolio"
              name="links.portfolio"
              className={
                errors.links?.portfolio && touched.links?.portfolio
                  ? styles.inputError
                  : styles.input
              }
              placeholder="https://votre-portfolio.com"
            />
            <span className={styles.inputIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>
          </div>
          <ErrorMessage
            name="links.portfolio"
            component="div"
            className={styles.error}
          />
        </div>
      </div>
    </div>
  );
};

export default LinksStep;
