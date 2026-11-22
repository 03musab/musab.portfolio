"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function KineticHeading({
  as: Tag = "h2",
  text,
  accentWords = [],
  className = "",
}: {
  as?: "h2" | "h3" | "p";
  text: string;
  accentWords?: string[];
  className?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase()));
  const words = text.split(" ");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const wordEls = gsap.utils.toArray<HTMLElement>(
          "[data-kinetic-word]",
          root,
        );
        if (wordEls.length === 0) return;

        gsap.fromTo(
          wordEls,
          {
            yPercent: 68,
            rotateX: -22,
            opacity: 0.14,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 90%",
              end: "top 64%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <Tag
      ref={rootRef as never}
      className={`${className} [perspective:700px]`}
    >
      {words.map((word, idx) => {
        const clean = word.replace(/[.,!?—]/g, "").toLowerCase();
        const isAccent = accentSet.has(clean);
        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <span
              data-kinetic-word
              className={`inline-block origin-bottom ${
                isAccent ? "text-accent" : ""
              }`}
            >
              {word}
              {idx < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
