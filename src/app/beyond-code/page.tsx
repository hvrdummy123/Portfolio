import type { Metadata } from "next";
import { CrochetPad } from "@/components/beyond/CrochetPad";
import { DailyPuzzle } from "@/components/beyond/DailyPuzzle";
import { MathPuzzle } from "@/components/beyond/MathPuzzle";
import { Ukulele } from "@/components/beyond/Ukulele";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";
import { beyondStations } from "@/content/data/beyond";

export const metadata: Metadata = {
  title: "Beyond Code",
  description: "Crochet, puzzles, math puzzles, crafts, singing, and ukulele — the rest of me.",
};

export default function BeyondCodePage() {
  const byId = Object.fromEntries(beyondStations.map((s) => [s.id, s]));

  return (
    <div className="container-site section-pad space-y-12">
      <div>
        <p className="eyebrow">Beyond code</p>
        <h1 className="display text-4xl text-ink">What else I enjoy</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Screen-free puzzles, stitch counting, and a little music. Same curiosity as the
          reliability work — just with yarn and strings.
        </p>
      </div>

      <section>
        <Window title="crochet.yarn" status="pattern → count → hold">
          <div className="mb-3 flex items-center gap-3">
            <PixelCat pose="yarn" scale={3} />
            <h2 className="display text-2xl">{byId.crochet.title}</h2>
          </div>
          <p className="mb-4 max-w-xl text-sm text-ink-soft">{byId.crochet.blurb}</p>
          <CrochetPad />
        </Window>
      </section>

      <section>
        <Window title="puzzles.exe" status="constraint → click">
          <div className="mb-3 flex items-center gap-3">
            <PixelCat pose="think" scale={3} />
            <h2 className="display text-2xl">{byId.puzzles.title}</h2>
          </div>
          <p className="mb-4 max-w-xl text-sm text-ink-soft">{byId.puzzles.blurb}</p>
          <DailyPuzzle />
        </Window>
      </section>

      <section>
        <Window title="math-puzzle.week">
          <h2 className="display text-2xl">{byId.math.title}</h2>
          <p className="mb-4 text-sm text-ink-soft">{byId.math.blurb}</p>
          <MathPuzzle />
        </Window>
      </section>

      <section>
        <Window title="crafts.gallery" status="Photos coming soon">
          <h2 className="display text-2xl">{byId.crafts.title}</h2>
          <p className="mb-4 text-sm text-ink-soft">{byId.crafts.blurb}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative grid h-32 place-items-center overflow-hidden rounded-lg border-2 border-ink bg-surface-2"
              >
                <PixelCat pose="peek" scale={2} className="opacity-80" />
                <p className="absolute bottom-2 text-xs text-ink-soft">Photos coming soon</p>
              </div>
            ))}
          </div>
        </Window>
      </section>

      <section id="ukulele">
        <Window title="ukulele.app" status="sound after a tap">
          <div className="mb-3 flex items-center gap-3">
            <PixelCat pose="ukulele" palette="lavender" scale={3} />
            <h2 className="display text-2xl">{byId.ukulele.title}</h2>
          </div>
          <p className="mb-4 text-sm text-ink-soft">{byId.ukulele.blurb}</p>
          <Ukulele />
        </Window>
      </section>
    </div>
  );
}
