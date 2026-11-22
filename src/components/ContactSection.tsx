"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import ContactCharacterVideoBackdrop from "@/components/ContactCharacterVideoBackdrop";
import SendEmailButton from "@/components/SendEmailButton";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const IST_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

let currentIstSnapshot = "";
const istListeners = new Set<() => void>();
let istTimer: ReturnType<typeof setInterval> | null = null;

function refreshIstTime() {
  const next = IST_FORMATTER.format(new Date()).toUpperCase();
  if (next !== currentIstSnapshot) {
    currentIstSnapshot = next;
    istListeners.forEach((listener) => listener());
  }
}

function subscribeMumbaiTime(callback: () => void) {
  istListeners.add(callback);
  if (istTimer === null) {
    refreshIstTime();
    istTimer = setInterval(refreshIstTime, 15_000);
  }
  return () => {
    istListeners.delete(callback);
    if (istListeners.size === 0 && istTimer !== null) {
      clearInterval(istTimer);
      istTimer = null;
    }
  };
}

function getMumbaiTimeSnapshot(): string {
  if (!currentIstSnapshot && typeof window !== "undefined") {
    currentIstSnapshot = IST_FORMATTER.format(new Date()).toUpperCase();
  }
  return currentIstSnapshot;
}

function getMumbaiTimeServerSnapshot(): string {
  return "";
}

function MagneticAction({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });
  const rectRef = useRef<DOMRect | null>(null);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onPointerEnter={(e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
        x.set(Math.max(-4.5, Math.min(4.5, dx)));
        y.set(Math.max(-4.5, Math.min(4.5, dy)));
      }}
      onPointerLeave={() => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionRectRef = useRef<DOMRect | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const mumbaiTime = useSyncExternalStore(
    subscribeMumbaiTime,
    getMumbaiTimeSnapshot,
    getMumbaiTimeServerSnapshot,
  );

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotOpacity = useMotionValue(0);
  const smoothX = useSpring(spotX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(spotY, { stiffness: 120, damping: 24 });
  const smoothOpacity = useSpring(spotOpacity, { stiffness: 140, damping: 24 });
  const spotlightBg = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(129, 140, 248, 0.16), transparent 72%)`;

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const underlineEl = section.querySelector<SVGPathElement>(
          "[data-contact-underline]",
        );
        if (underlineEl) {
          const len = underlineEl.getTotalLength();
          gsap.set(underlineEl, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        tl.from("[data-contact-eyebrow]", {
          y: 12,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }).from(
          "[data-contact-line]",
          {
            yPercent: 112,
            opacity: 0,
            duration: 0.85,
            stagger: 0.085,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.35",
        );

        if (underlineEl) {
          tl.to(
            underlineEl,
            {
              strokeDashoffset: 0,
              duration: 0.72,
              ease: "power3.inOut",
            },
            "-=0.38",
          );
        }

        tl.from(
          "[data-contact-sub]",
          {
            y: 16,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.45",
        )
          .from(
            "[data-contact-row]",
            {
              y: 14,
              opacity: 0,
              duration: 0.58,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            "-=0.45",
          )
          .from(
            "[data-contact-cta]",
            {
              y: 12,
              opacity: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            "-=0.35",
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phone);
      setCopiedPhone(true);
      toast.success("Phone number copied", { description: SITE.phone });
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      toast.error("Could not copy phone number");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      onPointerEnter={(e) => {
        sectionRectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect =
          sectionRectRef.current ?? e.currentTarget.getBoundingClientRect();
        spotX.set(e.clientX - rect.left);
        spotY.set(e.clientY - rect.top);
        spotOpacity.set(1);
      }}
      onPointerLeave={() => {
        sectionRectRef.current = null;
        spotOpacity.set(0);
      }}
      className="relative scroll-mt-24 overflow-x-clip pb-24 pt-12 lg:pb-28 lg:pt-16"
    >
      {/* Contained Cosmic Twilight anime character video backdrop (no top line, unclipped email popover) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <ContactCharacterVideoBackdrop />
        <motion.div
          style={{ background: spotlightBg, opacity: smoothOpacity }}
          className="absolute inset-0"
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left — Editorial Headline & Availability */}
          <div className="space-y-6 lg:col-span-7">
            <div
              data-contact-eyebrow
              className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-indigo-200/80"
            >
              <span>Contact · What&apos;s Next</span>
              <span className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[9.5px] tracking-[0.16em] text-emerald-400">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Available now
              </span>
            </div>

            <h2 className="font-display text-5xl font-semibold leading-[1.04] tracking-[-0.03em] text-foreground drop-shadow-[0_4px_24px_rgba(12,10,32,0.85)] sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1.5">
                <span data-contact-line className="inline-block">
                  Let&apos;s build
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-contact-line className="inline-block">
                  something{" "}
                  <span className="relative inline-block text-[#7dd3fc]">
                    together
                    <svg
                      viewBox="0 0 220 14"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full"
                    >
                      <path
                        data-contact-underline
                        d="M 3 10 Q 110 2 217 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  .
                </span>
              </span>
            </h2>

            <p
              data-contact-sub
              className="max-w-lg text-base leading-relaxed text-indigo-100/85 drop-shadow-[0_2px_14px_rgba(12,10,32,0.9)]"
            >
              Looking for full-time opportunities building websites, apps, and
              smart AI tools — in Mumbai or remotely.
            </p>
          </div>

          {/* Right — Hairline Contact Rows & Magnetic CTA Actions */}
          <div className="space-y-6 lg:col-span-5 lg:justify-self-end">
            <div className="divide-y divide-indigo-200/15 rounded-2xl border border-indigo-200/15 bg-[#12102b]/68 px-5 py-1.5 font-mono text-xs text-indigo-100/80 shadow-[0_18px_48px_rgba(8,7,24,0.48)] backdrop-blur-md">
              <div data-contact-row className="py-3">
                <SendEmailButton variant="text-link" />
              </div>

              <div
                data-contact-row
                className="flex items-center justify-between gap-4 py-3"
              >
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-foreground/50" />
                  <a
                    href={`tel:${SITE.phone}`}
                    className="text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors hover:decoration-foreground"
                  >
                    {SITE.phone}
                  </a>
                </p>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copy phone number"
                  className={`liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-[11.5px] font-medium transition-colors cursor-pointer ${
                    copiedPhone
                      ? "text-emerald-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {copiedPhone ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedPhone ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div data-contact-row className="space-y-1.5 py-3">
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="shrink-0 text-foreground/50" />
                  <span>
                    {SITE.location} · {SITE.responsePromise}
                  </span>
                </p>
                {mumbaiTime && (
                  <p className="flex items-center gap-1.5 pl-5 text-[11px] text-muted-foreground/80">
                    <Clock size={11} className="shrink-0 text-highlight" />
                    <span>Local time · {mumbaiTime} IST</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div data-contact-cta>
                <MagneticAction>
                  <SendEmailButton variant="hero-cta" />
                </MagneticAction>
              </div>

              <div data-contact-cta>
                <MagneticAction>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary group px-4.5 py-3"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>
                </MagneticAction>
              </div>

              <div data-contact-cta>
                <MagneticAction>
                  <a
                    href={SITE.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link px-2"
                  >
                    <FileText size={14} />
                    <span>Resume</span>
                    <ArrowUpRight size={13} />
                  </a>
                </MagneticAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
