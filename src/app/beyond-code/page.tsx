import type { Metadata } from "next";
import { CrochetPad } from "@/components/beyond/CrochetPad";
import { DailyPuzzle } from "@/components/beyond/DailyPuzzle";
import { MathPuzzle } from "@/components/beyond/MathPuzzle";
import { Ukulele } from "@/components/beyond/Ukulele";
import { PixelCat } from "@/components/cats/PixelCat";

export const metadata: Metadata = { title: "Beyond Code" };

export default function BeyondCodePage() {
  return (
    <div className="container-site section-pad space-y-12">
      <div>
        <p className="eyebrow">Beyond code</p>
        <h1 className="display text-4xl text-ink">What else I enjoy</h1>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-3">
          <PixelCat pose="yarn" scale={3} />
          <h2 className="display text-2xl">Crocheting</h2>
        </div>
        <p className="mb-3 max-w-xl text-sm text-ink-soft">
          TODO_FROM_HARSHITA: a short first-person blurb about pattern-reading and counting
          stitches. Gallery photos welcome.
        </p>
        <CrochetPad />
      </section>

      <section>
        <div className="mb-3 flex items-center gap-3">
          <PixelCat pose="think" scale={3} />
          <h2 className="display text-2xl">Puzzle solving</h2>
        </div>
        <p className="mb-3 max-w-xl text-sm text-ink-soft">
          TODO_FROM_HARSHITA: blurb on enjoying constraint problems.
        </p>
        <DailyPuzzle />
      </section>

      <section>
        <h2 className="display text-2xl">Mathematics puzzles</h2>
        <p className="mb-3 text-sm text-ink-soft">Puzzle of the week — hint + reveal.</p>
        <MathPuzzle />
      </section>

      <section>
        <h2 className="display text-2xl">Crafts</h2>
        <p className="text-sm text-ink-soft">
          Photo masonry slots — TODO_FROM_HARSHITA: add images under /public/beyond/.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="pixel-border grid h-32 place-items-center bg-surface-2 text-xs text-ink-soft"
            >
              Slot {i}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-3">
          <PixelCat pose="ukulele" palette="lavender" scale={3} />
          <h2 className="display text-2xl">Singing & ukulele</h2>
        </div>
        <p className="mb-3 text-sm text-ink-soft">
          TODO_FROM_HARSHITA: optional recording embeds. Sound starts only after a gesture.
        </p>
        <Ukulele />
      </section>
    </div>
  );
}
