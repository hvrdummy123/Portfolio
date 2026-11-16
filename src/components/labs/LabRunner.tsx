"use client";

import { useState, type ComponentType } from "react";
import type { LabCatalogEntry } from "@/content/data/labsCatalog";
import { LabShell } from "@/components/labs/LabShell";

type LabRunnerProps = {
  meta: Pick<LabCatalogEntry, "goal" | "steps" | "caseHref" | "caseLabel">;
  Lab: ComponentType;
};

export function LabRunner({ meta, Lab }: LabRunnerProps) {
  const [remountKey, setRemountKey] = useState(0);

  return (
    <LabShell
      goal={meta.goal}
      steps={meta.steps}
      caseHref={meta.caseHref}
      caseLabel={meta.caseLabel}
      onReset={() => setRemountKey((k) => k + 1)}
    >
      <Lab key={remountKey} />
    </LabShell>
  );
}