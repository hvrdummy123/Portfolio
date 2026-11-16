import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/content/data/site.config";
import { profile } from "@/content/profile";
import { resume } from "@/content/data/resume";
import { RoleSelector } from "@/components/home/RoleSelector";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { DeskScene } from "@/components/home/DeskScene";
import { StatHUD } from "@/components/home/StatHUD";
import { TryStrip } from "@/components/home/TryStrip";
import { notes } from "@/content/data/notes";
import { Window } from "@/components/ui/Window";
import { PixelCat } from "@/components/cats/PixelCat";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const notebook = notes.filter((n) => !n.draft).slice(0, 3);

  return (
    <div>
      <section className="container-site section-pad !pb-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">{profile.hero.eyebrow}</p>
            <div className="mb-3 flex items-center gap-3">
              <PixelCat pose="celebrate" scale={2.5} title="Mochi waving" />
            </div>
            <h1 className="display max-w-xl text-4xl text-ink md:text-5xl lg:text-[3.25rem]">
              {profile.hero.headline}
            </h1>
            <p className="mt-4 max-w-xl text-ink-soft">{profile.hero.subline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="/resumes?from=home">Download résumé</Button>
              <Button href="/work" variant="secondary">
                See work
              </Button>
            </div>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </p>
            <div className="mt-5">
              <Suspense fallback={<p className="text-sm text-ink-soft">Loading role lens…</p>}>
                <RoleSelector />
              </Suspense>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden />
              {profile.availability}
            </p>
          </div>
          <DeskScene />
        </div>
        <StatHUD />
      </section>

      <div className="bg-blush/30">
        <div className="container-site">
          <TryStrip />
        </div>
      </div>

      <div className="container-site">
        <FeaturedProjects />

        <section className="section-pad">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="display text-2xl text-ink">Experience</h2>
            <Link href="/experience" className="text-sm">
              Full timeline
            </Link>
          </div>
          <div className="relative space-y-4 before:absolute before:bottom-4 before:left-6 before:top-4 before:w-0.5 before:bg-ink/30">
            {resume.experience.map((job, i) => (
              <Window
                key={job.id}
                title={`${job.company.toLowerCase()}.role`}
                status={job.startLabel.replace(/--/g, "–")}
                className="relative ml-4 pl-2"
              >
                <div className="absolute -left-7 top-4 grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-butter">
                  <PixelCat pose={i === 0 ? "sit" : "walk"} scale={1} />
                </div>
                <p className="font-medium text-ink">
                  {job.title}, {job.company}
                </p>
                {"companyNote" in job && job.companyNote ? (
                  <p className="text-xs text-ink-soft">{job.companyNote}</p>
                ) : null}
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-soft">
                  {job.bullets.slice(0, 2).map((b) => (
                    <li key={b.id}>{b.text}</li>
                  ))}
                </ul>
              </Window>
            ))}
          </div>
        </section>

        <section className="section-pad">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="display text-2xl text-ink">Notebook</h2>
            <Link href="/notes" className="text-sm">
              All notes
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {notebook.map((n, i) => (
              <Link key={n.slug} href={`/notes/${n.slug}`} className="no-underline">
                <Window
                  title={i === 0 ? "featured.note" : `${n.slug}.md`}
                  status={`${n.readingMinutes} min`}
                  className="h-full"
                >
                  <h3 className="display text-lg text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{n.excerpt}</p>
                </Window>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-pad">
          <h2 className="display text-2xl text-ink">Puzzles</h2>
          <p className="mt-1 text-sm text-ink-soft">
            A daily constraint puzzle and a handshake counting problem.
          </p>
          <Link href="/puzzles" className="mt-4 block no-underline">
            <Window title="puzzles.app" status="daily · handshake">
              <div className="flex flex-wrap items-center gap-4">
                <PixelCat pose="think" scale={2} />
                <div className="min-w-[200px] flex-1">
                  <p className="display text-lg text-ink">Try a puzzle</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Interactive puzzles with check, hint, and reveal.
                  </p>
                </div>
              </div>
            </Window>
          </Link>
        </section>
      </div>

      <section className="border-y-2 border-ink bg-lavender/50">
        <div className="container-site section-pad flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-2xl text-ink md:text-3xl">
              Let&apos;s build something reliable.
            </h2>
            <p className="mt-2 text-ink-soft">{siteConfig.availability}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>Email me</Button>
            <Button href="/resumes" variant="secondary">
              Download résumé
            </Button>
            <Button href={profile.linkedin} variant="ghost">
              LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
