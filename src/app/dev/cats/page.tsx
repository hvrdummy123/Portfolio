import { PixelCat } from "@/components/cats/PixelCat";
import type { CatPose } from "@/components/cats/sprites";

export const dynamic = "force-static";

const poses: CatPose[] = [
  "idle",
  "sit",
  "sleep",
  "walk",
  "run",
  "jump",
  "loaf",
  "stretch",
  "peek",
  "typing",
  "yarn",
  "ukulele",
  "think",
  "celebrate",
  "error",
];

/** Hidden in production nav; useful for sprite QA. */
export default function DevCatsPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="container-site section-pad">
        <p>Not available in production.</p>
      </div>
    );
  }

  return (
    <div className="container-site section-pad">
      <h1 className="display text-3xl">PixelCat storyboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {poses.map((pose) => (
          <div key={pose} className="pixel-border p-3 text-center">
            <PixelCat pose={pose} scale={4} />
            <p className="mt-2 font-mono text-xs">{pose}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
