import { useState } from "react";
import { createGroq } from "@ai-sdk/groq";
import { generateText, generateObject } from "ai";
import { z } from "zod";

export default function CVUploader() {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState(null);
  const [structuredResponse, setStructuredResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const PRIVATE_GROQ_API_KEY = process.env.NEXT_PUBLIC_PRIVATE_GROQ_API_KEY;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toBase64 = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    return `data:${file.type};base64,${base64}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    setLoading(true);

    try {
      // Convertir le fichier en base64
      const base64File = await toBase64(file);

      const attachments = [
        {
          name: file.name,
          contentType: file.type,
          url: base64File,
        },
      ];

      const groq = createGroq({
        apiKey: PRIVATE_GROQ_API_KEY,
      });

      const model = groq("llama-3.2-90b-vision-preview");

      // **Premier appel : Lire et extraire le contenu textuel**
      const { text: extractedText } = await generateText({
        model: model,
        messages: [
          {
            id: new Date().toISOString(),
            role: "user",
            content:
              "Ce fichier est un CV. Trouve et extraits toutes les informations suivantes si elles sont disponibles, surtout si tu n'est pas sûr à plus de 60% n'invente rien et ne complete pas : " +
              "Nom, Prénom, Âge, Date de naissance, Localisation actuelle, Établissement d’enseignement, Diplôme en cours, Année d’étude, Domaines d’étude, Projets académiques, Compétences techniques, Soft skills, Langues parlées, " +
              "Stages ou emplois passés, Implication associative, Hackathons, Domaines d’intérêt, Type de projet recherché, Certifications obtenues, Liens vers portfolio, Publications, Rôles préférés, Disponibilité, Préférences pour outils collaboratifs, " +
              "Domaines de mentorat recherchés, Niveau d’accompagnement attendu, Objectifs concrets pour mentorat, Contacts (email et téléphone).",
            experimental_attachments: attachments,
          },
        ],
      });

      setResponseText(extractedText);

      // **Deuxième appel : Structurer le texte en JSON**
      const structuredData = await generateObject({
        model: model,
        prompt: `Structurer ce texte brut en JSON. Voici le texte brut : "${extractedText}". Retourne un objet JSON avec toutes les informations demandées.`,
        schema: z.object({
          informationsDeBase: z.object({
            nom: z.string().optional(),
            prenom: z.string().optional(),
            age: z.string().optional(),
            dateDeNaissance: z.string().optional(),
            localisation: z.string().optional(),
          }),
          formationAcademique: z.object({
            etablissement: z.string().optional(),
            diplome: z.string().optional(),
            anneeDetude: z.string().optional(),
            domainesDetude: z.string().array().optional(),
            projetsAcademiques: z.string().array().optional(),
          }),
          competences: z.object({
            techniques: z.string().array().optional(),
            softSkills: z.string().array().optional(),
            langues: z.string().array().optional(),
          }),
          experiences: z.object({
            titre: z.string().optional(),
            entreprise: z.string().optional(),
            duree: z.string().optional(),
            missions: z.string().optional(),
          }),
          interets: z.object({
            domaines: z.string().array().optional(),
            projetsRecherches: z.string().array().optional(),
            objectifsCourtTerme: z.string().optional(),
          }),
          realisations: z.object({
            certifications: z.string().array().optional(),
            portfolio: z.string().array().optional(),
            publications: z.string().array().optional(),
          }),
          preferencesCollaboratives: z.object({
            rolesPreferes: z.string().array().optional(),
            disponibilite: z.string().optional(),
            outils: z.string().array().optional(),
          }),
          mentorat: z.object({
            domaines: z.string().array().optional(),
            niveau: z.string().optional(),
            objectifs: z.string().optional(),
          }),
          informationsPratiques: z.object({
            email: z.string().optional(),
            telephone: z.string().optional(),
          }),
        }),
      });

      setStructuredResponse(structuredData);
    } catch (error) {
      console.error("Erreur lors de l’analyse :", error);
      alert("Une erreur est survenue lors de l’analyse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Uploader un CV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Analyse en cours..." : "Envoyer"}
        </button>
      </form>

      {/*responseText && (
        <div>
          <h2>Texte extrait :</h2>
          <p>{responseText}</p>
        </div>
      )*/}

      {structuredResponse && (
        <div>
          <h2>Résultat structuré :</h2>
          <pre>{JSON.stringify(structuredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
