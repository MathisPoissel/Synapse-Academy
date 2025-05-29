// components/FeatureCard/FeatureCard.js
import React from "react";
import Image from "next/image";
import styles from "./FeatureCard.module.scss";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconWrapper}>
        <Image
          src={`/icons/${icon}.svg`}
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
