"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Which technologies do you specialize in?",
    a: "I work end-to-end across the stack: React, Next.js, TypeScript and Tailwind on the frontend; Node.js, Express and Python (Flask) on the backend; MySQL, MongoDB and Redis for data; and AWS / Oracle Cloud for deployment. On the AI side I build agent integrations, ATS matching engines, LLM-based parsers, and automated scraper pipelines.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "AI-powered products, full-stack web applications, real-time collaboration tools, automation & scraping pipelines, and secure end-to-end encrypted systems. I'm equally comfortable scoping a greenfield product or hardening an existing codebase.",
  },
  {
    q: "Can you work with my existing codebase or team?",
    a: "Yes. I onboard quickly, respect existing conventions, and prefer minimal, focused changes. I can audit architecture, review code, add tests, or ship features — whatever your team needs.",
  },
  {
    q: "How fast will you respond to my inquiry?",
    a: "My average response time is under 24 hours (IST timezone, Mumbai). Once we start, you get transparent progress updates at every stage of the pipeline — no black boxes.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3 max-w-3xl">
      {FAQS.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            className={`bg-[#0a0a0c]/60 border rounded-xl overflow-hidden transition-colors ${
              isOpen ? "border-blue-500/30" : "border-white/5 hover:border-white/10"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-button-${idx}`}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-blue-400 font-bold select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-mono font-semibold text-white">{faq.q}</span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={`p-1 rounded-md ${isOpen ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-gray-400"}`}
              >
                <Plus size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-button-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <p className="px-5 pb-5 pl-[52px] text-sm text-gray-400 leading-relaxed font-sans">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
