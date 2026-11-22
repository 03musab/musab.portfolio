export type OrbitStyle =
  | "ring"
  | "dual"
  | "hex"
  | "halo"
  | "ellipse"
  | "triad";

export interface ToolItem {
  id: string;
  name: string;
  meaning: string;
  svgSrc: string;
  invertOnDark?: boolean;
  lightRingOnDark?: boolean;
}

export interface SkillLayer {
  id: string;
  step: string;
  shortLabel: string;
  domain: string;
  storyTitle: string;
  storyText: string;
  realExample: string;
  accentHex: string;
  accentRgb: [number, number, number];
  orbitStyle: OrbitStyle;
  items: ToolItem[];
}

export const SKILL_LAYERS: SkillLayer[] = [
  {
    id: "screens",
    step: "01",
    shortLabel: "Screens",
    domain: "Websites & Screens",
    storyTitle: "1. You tap a button on screen",
    storyText:
      "Turns ideas into clean, fast screens that respond smoothly whether you open them on a phone or a laptop.",
    realExample: "Powering Luxure's online store and Togcode's shared room",
    accentHex: "#5b8cff",
    accentRgb: [0.36, 0.55, 1.0],
    orbitStyle: "ring",
    items: [
      {
        id: "react",
        name: "React",
        meaning: "Builds interactive screen parts that respond right away.",
        svgSrc: "/icons/tools/react.svg",
      },
      {
        id: "nextjs",
        name: "Next.js",
        meaning: "Runs fast, modern websites like this portfolio.",
        svgSrc: "/icons/tools/nextjs.svg",
        lightRingOnDark: true,
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        meaning: "Styles spacing, colors, and clean mobile layouts.",
        svgSrc: "/icons/tools/tailwind.svg",
      },
      {
        id: "bootstrap",
        name: "Bootstrap",
        meaning: "Ready-made grid and page helpers for quick websites.",
        svgSrc: "/icons/tools/bootstrap.svg",
      },
      {
        id: "html5",
        name: "HTML5 & CSS3",
        meaning: "The basic structure and design behind every webpage.",
        svgSrc: "/icons/tools/html5.svg",
      },
    ],
  },
  {
    id: "servers",
    step: "02",
    shortLabel: "Servers",
    domain: "Servers & Live Features",
    storyTitle: "2. The server handles your request",
    storyText:
      "Connects every click to user accounts, processes actions reliably, and keeps teammates updated in real time.",
    realExample: "Powering live edits in Togcode and shopping checkout flows",
    accentHex: "#7aa2ff",
    accentRgb: [0.48, 0.64, 1.0],
    orbitStyle: "dual",
    items: [
      {
        id: "nodejs",
        name: "Node.js",
        meaning: "Runs behind-the-scenes website servers smoothly.",
        svgSrc: "/icons/tools/nodejs.svg",
      },
      {
        id: "express",
        name: "Express.js",
        meaning: "Organizes sign-ins, carts, and server requests cleanly.",
        svgSrc: "/icons/tools/express.svg",
        invertOnDark: true,
      },
      {
        id: "flask",
        name: "Flask",
        meaning: "Lightweight Python server running behind JobSnap.",
        svgSrc: "/icons/tools/flask.svg",
        invertOnDark: true,
      },
      {
        id: "web-connections",
        name: "Web Connections",
        meaning: "Lets apps talk safely with outside services.",
        svgSrc: "/icons/tools/web-connections.svg",
      },
      {
        id: "live-updates",
        name: "Live Updates",
        meaning: "Shows edits on everyone's screen without refreshing.",
        svgSrc: "/icons/tools/live-updates.svg",
      },
    ],
  },
  {
    id: "storage",
    step: "03",
    shortLabel: "Memory",
    domain: "Databases & Background Tasks",
    storyTitle: "3. Data is saved & helpers run",
    storyText:
      "Stores accounts and order records reliably while sorting slow jobs automatically behind the scenes.",
    realExample: "Powering JobSnap's automated job matching & daily emails",
    accentHex: "#8e84ff",
    accentRgb: [0.56, 0.52, 1.0],
    orbitStyle: "hex",
    items: [
      {
        id: "celery",
        name: "Celery",
        meaning: "Runs heavy tasks in the background so pages stay quick.",
        svgSrc: "/icons/tools/celery.svg",
      },
      {
        id: "redis",
        name: "Redis",
        meaning: "Ultra-fast temporary memory keeping job queues moving.",
        svgSrc: "/icons/tools/redis.svg",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        meaning: "Flexible database for saving app data and user profiles.",
        svgSrc: "/icons/tools/mongodb.svg",
      },
      {
        id: "mysql",
        name: "MySQL",
        meaning: "Structured table database for organized records and orders.",
        svgSrc: "/icons/tools/mysql.svg",
      },
      {
        id: "sqlite",
        name: "SQLite",
        meaning: "Compact built-in database ideal for fast standalone apps.",
        svgSrc: "/icons/tools/sqlite.svg",
      },
      {
        id: "firebase",
        name: "Firebase",
        meaning: "Google's cloud storage and live room sync service.",
        svgSrc: "/icons/tools/firebase.svg",
      },
    ],
  },
  {
    id: "cloud",
    step: "04",
    shortLabel: "Cloud",
    domain: "Cloud & Privacy",
    storyTitle: "4. Cloud & privacy locks protect it",
    storyText:
      "Keeps apps running online 24/7 and locks private messages inside your device before anything gets sent.",
    realExample: "Powering TalkSphere's private lock & AWS / Oracle certifications",
    accentHex: "#4cc9f0",
    accentRgb: [0.3, 0.79, 0.94],
    orbitStyle: "halo",
    items: [
      {
        id: "aws",
        name: "Amazon Cloud (AWS)",
        meaning: "Cloud hosting, file storage, and automatic tasks.",
        svgSrc: "/icons/tools/aws.svg",
      },
      {
        id: "oracle",
        name: "Oracle Cloud",
        meaning: "Cloud infrastructure I am certified to design and manage.",
        svgSrc: "/icons/tools/oracle.svg",
      },
      {
        id: "privacy",
        name: "Privacy Encryption",
        meaning: "Locks messages and files before leaving your screen.",
        svgSrc: "/icons/tools/privacy.svg",
      },
      {
        id: "automation",
        name: "Web Automation",
        meaning: "Collects updates from websites automatically on schedule.",
        svgSrc: "/icons/tools/automation.svg",
      },
      {
        id: "github",
        name: "GitHub",
        meaning: "Stores code safely and tracks every improvement over time.",
        svgSrc: "/icons/tools/github.svg",
        invertOnDark: true,
      },
    ],
  },
  {
    id: "languages",
    step: "05",
    shortLabel: "Languages",
    domain: "Programming Languages",
    storyTitle: "5. Built with the right languages",
    storyText:
      "Each language serves a clear job — from Python AI scripts to interactive animations on your screen.",
    realExample: "Used across AI assistants, interactive apps, and databases",
    accentHex: "#2dd4bf",
    accentRgb: [0.18, 0.83, 0.75],
    orbitStyle: "ellipse",
    items: [
      {
        id: "python",
        name: "Python",
        meaning: "My primary language for AI tools, automation, and backends.",
        svgSrc: "/icons/tools/python.svg",
      },
      {
        id: "javascript",
        name: "JavaScript",
        meaning: "Powers interactive animations, buttons, and web apps.",
        svgSrc: "/icons/tools/javascript.svg",
      },
      {
        id: "typescript",
        name: "TypeScript",
        meaning: "JavaScript with safety checks to catch bugs before launch.",
        svgSrc: "/icons/tools/typescript.svg",
      },
      {
        id: "sql",
        name: "SQL",
        meaning: "Used to organize, search, and update saved databases.",
        svgSrc: "/icons/tools/sql.svg",
      },
      {
        id: "php",
        name: "PHP",
        meaning: "Server language used across classic website builds.",
        svgSrc: "/icons/tools/php.svg",
      },
    ],
  },
  {
    id: "mindset",
    step: "06",
    shortLabel: "Mindset",
    domain: "Core Fundamentals",
    storyTitle: "6. Held together by strong basics",
    storyText:
      "Strong problem-solving habits keep the entire app quick, tidy, and dependable as it grows.",
    realExample: "Built through B.E. Computer Engineering (8.37 / 10 Grade)",
    accentHex: "#a5b4fc",
    accentRgb: [0.65, 0.71, 0.99],
    orbitStyle: "triad",
    items: [
      {
        id: "problem-solving",
        name: "Problem Solving",
        meaning: "Breaking big challenges into clear step-by-step fixes.",
        svgSrc: "/icons/tools/problem-solving.svg",
      },
      {
        id: "speed-care",
        name: "Speed & Memory Care",
        meaning: "Keeping apps fast and lightweight as traffic grows.",
        svgSrc: "/icons/tools/speed-care.svg",
      },
      {
        id: "clean-structure",
        name: "Clean Code Structure",
        meaning: "Writing tidy software that is simple to expand later.",
        svgSrc: "/icons/tools/clean-structure.svg",
      },
    ],
  },
];
