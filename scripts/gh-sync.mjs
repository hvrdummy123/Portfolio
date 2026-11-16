/**
 * Fetches GitHub README metadata + media inventory for portfolio projects.
 * Unauthenticated API; caches to content/generated/. Never fails the build hard.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repos = [
  { slug: "paybench", repo: "hvrdummy123/Agent-Pro-Paybench" },
  { slug: "zkp-kyc", repo: "hvrdummy123/ZKP-KYC-System-Blockchain" },
  { slug: "mandarin-teacher", repo: "hvrdummy123/Mandarin-Teacher" },
  { slug: "incident-logger", repo: "hvrdummy123/Incident-Logger" },
  { slug: "job-finder", repo: "hvrdummy123/Job-Finder" },
];

const outDir = join(process.cwd(), "content/generated");
mkdirSync(outDir, { recursive: true });
mkdirSync(join(process.cwd(), "public/media"), { recursive: true });

const cachePath = join(outDir, "github.json");
const mediaPath = join(outDir, "media.json");

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "harshita-portfolio-gh-sync",
    },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

const github = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
const media = existsSync(mediaPath) ? JSON.parse(readFileSync(mediaPath, "utf8")) : {};

for (const { slug, repo } of repos) {
  try {
    const meta = await fetchJson(`https://api.github.com/repos/${repo}`);
    const readmeRes = await fetch(
      `https://raw.githubusercontent.com/${repo}/${meta.default_branch}/README.md`,
    );
    const readme = readmeRes.ok ? await readmeRes.text() : "";
    const tree = await fetchJson(
      `https://api.github.com/repos/${repo}/git/trees/${meta.default_branch}?recursive=1`,
    );
    const mediaFiles = (tree.tree || [])
      .filter((t) => t.type === "blob")
      .filter((t) => /\.(png|jpe?g|webp|gif|svg|mp4|webm|mov)$/i.test(t.path))
      .map((t) => ({
        path: t.path,
        url: `https://raw.githubusercontent.com/${repo}/${meta.default_branch}/${t.path}`,
        size: t.size,
      }));

    github[slug] = {
      repo,
      description: meta.description,
      stars: meta.stargazers_count,
      language: meta.language,
      updatedAt: meta.updated_at,
      defaultBranch: meta.default_branch,
      readmePreview: readme.slice(0, 4000),
      fetchedAt: new Date().toISOString(),
    };
    media[slug] = mediaFiles;
    console.log(`✓ ${slug}: ${mediaFiles.length} media files, ★${meta.stargazers_count}`);
  } catch (err) {
    console.warn(`✗ ${slug}: ${err.message} (keeping cache if any)`);
  }
}

writeFileSync(cachePath, JSON.stringify(github, null, 2));
writeFileSync(mediaPath, JSON.stringify(media, null, 2));
console.log("Wrote", cachePath, "and", mediaPath);
