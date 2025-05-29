// components/TestimonialCard/TestimonialCard.js
import React from "react";
import Image from "next/image";
import styles from "./TestimonialCard.module.scss";

const TestimonialCard = ({ image, name, program, quote }) => {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={`Photo de ${name}`}
          width={80}
          height={80}
          className={styles.avatar}
        />
      </div>
      <div className={styles.content}>
        <blockquote>
          <p>"{quote}"</p>
        </blockquote>
        <div className={styles.info}>
          <h3>{name}</h3>
          <span>{program}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
