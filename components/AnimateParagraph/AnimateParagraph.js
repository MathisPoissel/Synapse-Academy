"use client";

import React, { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import SplitType from "split-type";

import styles from "./AnimateParagraph.module.scss";

const AnimateParagraph = ({
  content,
  duration = 1.3,
  easeOpacity = "easeOut",
  easeTransform = "easeOut",
  type = "lines",
  stagger = 0.1,
  className = "",
}) => {
  const paragraphRef = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (paragraphRef.current) {
      const split = new SplitType(paragraphRef.current, {
        types: type,
        tagName: "span",
      });

      const splitElements = split[type].map((el) => ({
        html: el.outerHTML,
        text: el.textContent,
      }));

      setElements(splitElements);

      // Supprimer le contenu original après division
      paragraphRef.current.innerHTML = "";

      return () => {
        split.revert(); // Cleanup the split on unmount
      };
    }
  }, [type]);

  const animationVariant = {
    hidden: { y: "12px", opacity: 0.00000001 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        y: { duration, ease: easeTransform, delay: i * stagger },
        opacity: { duration, ease: easeOpacity, delay: i * stagger },
      },
    }),
  };

  return (
    <>
      <p ref={paragraphRef} className={styles.refParagraph}>
        {content}
      </p>
      <p className={className}>
        {elements.map((element, index) => (
          <React.Fragment key={index}>
            <m.span
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationVariant}
              style={{ display: "inline-block", overflow: "hidden" }}
              dangerouslySetInnerHTML={{ __html: element.html }}
            />
            {type === "words" && index < elements.length - 1 && " "}
          </React.Fragment>
        ))}
      </p>
    </>
  );
};

export default AnimateParagraph;

/* Exemple d'utilisation */

/*
 <AnimateParagraph
    content="This is a paragraph"   // Choisir le contenu
    duration={0.6}                  // Choisir la durée de l'animation
    easeOpacity="easeOut"           // Choisir le ease de l'opacité (format : "ease" ou format {[0.19, 1, 0.22, 1]})
    easeTransform={[0.19, 1, 0.22, 1]}  // Choisir le ease de du translate (format : "ease" ou format {[0.19, 1, 0.22, 1]})
    type="words"                    // Choisir comment est coupé le paragraphe (lines, words)
    stagger={0.03}                  // Choisir le delai d'animation entre les éléments découpé
    className={styles.animatedParagraph}    // Choisir une class
/>
*/
