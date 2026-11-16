import type { Metadata } from "next";
import { DailyPuzzle } from "@/components/beyond/DailyPuzzle";
import { MathPuzzle } from "@/components/beyond/MathPuzzle";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: "Puzzles",
  description: "Daily constraint puzzle and a handshake reasoning puzzle.",
};

export default function PuzzlesPage() {
  return (
    <div className="container-site section-pad space-y-12">
      <div>
        <p className="eyebrow">Puzzles</p>
        <h1 className="display text-4xl text-ink">Puzzles</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Two small interactive puzzles on this page — a daily constraint grid and a handshake
          counting problem.
        </p>
      </div>

      <section>
        <Window title="puzzles.exe" status="constraint → click">
          <div className="mb-3 flex items-center gap-3">
            <PixelCat pose="think" scale={3} />
            <h2 className="display text-2xl">Daily puzzle</h2>
          </div>
          <p className="mb-4 max-w-xl text-sm text-ink-soft">
            A short constraint puzzle with a check button. Clues and cells update when you tap.
          </p>
          <DailyPuzzle />
        </Window>
      </section>

      <section>
        <Window title="math-puzzle.week">
          <h2 className="display text-2xl">Handshake puzzle</h2>
          <p className="mb-4 text-sm text-ink-soft">
            A classic counting problem with hint and reveal — reason through the graph before
            opening the answer.
          </p>
          <MathPuzzle />
        </Window>
      </section>
    </div>
  );
}
