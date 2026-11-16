import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies by Harshita Ranka — backends, agents, commerce, fintech.",
};

export default function WorkPage() {
  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Work</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Case studies sorted by the role you&apos;re hiring for. Filter by status or stack, then open
        a project for architecture, decisions, and try-it labs.
      </p>
      <WorkIndex />
    </div>
  );
}
