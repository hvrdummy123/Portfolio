import type { Metadata } from "next";
import { LabsIndex } from "@/components/labs/LabsIndex";

export const metadata: Metadata = {
  title: "Labs",
  description: "Interactive labs: payments, zero-knowledge, outbox, D2C lifecycle, backtests.",
};

export default function LabsPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Labs</p>
      <h1 className="display text-4xl text-ink">Interactive explainers</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Small toys you can break. Each one mirrors a reliability idea from the work.
      </p>
      <LabsIndex />
    </div>
  );
}