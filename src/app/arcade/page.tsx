import type { Metadata } from "next";
import { YarnRunner } from "@/components/arcade/YarnRunner";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: "Cat Arcade",
  description: "Yarn Runner — jump bugs, collect yarn.",
};

export default function ArcadePage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Arcade</p>
      <h1 className="display text-4xl text-ink">Yarn Runner</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Endless runner: jump NullPointers and Race Conditions, collect yarn. Space/tap to jump,
        down to duck.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Window title="sprites.dat">
          <p className="display text-xl">12 sprites</p>
        </Window>
        <Window title="anim.dat">
          <p className="display text-xl">4 frames / cat</p>
        </Window>
        <Window title="engine.c">
          <p className="display text-xl">~300 LOC</p>
        </Window>
      </div>
      <Window title="yarn-runner.exe" className="mt-6" status="sound off by default">
        <YarnRunner />
      </Window>
    </div>
  );
}
