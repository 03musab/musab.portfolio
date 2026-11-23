"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { ArrowDown, ExternalLink, FileText } from "lucide-react";
import GlobeVisual from "./GlobeVisual";
import HeroCraftStatement from "./HeroCraftStatement";
import NameStoryReveal from "./NameStoryReveal";
import SendEmailButton from "./SendEmailButton";
import { buttonHoverProps } from "@/lib/animations";
import { SITE } from "@/lib/site";

export default function HeroSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isDesktop = window.innerWidth >= 1024;
        gsap.fromTo(
          "[data-hero-reveal]",
          {
            y: 22,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: isDesktop ? 2.7 : 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
      });

      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <section
      ref={scopeRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-x-clip py-12 lg:py-16"
    >
      <div className="section-container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left — Name Story & Editorial Craft Statement */}
          <div className="space-y-6 lg:col-span-7">
            <NameStoryReveal />

            <HeroCraftStatement />

            <div
              data-hero-reveal
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              <motion.a
                href="#thesis"
                {...buttonHoverProps}
                className="btn-primary group py-2 pl-5 pr-2"
              >
                <span>See what I build</span>
                <span className="btn-lens-orb">
                  <ArrowDown
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </span>
              </motion.a>

              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link group"
              >
                <FileText size={14} className="text-accent" />
                <span>Resume</span>
                <ExternalLink
                  size={12}
                  className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </a>

              <SendEmailButton
                variant="text-link"
                className="font-display text-[13.5px] font-medium"
              />
            </div>
          </div>

          {/* Right — Borderless Interactive Cobe 3D Globe + Opening Origin Sequence */}
          <div className="lg:col-span-5">
            <GlobeVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
