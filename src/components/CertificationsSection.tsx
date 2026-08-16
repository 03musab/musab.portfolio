"use client";

import React from "react";
import Reveal from "./Reveal";
import {
  Cloud,
  ExternalLink,
  GraduationCap,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Marquee } from "./ui/marquee";

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  badge: LucideIcon;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "AWS Academy Graduate – Cloud Foundations",
    issuer: "AWS – Amazon Web Services",
    date: "Dec 2024 & Apr 2025",
    link: "https://www.credly.com/badges/06cb6f51-843b-48ee-8398-89ab1948a18f/linked_in_profile",
    badge: Cloud,
  },
  {
    title: "AWS Academy Graduate – Cloud Architecting",
    issuer: "AWS – Amazon Web Services",
    date: "Dec 2024",
    link: "https://www.credly.com/badges/438571e8-3806-43b9-b9f7-9fbf30c8679a/print",
    badge: Cloud,
  },
  {
    title: "Oracle Cloud Infrastructure Multicloud Architect Professional",
    issuer: "Oracle",
    date: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7496B34650FE9CF00F5504986C047DB8C91ABE28B7E8699EC404E5A1318AF8FA",
    badge: Landmark,
  },
  {
    title: "Intro to Networking for Cyber Professionals",
    issuer: "Zscaler",
    date: "Aug 2024 – Aug 2027",
    link: "https://www.credly.com/badges/340bbf41-97ee-4ae2-89fa-05b641bd10b3/public_url",
    badge: ShieldCheck,
  },
  {
    title: "Soft Skills & Employability Training",
    issuer: "Wadhwani Foundation",
    date: "Apr 2025",
    link: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6807ddcaeeacc2785e37ee9b",
    badge: GraduationCap,
  },
  {
    title: "Flipkart GRiD 6.0 – E-Commerce & Tech Quiz (Level 1)",
    issuer: "Flipkart / Unstop",
    date: "Aug 2024",
    link: "https://unstop.com/certificate-preview/7caa6adc-072d-4ae9-9ec8-8fea62fd3930",
    badge: ShoppingBag,
  },
];

const firstRow = CERTIFICATIONS.slice(0, Math.ceil(CERTIFICATIONS.length / 2));
const secondRow = CERTIFICATIONS.slice(Math.ceil(CERTIFICATIONS.length / 2));

function CertificationCard({ cert }: { cert: CertificationItem }) {
  const BadgeIcon = cert.badge;
  return (
    <figure className="relative h-44 w-80 sm:w-96 cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:border-foreground/40 hover:shadow-xl flex flex-col justify-between shrink-0 group">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-foreground/5 text-foreground border border-line/50 group-hover:border-foreground/30 transition-colors">
            <BadgeIcon size={18} strokeWidth={1.75} />
          </div>
          <span className="rounded-full border border-line/50 bg-background/60 px-2.5 py-0.5 font-mono text-[10px] text-foreground/60">
            {cert.date}
          </span>
        </div>
        <h3 className="mt-3 font-display text-base font-bold tracking-tight text-foreground leading-snug line-clamp-2">
          {cert.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-foreground/60">{cert.issuer}</p>
      </div>

      {cert.link ? (
        <div className="pt-2 border-t border-line/40 flex items-center justify-between">
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-foreground/70 transition-colors hover:text-foreground group-hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Verify Badge</span>
            <ExternalLink size={12} />
          </a>
        </div>
      ) : null}
    </figure>
  );
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-24 space-y-8 overflow-hidden">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Professional Credentials
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Certifications &amp; <em className="text-colorfull animate-gradient-x italic">credentials</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Industry-recognized certifications in cloud engineering, cybersecurity, networking, and soft skills.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <Marquee pauseOnHover className="[--duration:28s] py-2">
            {firstRow.map((cert) => (
              <CertificationCard key={cert.title} cert={cert} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:28s] py-2">
            {secondRow.map((cert) => (
              <CertificationCard key={cert.title} cert={cert} />
            ))}
          </Marquee>

          {/* Left & Right gradient edge overlays for seamless fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </Reveal>
    </section>
  );
}
