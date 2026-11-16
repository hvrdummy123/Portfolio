import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { captionFor } from "@/content/data/mediaCaptions";

export function ProjectMedia({ slug }: { slug: string }) {
  const dir = join(process.cwd(), "public/media", slug);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((f) =>
    /\.(png|jpe?g|webp|gif|svg)$/i.test(f),
  );
  if (!files.length) return null;

  return (
    <div className="mt-4 space-y-6">
      {files.slice(0, 6).map((file) => {
        const caption = captionFor(slug, file);
        return (
          <figure key={file}>
            <Image
              src={`/media/${slug}/${file}`}
              alt={caption}
              width={900}
              height={560}
              className="h-auto w-full border-2 border-ink"
              unoptimized
            />
            <figcaption className="mt-2 text-xs text-ink-soft">{caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
