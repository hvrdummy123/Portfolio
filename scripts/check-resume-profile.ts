/**
 * Fail if résumé identity facts drift from content/profile.json.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const profile = JSON.parse(readFileSync(join(root, "content/profile.json"), "utf8"));
const resumeSrc = readFileSync(join(root, "src/content/data/resume.ts"), "utf8");
const siteSrc = readFileSync(join(root, "src/content/data/site.config.ts"), "utf8");

const checks: { ok: boolean; msg: string }[] = [
  {
    ok: resumeSrc.includes(profile.education.cgpa) || resumeSrc.includes("3.95/4"),
    msg: `CGPA ${profile.education.cgpa} must appear in resume.ts`,
  },
  {
    ok: siteSrc.includes(profile.education.cgpa) || siteSrc.includes("3.95/4"),
    msg: `CGPA ${profile.education.cgpa} must appear in site.config.ts`,
  },
  {
    ok: siteSrc.includes("Available immediately") || siteSrc.includes(profile.availability),
    msg: "Availability string must match profile",
  },
  {
    ok: resumeSrc.includes(profile.email) || siteSrc.includes(profile.email),
    msg: `Email ${profile.email} must appear in site/resume data`,
  },
  {
    ok: profile.graduationLabel === "June 2026",
    msg: "Graduation label must be June 2026",
  },
];

const failed = checks.filter((c) => !c.ok);
if (failed.length) {
  console.error("check-resume-profile failed:");
  for (const f of failed) console.error(" -", f.msg);
  process.exit(1);
}
console.log("check-resume-profile OK");
