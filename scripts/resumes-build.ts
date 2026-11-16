/**
 * Emit Overleaf .tex + one-page A4 PDFs for each resume variant.
 * Usage: pnpm resumes:build
 */
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";
import {
  pdfFilename,
  prioritizeSkills,
  projectsForVariant,
  resume,
  resumeVariants,
  type ResumeVariant,
} from "../src/content/data/resume";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "resumes");
const texDir = join(root, "resumes", "latex");

mkdirSync(outDir, { recursive: true });
mkdirSync(texDir, { recursive: true });

function esc(s: string) {
  return String(s)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/—/g, "---")
    .replace(/–/g, "--")
    .replace(/·/g, "$\\cdot$");
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function texPreamble() {
  return `\\documentclass[a4paper,11pt]{article}
\\usepackage{latexsym}
\\usepackage{xcolor}
\\usepackage{float}
\\usepackage{ragged2e}
\\usepackage[empty]{fullpage}
\\usepackage{wrapfig}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{geometry}
\\usepackage{marvosym}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage[T1]{fontenc}
\\setlength{\\multicolsep}{0pt}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\geometry{left=1.4cm, top=0.35cm, right=1.2cm, bottom=0.35cm}
\\urlstyle{same}
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-7pt}]

\\newcommand{\\resumeItem}[2]{
  \\item{\\textbf{#1}{\\hspace{0.5mm}#2 \\vspace{-0.5mm}}}
}
\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-7pt}}
\\renewcommand{\\labelitemi}{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*,labelsep=0mm]}
\\newcommand{\\resumeHeadingSkillStart}{\\begin{itemize}[leftmargin=*,itemsep=0.6mm, rightmargin=2ex]}
\\newcommand{\\resumeItemListStart}{\\begin{justify}\\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,labelsep=1.2mm,itemsep=0mm]\\small}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{1mm}}
\\newcommand{\\resumeHeadingSkillEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\end{justify}\\vspace{-2mm}}

\\newcommand{\\resumeProject}[4]{
\\vspace{0.3mm}\\item
    \\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & \\textit{\\footnotesize{#3}} \\\\
        \\footnotesize{\\textit{#2}} & \\footnotesize{#4}
    \\end{tabular*}
    \\vspace{-2.6mm}
}

\\newcolumntype{L}{>{\\raggedright\\arraybackslash}X}
\\newcolumntype{R}{>{\\raggedleft\\arraybackslash}X}
\\setlength{\\footskip}{4.08003pt}

\\begin{document}
\\fontfamily{cmr}\\selectfont
`;
}

function buildTex(variant: ResumeVariant) {
  const id = resume.identity;
  const projects = projectsForVariant(variant);
  const programming = prioritizeSkills(resume.skills.programming, variant.skillsOrder);
  const frameworks = prioritizeSkills(resume.skills.frameworks, variant.skillsOrder);

  let body = texPreamble();
  body += `
\\parbox{\\dimexpr\\linewidth\\relax}{
\\begin{tabularx}{\\linewidth}{L r}
  \\textbf{\\Large ${esc(id.name)}} & ${esc(id.phone)} \\\\
  ${esc(id.education.degree)}, ${esc(id.education.school)} & \\href{mailto:${id.email}}{${esc(id.email)}} \\\\
  ${esc(id.education.cgpa)} CGPA $\\cdot$  Class of ${id.education.classOf} & \\href{${id.linkedin}}{${esc(id.linkedinDisplay)}} \\\\
  & 
  \\href{${id.github}}{${esc(id.githubDisplay)}} \\\\
\\end{tabularx}
}
\\vspace{-4mm}

\\vspace{-3mm}
\\section{\\textbf{Work Experience}}
`;

  for (const job of resume.experience) {
    body += `
\\begin{tabularx}{\\linewidth}{ @{}l r@{} }
\\textbf{${esc(job.title)} $|$ ${esc("companyFull" in job && job.companyFull ? job.companyFull : job.company)}} & \\hfill \\textit{${esc(job.startLabel)}} \\\\[0pt]
\\multicolumn{2}{@{}X@{}}{\\textit{${esc(job.stackLine)}}} \\\\[0pt]
\\multicolumn{2}{@{}X@{}}{
\\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep, labelsep=1.2mm, itemsep=0.4mm]\\small
\\vspace{-6mm}
`;
    for (const b of job.bullets) {
      body += `\\item ${esc(b.text)}\n\n`;
    }
    body += `\\end{itemize}
}
\\end{tabularx}

\\vspace{1.5mm}
`;
  }

  body += `
\\vspace{-5mm}
\\section{\\textbf{Projects}}
\\vspace{-0.4mm}
\\resumeSubHeadingListStart
`;

  for (const p of projects) {
    body += `
\\resumeProject
{  ${esc(p.title)}}
{Tools: ${esc(p.tools)}}
{${p.year}}
{}
\\vspace{-3mm}

\\resumeItemListStart
`;
    for (const b of p.bullets) {
      body += `  \\item {${esc(b)}}\n`;
    }
    body += `\\resumeItemListEnd
\\vspace{-3mm}
`;
  }

  body += `\\resumeSubHeadingListEnd
\\vspace{-9mm}

\\section{\\textbf{Technical Skills}}
\\vspace{-0.4mm}
\\resumeHeadingSkillStart
  \\resumeSubItem{Programming: }
    {${esc(programming.join(", "))}}
  \\resumeSubItem{Frameworks \\& Technologies: }
    {${esc(frameworks.join(", "))}}
  \\resumeSubItem{Cloud: }
  {${esc(resume.skills.cloud)}}
  \\resumeSubItem{Achievements: }
    {${esc(id.achievements.join("; "))}}
  \\resumeSubItem{Course Work: }
    {${esc(id.coursework.join(", "))}}
\\resumeHeadingSkillEnd

\\end{document}
`;
  return body;
}

