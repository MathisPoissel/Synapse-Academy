// components/ProfileForm/ProfileForm.js
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BasicInfoStep from "./steps/BasicInfoStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import InterestsStep from "./steps/InterestsStep";
import ProjectsStep from "./steps/ProjectsStep";
import AvailabilityStep from "./steps/AvailabilityStep";
import LinksStep from "./steps/LinksStep";
import LanguagesStep from "./steps/LanguagesStep";
import StepNavigation from "./StepNavigation";
import styles from "./ProfileForm.module.scss";

// Schéma de validation Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  photoURL: Yup.string().required("Une photo de profil est requise"),
  title: Yup.string().required("Un titre professionnel est requis"),
  bio: Yup.string(),
  education: Yup.object({
    school: Yup.string(),
    field: Yup.string(),
    year: Yup.number().nullable(),
  }),
  skills: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Le nom de la compétence est requis"),
        level: Yup.string().required("Le niveau est requis"),
      })
    )
    .min(3, "Au moins 3 compétences sont requises"),
  interests: Yup.array().of(Yup.string()),
  projects: Yup.array(),
  availability: Yup.object({
    days: Yup.array().of(Yup.string()),
    hours: Yup.string(),
  }),
  location: Yup.string(),
  links: Yup.object({
    github: Yup.string().url("Veuillez entrer une URL valide"),
    linkedin: Yup.string().url("Veuillez entrer une URL valide"),
  }),
  languages: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Le nom de la langue est requis"),
      level: Yup.string().required("Le niveau est requis"),
    })
  ),
});

const ProfileForm = ({ initialValues, onSave }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const steps = [
    { name: "Informations de base", component: BasicInfoStep },
    { name: "Formation", component: EducationStep },
    { name: "Compétences", component: SkillsStep },
    { name: "Intérêts", component: InterestsStep },
    { name: "Projets & Expériences", component: ProjectsStep },
    { name: "Disponibilités", component: AvailabilityStep },
    { name: "Liens externes", component: LinksStep },
    { name: "Langues", component: LanguagesStep },
  ];

  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSaving(true);
      setSaveSuccess(false);
      setSaveError(false);

      const success = await onSave(values);

      if (success) {
        setSaveSuccess(true);
      } else {
        setSaveError(true);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setSaveError(true);
    } finally {
      setSaving(false);
      setSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className={styles.formContainer}>
      <div className={styles.stepsIndicator}>
        {steps.map((step, index) => (
          <button
            key={index}
            className={`${styles.stepButton} ${
              index === currentStep ? styles.active : ""
            } ${index < currentStep ? styles.completed : ""}`}
            onClick={() => goToStep(index)}
            aria-label={`Aller à l'étape ${step.name}`}
          >
            <span className={styles.stepNumber}>{index + 1}</span>
            <span className={styles.stepName}>{step.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.formStep}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {(formikProps) => (
            <Form>
              <CurrentStepComponent formikProps={formikProps} />

              {saveSuccess && (
                <div className={styles.successMessage}>
                  Votre profil a été enregistré avec succès !
                </div>
              )}

              {saveError && (
                <div className={styles.errorMessage}>
                  Une erreur s'est produite lors de l'enregistrement de votre
                  profil. Veuillez réessayer.
                </div>
              )}

              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onPrev={prevStep}
                onNext={nextStep}
                isSubmitting={formikProps.isSubmitting || saving}
                values={formikProps.values}
                errors={formikProps.errors}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
