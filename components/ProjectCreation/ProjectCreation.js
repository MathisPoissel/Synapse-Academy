"use client";

import React, { useState } from "react";
import styles from "./ProjectCreation.module.scss";

const ProjectCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    objectives: "",
    description: "",
    domain: "",
    projectType: "",
    status: "",
    progress: "",
    creator: {
      firstName: "",
      formation: "",
      skills: "",
    },
    existingTeam: "",
    peopleNeeded: 0,
    desiredSkills: [],
    engagementType: "",
    technologies: "",
    specificRequirements: "",
    estimatedDuration: "",
    ambitions: "",
    targetAudience: "",
    currentResources: "",
    neededResources: "",
    files: [],
    externalLinks: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      desiredSkills: prev.desiredSkills.includes(skill)
        ? prev.desiredSkills.filter((s) => s !== skill)
        : [...prev.desiredSkills, skill],
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Informations Générales</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Titre du projet</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Résumé du projet</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Objectifs du projet</label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description détaillée</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Domaine / Thématique</label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionnez un domaine</option>
                <option value="technologie">Technologie</option>
                <option value="environnement">Environnement</option>
                <option value="social">Social</option>
                <option value="sante">Santé</option>
                <option value="education">Éducation</option>
                <option value="art">Art</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. État du projet</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Statut actuel</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionnez un statut</option>
                <option value="idee">Idée</option>
                <option value="developpement">En cours de développement</option>
                <option value="prototype">Prototype en test</option>
                <option value="lance">Projet lancé</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Avancement</label>
              <textarea
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Équipe actuelle</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Prénom du créateur</label>
              <input
                type="text"
                name="creator.firstName"
                value={formData.creator.firstName}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Formation</label>
              <input
                type="text"
                name="creator.formation"
                value={formData.creator.formation}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Compétences clés</label>
              <textarea
                name="creator.skills"
                value={formData.creator.skills}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Équipe existante</label>
              <textarea
                name="existingTeam"
                value={formData.existingTeam}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Profils recherchés</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Nombre de personnes recherchées
              </label>
              <input
                type="number"
                name="peopleNeeded"
                value={formData.peopleNeeded}
                onChange={handleInputChange}
                className={styles.input}
                min="0"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Compétences souhaitées</label>
              <div className={styles.checkboxGroup}>
                {[
                  "Développement web/mobile",
                  "Design UI/UX",
                  "Marketing/communication",
                  "Gestion de projet",
                  "Juridique/finance",
                ].map((skill) => (
                  <label key={skill} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.desiredSkills.includes(skill)}
                      onChange={() => handleCheckboxChange(skill)}
                      className={styles.checkbox}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Type d'engagement</label>
              <select
                name="engagementType"
                value={formData.engagementType}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionnez un type d'engagement</option>
                <option value="regulier">Régulier</option>
                <option value="ponctuel">Ponctuel</option>
                <option value="benevolat">Bénévolat</option>
                <option value="finance">Avec financement</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Détails techniques</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Technologies envisagées</label>
              <textarea
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Contraintes ou besoins spécifiques
              </label>
              <textarea
                name="specificRequirements"
                value={formData.specificRequirements}
                onChange={handleInputChange}
                className={styles.textarea}
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Planning estimé</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Durée estimée du projet</label>
              <input
                type="text"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Vision à long terme</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Ambitions du projet</label>
              <select
                name="ambitions"
                value={formData.ambitions}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionnez une ambition</option>
                <option value="startup">Start-up</option>
                <option value="opensource">Open source</option>
                <option value="concours">Concours</option>
                <option value="recherche">Recherche</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Public cible</label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Moyens à disposition</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Ressources actuelles</label>
              <textarea
                name="currentResources"
                value={formData.currentResources}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Besoins matériels ou financiers
              </label>
              <textarea
                name="neededResources"
                value={formData.neededResources}
                onChange={handleInputChange}
                className={styles.textarea}
                required
              />
            </div>
          </div>
        );
      case 9:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Visuels ou documents</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Fichiers (logos, mockups, etc.)
              </label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <p>
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </p>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Liens externes (Notion, Google Drive, etc.)
              </label>
              <input
                type="url"
                name="externalLinks"
                value={formData.externalLinks}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {renderStep()}
        <div className={styles.formGroup}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className={styles.button}
              >
                Précédent
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className={styles.button}
              >
                Suivant
              </button>
            ) : (
              <button type="submit" className={styles.button}>
                Créer le projet
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreation;
