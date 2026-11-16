import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const FORBIDDEN = [
  /TODO_FROM_HARSHITA/i,
  /\bTODO\b/,
  /Photo slot/i,
  /Slot [123]/i,
  /portfolio brief/i,
  /resume-safe/i,
  /attached design docs/i,
  /Audit mode/i,
  /publishDesignDocs/i,
  /Step statuses live in data/i,
  /Modeled on/i,
  /not a wholesale copy/i,
  /listed on resume/i,
  /Filter by poking/i,
  /layout ideas only/i,
  /from the resume/i,
  /placeholder/i,
];

// Command palette input placeholder attribute is fine; skip that file pattern for "placeholder"
const ALLOW_PLACEHOLDER_FILES = new Set([
  "CommandPalette.tsx",
]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts|jsx|js|mdx)$/.test(name)) acc.push(p);
  }
  return acc;
}

const roots = [join(process.cwd(), "src")];
const files = roots.flatMap((r) => walk(r));
const hits = [];

for (const file of files) {
  const base = file.split("/").pop();
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.source === "placeholder" || /placeholder/i.test(re.source)) {
        if (ALLOW_PLACEHOLDER_FILES.has(base) && /placeholder=/.test(line)) continue;
        if (/placeholder/i.test(line) && !/TODO/i.test(line) && !/Photo placeholder/i.test(line) && !ALLOW_PLACEHOLDER_FILES.has(base)) {
          // allow HTML placeholder= attrs elsewhere if only that
          if (/placeholder=/.test(line) && !/Photo placeholder|placeholder —|placeholder:/i.test(line)) continue;
        }
      }
      if (re.test(line)) {
        // allow verificationUrl internal data value only if we rewrite it - fail for now
        hits.push(`${file}:${i + 1}: ${line.trim().slice(0, 120)}`);
        break;
      }
    }
  });
}

if (hits.length) {
  console.error(`lint:copy failed — ${hits.length} visitor-facing offenders:\n`);
  for (const h of hits.slice(0, 80)) console.error(" -", h);
  if (hits.length > 80) console.error(` ...and ${hits.length - 80} more`);
  process.exit(1);
}

console.log("lint:copy OK");
