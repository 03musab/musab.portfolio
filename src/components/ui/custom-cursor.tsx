"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 28, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices or fine pointer missing
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea");
      setIsPointer(!!interactive);

      const labelAttr = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");
      setCursorText(labelAttr || "");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
      }}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <motion.div
        animate={{
          scale: cursorText ? 2.4 : isPointer ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="flex items-center justify-center rounded-full bg-foreground/80 text-background backdrop-blur-md shadow-2xl size-5"
      >
        {cursorText && (
          <span className="font-mono text-[6px] font-bold uppercase tracking-widest text-background">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
