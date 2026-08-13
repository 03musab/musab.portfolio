"use client";

import React, { useState } from "react";
import { Clipboard, ClipboardCheck, Share2 } from "lucide-react";
import { LinkedinIcon, XIcon } from "./icons";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

/**
 * Social share actions — LinkedIn, X, and copy-link.
 * Defaults to the current page URL at click time.
 */
export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const resolveUrl = () => {
    if (typeof window === "undefined") return "";
    return url || window.location.href;
  };

  const copyLink = async () => {
    const target = resolveUrl();
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1 mr-1 select-none">
        <Share2 size={11} />
        Share
      </span>
      <button
        type="button"
        onClick={() => {
          const target = resolveUrl();
          if (target) window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(target)}`, "_blank", "noopener,noreferrer");
        }}
        className="p-1.5 text-gray-400 hover:text-[#0A66C2] hover:bg-white/5 rounded-md transition-colors cursor-pointer"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const target = resolveUrl();
          if (target) window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(target)}`, "_blank", "noopener,noreferrer");
        }}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors cursor-pointer"
        title="Share on X (Twitter)"
        aria-label="Share on X (Twitter)"
      >
        <XIcon size={13} />
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors cursor-pointer"
        title="Copy link"
        aria-label="Copy link"
      >
        {copied ? <ClipboardCheck size={14} className="text-green-400" /> : <Clipboard size={14} />}
      </button>
    </div>
  );
}
