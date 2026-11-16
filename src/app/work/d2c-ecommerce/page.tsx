import type { Metadata } from "next";
import Link from "next/link";
import { getProject } from "@/content/data/projects";
import { D2CFlagship } from "@/components/d2c/D2CFlagship";
import { PixelCat } from "@/components/cats/PixelCat";
import { STATUS_LABELS } from "@/content/data/types";

export const metadata: Metadata = {
  title: "D2C E-Commerce Platform",
  description:
    "Shopify-style D2C e-commerce on Medusa v2 · Supabase · Next.js — demo built and served to clients.",
};

export default function D2CPage() {
  const project = getProject("d2c-ecommerce")!;

  return (
    <div>
      <header className="container-site section-pad pb-6">
        <div className="flex flex-wrap items-start gap-4">
          <PixelCat pose="yarn" scale={4} title="Cat with yarn" />
          <div>
            <p className="eyebrow">Full stack</p>
            <h1 className="display text-4xl text-ink md:text-5xl">{project.title}</h1>
            <p className="mt-2 text-ink-soft">Medusa v2 · Supabase · Next.js</p>
            <div className="mt-3 flex flex-col gap-2">
              <div>
                <span className="tag tag-ai">{STATUS_LABELS.built}</span>
              </div>
              <div>
                <span className="tag tag-frontend">Demo served to clients</span>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-ink-soft">{project.pitch}</p>
            <p className="mt-2 text-xs text-ink-soft">{project.sourceNote}</p>
            <Link href="/work" className="mt-4 inline-block text-sm">
              ← All work
            </Link>
          </div>
        </div>
      </header>
      <D2CFlagship />
    </div>
  );
}
