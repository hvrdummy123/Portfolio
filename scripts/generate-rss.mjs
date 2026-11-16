import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Lightweight RSS without TS imports: read notes from a JSON dump we inline via dynamic import of compiled content is hard.
// Instead parse notes.ts with a simple regex for published notes.

import { readFileSync } from "node:fs";

const notesSrc = readFileSync(join(root, "src/content/data/notes.ts"), "utf8");
const siteSrc = readFileSync(join(root, "src/content/data/site.config.ts"), "utf8");
const urlMatch = siteSrc.match(/url:\s*process\.env\.[^\?]+\?\?\s*"([^"]+)"/);
const base = urlMatch?.[1] ?? "https://portfolio-psi-lovat-90.vercel.app";
const nameMatch = siteSrc.match(/name:\s*"([^"]+)"/);
const name = nameMatch?.[1] ?? "Harshita Ranka";

const blocks = [...notesSrc.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?draft:\s*(true|false)[\s\S]*?excerpt:\s*"([^"]*)"/g)];
const items = [];
for (const m of notesSrc.matchAll(/slug:\s*"([^"]+)"/g)) {
  // fall through — use a more structured parse
}

// Parse objects more carefully
const noteObjs = [];
const parts = notesSrc.split(/\{\s*\n\s*slug:/).slice(1);
for (const part of parts) {
  const slug = part.match(/^\s*"([^"]+)"/)?.[1];
  const title = part.match(/title:\s*"([^"]+)"/)?.[1];
  const date = part.match(/date:\s*"([^"]+)"/)?.[1];
  const draft = /draft:\s*true/.test(part.split("}")[0] ?? "");
  const excerpt = part.match(/excerpt:\s*"([^"]*)"/)?.[1] ?? "";
  if (slug && title && date && !draft) {
    noteObjs.push({ slug, title, date, excerpt });
  }
}

noteObjs.sort((a, b) => b.date.localeCompare(a.date));

const xmlItems = noteObjs
  .map(
    (n) => `    <item>
      <title><![CDATA[${n.title}]]></title>
      <link>${base}/notes/${n.slug}</link>
      <guid>${base}/notes/${n.slug}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description><![CDATA[${n.excerpt}]]></description>
    </item>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${name} — Notes</title>
    <link>${base}</link>
    <description>Design notes from ${name}'s portfolio</description>
${xmlItems}
  </channel>
</rss>
`;

writeFileSync(join(root, "public/rss.xml"), xml);
console.log(`generate-rss OK (${noteObjs.length} items)`);
