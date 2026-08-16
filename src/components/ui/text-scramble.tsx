"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  children: string;
  className?: string;
  duration?: number;
  speed?: number;
  trigger?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function TextScramble({
  children,
  className,
  duration = 0.8,
  speed = 0.04,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round((duration * 1000) / 30);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * children.length);

      const scrambled = children
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedLength) return children[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(children);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [children, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("inline-block font-mono", className)}
    >
      {displayText}
    </motion.span>
  );
}
