import React from "react";

import styles from "./Example.module.scss";

const Example = () => {
  return (
    <div className={styles.example}>
      <h1 className={styles.title}>Next.js Example Component!</h1>
      <p className={styles.description}>
        This is an example component demonstrating the use of SCSS modules.
      </p>
    </div>
  );
};

export default Example;
