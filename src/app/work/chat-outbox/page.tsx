import type { Metadata } from "next";
import { getProject } from "@/content/data/projects";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Callout } from "@/components/ui/Callout";
import { Window } from "@/components/ui/Window";

export const metadata: Metadata = {
  title: "Chat Outbox · Atrium",
  description:
    "Transactional outbox chat at Atrium: Postgres, relay, Centrifugo, Redis, and 25 failure scenarios.",
};

export default function ChatOutboxPage() {
  const project = getProject("atrium-engineering");
  if (!project) return null;

  return (
    <CaseStudy
      project={{
        ...project,
        title: "Chat Outbox · Atrium",
        pitch:
          "PostgreSQL transactional outbox + relay + Centrifugo/Redis so chat messages survive relay and broker failures.",
        featured: true,
      }}
    >
      <Callout title="Scope" tone="info">
        Public write-up stays at résumé level: pattern, tools, and the 25-scenario test claim. No
        internal product screenshots or proprietary schemas.
      </Callout>

      <Window title="auth.planes" className="mt-4">
        <h3 className="display text-lg text-ink">Better Auth</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Separate merchant and consumer auth planes with Postgres-backed sessions and accounts on a
          template-driven marketplace platform.
        </p>
      </Window>

      <Window title="admin.dashboard" className="mt-4">
        <h3 className="display text-lg text-ink">Internal admin</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Next.js App Router dashboard with hand-rolled SVG charts, jose JWT verification, and a
          non-root container on a private GCP runtime.
        </p>
      </Window>

      <Window title="agents.cli" className="mt-4">
        <h3 className="display text-lg text-ink">Multi-agent planning CLI</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Shared Markdown transcript across a human and two agents (Claude in plan mode, Codex in a
          read-only sandbox) with explicit @claude / @codex / @both routing and no agent-to-agent
          loops.
        </p>
      </Window>
    </CaseStudy>
  );
}
