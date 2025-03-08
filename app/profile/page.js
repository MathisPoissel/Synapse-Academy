"use client";

import { useState, useEffect } from "react";

import LocationField from "../../components/FormComponents/LocationField/LocationField";
import CVUploader from "../../components/FormComponents/CVUploader/CVUploader";

import "./page.scss";
/*export const metadata = {
  title: "Auto complete CV",
  description: "Home page",
};*/

export default function profile() {
  // State to manage form steps
  const [step, setStep] = useState(1);

  // State to store form data
  const [formData, setFormData] = useState({
    cv: null,
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    location: "",
    institution: "",
    degree: "",
    year: "",
    field: "",
    technicalSkills: [],
    softSkills: [],
    languages: [],
    experienceTitle: "",
    organization: "",
    startDate: "",
    endDate: "",
    experienceDescription: "",
    interests: [],
    projectType: [],
    objective: "",
    portfolioLink: "",
    additionalFiles: [],
  });

  // Handle file uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle next and previous steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <main className="form-container">
      <h1 className="form-title">AutoComplete CV</h1>

      {/* Step Progress */}
      <div className="progress-bar">
        <span className="progress-step">{step} sur 6</span>
      </div>

      {/* Steps */}
      {step === 1 && (
        <section className="form-step">
          <h2 className="form-step-title">
            Étape 1 : Téléchargement du CV (Facultatif)
          </h2>
          <CVUploader />
          <button className="btn-next" onClick={nextStep}>
            Suivant
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="form-step">
          <h2 className="form-step-title">Étape 2 : Informations de base</h2>
          <input
            className="input-text"
            type="text"
            name="fullName"
            placeholder="Nom complet"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label>Date de naissance</label>
          <input
            className="input-text"
            type="date"
            name="birthDate"
            placeholder="Date de naissance"
            value={formData.birthDate}
            onChange={handleChange}
          />
          <LocationField />
          <div className="form-buttons">
            <button className="btn-prev" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn-next" onClick={nextStep}>
              Suivant
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="form-step">
          <h2 className="form-step-title">Étape 3 : Formation académique</h2>
          <input
            className="input-text"
            type="text"
            name="institution"
            placeholder="Établissement"
            value={formData.institution}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input-text"
            name="degree"
            placeholder="Diplôme en cours"
            value={formData.degree}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input-text"
            name="year"
            placeholder="Année d'étude"
            value={formData.year}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input-text"
            name="field"
            placeholder="Domaine principal"
            value={formData.field}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button className="btn-prev" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn-next" onClick={nextStep}>
              Suivant
            </button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="form-step">
          <h2 className="form-step-title">
            Étape 4 : Compétences et expertises
          </h2>
          <input
            type="text"
            className="input-text"
            name="technicalSkills"
            placeholder="Compétences techniques (séparées par des virgules)"
            value={formData.technicalSkills}
            onChange={(e) =>
              setFormData({
                ...formData,
                technicalSkills: e.target.value.split(","),
              })
            }
          />
          <input
            type="text"
            className="input-text"
            name="softSkills"
            placeholder="Soft skills (séparées par des virgules)"
            value={formData.softSkills}
            onChange={(e) =>
              setFormData({
                ...formData,
                softSkills: e.target.value.split(","),
              })
            }
          />
          <input
            type="text"
            className="input-text"
            name="languages"
            placeholder="Langues parlées (séparées par des virgules)"
            value={formData.languages}
            onChange={(e) =>
              setFormData({ ...formData, languages: e.target.value.split(",") })
            }
          />
          <div className="form-buttons">
            <button className="btn-prev" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn-next" onClick={nextStep}>
              Suivant
            </button>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="form-step">
          <h2 className="form-step-title">
            Étape 5 : Expériences professionnelles ou associatives
          </h2>
          <input
            type="text"
            className="input-text"
            name="experienceTitle"
            placeholder="Titre de l'expérience"
            value={formData.experienceTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            className="input-text"
            name="organization"
            placeholder="Organisation"
            value={formData.organization}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="date"
            name="startDate"
            placeholder="Date de début"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="date"
            name="endDate"
            placeholder="Date de fin"
            value={formData.endDate}
            onChange={handleChange}
          />
          <textarea
            className="input-text"
            name="experienceDescription"
            placeholder="Description des missions"
            value={formData.experienceDescription}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button className="btn-prev" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn-next" onClick={nextStep}>
              Suivant
            </button>
          </div>
        </section>
      )}

      {step === 6 && (
        <section className="form-step">
          <h2 className="form-step-title">
            Étape 6 : Intérêts et objectifs personnels
          </h2>
          <input
            type="text"
            className="input-text"
            name="interests"
            placeholder="Domaines d'intérêt (séparés par des virgules)"
            value={formData.interests}
            onChange={(e) =>
              setFormData({ ...formData, interests: e.target.value.split(",") })
            }
          />
          <input
            type="text"
            className="input-text"
            name="projectType"
            placeholder="Type de projet recherché (séparés par des virgules)"
            value={formData.projectType}
            onChange={(e) =>
              setFormData({
                ...formData,
                projectType: e.target.value.split(","),
              })
            }
          />
          <input
            type="text"
            className="input-text"
            name="objective"
            placeholder="Objectif principal"
            value={formData.objective}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button className="btn-prev" onClick={prevStep}>
              Précédent
            </button>
            <button
              className="btn-complete"
              onClick={() => alert("Formulaire complété !")}
            >
              Soumettre
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
