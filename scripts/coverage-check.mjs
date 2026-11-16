import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const projectsPath = join(root, "src/content/data/projects.ts");
const src = readFileSync(projectsPath, "utf8");

const required = [
  "d2c-ecommerce",
  "zkp-kyc",
  "etf-backtesting",
  "nomura-engineering",
  "paybench",
  "mandarin-teacher",
  "incident-logger",
  "job-finder",
];

const missing = required.filter((slug) => !src.includes(`slug: "${slug}"`));
const pageMissing = required.filter((slug) => {
  if (slug === "d2c-ecommerce") {
    return !existsSync(join(root, "src/app/work/d2c-ecommerce/page.tsx"));
  }
  return !existsSync(join(root, "src/app/work/[slug]/page.tsx"));
});

if (missing.length) {
  console.error("Missing project entries:", missing.join(", "));
  process.exit(1);
}

console.log("coverage:check OK —", required.length, "projects present");
if (pageMissing.length) {
  console.warn("Note: dynamic [slug] route covers", pageMissing.join(", "));
}
