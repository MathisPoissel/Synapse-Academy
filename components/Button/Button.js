// components/Button/Button.js
import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  href,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return href ? (
    <Link href={href} className={buttonClasses} {...props}>
      {children}
    </Link>
  ) : (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
