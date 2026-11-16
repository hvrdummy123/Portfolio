export const siteConfig = {
  name: "Harshita Ranka",
  fullName: "Harshita Vivek Ranka",
  title: "Software Engineer",
  roleLine: "Software Engineer · Backend · Agents · Blockchain · Fintech",
  // Alternates for the hero headline (edit freely):
  // 1. "Building things that don't *break.*"
  // 2. "Shipping systems that survive *failure.*"
  // 3. "Reliability first. Pixel cats *second.*"
  heroHeadline: "I build software that *keeps working* when things go wrong.",
  valueProp:
    "Backend systems, agent evals, and commerce platforms — designed around failure modes, not demos that only work on the happy path.",
  location: "Mumbai, India",
  education: "B.Tech Computer Engineering, MPSTME, NMIMS Mumbai",
  classOf: 2026,
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
  availability:
    "Open to backend, full-stack, agent-engineering, blockchain and quant-fintech SWE roles.",
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
    { href: "/labs", label: "Labs" },
    { href: "/notes", label: "Notes" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
  ],
  navMore: [
    { href: "/work/d2c-ecommerce", label: "Flagship" },
    { href: "/beyond-code", label: "Beyond code" },
    { href: "/arcade", label: "Arcade" },
    { href: "/stack", label: "Stack" },
    { href: "/contact", label: "Contact" },
  ],
  mobileTabs: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/work", label: "Work", icon: "work" },
    { href: "/labs", label: "Labs", icon: "lab" },
    { href: "/resumes", label: "Résumé", icon: "note" },
    { href: "/about", label: "Menu", icon: "person" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
