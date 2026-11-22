"use client";

import Link from "next/link";
import {
  Cinzel,
  Playfair_Display,
  Syne,
} from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useLenis } from "lenis/react";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

const FOOTER_LINKS = [
  { label: "About", href: "/#thesis", sectionId: "thesis" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Journey", href: "/#journey", sectionId: "journey" },
  { label: "Activity", href: "/#github", sectionId: "github" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Privacy", href: "/privacy", sectionId: null },
] as const;

const MUSAB_LETTERS = [
  {
    char: "M",
    className: `${cinzel.className} font-bold tracking-[-0.02em]`,
  },
  {
    char: "U",
    className: `${syne.className} font-extrabold tracking-[-0.04em] scale-y-95 inline-block`,
  },
  {
    char: "S",
    className: "font-editorial italic font-normal tracking-[-0.01em] px-[0.02em]",
  },
  {
    char: "A",
    className: "font-mono font-bold tracking-[-0.05em] scale-95 inline-block",
  },
  {
    char: "B",
    className: `${playfair.className} italic font-bold tracking-[-0.02em]`,
  },
] as const;

/**
 * Interactive Elastic Pluckable SVG Horizon String.
 * Deflects smoothly when the cursor sweeps across it and snaps back
 * with a damped harmonic wave oscillation on release.
 */
function ElasticHorizonString() {
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGGElement>(null);
  const hitRectRef = useRef<DOMRect | null>(null);

  const stateRef = useRef({
    x: 600,
    y: 0,
    vy: 0,
    isDragging: false,
    rafId: 0 as number,
  });

  const applyGeometry = useCallback((qx: number, dy: number) => {
    const d = `M 0 40 Q ${qx.toFixed(1)} ${(40 + dy).toFixed(1)} 1200 40`;
    pathRef.current?.setAttribute("d", d);
    glowPathRef.current?.setAttribute("d", d);
    if (starRef.current) {
      const midX = 0.5 * qx + 300;
      const midY = 40 + dy * 0.5;
      starRef.current.setAttribute(
        "transform",
        `translate(${midX.toFixed(1)}, ${midY.toFixed(1)})`,
      );
    }
  }, []);

  const startReleaseOscillation = useCallback(() => {
    const st = stateRef.current;
    cancelAnimationFrame(st.rafId);

    const step = () => {
      if (st.isDragging) return;
      const force = -0.18 * st.y;
      st.vy = (st.vy + force) * 0.84;
      st.y += st.vy;
      st.x += (600 - st.x) * 0.12;

      if (Math.abs(st.y) < 0.15 && Math.abs(st.vy) < 0.15) {
        st.y = 0;
        st.vy = 0;
        st.x = 600;
        applyGeometry(600, 0);
        return;
      }

      applyGeometry(st.x, st.y);
      st.rafId = requestAnimationFrame(step);
    };

    st.rafId = requestAnimationFrame(step);
  }, [applyGeometry]);

  useEffect(() => {
    const st = stateRef.current;
    return () => cancelAnimationFrame(st.rafId);
  }, []);

  return (
    <div className="section-container relative">
      <div
        onPointerEnter={(e) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
          }
          const st = stateRef.current;
          cancelAnimationFrame(st.rafId);
          st.isDragging = true;
          const rect = e.currentTarget.getBoundingClientRect();
          hitRectRef.current = rect;
          st.x = Math.max(
            80,
            Math.min(1120, ((e.clientX - rect.left) / rect.width) * 1200),
          );
        }}
        onPointerMove={(e) => {
          const st = stateRef.current;
          if (!st.isDragging) return;
          const rect =
            hitRectRef.current ?? e.currentTarget.getBoundingClientRect();
          const normX = Math.max(
            0.06,
            Math.min(0.94, (e.clientX - rect.left) / Math.max(1, rect.width)),
          );
          const relY = e.clientY - (rect.top + rect.height / 2);
          st.x = normX * 1200;
          st.y = Math.max(-34, Math.min(34, relY * 1.35));
          applyGeometry(st.x, st.y);

          if (Math.abs(relY) > 32) {
            st.isDragging = false;
            startReleaseOscillation();
          }
        }}
        onPointerLeave={() => {
          hitRectRef.current = null;
          const st = stateRef.current;
          if (!st.isDragging) return;
          st.isDragging = false;
          startReleaseOscillation();
        }}
        className="group relative flex h-10 w-full cursor-ns-resize items-center"
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none h-16 w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="footer-elastic-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="20%" stopColor="#a5b4fc" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#c4b5fd" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            ref={glowPathRef}
            d="M 0 40 Q 600 40 1200 40"
            fill="none"
            stroke="url(#footer-elastic-gradient)"
            strokeWidth="4"
            className="opacity-45 blur-[3px] transition-opacity duration-300 group-hover:opacity-85"
          />

          <path
            ref={pathRef}
            d="M 0 40 Q 600 40 1200 40"
            fill="none"
            stroke="url(#footer-elastic-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <g ref={starRef} transform="translate(600, 40)">
            <circle
              r="10"
              fill="#1f255a"
              stroke="rgba(125, 211, 252, 0.45)"
              strokeWidth="1"
            />
            <path
              d="M 0 -4.5 L 1.3 -1.3 L 4.5 0 L 1.3 1.3 L 0 4.5 L -1.3 1.3 L -4.5 0 L -1.3 -1.3 Z"
              fill="#7dd3fc"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function SiteFooter() {
  const lenis = useLenis();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkRectRef = useRef<DOMRect | null>(null);
  const spotX = useMotionValue(520);
  const spotY = useMotionValue(80);
  const spotOpacity = useMotionValue(0.75);
  const smoothX = useSpring(spotX, { stiffness: 150, damping: 24 });
  const smoothY = useSpring(spotY, { stiffness: 150, damping: 24 });
  const smoothOpacity = useSpring(spotOpacity, { stiffness: 140, damping: 24 });

  const wordmarkMask = useMotionTemplate`radial-gradient(320px circle at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)`;

  const handleSectionJump = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string | null,
  ) => {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(el, { offset: -24, duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      data-theme="black"
      onPointerEnter={() => {
        if (wordmarkRef.current) {
          wordmarkRectRef.current = wordmarkRef.current.getBoundingClientRect();
        }
      }}
      onPointerMove={(e) => {
        const box =
          wordmarkRectRef.current ??
          wordmarkRef.current?.getBoundingClientRect();
        if (!box) return;
        spotX.set(e.clientX - box.left);
        spotY.set(e.clientY - box.top);
        spotOpacity.set(1);
      }}
      onPointerLeave={() => {
        wordmarkRectRef.current = null;
        spotOpacity.set(0.65);
      }}
      className="relative overflow-hidden bg-gradient-to-b from-[#1d2254] via-[#232b66] to-[#1b2050] pb-6 pt-1 select-none"
    >
      {/* Luminous Twilight Sky-Cyan & Periwinkle Horizon Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 100%, rgba(56, 189, 248, 0.25) 0%, rgba(129, 140, 248, 0.22) 45%, rgba(196, 181, 253, 0.08) 72%, transparent 100%)",
        }}
      />

      {/* 1. Interactive Pluckable Elastic Twilight Horizon String */}
      <ElasticHorizonString />

      {/* 2. Single-Line Editorial Quote & Compact 1-Line Navigation Bar */}
      <div className="section-container relative z-10 mt-2">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-editorial text-xl italic tracking-[-0.01em] text-white/95 drop-shadow-[0_2px_16px_rgba(56,189,248,0.22)] sm:text-2xl">
            &ldquo; Not an average human.&rdquo;
          </p>

          <nav
            aria-label="Footer navigation"
            onPointerLeave={() => setHoveredNav(null)}
            className="no-scrollbar inline-flex max-w-full shrink-0 flex-nowrap items-center gap-0.5 overflow-x-auto whitespace-nowrap rounded-full border border-sky-200/20 bg-white/[0.07] px-1.5 py-1 shadow-[0_12px_36px_rgba(12,14,42,0.35)] backdrop-blur-md"
          >
            {FOOTER_LINKS.map((item) => {
              const isHovered = hoveredNav === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSectionJump(e, item.sectionId)}
                  onPointerEnter={() => setHoveredNav(item.label)}
                  className="relative rounded-full px-2.5 py-1 font-mono text-[10.5px] text-sky-100/85 transition-colors hover:text-white"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="footer-nav-hover-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full border border-sky-300/35 bg-sky-400/20"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3. Giant Mixed-Typography "MUSAB" Wordmark (Each Letter in a Distinct Font, Zero Items Underneath) */}
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="relative mt-5 overflow-hidden py-2 text-center"
        >
          {/* Base Soft Starlight Mixed-Font Wordmark */}
          <div className="flex items-baseline justify-center gap-[0.04em] text-[clamp(4.8rem,16vw,13.5rem)] leading-[0.92]">
            {MUSAB_LETTERS.map((item, idx) => (
              <span
                key={idx}
                className={`${item.className} bg-gradient-to-b from-white/28 via-sky-200/16 to-indigo-200/6 bg-clip-text text-transparent`}
              >
                {item.char}
              </span>
            ))}
          </div>

          {/* Cursor-Tracked Luminous Cyan & Lavender Spotlight Reveal */}
          <motion.div
            style={{
              WebkitMaskImage: wordmarkMask,
              maskImage: wordmarkMask,
              opacity: smoothOpacity,
            }}
            className="pointer-events-none absolute inset-0 py-2 text-center"
          >
            <div className="flex items-baseline justify-center gap-[0.04em] text-[clamp(4.8rem,16vw,13.5rem)] leading-[0.92] drop-shadow-[0_0_28px_rgba(56,189,248,0.34)]">
              {MUSAB_LETTERS.map((item, idx) => (
                <span
                  key={idx}
                  className={`${item.className} bg-gradient-to-r from-[#7dd3fc] via-white to-[#c4b5fd] bg-clip-text text-transparent`}
                >
                  {item.char}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
