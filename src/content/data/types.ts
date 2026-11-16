import { z } from "zod";

export const StatusSchema = z.enum([
  "shipped",
  "built",
  "designed",
  "in-progress",
]);
export type Status = z.infer<typeof StatusSchema>;

export const RoleSchema = z.enum([
  "backend",
  "fullstack",
  "ai-agents",
  "blockchain",
  "quant-fintech",
]);
export type Role = z.infer<typeof RoleSchema>;

export const StackItemSchema = z.object({
  name: z.string(),
  layer: z.string(),
  why: z.string().optional(),
  alternative: z.string().optional(),
});

export const StatSchema = z.object({
  label: z.string(),
  value: z.string(),
  source: z.string(),
  href: z.string().optional(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  pitch: z.string(),
  year: z.number(),
  status: StatusSchema,
  kind: z.enum(["github", "work", "personal"]),
  roles: z.array(RoleSchema),
  weight: z.record(RoleSchema, z.number()),
  stack: z.array(StackItemSchema),
  stats: z.array(StatSchema),
  links: z.object({
    repo: z.string().optional(),
    live: z.string().optional(),
    docs: z.string().optional(),
    writeup: z.string().optional(),
  }),
  qa: z.array(z.object({ q: z.string(), a: z.string() })),
  decisions: z.array(
    z.object({
      context: z.string(),
      decision: z.string(),
      consequence: z.string(),
    }),
  ),
  roadmap: z.array(z.string()),
  domainTags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sourceNote: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ResumeVariantSchema = z.object({
  role: RoleSchema,
  slug: z.string(),
  title: z.string(),
  headline: z.string(),
  summary: z.string(),
  skillsOrder: z.array(z.string()),
  projectOrder: z.array(z.string()),
  experienceHighlights: z.array(z.string()),
  whyThisVersion: z.string(),
});

export type ResumeVariant = z.infer<typeof ResumeVariantSchema>;

export const NoteSchema = z.object({
  slug: z.string(),
  title: z.string(),
  series: z.string().optional(),
  part: z.number().optional(),
  topics: z.array(z.string()),
  format: z.enum(["essay", "lab"]),
  date: z.string(),
  readingMinutes: z.number(),
  draft: z.boolean(),
  excerpt: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;

export const STATUS_LABELS: Record<Status, string> = {
  shipped: "Shipped",
  built: "Built",
  designed: "Designed",
  "in-progress": "In progress",
};

export const ROLE_LABELS: Record<Role, string> = {
  backend: "Backend",
  fullstack: "Full-stack",
  "ai-agents": "AI & Agents",
  blockchain: "Blockchain",
  "quant-fintech": "Quant & Fintech",
};
