"use client";

import React from "react";
import { m, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const getAnimation = (direction, distance) => {
  const initial = { opacity: 0.000001 };
  const animate = { opacity: 1 };

  switch (direction) {
    case "top":
      initial.y = `-${distance}`;
      animate.y = 0;
      break;
    case "bottom":
      initial.y = distance;
      animate.y = 0;
      break;
    case "left":
      initial.x = `-${distance}`;
      animate.x = 0;
      break;
    case "right":
      initial.x = distance;
      animate.x = 0;
      break;
    default:
      initial.y = distance;
      animate.y = 0;
  }

  return { initial, animate };
};

const AnimateOnScroll = ({
  children,
  direction = "bottom",
  distance = "50px",
  delay = 0,
  bezierOpacity = [0.42, 0, 0.58, 1],
  bezierTransform = [0.42, 0, 0.58, 1],
  triggerMargin = "0px 0px -15% 0px",
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: triggerMargin,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  const { initial, animate } = getAnimation(direction, distance);

  return (
    <m.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        animate: {
          opacity: 1,
          x: animate.x,
          y: animate.y,
          transition: {
            opacity: { delay, ease: bezierOpacity, duration: 1 },
            x: { delay, ease: bezierTransform, duration: 1 },
            y: { delay, ease: bezierTransform, duration: 1 },
          },
        },
      }}
    >
      {children}
    </m.div>
  );
};

export default AnimateOnScroll;

/* Exemple d'utilisation */

/*
<AnimateOnScroll
    direction="top"  // Choisir la direction (top, right, bottom, left)
    distance="20px"  // Choisir la distance de translation 
    delay={0.35}     // Choisir la durée de l'animation
    bezierOpacity="easeOut"  // Choisir le ease de l'opacité (format : "ease" ou format {[0.19, 1, 0.22, 1]})
    bezierTransform={[0.19, 1, 0.22, 1]}  // Choisir le ease de du translate (format : "ease" ou format {[0.19, 1, 0.22, 1]})
    triggerMargin="0px 0px -15% 0px"   // Choisir la position du triger de l'animation
    >
    <h1>Heading with Custom Bezier</h1> // Contenu enfant
</AnimateOnScroll>
*/
