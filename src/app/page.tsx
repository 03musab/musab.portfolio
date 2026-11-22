import RightSidebar from "@/components/RightSidebar";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import StoryThesisSection from "@/components/StoryThesisSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import GitHubSection from "@/components/GitHubSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import WhiteStageBackdrop from "@/components/WhiteStageBackdrop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { fetchGitHubSummary } from "@/lib/github";

export default async function Page() {
  const githubSummary = await fetchGitHubSummary();

  return (
    <div className="relative z-10 flex min-h-screen flex-col bg-[#05070b] font-sans text-foreground">
      <ScrollProgress />
      <RightSidebar />

      <main className="flex-1 md:pr-14 xl:pr-0">
        {/* ── STAGE 1: OBSIDIAN BLACK (INTRO & GLOBE) ─────────── */}
        <div data-theme="black" className="relative z-10 bg-[#05070b]">
          <HeroSection />
        </div>

        {/* ── SEAMLESS BLACK -> WHITE ATMOSPHERE BRIDGE ───────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 h-44 w-full sm:h-60"
          style={{
            background:
              "linear-gradient(to bottom, #05070b 0%, #0b1019 16%, #1c2434 34%, #475368 52%, #8693a7 68%, #c7d3e1 82%, #eaf1f8 93%, #fbfdff 100%)",
          }}
        />

        {/* ── STAGE 2: AIRY MINT & ICE-AQUA STUDIO WHITE STAGE ── */}
        <div
          id="white-stage"
          data-theme="white"
          className="relative z-10 overflow-clip bg-[#fbfdff]"
        >
          <WhiteStageBackdrop />

          <div className="relative z-10">
            <StoryThesisSection />
            <ProjectsSection />
            <JourneySection />
          </div>
        </div>

        {/* ── SEAMLESS WHITE -> BLACK ATMOSPHERE BRIDGE ───────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 h-44 w-full sm:h-60"
          style={{
            background:
              "linear-gradient(to bottom, #fbfdff 0%, #eaf1f8 8%, #c7d3e1 20%, #8693a7 36%, #475368 52%, #1c2434 70%, #0b1019 86%, #05070b 100%)",
          }}
        />

        {/* ── STAGE 3: OBSIDIAN BLACK (ACTIVITY & BLACK HOLE) ─── */}
        <div data-theme="black" className="relative z-10 bg-[#05070b]">
          <GitHubSection summary={githubSummary} />
          <SkillsSection />
        </div>

        {/* ── SEAMLESS OBSIDIAN -> COSMIC TWILIGHT BRIDGE ─────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 h-36 w-full sm:h-48"
          style={{
            background:
              "linear-gradient(to bottom, #05070b 0%, #070812 22%, #0b0b1d 48%, #0f0e26 75%, #12102b 100%)",
          }}
        />

        {/* ── STAGE 4: COSMIC TWILIGHT INDIGO-VIOLET (CONTACT) ── */}
        <div
          data-theme="black"
          className="relative z-10 bg-gradient-to-b from-[#12102b] via-[#1b1842] to-[#12102b]"
        >
          <ContactSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
