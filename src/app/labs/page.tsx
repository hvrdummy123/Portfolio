import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Labs" };

const labs = [
  {
    slug: "paybench-timeout",
    title: "You are the agent",
    topic: "agents",
    blurb: "TIMEOUT_AFTER_COMMIT ledger lab — retry safely or double-pay.",
  },
  {
    slug: "zk-cats",
    title: "Zero-knowledge, explained with cats",
    topic: "zk",
    blurb: "Issuance → proof → verify, plus a Where's the cat? cave analogy.",
  },
  {
    slug: "outbox-playground",
    title: "Outbox playground",
    topic: "backend",
    blurb: "Kill the relay mid-flight and watch messages recover.",
  },
  {
    slug: "d2c-order-lifecycle",
    title: "D2C order-lifecycle simulator",
    topic: "commerce",
    blurb: "Click order states; watch notifications and webhooks fire.",
  },
  {
    slug: "backtest-toy",
    title: "Backtest toy",
    topic: "fintech",
    blurb: "Moving-average crossover on synthetic data (illustrative).",
  },
];

export default function LabsPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Labs</p>
      <h1 className="display text-4xl text-ink">Interactive explainers</h1>
      <p className="mt-3 text-ink-soft">Filter by poking the topic chips on each card.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {labs.map((lab) => (
          <Link key={lab.slug} href={`/labs/${lab.slug}`} className="pixel-border block p-5 no-underline">
            <span className="tag">{lab.topic}</span>
            <h2 className="display mt-2 text-2xl text-ink">{lab.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{lab.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
