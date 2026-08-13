"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Layers, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { SITE, SECTION_LINKS } from "@/lib/site";

export default function SiteHeader() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(24);
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  useEffect(() => {
    if (!showEmailMenu) return;
    const handleOutsideClick = () => setShowEmailMenu(false);
    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showEmailMenu]);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const next = prev + diff;
        return next < 15 ? 15 : next > 45 ? 45 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030303]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-[#0e0e11]">
          <Image
            src="/avatar.png"
            alt="Mohammed Musab — Full-Stack Engineer & AI Builder"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <div>
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
            {SITE.name}
          </Link>
          <p className="text-[10px] text-gray-500 font-mono">{SITE.tagline.toLowerCase()}</p>
        </div>
      </div>

      <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 text-[11px] font-mono text-gray-400">
        {SECTION_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-white hover:text-blue-400 transition-colors uppercase tracking-wider"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden xl:flex items-center gap-5 text-xs font-mono text-gray-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          <span className="text-gray-300">ALL SYSTEMS OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-blue-500" />
          <span>MUMBAI TIME: {time || "00:00:00"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers size={12} className="text-purple-500" />
          <span>LATENCY: {latency}ms</span>
        </div>
      </div>

      <div className="flex items-center gap-3 relative shrink-0">
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          title="GitHub"
        >
          <GithubIcon size={16} />
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          title="LinkedIn"
        >
          <LinkedinIcon size={16} />
        </a>
        <button
          type="button"
          onClick={() => setShowEmailMenu(!showEmailMenu)}
          aria-expanded={showEmailMenu}
          aria-haspopup="menu"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
          title="Email Composer Gateway"
        >
          <Mail size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </button>

        {showEmailMenu && (
          <div className="absolute right-0 top-11 bg-[#0c0c0e]/95 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 text-xs w-48 font-mono space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            <p className="text-[10px] text-gray-500 px-2.5 py-1 uppercase font-bold tracking-wider select-none">
              Send Email Via
            </p>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowEmailMenu(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span>Gmail (Web)</span>
            </a>

            <hr className="border-white/5 my-1" />

            <button
              type="button"
              onClick={copyEmailToClipboard}
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Copy Address</span>
              </span>
              {copiedEmail && <span className="text-[10px] text-green-400 font-bold">COPIED</span>}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
