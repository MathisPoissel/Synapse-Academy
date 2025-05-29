// components/ProfileForm/steps/BasicInfoStep.js
import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import Image from "next/image";
import { storage } from "../../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from "./Steps.module.scss";

const BasicInfoStep = ({ formikProps }) => {
  const { values, setFieldValue, errors, touched } = formikProps;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation du type de fichier
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Veuillez sélectionner une image (JPEG, PNG, WebP)");
      return;
    }

    // Validation de la taille du fichier (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 2MB");
      return;
    }

    setIsUploading(true);

    // Utiliser FileReader pour une démo locale au lieu de Firebase Storage
    const reader = new FileReader();
    reader.onload = (event) => {
      // L'URL de données de l'image
      const imageUrl = event.target.result;
      setFieldValue("photoURL", imageUrl);
      setIsUploading(false);
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Valider les champs requis au chargement du composant
    formikProps.validateField("firstName");
    formikProps.validateField("lastName");
    formikProps.validateField("photoURL");
    formikProps.validateField("title");
  }, []);

  return (
    <div className={styles.formStep}>
      <h2>Informations de base</h2>
      <p className={styles.stepDescription}>
        Commencez par renseigner vos informations personnelles pour vous
        présenter à la communauté.
      </p>

      <div className={styles.formFields}>
        <div className={styles.photoUpload}>
          <div className={styles.photoPreview}>
            {values.photoURL ? (
              <Image
                src={values.photoURL}
                alt="Photo de profil"
                width={120}
                height={120}
                className={styles.profilePhoto}
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <span>Photo</span>
              </div>
            )}
          </div>

          <div className={styles.uploadControls}>
            <label className={styles.uploadButton}>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/jpeg, image/png, image/jpg, image/webp"
                disabled={isUploading}
              />
              {isUploading ? "Téléchargement..." : "Choisir une photo"}
            </label>

            {isUploading && (
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            <p className={styles.uploadHint}>JPEG, PNG ou WebP, max 2MB</p>

            {errors.photoURL && touched.photoURL && (
              <div className={styles.error}>{errors.photoURL}</div>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">Prénom *</label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className={
                errors.firstName && touched.firstName
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Votre prénom"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Nom *</label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className={
                errors.lastName && touched.lastName
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Votre nom"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className={styles.error}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Titre professionnel *</label>
          <Field
            type="text"
            id="title"
            name="title"
            className={
              errors.title && touched.title ? styles.inputError : styles.input
            }
            placeholder="Ex: Étudiant en design UX/UI, Développeur web junior..."
          />
          <ErrorMessage name="title" component="div" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio</label>
          <Field
            as="textarea"
            id="bio"
            name="bio"
            className={
              errors.bio && touched.bio ? styles.textareaError : styles.textarea
            }
            placeholder="Parlez de vous, de votre parcours, de vos ambitions..."
            rows={4}
          />
          <ErrorMessage name="bio" component="div" className={styles.error} />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
