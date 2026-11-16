import type { Metadata } from "next";
import { projects } from "@/content/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies by Harshita Ranka.",
};

export default function WorkPage() {
  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Work</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Case studies with the problem, the solution, and why it helped — plus samples where the
        repos have them.
      </p>
      <div className="mt-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
