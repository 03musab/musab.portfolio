"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function AnimatedBorderButton({
  children,
  className,
  glowColor = "rgba(16, 185, 129, 0.4)",
  onClick,
  ...props
}: AnimatedBorderButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative group inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none",
        className
      )}
      {...(props as any)}
    >
      {/* Animated rotating border gradient */}
      <span
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, #3b82f6 0%, #10b981 50%, #8b5cf6 100%)`,
        }}
      />

      {/* Inner background content box */}
      <span className="inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-background px-5 py-2.5 text-foreground backdrop-blur-3xl transition-colors group-hover:bg-surface">
        {children}
      </span>
    </motion.button>
  );
}
