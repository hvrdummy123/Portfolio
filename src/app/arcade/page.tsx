import type { Metadata } from "next";
import { YarnRunner } from "@/components/arcade/YarnRunner";

export const metadata: Metadata = {
  title: "Cat Arcade",
  description: "Yarn Runner — jump bugs, collect yarn.",
};

export default function ArcadePage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Showpiece</p>
      <h1 className="display text-4xl text-ink">Yarn Runner</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Endless runner: jump NullPointers and Race Conditions, collect yarn. Space/tap to jump,
        down to duck.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="pixel-border p-3">
          <p className="display text-xl">Sprites: 12</p>
        </div>
        <div className="pixel-border p-3">
          <p className="display text-xl">Frames: 4/cat</p>
        </div>
        <div className="pixel-border p-3">
          <p className="display text-xl">Engine: ~300 LOC</p>
        </div>
      </div>
      <div className="mt-6">
        <YarnRunner />
      </div>
    </div>
  );
}
