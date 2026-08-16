"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextWave3DProps {
  children: string;
  className?: string;
  amplitude?: number;
  speed?: number;
}

export function TextWave3D({
  children,
  className,
  amplitude = 12,
  speed = 2,
}: TextWave3DProps) {
  const letters = children.split("");

  return (
    <span className={cn("inline-flex flex-wrap whitespace-pre perspective-500", className)}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block origin-bottom"
          animate={{
            y: [0, -amplitude, 0, amplitude, 0],
            rotateX: [0, 15, 0, -15, 0],
            rotateZ: [0, -4, 0, 4, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: index * 0.08,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
