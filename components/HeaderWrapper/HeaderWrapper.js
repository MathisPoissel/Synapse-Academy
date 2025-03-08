"use client";

import React, { useEffect, useState, useRef } from "react";
import { m } from "framer-motion";

const HeaderWrapper = ({
  children,
  scrollThreshold = 300,
  ease = "easeOut",
  duration = 0.5,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  const variants = {
    visible: { y: 0, transition: { ease, duration } },
    hidden: (height) => ({
      y: -height,
      transition: { ease, duration },
    }),
    reveal: (height) => ({
      y: 0,
      transition: { ease, duration },
    }),
  };

  return (
    <m.header
      ref={headerRef}
      initial="visible"
      animate={
        isScrolled
          ? scrollDirection === "down"
            ? "hidden"
            : "reveal"
          : "visible"
      }
      custom={headerRef.current ? headerRef.current.offsetHeight : 0}
      variants={variants}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {children}
    </m.header>
  );
};

export default HeaderWrapper;
