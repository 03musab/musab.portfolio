import type { Variants } from "motion/react";

/**
 * Custom Apple / Awwwards-grade spring configurations
 */
export const SPRING_ELEGANT = {
  type: "spring" as const,
  stiffness: 160,
  damping: 18,
  mass: 0.6,
};

export const SPRING_BOUNCY = {
  type: "spring" as const,
  stiffness: 300,
  damping: 15,
};

export const EASING_CINEMATIC = [0.16, 1, 0.3, 1] as const;
export const EASING = EASING_CINEMATIC;

/**
 * Text Blur -> Sharp Reveal Variant
 */
export const textBlurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 20,
    scale: 0.98,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: EASING_CINEMATIC,
    },
  }),
};

/**
 * Staggered Wakeup Sequence for Pages/Hero
 */
export const pageWakeupContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const pageWakeupChild: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: EASING_CINEMATIC,
    },
  },
};

/**
 * Standard card hover micro-interaction props
 */
export const cardHoverProps = {
  whileHover: {
    y: -5,
    scale: 1.015,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" as const },
  },
};

/**
 * Standard button hover micro-interaction props
 */
export const buttonHoverProps = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.1, ease: "easeOut" as const },
  },
};

/**
 * Subtle ambient floating motion
 */
export const floatingMotion = {
  animate: {
    y: [0, -8, 0],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};
