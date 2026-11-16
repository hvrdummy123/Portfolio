import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pdfFilename, resumeVariants } from "@/content/data/resume";
import { ResumeView } from "@/components/resumes/ResumeView";

export function generateStaticParams() {
  return resumeVariants.map((v) => ({ role: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const variant = resumeVariants.find((v) => v.slug === role);
  return {
    title: variant ? `${variant.title} résumé` : "Résumé",
    description: variant
      ? `One-page Overleaf résumé — ${variant.headline}`
      : "Role-targeted résumé",
  };
}

export default async function ResumeRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const variant = resumeVariants.find((v) => v.slug === role);
  if (!variant) notFound();

  const file = pdfFilename(variant.slug);

  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Résumé · Overleaf one-pager</p>
      <h1 className="display text-3xl text-ink md:text-4xl">{variant.title}</h1>
      <p className="mt-2 font-medium text-sm text-berry">
        {variant.headline}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{variant.whyThisVersion}</p>
      <div className="mt-4 flex flex-wrap gap-2 print:hidden">
        <Link href="/resumes" className="btn btn-ghost">
          ← All variants
        </Link>
        <a className="btn" href={`/resumes/${file}`} download={file}>
          Download PDF
        </a>
      </div>
      <ResumeView variant={variant} />
    </div>
  );
}
