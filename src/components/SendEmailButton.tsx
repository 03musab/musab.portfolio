"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Check, Copy, ExternalLink, ArrowRight, X } from "lucide-react";
import { SITE } from "@/lib/site";

interface SendEmailButtonProps {
  variant?: "hero-cta" | "chip" | "button" | "text-link";
  className?: string;
  children?: React.ReactNode;
}

export default function SendEmailButton({
  variant = "button",
  className = "",
  children,
}: SendEmailButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const email = SITE.email;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;
  const mailtoUrl = `mailto:${email}`;

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleDirectGmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleDirectOutlook = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(outlookUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleNativeMailto = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = mailtoUrl;
    setIsOpen(false);
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER TRIGGER BUTTON BASED ON VARIANT
  // ─────────────────────────────────────────────────────────────
  const renderTrigger = () => {
    if (children) {
      return (
        <button type="button" onClick={toggleOpen} className={className}>
          {children}
        </button>
      );
    }

    switch (variant) {
      case "hero-cta":
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 bg-surface px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground/40 cursor-pointer ${className}`}
          >
            <span className="absolute inset-0 z-0 rounded-full bg-foreground transition-[clip-path] duration-500 ease-out [clip-path:circle(0%_at_100%_50%)] group-hover:[clip-path:circle(150%_at_100%_50%)] pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-background">
              <Mail size={14} />
              Send Direct Email
            </span>
            <ArrowRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-background"
            />
          </button>
        );

      case "chip":
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-foreground/60 transition-colors hover:text-foreground cursor-pointer ${className}`}
          >
            <Mail size={12} />
            <span>{email}</span>
          </button>
        );

      case "text-link":
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`inline-flex items-center gap-1 text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors cursor-pointer ${className}`}
          >
            <Mail size={13} className="text-foreground/50" />
            <span>{email}</span>
          </button>
        );

      case "button":
      default:
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-background transition-opacity hover:opacity-85 cursor-pointer ${className}`}
          >
            <Mail size={13} />
            <span>Email Me</span>
          </button>
        );
    }
  };

  return (
    <span className="relative inline-block text-left" ref={dropdownRef}>
      {renderTrigger()}

      {/* ── EMAIL ACTION POPOVER MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full right-0 mb-3 z-50 w-72 origin-bottom-right rounded-2xl border border-line bg-surface p-4 shadow-2xl backdrop-blur-xl sm:right-auto sm:left-0 sm:origin-bottom-left block text-foreground font-sans font-normal"
          >
            <span className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <span className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Mail size={12} />
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-wide text-foreground">
                  Contact via Email
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </span>

            <span className="font-mono text-[10px] text-foreground/50 mb-3 break-all bg-muted/50 p-2 rounded-lg border border-line/50 select-all block">
              {email}
            </span>

            <span className="space-y-1.5 font-mono text-xs block">
              {/* 1. Open Gmail Web (Browser Direct - Guaranteed Working) */}
              <button
                type="button"
                onClick={handleDirectGmail}
                className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-red-500">M</span>
                  <span>Open in Gmail (Web)</span>
                </span>
                <ExternalLink size={12} className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </button>

              {/* 2. Open Outlook Web */}
              <button
                type="button"
                onClick={handleDirectOutlook}
                className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-blue-500">O</span>
                  <span>Open in Outlook (Web)</span>
                </span>
                <ExternalLink size={12} className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </button>

              {/* 3. Open Native App (mailto) */}
              <button
                type="button"
                onClick={handleNativeMailto}
                className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground/80 group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Mail size={13} className="text-foreground/60" />
                  <span>Default Mail App</span>
                </span>
                <ExternalLink size={12} className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </button>

              {/* 4. Copy Email Address */}
              <button
                type="button"
                onClick={handleCopy}
                className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition-colors cursor-pointer ${
                  copied
                    ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                    : "bg-surface hover:bg-foreground/5 text-foreground/80"
                }`}
              >
                <span className="flex items-center gap-2">
                  {copied ? <Check size={13} /> : <Copy size={13} className="text-foreground/60" />}
                  <span>{copied ? "Address Copied!" : "Copy Email Address"}</span>
                </span>
                {copied && <span className="text-[10px] uppercase font-bold tracking-wider">Done</span>}
              </button>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
