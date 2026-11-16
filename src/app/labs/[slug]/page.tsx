import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaybenchLab } from "@/components/labs/PaybenchLab";
import { ZkCatsLab } from "@/components/labs/ZkCatsLab";
import { OutboxLab } from "@/components/labs/OutboxLab";
import { OrderLifecycleLab } from "@/components/labs/OrderLifecycleLab";
import { BacktestToy } from "@/components/labs/BacktestToy";
import { IdempotencyLab } from "@/components/labs/IdempotencyLab";
import { LookaheadLab } from "@/components/labs/LookaheadLab";
import { LabRunner } from "@/components/labs/LabRunner";
import { getLabBySlug } from "@/content/data/labsCatalog";

const labComponents = {
  "paybench-timeout": PaybenchLab,
  "zk-cats": ZkCatsLab,
  "outbox-playground": OutboxLab,
  "d2c-order-lifecycle": OrderLifecycleLab,
  "backtest-toy": BacktestToy,
  "idempotency-keys": IdempotencyLab,
  "lookahead-bias": LookaheadLab,
} as const;

export function generateStaticParams() {
  return Object.keys(labComponents).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  return { title: lab?.title ?? "Lab" };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getLabBySlug(slug);
  const Lab = labComponents[slug as keyof typeof labComponents];
  if (!meta || !Lab) notFound();

  return (
    <div className="container-site section-pad">
      <Link href="/labs" className="text-sm">
        ← Labs
      </Link>
      <h1 className="display mt-2 text-4xl text-ink">{meta.title}</h1>
      <div className="mt-6">
        <LabRunner
          meta={{
            goal: meta.goal,
            steps: meta.steps,
            caseHref: meta.caseHref,
            caseLabel: meta.caseLabel,
          }}
          Lab={Lab}
        />
      </div>
    </div>
  );
}