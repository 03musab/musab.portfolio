"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="text-gray-400 text-sm leading-relaxed">
          <p className="text-blue-400 font-bold mb-1">=== Mohammed Musab - Command Center v1.0.0 ===</p>
          <p>Type <span className="text-green-400 font-semibold">help</span> to view available commands, or <span className="text-green-400 font-semibold">neofetch</span> for system specifications.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    const body = bodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(newPointer);
      setInput(commandHistory[newPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      if (historyPointer === commandHistory.length - 1) {
        setHistoryPointer(-1);
        setInput("");
      } else {
        const newPointer = historyPointer + 1;
        setHistoryPointer(newPointer);
        setInput(commandHistory[newPointer]);
      }
    }
  };

  const executeCommand = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const parts = trimmedInput.toLowerCase().split(" ");
    const cmd = parts[0];
    let output: React.ReactNode = "";

    // Add to history
    setCommandHistory((prev) => [...prev, trimmedInput]);
    setHistoryPointer(-1);

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
            <div>
              <p><span className="text-green-400 font-semibold font-mono">about</span> - Who I am & my focus</p>
              <p><span className="text-green-400 font-semibold font-mono">projects</span> - Flagship AI & secure software products</p>
              <p><span className="text-green-400 font-semibold font-mono">skills</span> - Engineering Command Center stacks</p>
              <p><span className="text-green-400 font-semibold font-mono">experience</span> - Professional engineering timeline</p>
            </div>
            <div>
              <p><span className="text-green-400 font-semibold font-mono">certifications</span> - AWS, OCI, Android, Cybersecurity</p>
              <p><span className="text-green-400 font-semibold font-mono">resume</span> - Preview/download my official resume</p>
              <p><span className="text-green-400 font-semibold font-mono">contact</span> - Secure contact handles</p>
              <p><span className="text-green-400 font-semibold font-mono">neofetch</span> - Command Center info & specs</p>
              <p><span className="text-green-400 font-semibold font-mono">clear</span> - Clear output log</p>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "about":
        output = (
          <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
            <p className="text-blue-400 font-semibold">Mohammed Musab | Product Engineer & AI Builder</p>
            <p>
              I am a final-year Computer Engineering student (Graduating 2026, 8.34 CGPA) based in Mumbai, India.
              Rather than building static landing pages, I focus on building functional systems: robust Full-Stack apps,
              AI agents, automation workflows, and encrypted cloud setups.
            </p>
            <p>
              My goal is to translate product ideas into secure, scalable code, deploying production-grade systems independently.
            </p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-sm text-gray-300 space-y-4">
            <div>
              <p className="text-blue-400 font-bold">[1] JobSnap — Flagship AI Product</p>
              <p className="text-gray-400 text-xs mt-0.5">Focus: AI Job Matching, Resume Parsing, ATS Automation & Background Processing</p>
              <p className="mt-1">Built an automated engine that aggregates jobs, parses CVs, runs intelligent score matching, and fires detailed digest reports automatically.</p>
              <p className="mt-1 text-xs text-gray-500 font-mono">
                Code: <a href="https://github.com/03musab/ai_job_agent" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">github.com/03musab/ai_job_agent</a> | Live: <a href="https://aijobsnap.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">aijobsnap.vercel.app</a>
              </p>
            </div>
            <div>
              <p className="text-blue-400 font-bold">[2] Togcode — Real-Time Collaboration Hub</p>
              <p className="text-gray-400 text-xs mt-0.5">Focus: WebSockets, Live Coding, React & Secured Collaboration</p>
              <p className="mt-1">Architected a multi-user collaborative workspace allowing developers to code together instantly in real time with built-in sandbox security.</p>
              <p className="mt-1 text-xs text-gray-500 font-mono">
                Code: <a href="https://github.com/03musab/togcode" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">github.com/03musab/togcode</a> | Live: <a href="https://togcode.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">togcode.vercel.app</a>
              </p>
            </div>
            <div>
              <p className="text-blue-400 font-bold">[3] TalkSphere — Secure Messaging Infrastructure</p>
              <p className="text-gray-400 text-xs mt-0.5">Focus: Cryptography, End-to-End Encryption, Cyber-Sec</p>
              <p className="mt-1">Engineered a highly secure, tamper-detected chat application utilizing advanced encryption keys and verified file transfers.</p>
              <p className="mt-1 text-xs text-gray-500 font-mono">
                Code: <a href="https://github.com/03musab/APSIT-Chat-app" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">github.com/03musab/APSIT-Chat-app</a> | Live: <a href="https://apsit-chat-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">apsit-chat-frontend.onrender.com</a>
              </p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-sm text-gray-300 space-y-2">
            <p className="text-blue-400 font-semibold">Engineering Stacks:</p>
            <p><span className="text-purple-400 font-semibold font-mono">Frontend:</span> React, Next.js, Tailwind CSS, HTML, CSS, Bootstrap</p>
            <p><span className="text-purple-400 font-semibold font-mono">Backend:</span> Node.js, Express, Flask, REST APIs, WebSockets</p>
            <p><span className="text-purple-400 font-semibold font-mono">Databases:</span> MongoDB, MySQL, Redis, SQLite</p>
            <p><span className="text-purple-400 font-semibold font-mono">Cloud & Security:</span> AWS (Certified), Oracle Cloud, Cryptography, Secure Communications</p>
            <p><span className="text-purple-400 font-semibold font-mono">AI & Automation:</span> AI Integration, Agents, Recommendation Engines, Background Schedulers</p>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="text-sm text-gray-300 space-y-3">
            <div>
              <p className="text-blue-400 font-semibold font-mono">Digital Experience Developer — Internship</p>
              <p className="text-gray-400 text-xs">Developed premium digital flows, refined frontend layouts, and optimized SEO structures.</p>
            </div>
            <div>
              <p className="text-blue-400 font-semibold font-mono">IT Support Intern</p>
              <p className="text-gray-400 text-xs">Managed system administration, network configurations, secure directory accesses, and IT debugging.</p>
            </div>
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="text-sm text-gray-300 space-y-2">
            <p className="text-purple-400 font-bold">Verified Credentials:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <p>• AWS Cloud Foundations: <a href="https://www.credly.com/badges/06cb6f51-843b-48ee-8398-89ab1948a18f/linked_in_profile" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• AWS Cloud Architecting: <a href="https://www.credly.com/badges/438571e8-3806-43b9-b9f7-9fbf30c8679a/print" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Oracle Multicloud Architect: <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=7496B34650FE9CF00F5504986C047DB8C91ABE28B7E8699EC404E5A1318AF8FA" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Google Android Internship: <a href="https://www.linkedin.com/in/devmusab/details/certifications/1725127758257/single-media-viewer/?profileId=ACoAAD4aR64B95XJYaaCWByOSS3SCTXjMscxA0Y" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Palo Alto Cybersecurity: <a href="https://www.linkedin.com/in/devmusab/details/certifications/1725128897545/single-media-viewer/?profileId=ACoAAD4aR64B9" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Zscaler Networking: <a href="https://verify.skilljar.com/c/cnj7oj7i2xuu" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Zscaler Fundamentals: <a href="https://badgr.com/public/assertions/dRBudKiVQBmCiK8RM2jR-Q" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Zscaler ZTCA: <a href="https://www.credly.com/badges/340bbf41-97ee-4ae2-89fa-05b641bd10b3/public_url" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• Wadhwani Softskills: <a href="https://web.certificate.wfglobal.org/en/certificate?certificateId=6807ddcaeeacc2785e37ee9b" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
              <p>• GenAI 101 Pieces: <a href="https://www.linkedin.com/in/devmusab/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Profile</a></p>
              <p>• Flipkart GRiD 6.0: <a href="https://unstop.com/certificate-preview/7caa6adc-072d-4ae9-9ec8-8fea62fd3930" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Verify</a></p>
            </div>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="text-sm text-gray-300 space-y-2">
            <p>Document: <span className="text-yellow-400 font-semibold">Mohammed_Musab_Resume.pdf</span></p>
            <p>Actions:</p>
            <p className="pl-4">
              <a
                href="https://drive.google.com/file/d/1EO4AE-AMGJR9gsNdNjfAd3ngGGcotHLh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1 font-mono"
              >
                [Open Preview Link]
              </a>
            </p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-sm text-gray-300 space-y-1">
            <p className="text-blue-400 font-semibold">Secure Contact Points:</p>
            <p>• Email: <a href="mailto:musabimp.0@gmail.com" className="text-green-400 hover:underline">musabimp.0@gmail.com</a></p>
            <p>• Phone: <span className="text-gray-400">+91 91529 21715</span></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/devmusab/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">linkedin.com/in/devmusab</a></p>
            <p>• GitHub: <a href="https://github.com/03musab" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">github.com/03musab</a></p>
          </div>
        );
        break;

      case "neofetch":
        output = (
          <div className="flex flex-col md:flex-row gap-4 font-mono text-sm leading-relaxed text-gray-300">
            <div className="text-blue-400 font-bold whitespace-pre">
{`    /\\_/\\
   ( o.o )
    > ^ <
   /     \\
  ( |   | )
(___|___)`}
            </div>
            <div className="text-xs sm:text-sm break-words max-w-full">
              <p><span className="text-blue-400 font-bold">musab@commandcenter</span></p>
              <p className="text-gray-500">----------------------</p>
              <p><span className="text-green-400 font-semibold">OS:</span> MusabOS v2026.06.01-LTS</p>
              <p><span className="text-green-400 font-semibold">Host:</span> Mumbai, India (Computer Eng. Graduate)</p>
              <p><span className="text-green-400 font-semibold">Kernel:</span> Next.js 15, React 19, TypeScript</p>
              <p><span className="text-green-400 font-semibold">Console:</span> Antigravity-Power-CLI</p>
              <p><span className="text-green-400 font-semibold">CGPA:</span> 8.34 / 10.0</p>
              <p><span className="text-green-400 font-semibold">Certifications:</span> AWS Solutions Architect Foundations, OCI Multicloud</p>
              <p><span className="text-green-400 font-semibold">Primary Core:</span> Full-Stack Product Builder & AI Integrations</p>
              <p><span className="text-green-400 font-semibold">Active Memory:</span> React, TailwindCSS, MongoDB, WebSockets, REST APIs</p>
            </div>
          </div>
        );
        break;

      case "sudo":
        output = <p className="text-red-400 font-semibold font-mono">Error: This incident will be reported. Just kidding! You already have admin rights here.</p>;
        break;

      case "coffee":
        output = <p className="text-yellow-400 font-mono">☕ Brewing your digital espresso... Done! Speed increased by +10%.</p>;
        break;

      default:
        output = (
          <p className="text-red-400 font-mono text-sm">
            Command not found: &quot;{cmd}&quot;. Type <span className="text-white underline font-semibold">help</span> to list commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: trimmedInput, output }]);
    setInput("");
  };

  return (
    <div
      onClick={focusInput}
      className="w-full bg-[#0a0a0c]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm cursor-text glow-border flex flex-col min-h-[380px] max-h-[500px]"
    >
      {/* Top Header */}
      <div className="bg-[#121215] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
          <TerminalIcon size={12} className="text-blue-500 animate-pulse" />
          <span>sh - command-center</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
          <span className="text-[10px] text-green-400/90 font-sans tracking-wide">SECURE_TUNNEL</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto space-y-3 leading-relaxed text-gray-200">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== "welcome" && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold font-mono">musab@guest:~#</span>
                <span className="text-white font-semibold font-mono">{item.command}</span>
              </div>
            )}
            <div className="pl-2">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Input Footer */}
      <div className="bg-[#070709] border-t border-white/5 p-3 flex items-center gap-2">
        <span className="text-green-500 font-bold font-mono select-none">musab@guest:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white focus:outline-none border-none outline-none font-mono text-sm caret-blue-500 w-full min-w-0"
          autoFocus
          placeholder="type a command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
