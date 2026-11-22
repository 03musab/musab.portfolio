import { SITE } from "./site";

export interface GitHubRepoSummary {
  name: string;
  displayName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  homepage?: string | null;
  updatedAt?: string;
}

export interface LanguageShareItem {
  language: string;
  count: number;
  percent: number;
  color: string;
}

export interface GitCommitItem {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

export interface GitHubSummary {
  username: string;
  publicRepos: number;
  totalStars: number;
  lastYearContributions: number;
  activeDays: number;
  peakDay: {
    count: number;
    date: string;
  };
  topLanguages: string[];
  languageShare: LanguageShareItem[];
  repos: GitHubRepoSummary[];
  recentRepos: GitHubRepoSummary[];
  recentCommits: GitCommitItem[];
  source: "live" | "fallback";
}

export const LANG_COLORS: Record<string, string> = {
  JavaScript: "#60a5fa",
  TypeScript: "#3b82f6",
  Python: "#2dd4bf",
  HTML: "#6366f1",
  CSS: "#818cf8",
  PHP: "#64748b",
  Jupyter: "#38bdf8",
};

const FEATURED_REPO_NAMES = [
  "ai_job_agent",
  "togcode",
  "APSIT-Chat-app",
  "Resume-Builder-main",
  "chatbot-therapist",
  "NLP_based-Homework-Helper",
];

const PLAIN_REPO_CATALOG: Record<
  string,
  { displayName: string; description: string }
> = {
  ai_job_agent: {
    displayName: "JobSnap",
    description:
      "Automatic job search assistant that gathers openings, matches resumes, and tracks applications.",
  },
  togcode: {
    displayName: "Togcode",
    description:
      "Live shared coding room and visual planning board for instant team collaboration.",
  },
  "apsit-chat-app": {
    displayName: "TalkSphere",
    description:
      "Private encrypted chat and file sharing app built to keep conversations confidential.",
  },
  "resume-builder-main": {
    displayName: "Resume Builder",
    description:
      "Clean web app to design, edit, and download polished resumes effortlessly.",
  },
  "chatbot-therapist": {
    displayName: "Companion Chat",
    description:
      "Friendly AI chat assistant that recognizes mood and shares helpful guidance.",
  },
  "nlp_based-homework-helper": {
    displayName: "Homework Helper",
    description:
      "Smart AI study assistant that reads student questions and explains answers step by step.",
  },
  "krishi-sangam": {
    displayName: "Krishi-Sangam",
    description:
      "Agriculture platform for renting farm equipment, leasing land, and booking workers across languages.",
  },
};

function formatFriendlyRepoName(rawName: string): string {
  const known = PLAIN_REPO_CATALOG[rawName.toLowerCase()];
  if (known) return known.displayName;
  return rawName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function humanizeRepoDescription(
  rawName: string,
  rawDesc: string | null | undefined,
  language?: string | null,
): string {
  const known = PLAIN_REPO_CATALOG[rawName.toLowerCase()];
  if (known) return known.description;
  if (!rawDesc) {
    return `Public ${language || "software"} project built to solve an everyday need.`;
  }
  return rawDesc
    .replace(/Streamlit-powered AI assistant/gi, "Smart interactive AI helper")
    .replace(/Flask-based web application/gi, "Automated web app")
    .replace(/natural language processing/gi, "everyday language understanding")
    .replace(/agent-based reasoning/gi, "step-by-step smart thinking")
    .replace(/interpret queries/gi, "understand questions")
    .replace(/retrieve relevant information/gi, "find useful answers")
    .replace(/generate structured answers in real time/gi, "explain answers clearly right away")
    .replace(/REST(?:ful)? APIs?/gi, "web connections")
    .replace(/end-to-end encrypted/gi, "private encrypted")
    .replace(/repository/gi, "project");
}

const FALLBACK_REPOS: GitHubRepoSummary[] = [
  {
    name: "ai_job_agent",
    displayName: PLAIN_REPO_CATALOG.ai_job_agent.displayName,
    description: PLAIN_REPO_CATALOG.ai_job_agent.description,
    language: "Python",
    stars: 2,
    forks: 0,
    url: "https://github.com/03musab/ai_job_agent",
    homepage: "https://aijobsnap.vercel.app/",
    updatedAt: "2026-11-16T00:00:00Z",
  },
  {
    name: "togcode",
    displayName: PLAIN_REPO_CATALOG.togcode.displayName,
    description: PLAIN_REPO_CATALOG.togcode.description,
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/03musab/togcode",
    homepage: "https://togcode.vercel.app",
    updatedAt: "2026-08-20T00:00:00Z",
  },
  {
    name: "APSIT-Chat-app",
    displayName: PLAIN_REPO_CATALOG["apsit-chat-app"].displayName,
    description: PLAIN_REPO_CATALOG["apsit-chat-app"].description,
    language: "JavaScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/03musab/APSIT-Chat-app",
    homepage: "https://apsit-chat-frontend.onrender.com/",
    updatedAt: "2026-07-14T00:00:00Z",
  },
  {
    name: "Resume-Builder-main",
    displayName: PLAIN_REPO_CATALOG["resume-builder-main"].displayName,
    description: PLAIN_REPO_CATALOG["resume-builder-main"].description,
    language: "JavaScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/03musab/Resume-Builder-main",
    updatedAt: "2026-05-12T00:00:00Z",
  },
  {
    name: "chatbot-therapist",
    displayName: PLAIN_REPO_CATALOG["chatbot-therapist"].displayName,
    description: PLAIN_REPO_CATALOG["chatbot-therapist"].description,
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/03musab/chatbot-therapist",
    updatedAt: "2026-04-08T00:00:00Z",
  },
  {
    name: "NLP_based-Homework-Helper",
    displayName: PLAIN_REPO_CATALOG["nlp_based-homework-helper"].displayName,
    description: PLAIN_REPO_CATALOG["nlp_based-homework-helper"].description,
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/03musab/NLP_based-Homework-Helper",
    updatedAt: "2026-03-19T00:00:00Z",
  },
];

const FALLBACK_LANGUAGE_SHARE: LanguageShareItem[] = [
  { language: "Python", count: 11, percent: 42, color: LANG_COLORS.Python },
  { language: "JavaScript", count: 9, percent: 35, color: LANG_COLORS.JavaScript },
  { language: "TypeScript", count: 4, percent: 15, color: LANG_COLORS.TypeScript },
  { language: "HTML", count: 2, percent: 8, color: LANG_COLORS.HTML },
];

const FALLBACK_COMMITS: GitCommitItem[] = [
  {
    sha: "2cf50ee",
    message: "feat: add mobile navigation drawer and improve responsive menu UI",
    repo: "Krishi-Sangam",
    date: "2026-11-16T17:39:58Z",
    url: "https://github.com/03musab/Krishi-Sangam/commit/2cf50eedefc3b97be332d6a78ab0369719337b51",
  },
  {
    sha: "6276040",
    message:
      "refactor: update client components, server routes, and startup scripts for full-stack application enhancement",
    repo: "Krishi-Sangam",
    date: "2026-11-16T15:55:45Z",
    url: "https://github.com/03musab/Krishi-Sangam/commit/627604058f32b2e7d01a507ce6bf3e736a2a086e",
  },
  {
    sha: "a5461ff",
    message:
      "fix: handle case-insensitive usernames and robust database error handling in auth flow",
    repo: "ai_job_agent",
    date: "2026-11-16T15:54:56Z",
    url: "https://github.com/03musab/ai_job_agent/commit/a5461ff8dd4a4f7fb3d7d3a600614cdb2ff015d0",
  },
  {
    sha: "e4a2d90",
    message:
      "refactor: improve Google OAuth configuration and add comprehensive app tests",
    repo: "ai_job_agent",
    date: "2026-11-14T15:54:31Z",
    url: "https://github.com/03musab/ai_job_agent/commit/e4a2d90a10aad1d8319ca340277b654ced3e58ec",
  },
  {
    sha: "fa152e3",
    message:
      "feat: implement full-stack agricultural platform with equipment rental, land leasing, labor booking, and multilingual support",
    repo: "Krishi-Sangam",
    date: "2026-10-18T14:32:06Z",
    url: "https://github.com/03musab/Krishi-Sangam/commit/fa152e37821584d18d5cd567348f9c040c721b60",
  },
  {
    sha: "40fc7c9",
    message:
      "feat: Implement core application UI and functionality including chat, file explorer, console, authentication, and real-time AI-powered collaboration.",
    repo: "togcode",
    date: "2026-03-16T02:12:30Z",
    url: "https://github.com/03musab/togcode/commit/40fc7c98b33c26fb152de0e17904d466bc6bcbf3",
  },
];

interface RawGitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
}

interface RawGitHubUser {
  public_repos: number;
}

interface RawContributionsResponse {
  total?: { lastYear?: number };
  contributions?: Array<{ date: string; count: number; level: number }>;
}

interface RawGitHubCommit {
  sha?: string;
  html_url?: string;
  author?: { login?: string | null } | null;
  commit?: {
    message?: string;
    author?: { name?: string | null; date?: string | null } | null;
    committer?: { date?: string | null } | null;
  };
}

function isAutomatedOrMergeCommit(raw: RawGitHubCommit): boolean {
  const login = raw.author?.login?.toLowerCase() ?? "";
  const authorName = raw.commit?.author?.name?.toLowerCase() ?? "";
  const headline = raw.commit?.message?.split("\n")[0]?.trim() ?? "";

  if (!raw.sha || !headline) return true;
  if (login.includes("[bot]") || authorName.includes("[bot]")) return true;
  if (headline.includes("[skip ci]")) return true;
  if (
    headline.startsWith("Merge branch ") ||
    headline.startsWith("Merge pull request ")
  ) {
    return true;
  }
  return false;
}

function isDescriptiveCommit(headline: string): boolean {
  const lower = headline.toLowerCase();
  if (lower === "changes" || lower === "update" || lower === "wip") return false;
  if (lower.startsWith("update readme") || lower.startsWith("create readme")) {
    return false;
  }
  return headline.length >= 12 || headline.includes(":");
}

async function fetchCommitsForRepos(
  username: string,
  repos: RawGitHubRepo[],
  headers: Record<string, string>,
): Promise<GitCommitItem[]> {
  const sortedByPush = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
  const targets = sortedByPush.slice(0, 4);
  if (targets.length === 0) return [];

  const outcomes = await Promise.allSettled(
    targets.map(async (repo) => {
      const res = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/commits?author=${encodeURIComponent(username)}&per_page=8`,
        {
          headers,
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(3500),
        },
      );
      if (!res.ok) return [] as GitCommitItem[];
      const data = (await res.json()) as RawGitHubCommit[];
      if (!Array.isArray(data)) return [] as GitCommitItem[];

      const valid = data.filter((item) => !isAutomatedOrMergeCommit(item));
      const descriptive = valid.filter((item) =>
        isDescriptiveCommit(item.commit?.message?.split("\n")[0]?.trim() ?? ""),
      );
      const chosen = descriptive.length > 0 ? descriptive : valid;

      return chosen.slice(0, 4).map((item) => ({
        sha: (item.sha ?? "").slice(0, 7),
        message: item.commit?.message?.split("\n")[0]?.trim() ?? "",
        repo: repo.name,
        date:
          item.commit?.author?.date ??
          item.commit?.committer?.date ??
          repo.pushed_at,
        url: item.html_url ?? `${repo.html_url}/commit/${item.sha ?? ""}`,
      }));
    }),
  );

  const seenSha = new Set<string>();
  const collected: GitCommitItem[] = [];
  for (const outcome of outcomes) {
    if (outcome.status !== "fulfilled") continue;
    for (const commit of outcome.value) {
      if (!commit.sha || seenSha.has(commit.sha)) continue;
      seenSha.add(commit.sha);
      collected.push(commit);
    }
  }

  return collected
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
}

/**
 * Fetches live public GitHub profile, repository metadata, authored commits, and
 * 12-month contribution metrics with 1-hour Next.js ISR revalidation and fallbacks.
 */
export async function fetchGitHubSummary(): Promise<GitHubSummary> {
  const username = SITE.githubUsername;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "musab-portfolio",
  };

  let publicRepos = 29;
  let totalStars = FALLBACK_REPOS.reduce((sum, r) => sum + r.stars, 0);
  let topLanguages = ["Python", "JavaScript", "TypeScript", "HTML"];
  let languageShare = FALLBACK_LANGUAGE_SHARE;
  let curatedRepos = FALLBACK_REPOS;
  let recentRepos = FALLBACK_REPOS;
  let recentCommits = FALLBACK_COMMITS;
  let lastYearContributions = 143;
  let activeDays = 54;
  let peakDay = { count: 20, date: "2026-08-24" };
  let source: "live" | "fallback" = "fallback";

  const [userOutcome, reposOutcome, contribOutcome] = await Promise.allSettled([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3500),
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3500),
    }),
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3500),
    }),
  ]);

  if (
    userOutcome.status === "fulfilled" &&
    userOutcome.value.ok &&
    reposOutcome.status === "fulfilled" &&
    reposOutcome.value.ok
  ) {
    try {
      const user = (await userOutcome.value.json()) as RawGitHubUser;
      const rawRepos = (await reposOutcome.value.json()) as RawGitHubRepo[];
      const ownRepos = rawRepos.filter((r) => !r.fork);

      publicRepos = user.public_repos ?? publicRepos;
      totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

      const langCounts = new Map<string, number>();
      for (const r of ownRepos) {
        if (r.language) {
          langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
        }
      }

      const sortedLangs = Array.from(langCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);
      const langTotal = sortedLangs.reduce((sum, [, count]) => sum + count, 0) || 1;

      if (sortedLangs.length > 0) {
        topLanguages = sortedLangs.map(([lang]) => lang);
        languageShare = sortedLangs.map(([language, count]) => ({
          language,
          count,
          percent: Math.max(4, Math.round((count / langTotal) * 100)),
          color: LANG_COLORS[language] || "#5b8cff",
        }));
      }

      const byName = new Map(ownRepos.map((r) => [r.name.toLowerCase(), r]));
      curatedRepos = FEATURED_REPO_NAMES.map((repoName) => {
        const live = byName.get(repoName.toLowerCase());
        const fallback = FALLBACK_REPOS.find(
          (f) => f.name.toLowerCase() === repoName.toLowerCase(),
        )!;
        if (!live) return fallback;
        return {
          name: live.name,
          displayName: formatFriendlyRepoName(live.name),
          description: humanizeRepoDescription(
            live.name,
            live.description,
            live.language,
          ),
          language: live.language || fallback.language,
          stars: live.stargazers_count ?? fallback.stars,
          forks: live.forks_count ?? fallback.forks,
          url: live.html_url || fallback.url,
          homepage: live.homepage || fallback.homepage,
          updatedAt: live.pushed_at,
        };
      });

      const liveRecent = ownRepos.slice(0, 6).map((r) => ({
        name: r.name,
        displayName: formatFriendlyRepoName(r.name),
        description: humanizeRepoDescription(r.name, r.description, r.language),
        language: r.language || "Code",
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        url: r.html_url,
        homepage: r.homepage,
        updatedAt: r.pushed_at,
      }));
      if (liveRecent.length > 0) recentRepos = liveRecent;

      const liveCommits = await fetchCommitsForRepos(username, ownRepos, headers);
      if (liveCommits.length > 0) recentCommits = liveCommits;

      source = "live";
    } catch {
      /* keep fallbacks */
    }
  }

  if (contribOutcome.status === "fulfilled" && contribOutcome.value.ok) {
    try {
      const contribData = (await contribOutcome.value.json()) as RawContributionsResponse;
      const days = contribData.contributions ?? [];
      if (typeof contribData.total?.lastYear === "number") {
        lastYearContributions = contribData.total.lastYear;
      }
      if (days.length > 0) {
        const active = days.filter((d) => d.count > 0);
        activeDays = active.length;
        peakDay = active.reduce(
          (max, cur) => (cur.count > max.count ? { count: cur.count, date: cur.date } : max),
          { count: 0, date: "" },
        );
      }
    } catch {
      /* keep fallbacks */
    }
  }

  return {
    username,
    publicRepos,
    totalStars,
    lastYearContributions,
    activeDays,
    peakDay,
    topLanguages,
    languageShare,
    repos: curatedRepos,
    recentRepos,
    recentCommits,
    source,
  };
}
