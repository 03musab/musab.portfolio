"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress"
      data-theme="black"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
