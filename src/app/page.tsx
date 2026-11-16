import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { recruiterStats } from "@/content/data/projects";
import { resume } from "@/content/data/resume";
import { RoleSelector } from "@/components/home/RoleSelector";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { notes } from "@/content/data/notes";

export default function HomePage() {
  const notebook = notes.slice(0, 3);

  return (
    <div className="container-site section-pad pb-20">
      <header className="pb-10">
        <p className="eyebrow mb-3">
          {siteConfig.name} · Class of {siteConfig.classOf}
        </p>
        <h1 className="display max-w-2xl text-4xl text-ink md:text-5xl">
          Building reliable software for backends, agents, and commerce.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">{siteConfig.valueProp}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href="/work" className="btn">
            Work
          </Link>
          <Link href="/resumes?from=home" className="btn btn-secondary">
            Résumé
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact
          </Link>
        </div>
      </header>

      <RoleSelector />

      <FeaturedProjects />

      <section className="section-pad pt-2">
        <h2 className="display text-2xl text-ink">A few numbers</h2>
        <ul className="mt-4 space-y-3">
          {recruiterStats.map((s) => (
            <li key={s.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="stat-value text-lg">{s.value}</span>
              <Link href={s.href} className="text-ink-soft no-underline hover:text-accent">
                {s.label}
              </Link>
              <span className="text-xs text-ink-soft">({s.source})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-pad pt-2">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="display text-2xl text-ink">Experience</h2>
          <Link href="/experience" className="text-sm">
            Full timeline
          </Link>
        </div>
        <div className="mt-2">
          {resume.experience.map((job) => (
            <div key={job.id} className="list-row">
              <p className="font-medium text-ink">
                {job.title}, {job.company}
              </p>
              <p className="text-sm text-ink-soft">
                {job.start} – {job.end}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{job.bullets[0]?.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad pt-2">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="display text-2xl text-ink">Design notes</h2>
          <Link href="/notes" className="text-sm">
            All notes
          </Link>
        </div>
        <p className="mb-3 text-sm text-ink-soft">
          Decisions, alternatives, and why a choice won.
        </p>
        <div>
          {notebook.map((n) => (
            <Link key={n.slug} href={`/notes/${n.slug}`} className="list-row">
              <p className="list-row-title font-medium text-ink">{n.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{n.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad border-t border-line pt-10">
        <h2 className="display text-2xl text-ink">Get in touch</h2>
        <p className="mt-2 text-ink-soft">{siteConfig.availability}</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href="/contact" className="btn">
            Contact
          </Link>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
