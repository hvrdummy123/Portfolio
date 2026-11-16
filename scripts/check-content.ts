/**
 * Build-time content guard. Fails if visitor-facing source contains
 * placeholder / internal / builder-speak strings.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const FORBIDDEN: { re: RegExp; why: string }[] = [
  { re: /\bTODO_FROM_HARSHITA\b/i, why: "TODO_FROM_HARSHITA" },
  { re: /\bTODO_FROM\b/i, why: "TODO_FROM" },
  { re: /\bFIXME\b/, why: "FIXME" },
  { re: /\blorem\b/i, why: "lorem" },
  { re: /\bresume-safe\b/i, why: "resume-safe" },
  { re: /\bpublishDesignDocs\b/i, why: "publishDesignDocs" },
  { re: /attached design docs/i, why: "attached design docs" },
  { re: /portfolio brief/i, why: "portfolio brief" },
  { re: /Photo slot/i, why: "Photo slot" },
  { re: /No sample media in the repo yet/i, why: "missing-media message" },
  { re: /Photos coming soon/i, why: "coming soon" },
  { re: /\bcoming soon\b/i, why: "coming soon" },
  { re: /\bnot yet\b/i, why: "not yet" },
  { re: /Step statuses live in data/i, why: "step statuses leak" },
];

/** Stricter "placeholder" / "brief" / bare TODO — with allowlists */
const PLACEHOLDER_RE = /\bplaceholder\b/i;
const BRIEF_RE = /\bbrief\b/i;
const TODO_RE = /\bTODO\b/;

const SCAN_DIRS = ["src", "content"];
const SKIP_DIR = new Set([
  "node_modules",
  ".next",
  "out",
  "research", // PDFs / extracted research may contain words
]);
const SKIP_FILE = new Set([
  "check-content.ts",
  "lint-copy.mjs",
  "content-check.mjs",
  "CONTENT_TODO.md",
]);

const ALLOW_PLACEHOLDER_ATTR = /placeholder\s*=/;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts|jsx|js|mdx|json|md)$/.test(name) && !SKIP_FILE.has(name)) {
      acc.push(p);
    }
  }
  return acc;
}

const hits: string[] = [];

for (const root of SCAN_DIRS.map((d) => join(ROOT, d))) {
  let files: string[] = [];
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const rel = relative(ROOT, file);
    // Internal docs / prompts outside visitor surface — skip repo root prompts
    if (rel.startsWith("docs/") && rel.includes("audit")) continue;
    if (rel === "CONTENT_TODO.md") continue;

    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      for (const { re, why } of FORBIDDEN) {
        if (re.test(line)) {
          hits.push(`${rel}:${i + 1}: [${why}] ${line.trim().slice(0, 100)}`);
          return;
        }
      }
      if (PLACEHOLDER_RE.test(line)) {
        if (ALLOW_PLACEHOLDER_ATTR.test(line) && !/Photo placeholder|placeholder —/i.test(line)) {
          // ok: HTML input placeholder=
        } else {
          hits.push(`${rel}:${i + 1}: [placeholder] ${line.trim().slice(0, 100)}`);
          return;
        }
      }
      if (BRIEF_RE.test(line) && /portfolio\s+brief|brief\s+requirement/i.test(line)) {
        hits.push(`${rel}:${i + 1}: [brief] ${line.trim().slice(0, 100)}`);
        return;
      }
      if (TODO_RE.test(line) && !/TODO_FROM/.test(line)) {
        // Allow comments in scripts that mention the word as a pattern string only if quoted as regex source in guard — already skipped
        hits.push(`${rel}:${i + 1}: [TODO] ${line.trim().slice(0, 100)}`);
      }
    });
  }
}

if (hits.length) {
  console.error(`check-content failed — ${hits.length} offender(s):\n`);
  for (const h of hits.slice(0, 80)) console.error(" -", h);
  if (hits.length > 80) console.error(` ...and ${hits.length - 80} more`);
  process.exit(1);
}

console.log("check-content OK");
