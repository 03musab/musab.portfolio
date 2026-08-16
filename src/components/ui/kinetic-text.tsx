"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
}

export function KineticText({ text, className, letterClassName }: KineticTextProps) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: -85,
      scale: 0.85,
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("inline-flex flex-wrap items-center select-none perspective-1000", className)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          whileHover={{
            scale: 1.18,
            y: -5,
            transition: { duration: 0.18, ease: "easeOut" },
          }}
          className={cn(
            "inline-block transform-gpu transition-colors duration-200 cursor-default",
            letter === " " ? "w-[0.25em]" : "",
            letterClassName
          )}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
