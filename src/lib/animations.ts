export const EASING_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASING = EASING_EDITORIAL;

export const SPRING_TACTILE = {
  type: "spring" as const,
  stiffness: 340,
  damping: 30,
};

/**
 * Subtle elevation micro-interaction for cards.
 */
export const cardHoverProps = {
  whileHover: {
    y: -3,
    transition: { duration: 0.22, ease: EASING_EDITORIAL },
  },
  whileTap: {
    scale: 0.99,
    transition: { duration: 0.1, ease: "easeOut" as const },
  },
};

/**
 * Crisp tactile press/hover feedback for buttons and pill actions.
 */
export const buttonHoverProps = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.18, ease: EASING_EDITORIAL },
  },
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.1, ease: "easeOut" as const },
  },
};
