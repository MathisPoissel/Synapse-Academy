// components/ProfileForm/steps/AvailabilityStep.js
import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Steps.module.scss";

const daysOfWeek = [
  { id: "monday", label: "Lundi" },
  { id: "tuesday", label: "Mardi" },
  { id: "wednesday", label: "Mercredi" },
  { id: "thursday", label: "Jeudi" },
  { id: "friday", label: "Vendredi" },
  { id: "saturday", label: "Samedi" },
  { id: "sunday", label: "Dimanche" },
];

const AvailabilityStep = ({ formikProps }) => {
  const { values, errors, touched, setFieldValue } = formikProps;

  const handleDayToggle = (day) => {
    const currentDays = values.availability.days || [];
    if (currentDays.includes(day)) {
      setFieldValue(
        "availability.days",
        currentDays.filter((d) => d !== day)
      );
    } else {
      setFieldValue("availability.days", [...currentDays, day]);
    }
  };

  return (
    <div className={styles.formStep}>
      <h2>Disponibilités & Localisation</h2>
      <p className={styles.stepDescription}>
        Indiquez vos disponibilités et votre localisation pour faciliter la
        coordination avec d'autres étudiants.
      </p>

      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label>Jours de disponibilité</label>
          <div className={styles.daysSelector}>
            {daysOfWeek.map((day) => (
              <button
                key={day.id}
                type="button"
                className={`${styles.dayButton} ${
                  values.availability.days?.includes(day.id)
                    ? styles.dayActive
                    : ""
                }`}
                onClick={() => handleDayToggle(day.id)}
              >
                {day.label}
              </button>
            ))}
          </div>
          {errors.availability?.days && touched.availability?.days && (
            <div className={styles.error}>{errors.availability.days}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="availability.hours">Plages horaires préférées</label>
          <Field
            as="textarea"
            id="availability.hours"
            name="availability.hours"
            className={
              errors.availability?.hours && touched.availability?.hours
                ? styles.textareaError
                : styles.textarea
            }
            placeholder="Ex: Soirées après 18h, week-ends, matinées..."
            rows={2}
          />
          <ErrorMessage
            name="availability.hours"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Localisation</label>
          <Field
            type="text"
            id="location"
            name="location"
            className={
              errors.location && touched.location
                ? styles.inputError
                : styles.input
            }
            placeholder="Ex: Paris, Lyon, À distance..."
          />
          <ErrorMessage
            name="location"
            component="div"
            className={styles.error}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;
