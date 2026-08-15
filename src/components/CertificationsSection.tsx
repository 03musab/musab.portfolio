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
    title: "Oracle Cloud Infrastructure Classic 2025 Multicloud Architect Professional",
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
    badge: GraduationCap,
  },
  {
    title: "Certificate in E-Commerce – Level 1",
    issuer: "Flipkart Grid",
    date: "Aug 2024",
    badge: ShoppingBag,
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Professional Credentials
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Certifications & <em className="text-colorfull animate-gradient-x italic">credentials</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Industry-recognized certifications in cloud engineering, cybersecurity, networking, and soft skills.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, idx) => (
          <Reveal key={cert.title} delay={idx * 0.05}>
            <div className="flex h-full flex-col justify-between space-y-3 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <cert.badge size={24} className="text-foreground/80" strokeWidth={1.75} />
                  <span className="rounded-full border border-line/50 bg-background/60 px-2.5 py-0.5 font-mono text-[10px] text-foreground/60">
                    {cert.date}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-foreground leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-foreground/60">{cert.issuer}</p>
              </div>

              {cert.link && (
                <div className="pt-2 border-t border-line/40">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <span>Verify Badge</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
