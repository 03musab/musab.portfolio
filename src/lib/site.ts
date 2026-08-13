export const SITE = {
  name: "Mohammed Musab",
  fullName: "Shaikh Mohammed Musab",
  tagline: "Full-Stack Engineer & AI Builder",
  email: "musabimp.0@gmail.com",
  github: "https://github.com/03musab",
  linkedin: "https://www.linkedin.com/in/devmusab/",
  resume:
    "https://drive.google.com/file/d/1ZvfUMpGDdJFGXA2mjfnwXyQcRbZ8HAoL/view?usp=sharing",
  location: "Mumbai, India",
  responsePromise: "Avg. response time: under 24 hours",
} as const;

/** Anchor targets for the single-page homepage sections. */
export const SECTION_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Timeline", href: "/#experience" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;
