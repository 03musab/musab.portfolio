"use client";

import { Drawer } from "vaul";
import { ExternalLink, X } from "lucide-react";
import ProjectArchitectureView, { type ProjectId } from "./ProjectArchitectureView";
import { GithubIcon } from "./icons";

export interface StoryBeat {
  stage: "The Problem" | "What I Built" | "The Result";
  text: string;
}

export interface ProjectChapter {
  id: ProjectId;
  chapter: string;
  name: string;
  subtitle: string;
  tag: string;
  storyTitle: string;
  beats: StoryBeat[];
  tradeoff: string;
  highlights: string[];
  tech: string[];
  github: string;
  live: string;
  accent: string;
}

export default function ProjectCaseDrawer({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectChapter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-xs" />
        <Drawer.Content
          data-theme="white"
          className="liquid-glass-strong fixed inset-x-2 bottom-0 z-[75] mx-auto flex max-h-[92dvh] max-w-4xl flex-col overflow-hidden rounded-t-3xl text-foreground outline-none sm:inset-x-6"
        >
          <div className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-line" />

          {project && (
            <div
              data-lenis-prevent
              className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-3.5 sm:px-7 sm:pb-7 sm:pt-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-3.5">
                <div className="space-y-0.5">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: project.accent }}
                  >
                    {project.chapter} · {project.tag}
                  </p>
                  <Drawer.Title className="font-display text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
                    {project.name}
                  </Drawer.Title>
                  <Drawer.Description className="font-mono text-xs text-muted-foreground">
                    {project.subtitle}
                  </Drawer.Description>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-compact group py-1.5 pl-4 pr-1.5"
                  >
                    <span>Open app</span>
                    <span className="btn-lens-orb !size-6">
                      <ExternalLink size={11} />
                    </span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    <GithubIcon size={13} />
                    <span>View code</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close drawer"
                    className="btn-icon size-9"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  How It Works — click any step to see details
                </p>
                <div className="overflow-hidden rounded-2xl border border-line">
                  <ProjectArchitectureView projectId={project.id} />
                </div>
              </div>

              <div className="mt-5 grid gap-5 border-t border-line pt-4 sm:grid-cols-12">
                <div className="space-y-2 sm:col-span-7">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Main Features
                  </h4>
                  <ul className="space-y-1.5 text-[13px] leading-relaxed text-foreground/85">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3.5 sm:col-span-5">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Why I Built It This Way
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {project.tradeoff}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Tools Used
                    </h4>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-foreground/85">
                      {project.tech.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
