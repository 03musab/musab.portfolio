"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Play, Pause, Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface LogItem {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARN";
  message: string;
}

export default function AIEngineeringLab() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [queriesCount, setQueriesCount] = useState(1482);
  const [successRate, setSuccessRate] = useState(99.4);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const mockLogPool: Omit<LogItem, "timestamp">[] = [
    { level: "INFO", message: "Fetching jobs from Indeed API gateway..." },
    { level: "SUCCESS", message: "Successfully ingested 24 job postings." },
    { level: "INFO", message: "Parsing uploaded resumes queue (size: 3)..." },
    { level: "INFO", message: "Parsing CV: 'Mohamed_Dev_Resume.pdf'" },
    { level: "INFO", message: "Extracting entities: [React, Node.js, AWS, Cryptography]" },
    { level: "SUCCESS", message: "Resume structural mapping complete. ATS score: 8.9/10" },
    { level: "INFO", message: "Running score-matching analysis for engineering positions..." },
    { level: "SUCCESS", message: "Matched CV with 3 senior developer openings (Score > 85%)" },
    { level: "INFO", message: "Generating Daily Digest HTML template..." },
    { level: "SUCCESS", message: "Email report dispatched to user inbox." },
    { level: "INFO", message: "Cleaning up execution logs cache..." },
    { level: "INFO", message: "WebSocket server listening on port 8080" },
    { level: "INFO", message: "Togcode workspace: Active collaborator joined session 'node-x1'" },
    { level: "INFO", message: "TalkSphere message key rotation complete: AES-GCM-256" },
  ];

  useEffect(() => {
    // Initial logs setup
    const initialLogs: LogItem[] = [];
    for (let i = 0; i < 6; i++) {
      const time = new Date(Date.now() - (6 - i) * 5000);
      initialLogs.push({
        timestamp: time.toTimeString().split(" ")[0],
        ...mockLogPool[i % mockLogPool.length],
      });
    }
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomLog = mockLogPool[Math.floor(Math.random() * mockLogPool.length)];

      setLogs((prev) => {
        const updated = [...prev, { timestamp: timeStr, ...randomLog }];
        if (updated.length > 20) updated.shift();
        return updated;
      });

      setQueriesCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
      if (Math.random() > 0.8) {
        setSuccessRate((prev) => parseFloat((99.0 + Math.random() * 0.9).toFixed(1)));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const container = logsContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [logs]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-[#0a0a0c]/60 border border-white/10 p-6 rounded-2xl glow-border">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-purple-400 animate-pulse" size={20} />
            AI Engineering Lab
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-sans">
            Live pipeline diagnostics, scraper activity, and matching engine stats.
          </p>
        </div>
        <button
          onClick={togglePlayback}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
            isPlaying
              ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
              : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={12} />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play size={12} />
              <span>RESUME</span>
            </>
          )}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 select-none">
        <div className="bg-[#0e0e11] border border-white/5 p-4 rounded-xl min-w-0">
          <p className="text-[10px] text-gray-500 font-mono font-bold tracking-wide uppercase truncate">AI Tasks Completed</p>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-white font-mono mt-1 truncate">{queriesCount}</p>
        </div>
        <div className="bg-[#0e0e11] border border-white/5 p-4 rounded-xl min-w-0">
          <p className="text-[10px] text-gray-500 font-mono font-bold tracking-wide uppercase truncate">Parse Accuracy</p>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-green-400 font-mono mt-1 truncate">{successRate}%</p>
        </div>
        <div className="bg-[#0e0e11] border border-white/5 p-4 rounded-xl min-w-0">
          <p className="text-[10px] text-gray-500 font-mono font-bold tracking-wide uppercase truncate">Engine Core</p>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-blue-400 font-mono mt-1 truncate" title="LlamaIndex/LangChain">
            LlamaIndex/LangChain
          </p>
        </div>
        <div className="bg-[#0e0e11] border border-white/5 p-4 rounded-xl min-w-0">
          <p className="text-[10px] text-gray-500 font-mono font-bold tracking-wide uppercase truncate">Active Pipelines</p>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-purple-400 font-mono mt-1 truncate">3 Pipelines</p>
        </div>
      </div>

      {/* Code Console Screen */}
      <div className="bg-black/90 border border-white/5 rounded-xl p-4 font-mono text-xs overflow-hidden h-[240px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2 border-b border-white/5 text-gray-500 mb-2">
          <div className="flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-purple-400" />
            <span>pipeline-logs.sh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            <span>STREAMING</span>
          </div>
        </div>

        <div ref={logsContainerRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2 items-start leading-relaxed">
              <span className="text-gray-500">[{log.timestamp}]</span>
              <span
                className={`font-semibold ${
                  log.level === "SUCCESS"
                    ? "text-green-400"
                    : log.level === "WARN"
                    ? "text-yellow-400"
                    : "text-blue-400"
                }`}
              >
                [{log.level}]
              </span>
              <span className="text-gray-300 break-words">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