function buildHtml(variant: ResumeVariant) {
  const id = resume.identity;
  const projects = projectsForVariant(variant);
  const programming = prioritizeSkills(resume.skills.programming, variant.skillsOrder);
  const frameworks = prioritizeSkills(resume.skills.frameworks, variant.skillsOrder);

  const jobs = resume.experience
    .map(
      (job) => `
      <div class="job">
        <div class="job-head">
          <strong>${escapeHtml(job.title)} | ${escapeHtml((job as { companyFull?: string }).companyFull ?? job.company)}</strong>
          <em>${escapeHtml(job.startLabel)}</em>
        </div>
        <p class="stack"><em>${escapeHtml(job.stackLine)}</em></p>
        <ul>${job.bullets.map((b) => `<li>${escapeHtml(b.text)}</li>`).join("")}</ul>
      </div>`,
    )
    .join("");

  const proj = projects
    .map(
      (p) => `
      <div class="project">
        <div class="job-head"><strong>${escapeHtml(p.title)}</strong><em>${p.year}</em></div>
        <p class="stack"><em>Tools: ${escapeHtml(p.tools)}</em></p>
        <ul>${p.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
      </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(id.name)} — ${escapeHtml(variant.title)}</title>
<style>
  @page { size: A4; margin: 0.35cm 1.2cm 0.35cm 1.4cm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Times New Roman", Times, serif;
    font-size: 10.2pt;
    line-height: 1.26;
    color: #000;
    width: 210mm;
    min-height: 297mm;
    padding: 0.35cm 1.2cm 0.35cm 1.4cm;
  }
  a { color: #000; text-decoration: none; }
  .header { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
  .name { font-size: 17.5pt; font-weight: 700; margin: 0; }
  .meta { margin: 0; }
  .right { text-align: right; }
  .right p { margin: 0; }
  h2 {
    font-size: 11.5pt;
    font-variant: small-caps;
    font-weight: 700;
    border-bottom: 1px solid #000;
    margin: 8px 0 4px;
    padding-bottom: 1px;
  }
  .job, .project { margin-bottom: 6px; }
  .job-head { display: flex; justify-content: space-between; gap: 10px; }
  .stack { margin: 1px 0 2px; font-size: 9.3pt; }
  ul { margin: 1px 0 0; padding-left: 14px; }
  li { margin: 1.5px 0; text-align: justify; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <p class="name">${escapeHtml(id.name)}</p>
      <p class="meta">${escapeHtml(id.education.degree)}, ${escapeHtml(id.education.school)}</p>
      <p class="meta">${escapeHtml(id.education.cgpa)} CGPA · Class of ${id.education.classOf}</p>
    </div>
    <div class="right">
      <p>${escapeHtml(id.phone)}</p>
      <p><a href="mailto:${id.email}">${escapeHtml(id.email)}</a></p>
      <p><a href="${id.linkedin}">${escapeHtml(id.linkedinDisplay)}</a></p>
      <p><a href="${id.github}">${escapeHtml(id.githubDisplay)}</a></p>
    </div>
  </div>
  <h2>Work Experience</h2>
  ${jobs}
  <h2>Projects</h2>
  ${proj}
  <h2>Technical Skills</h2>
  <ul>
    <li><strong>Programming: </strong>${escapeHtml(programming.join(", "))}</li>
    <li><strong>Frameworks &amp; Technologies: </strong>${escapeHtml(frameworks.join(", "))}</li>
    <li><strong>Cloud: </strong>${escapeHtml(resume.skills.cloud)}</li>
    <li><strong>Achievements: </strong>${escapeHtml(id.achievements.join("; "))}</li>
    <li><strong>Course Work: </strong>${escapeHtml(id.coursework.join(", "))}</li>
  </ul>
</body>
</html>`;
}

async function ensureChromium() {
  try {
    const browser = await chromium.launch({ headless: true });
    await browser.close();
    return;
  } catch {
    console.log("Playwright Chromium missing — installing…");
    const r = spawnSync("pnpm", ["exec", "playwright", "install", "chromium"], {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    if (r.status !== 0) {
      throw new Error(
        "Could not install Playwright Chromium. Run: pnpm exec playwright install chromium",
      );
    }
  }
}

async function main() {
  const sourcePdf = "/Users/harshitaranka/Downloads/Harshita_Ranka_Resume2026.pdf";
  if (existsSync(sourcePdf)) {
    copyFileSync(sourcePdf, join(outDir, "Harshita-Ranka-General-Resume.pdf"));
    console.log("Copied master PDF → public/resumes/Harshita-Ranka-General-Resume.pdf");
  }

  await ensureChromium();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const variant of resumeVariants) {
    const texPath = join(texDir, `${variant.slug}.tex`);
    writeFileSync(texPath, buildTex(variant));
    console.log("Wrote", texPath);

    const htmlPath = join(outDir, `${variant.slug}.html`);
    writeFileSync(htmlPath, buildHtml(variant));

    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
    const pdfPath = join(outDir, pdfFilename(variant.slug));
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });
    console.log("Wrote", pdfPath);
  }

  await browser.close();
  console.log(`resumes:build OK — ${resumeVariants.length} variants`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
