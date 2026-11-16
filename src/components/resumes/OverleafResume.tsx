import {
  prioritizeSkills,
  projectsForVariant,
  resume as resumeData,
  type ResumeVariant,
} from "@/content/data/resume";

type Props = {
  variant: ResumeVariant;
  /** Highlight variant-emphasized bullets when true */
  showDiff?: boolean;
  className?: string;
};

/** Classic Jake's-Resume / Overleaf one-pager look (not the pixel site chrome). */
export function OverleafResume({ variant, showDiff = false, className = "" }: Props) {
  const id = resumeData.identity;
  const projects = projectsForVariant(variant);
  const programming = prioritizeSkills(resumeData.skills.programming, variant.skillsOrder);
  const frameworks = prioritizeSkills(resumeData.skills.frameworks, variant.skillsOrder);

  return (
    <article
      className={`overleaf-resume bg-white text-black ${className}`}
      data-resume-slug={variant.slug}
    >
      <header className="or-header">
        <div className="or-header-row">
          <div>
            <p className="or-name">{id.name}</p>
            <p className="or-meta">
              {id.education.degree}, {id.education.school}
            </p>
            <p className="or-meta">
              {id.education.cgpa} CGPA · Class of {id.education.classOf}
            </p>
          </div>
          <div className="or-header-right">
            <p>{id.phone}</p>
            <p>
              <a href={`mailto:${id.email}`}>{id.email}</a>
            </p>
            <p>
              <a href={id.linkedin} target="_blank" rel="noreferrer">
                {id.linkedinDisplay}
              </a>
            </p>
            <p>
              <a href={id.github} target="_blank" rel="noreferrer">
                {id.githubDisplay}
              </a>
            </p>
          </div>
        </div>
      </header>

      <section className="or-section">
        <h2 className="or-h2">Work Experience</h2>
        {resumeData.experience.map((job) => (
          <div key={job.id} className="or-job">
            <div className="or-job-head">
              <p className="or-job-title">
                <strong>
                  {job.title} | {(job as { companyFull?: string }).companyFull ?? job.company}
                </strong>
              </p>
              <p className="or-job-dates">
                <em>{job.startLabel}</em>
              </p>
            </div>
            <p className="or-stack">
              <em>{job.stackLine}</em>
            </p>
            <ul className="or-bullets">
              {job.bullets.map((b) => (
                <li
                  key={b.id}
                  className={
                    showDiff && variant.experienceHighlights.includes(b.id)
                      ? "or-highlight"
                      : undefined
                  }
                >
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="or-section">
        <h2 className="or-h2">Projects</h2>
        <ul className="or-projects">
          {projects.map((p) => (
            <li key={p.slug} className={showDiff ? "or-highlight-block" : undefined}>
              <div className="or-project-head">
                <strong>{p.title}</strong>
                <em>{p.year}</em>
              </div>
              <p className="or-tools">
                <em>Tools: {p.tools}</em>
              </p>
              <ul className="or-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="or-section">
        <h2 className="or-h2">Technical Skills</h2>
        <ul className="or-skills">
          <li>
            <strong>Programming: </strong>
            {programming.join(", ")}
          </li>
          <li>
            <strong>Frameworks &amp; Technologies: </strong>
            {frameworks.join(", ")}
          </li>
          <li>
            <strong>Cloud: </strong>
            {resumeData.skills.cloud}
          </li>
          <li>
            <strong>Achievements: </strong>
            {id.achievements.join("; ")}
          </li>
          <li>
            <strong>Course Work: </strong>
            {id.coursework.join(", ")}
          </li>
        </ul>
      </section>
    </article>
  );
}
