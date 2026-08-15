"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="grid size-9 place-items-center rounded-full bg-background/50 text-foreground/70 shadow-sm border border-line/70 backdrop-blur-md"
      >
        <Moon size={15} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-9 place-items-center rounded-full bg-background/50 text-foreground/70 shadow-sm border border-line/70 backdrop-blur-md transition-colors hover:text-foreground"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
