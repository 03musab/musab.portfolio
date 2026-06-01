"use client";

import React, { useState } from "react";
import { Cpu, ArrowRight, Zap, Lock, Mail, Users, Database, Globe } from "lucide-react";

type ProjectId = "jobsnap" | "togcode" | "talksphere";

interface DiagramNode {
  label: string;
  desc: string;
  icon: React.ReactNode;
  status: "idle" | "active" | "success";
}

export default function SystemDesign() {
  const [activeProject, setActiveProject] = useState<ProjectId>("jobsnap");

  const renderJobSnap = () => {
    const nodes: DiagramNode[] = [
      {
        label: "Job Ingestion",
        desc: "API Scrapers & Aggregators",
        icon: <Globe className="text-blue-400" size={20} />,
        status: "success",
      },
      {
        label: "Resume Parser",
        desc: "PDF/DOCX ATS Extractors",
        icon: <Cpu className="text-purple-400" size={20} />,
        status: "active",
      },
      {
        label: "AI Match Core",
        desc: "Intelligent Scoring Engine",
        icon: <Zap className="text-yellow-400" size={20} />,
        status: "active",
      },
      {
        label: "Queue & Schedulers",
        desc: "Background Jobs & Redis",
        icon: <Database className="text-blue-500" size={20} />,
        status: "success",
      },
      {
        label: "Email Dispatcher",
        desc: "Automated Reporting",
        icon: <Mail className="text-green-400" size={20} />,
        status: "success",
      },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className="bg-[#0e0e11] border border-white/10 p-4 rounded-xl relative hover:border-blue-500/40 transition-colors flex flex-col items-center text-center group">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="p-2.5 bg-white/5 rounded-lg mb-3 group-hover:bg-blue-500/10 transition-colors">
                  {node.icon}
                </div>
                <h4 className="text-white font-bold text-sm font-sans">{node.label}</h4>
                <p className="text-gray-400 text-xs mt-1 leading-snug">{node.desc}</p>
              </div>
              {i < nodes.length - 1 && (
                <div className="hidden md:flex justify-center text-gray-600">
                  <ArrowRight className="animate-pulse" size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-blue-400 font-mono font-bold tracking-wide uppercase">Pipeline Overview</p>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">
            JobSnap leverages background processes to fetch jobs from multiple endpoints and stores them. Once a user uploads a CV,
            our parsers extract keywords and feed them into the matching core, which compares structural alignment. High-score fits are queued
            and dispatched in daily automated summaries.
          </p>
        </div>
      </div>
    );
  };

  const renderTogcode = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="bg-[#0e0e11] border border-white/10 p-5 rounded-xl text-center flex flex-col items-center">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 mb-3">
              <Users size={24} />
            </div>
            <h4 className="text-white font-bold text-sm">Collaborators (Clients)</h4>
            <p className="text-gray-400 text-xs mt-1">Multi-user React interfaces sending live editor diff changes</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-green-400 font-mono text-[10px] uppercase font-bold animate-pulse">
              WebSocket Protocol
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 hidden md:block" />
            <div className="text-gray-500 font-sans text-xs">Real-Time Sync Gateway</div>
          </div>

          <div className="bg-[#0e0e11] border border-white/10 p-5 rounded-xl text-center flex flex-col items-center">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 mb-3">
              <Cpu size={24} />
            </div>
            <h4 className="text-white font-bold text-sm">Node.js WebSocket Hub</h4>
            <p className="text-gray-400 text-xs mt-1">Broadcasts operational transformations to sync workspaces securely</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-purple-400 font-mono font-bold tracking-wide uppercase">Synchronization Model</p>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">
            Togcode is built on top of robust WebSocket state-sharing. When client changes occur, the delta changes are packaged
            and piped through an encrypted socket event. The Node server evaluates incoming transformations and broadcasts updates to peers in less than 50ms.
          </p>
        </div>
      </div>
    );
  };

  const renderTalkSphere = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 bg-[#0e0e11] border border-white/10 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">E2E Cryptographic Model</h4>
              <p className="text-gray-400 text-xs mt-1">Messages are encrypted client-side using robust AES-GCM before transport.</p>
            </div>
          </div>

          <div className="flex-1 bg-[#0e0e11] border border-white/10 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Tamper Detection Engine</h4>
              <p className="text-gray-400 text-xs mt-1">Verifies file integrity via SHA-256 hash checksums during transit.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-green-400 font-mono font-bold tracking-wide uppercase">Security Architecture</p>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">
            TalkSphere routes zero raw text. All messaging and secure file transfers are sealed in cryptographic envelopes. Handshake operations
            negotiate unique ephemeral keys, protecting discussions against man-in-the-middle attacks.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#0a0a0c]/60 border border-white/10 p-6 rounded-2xl glow-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="text-blue-500" size={20} />
            System Architecture Showcase
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-sans">
            Interactive blueprints of how I build end-to-end software pipelines.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveProject("jobsnap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeProject === "jobsnap"
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            JobSnap (AI Engine)
          </button>
          <button
            onClick={() => setActiveProject("togcode")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeProject === "togcode"
                ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Togcode (WebSockets)
          </button>
          <button
            onClick={() => setActiveProject("talksphere")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeProject === "talksphere"
                ? "bg-green-600 text-white font-bold shadow-md shadow-green-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            TalkSphere (Security)
          </button>
        </div>
      </div>

      <div className="min-h-[220px]">
        {activeProject === "jobsnap" && renderJobSnap()}
        {activeProject === "togcode" && renderTogcode()}
        {activeProject === "talksphere" && renderTalkSphere()}
      </div>
    </div>
  );
}
