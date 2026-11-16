import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaybenchLab } from "@/components/labs/PaybenchLab";
import { ZkCatsLab } from "@/components/labs/ZkCatsLab";
import { OutboxLab } from "@/components/labs/OutboxLab";
import { OrderLifecycleLab } from "@/components/labs/OrderLifecycleLab";
import { BacktestToy } from "@/components/labs/BacktestToy";

const labs = {
  "paybench-timeout": {
    title: "You are the agent",
    Component: PaybenchLab,
  },
  "zk-cats": { title: "Zero-knowledge, explained with cats", Component: ZkCatsLab },
  "outbox-playground": { title: "Outbox playground", Component: OutboxLab },
  "d2c-order-lifecycle": {
    title: "D2C order-lifecycle simulator",
    Component: OrderLifecycleLab,
  },
  "backtest-toy": { title: "Backtest toy", Component: BacktestToy },
} as const;

export function generateStaticParams() {
  return Object.keys(labs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lab = labs[slug as keyof typeof labs];
  return { title: lab?.title ?? "Lab" };
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = labs[slug as keyof typeof labs];
  if (!lab) notFound();
  const Comp = lab.Component;

  return (
    <div className="container-site section-pad">
      <Link href="/labs" className="text-sm">
        ← Labs
      </Link>
      <h1 className="display mt-2 text-4xl text-ink">{lab.title}</h1>
      <div className="mt-6">
        <Comp />
      </div>
    </div>
  );
}
