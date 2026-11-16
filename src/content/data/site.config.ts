export const siteConfig = {
  name: "Harshita Ranka",
  fullName: "Harshita Vivek Ranka",
  title: "Software Engineer",
  roleLine: "Software Engineer · Backend · Agents · Blockchain · Fintech",
  heroHeadline: "Building reliable software for backends, agents, and commerce.",
  valueProp:
    "I like creating software that stays up when everything else fails. Backend systems, agent evaluations, and commerce platforms designed around failure modes.",
  location: "Mumbai, India",
  education: "B.Tech Computer Engineering, MPSTME, NMIMS Mumbai",
  classOf: 2026,
  graduationLabel: "June 2026",
  cgpa: "3.95/4",
  email: "harshitaranka2004@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/harshita-vivek-ranka",
    github: "https://github.com/hvrdummy123",
    email: "mailto:harshitaranka2004@gmail.com",
  },
  mascot: {
    name: "Mochi",
    palette: "cream" as const,
  },
  availability: "Available immediately · Open to relocation",
  featureFlags: {
    analytics: false,
    contactForm: false,
    designDocsPublic: false,
    soundDefault: false,
    cursorCatDefaultDesktop: false,
    cursorCatDefaultMobile: false,
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-psi-lovat-90.vercel.app",
  navPrimary: [
    { href: "/work", label: "Work" },
    { href: "/notes", label: "Notes" },
    { href: "/labs", label: "Labs" },
    { href: "/experience", label: "Experience" },
    { href: "/resumes", label: "Résumé" },
    { href: "/contact", label: "Contact" },
  ],
  navMore: [
    { href: "/about", label: "About" },
    { href: "/puzzles", label: "Puzzles" },
    { href: "/arcade", label: "Arcade" },
    { href: "/stack", label: "Stack" },
  ],
  mobileTabs: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/work", label: "Work", icon: "work" },
    { href: "/labs", label: "Labs", icon: "lab" },
    { href: "/resumes", label: "Résumé", icon: "note" },
    { href: "/contact", label: "Contact", icon: "person" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
