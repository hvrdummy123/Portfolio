"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import {
  LABS_CATALOG,
  LAB_TOPICS,
  type LabTopicFilter,
} from "@/content/data/labsCatalog";

export function LabsIndex() {
  const [topic, setTopic] = useState<LabTopicFilter>("all");

  const visible = useMemo(
    () => (topic === "all" ? LABS_CATALOG : LABS_CATALOG.filter((lab) => lab.topic === topic)),
    [topic],
  );

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {LAB_TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            className={`tag capitalize ${topic === t ? "bg-blush" : ""}`}
            onClick={() => setTopic(t)}
            aria-pressed={topic === t}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((lab) => (
          <Link key={lab.slug} href={`/labs/${lab.slug}`} className="no-underline">
            <Window
              title={`${lab.slug}.lab`}
              status={`${lab.difficulty} · ${lab.time}`}
              className="h-full transition-transform hover:-translate-x-px hover:-translate-y-px"
            >
              <Chip tone={lab.tone}>{lab.topic}</Chip>
              <h2 className="display mt-2 text-2xl text-ink">{lab.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{lab.blurb}</p>
            </Window>
          </Link>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">No labs in this topic yet.</p>
      ) : null}
    </>
  );
}