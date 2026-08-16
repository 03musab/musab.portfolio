"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: string;
  className?: string;
}

export function GlowText({ children, className }: GlowTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x font-bold",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
