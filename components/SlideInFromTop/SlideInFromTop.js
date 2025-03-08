import React from "react";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";

const SlideInFromTop = ({ children }) => {
  return (
    <AnimateOnScroll
      direction="top"
      distance="15px"
      delay={0.45}
      bezierOpacity={[0.19, 1, 0.22, 1]}
      bezierTransform={[0.19, 1, 0.22, 1]}
      triggerMargin="0px 0px -10% 0px"
    >
      {children}
    </AnimateOnScroll>
  );
};

export default SlideInFromTop;
