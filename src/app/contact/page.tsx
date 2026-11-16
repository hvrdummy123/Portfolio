"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";
import { ROLE_LABELS, type Role } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const { role, setRole } = usePrefs();

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(
      `Hello Harshita — ${ROLE_LABELS[role]} role`,
    );
    const body = encodeURIComponent(
      `Hi Harshita,\n\nI'm reaching out about a ${ROLE_LABELS[role]} role.\n\n`,
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }, [role]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const downloadVcard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${siteConfig.fullName}
EMAIL:${siteConfig.email}
URL:${siteConfig.links.linkedin}
URL:${siteConfig.links.github}
NOTE:${siteConfig.roleLine}
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "harshita-ranka.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-site section-pad pb-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display text-4xl text-ink md:text-5xl">Say hi</h1>
          <p className="mt-4 max-w-xl text-ink-soft">{siteConfig.availability}</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden />
            {siteConfig.location} · Class of {siteConfig.classOf}
          </p>
          <div className="mt-6">
            <p className="eyebrow mb-2">Preferred roles</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`tag ${role === r ? "bg-blush" : ""}`}
                  onClick={() => setRole(r)}
                >
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-end gap-3">
            <PixelCat pose={copied ? "celebrate" : "typing"} scale={3} />
            <p className="text-sm text-ink-soft" aria-live="polite">
              {copied ? "Mail's in the box — thanks!" : "Mochi is watching the mailbox."}
            </p>
          </div>
        </div>

        <Window title="letter.to-harshita" status={siteConfig.email}>
          <p className="text-sm text-ink-soft">
            Prefills a short note for a <strong>{ROLE_LABELS[role]}</strong> conversation.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={copyEmail}>
              {copied ? "Copied!" : "Copy email"}
            </button>
            <a className="btn btn-secondary" href={mailto}>
              Open mail app
            </a>
            <a
              className="btn btn-ghost"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <button type="button" className="btn btn-ghost" onClick={downloadVcard}>
              vCard
            </button>
            <Link href={`/resumes/${role}?from=contact`} className="btn btn-secondary">
              Résumé
            </Link>
          </div>
        </Window>
      </div>
    </div>
  );
}
