export const siteConfig = {
  name: "Harshita Ranka",
  fullName: "Harshita Vivek Ranka",
  title: "Software Engineer",
  roleLine: "Software Engineer · Backend · Agents · Blockchain · Fintech",
  // Alternates for the hero headline (edit freely):
  // 1. "Building things that don't *break.*"
  // 2. "Shipping systems that survive *failure.*"
  // 3. "Reliability first. Pixel cats *second.*"
  heroHeadline: "Building things that don't *break.*",
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
    publishDesignDocs: false,
    soundDefault: false,
    cursorCatDefaultDesktop: false,
    cursorCatDefaultMobile: false,
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshitaranka.dev",
  nav: [
    { href: "/work", label: "Work", pill: false },
    { href: "/work/d2c-ecommerce", label: "Flagship", pill: false },
    { href: "/notes", label: "Design notes", pill: false },
    { href: "/labs", label: "Labs", pill: false },
    { href: "/experience", label: "Experience", pill: false },
    { href: "/resumes", label: "Résumé", pill: true },
    { href: "/beyond-code", label: "Beyond code", pill: false },
    { href: "/about", label: "About", pill: false },
    { href: "/contact", label: "Contact", pill: true },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
