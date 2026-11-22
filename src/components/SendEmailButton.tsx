"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Check, Copy, ExternalLink, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
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
      toast.success("Email copied to clipboard", { description: email });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email:", err);
      toast.error("Could not copy email");
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
            className={`btn-accent group relative overflow-hidden py-2 pl-5 pr-2 ${className}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={14} />
              <span>Send direct email</span>
            </span>
            <span className="btn-lens-orb relative z-10">
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </button>
        );

      case "chip":
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`btn-secondary px-3.5 py-1.5 font-sans text-xs ${className}`}
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
            className={`editorial-link ${className}`}
          >
            <Mail size={13} className="text-accent" />
            <span>{email}</span>
          </button>
        );

      case "button":
      default:
        return (
          <button
            type="button"
            onClick={toggleOpen}
            className={`btn-primary px-5 py-2.5 ${className}`}
          >
            <Mail size={14} />
            <span>Email me</span>
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
            className="liquid-glass-strong absolute bottom-full right-0 mb-3 z-50 w-72 origin-bottom-right rounded-3xl p-4 sm:right-auto sm:left-0 sm:origin-bottom-left block text-foreground font-sans font-normal"
          >
            <span className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <span className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-[8px] bg-accent-soft text-accent">
                  <Mail size={12} />
                </span>
                <span className="font-display text-xs font-semibold tracking-[-0.01em] text-foreground">
                  Contact via email
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-[8px] p-1 text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </span>

            <span className="font-mono text-[11px] text-foreground/60 mb-3 break-all bg-muted/50 p-2 rounded-[10px] border border-line/50 select-all block">
              {email}
            </span>

            <span className="space-y-1 font-sans text-[13px] font-medium block">
              {/* 1. Open Gmail Web (Browser Direct - Guaranteed Working) */}
              <button
                type="button"
                onClick={handleDirectGmail}
                className="w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="font-display font-bold text-red-500">M</span>
                  <span>Open in Gmail</span>
                </span>
                <ExternalLink size={12} className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </button>

              {/* 2. Open Outlook Web */}
              <button
                type="button"
                onClick={handleDirectOutlook}
                className="w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="font-display font-bold text-blue-500">O</span>
                  <span>Open in Outlook</span>
                </span>
                <ExternalLink size={12} className="text-foreground/40 group-hover:text-foreground transition-colors" />
              </button>

              {/* 3. Open Native App (mailto) */}
              <button
                type="button"
                onClick={handleNativeMailto}
                className="w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-left bg-surface hover:bg-foreground/5 transition-colors text-foreground/85 group cursor-pointer"
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
                className={`w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-left transition-colors cursor-pointer ${
                  copied
                    ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                    : "bg-surface hover:bg-foreground/5 text-foreground/85"
                }`}
              >
                <span className="flex items-center gap-2">
                  {copied ? <Check size={13} /> : <Copy size={13} className="text-foreground/60" />}
                  <span>{copied ? "Address copied!" : "Copy email address"}</span>
                </span>
                {copied && <span className="text-[11px] font-semibold">Done</span>}
              </button>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
