import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

export function ProjectMedia({ slug }: { slug: string }) {
  const dir = join(process.cwd(), "public/media", slug);
  if (!existsSync(dir)) {
    return <p className="mt-3 text-sm text-ink-soft">No sample media in the repo yet.</p>;
  }
  const files = readdirSync(dir).filter((f) =>
    /\.(png|jpe?g|webp|gif|svg)$/i.test(f),
  );
  if (!files.length) {
    return <p className="mt-3 text-sm text-ink-soft">No sample media in the repo yet.</p>;
  }

  return (
    <div className="mt-4 space-y-6">
      {files.slice(0, 6).map((file) => (
        <figure key={file}>
          <Image
            src={`/media/${slug}/${file}`}
            alt={`${slug} — ${file}`}
            width={900}
            height={560}
            className="h-auto w-full border border-line"
            unoptimized
          />
          <figcaption className="mt-2 font-mono text-xs text-ink-soft">{file}</figcaption>
        </figure>
      ))}
    </div>
  );
}
