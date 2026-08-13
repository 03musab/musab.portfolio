"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * Draggable circular "OPEN TO WORK" badge. The text runs around the ring via
 * SVG <textPath>; the whole thing can be dragged around the section.
 */
export default function OpenToWorkBadge() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.06 }}
      className="relative inline-flex cursor-grab select-none active:cursor-grabbing"
      title="Drag me — I'm open to work"
    >
      <div className="absolute -inset-6 opacity-70" aria-hidden="true">
        <svg viewBox="0 0 100 60" className="h-full w-full" fill="none">
          <path
            d="M6 30 C6 16 24 4 50 4 C76 4 94 16 94 30 C94 44 76 56 50 56"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground/40"
          />
          <path
            d="M8 30 C8 18 24 8 50 8 C76 8 92 18 92 30 C92 42 76 52 50 52"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="text-foreground/40"
          />
        </svg>
      </div>

      <div className="relative grid size-40 place-items-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <defs>
            <path
              id="open-to-work-circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
          </defs>
          <text className="fill-foreground/80 font-mono uppercase tracking-[2.5px]" style={{ fontSize: "7.2px" }}>
            <textPath href="#open-to-work-circle" startOffset="0%">
              open to work · open to work ·
            </textPath>
          </text>
        </svg>

        <div className="relative grid size-[5.5rem] place-items-center rounded-full bg-foreground text-background shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]">
          <Sparkles size={22} className="rotate-45" />
        </div>
      </div>
    </motion.div>
  );
}
