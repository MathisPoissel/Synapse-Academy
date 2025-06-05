"use client";

import { useState } from "react";
import styles from "./page.module.scss";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className={styles.contactMain}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.heroDecoration}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>

          <div className={styles.contactHeader}>
            <h1>Contactez-nous</h1>
            <p>
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter
              pour toute question ou demande d'information.
            </p>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                Nom complet
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subject">
                Sujet
              </label>
              <input
                className={styles.input}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">
                Message
              </label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Envoyer le message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
