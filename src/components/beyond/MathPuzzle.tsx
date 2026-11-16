"use client";

import { useMemo, useState } from "react";

const PUZZLES = [
  {
    q: "A farmer has to cross a river with a wolf, a goat, and a cabbage. The boat holds the farmer plus one. How does everyone cross safely?",
    hint: "Never leave wolf+goat or goat+cabbage alone.",
    a: "Goat across → return alone → cabbage across → bring goat back → wolf across → return alone → goat across.",
  },
  {
    q: "In a room of n people, what's the smallest n where some pair likely shares a birthday (≈50%)?",
    hint: "It's surprisingly small.",
    a: "23 people.",
  },
  {
    q: "Monty Hall: 3 doors, 1 car. You pick door 1; host opens door 3 (goat). Switch to door 2?",
    hint: "Compute probabilities, don't trust intuition.",
    a: "Yes — switching wins with probability 2/3.",
  },
  {
    q: "Handshake problem: n people, each shakes hands with every other once. How many handshakes?",
    hint: "Combinations, not permutations.",
    a: "n(n-1)/2",
  },
  {
    q: "You have 3 boxes: apples, oranges, apples&oranges — all mislabeled. Draw one fruit from the 'apples&oranges' box. How do you label all?",
    hint: "The drawn box cannot be mixed.",
    a: "That box is the pure fruit you drew; use process of elimination on the other two mislabels.",
  },
  {
    q: "Two children: at least one is a boy born on Tuesday. Probability both are boys?",
    hint: "Sample space is larger than you think.",
    a: "13/27",
  },
];

export function MathPuzzle() {
  const week = Math.floor(Date.now() / (7 * 86400000));
  const puzzle = useMemo(() => PUZZLES[week % PUZZLES.length], [week]);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="pixel-border p-4">
      <p className="text-sm">{puzzle.q}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary" onClick={() => setShowHint(true)}>
          Hint
        </button>
        <button type="button" className="btn" onClick={() => setShowAnswer(true)}>
          Reveal
        </button>
      </div>
      {showHint && <p className="mt-2 text-sm text-ink-soft">Hint: {puzzle.hint}</p>}
      {showAnswer && <p className="mt-2 text-sm font-medium">Answer: {puzzle.a}</p>}
    </div>
  );
}
