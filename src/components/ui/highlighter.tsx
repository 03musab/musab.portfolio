"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface HighlighterProps extends React.HTMLAttributes<HTMLSpanElement> {
  action?: "highlight" | "underline" | "circle" | "box";
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Highlighter({
  action = "highlight",
  color = "#3b82f6",
  className,
  children,
  ...props
}: HighlighterProps) {
  if (action === "underline") {
    return (
      <span
        {...props}
        className={cn(
          "relative inline-block font-semibold text-foreground underline decoration-2 underline-offset-4 transition-colors",
          className
        )}
        style={{
          textDecorationColor: color,
        }}
      >
        {children}
      </span>
    );
  }

  // Default "highlight" effect: glowing semi-transparent background wash with border underline
  return (
    <span
      {...props}
      className={cn(
        "relative inline-block rounded-md px-1.5 py-0.5 font-medium transition-all duration-300 text-foreground",
        className
      )}
      style={{
        backgroundColor: color.startsWith("#") ? `${color}22` : color,
        borderBottom: `2px solid ${color.startsWith("#") ? `${color}aa` : color}`,
      }}
    >
      {children}
    </span>
  );
}
