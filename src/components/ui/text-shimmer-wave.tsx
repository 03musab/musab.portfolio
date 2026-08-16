"use client";

import { type ElementType } from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type TextShimmerWaveProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  transition?: Transition;
};

export function TextShimmerWave({
  children,
  as: Component = "p",
  className,
  duration = 1.2,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.08,
  rotateYDistance = 10,
  transition,
}: TextShimmerWaveProps) {
  const characters = children.split("");

  return (
    <div className={cn("inline-flex flex-wrap whitespace-pre", className)}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{
            opacity: 0.4,
            y: 0,
            scale: 1,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            y: [0, yDistance, 0],
            x: [0, xDistance, 0],
            scale: [1, scaleDistance, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: (i * 0.05 * spread) % duration,
            ease: "easeInOut",
            ...transition,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
