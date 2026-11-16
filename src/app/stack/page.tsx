import type { Metadata } from "next";
import { projects } from "@/content/data/projects";

export const metadata: Metadata = { title: "Stack" };

export default function StackPage() {
  const techMap = new Map<string, { layer: string; projects: string[] }>();
  for (const p of projects) {
    for (const s of p.stack) {
      const key = s.name;
      const cur = techMap.get(key) ?? { layer: s.layer, projects: [] };
      cur.projects.push(p.slug);
      techMap.set(key, cur);
    }
  }

  const rows = [...techMap.entries()].sort((a, b) => b[1].projects.length - a[1].projects.length);

  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Stack explorer</p>
      <h1 className="display text-4xl text-ink">Skills × projects</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Evidence count beats self-rated percentages. Filter mentally by the role selector on Home.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-ink text-left">
              <th className="py-2 pr-3">Technology</th>
              <th className="py-2 pr-3">Layer</th>
              <th className="py-2 pr-3">Evidence</th>
              <th className="py-2">Projects</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, info]) => (
              <tr key={name} className="border-b border-line">
                <td className="py-2 pr-3 font-medium">{name}</td>
                <td className="py-2 pr-3">{info.layer}</td>
                <td className="py-2 pr-3">{info.projects.length}</td>
                <td className="py-2 text-ink-soft">{info.projects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
