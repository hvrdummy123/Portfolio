"use client";

import { useMemo } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { profile } from "@/content/profile";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";
import { ROLE_LABELS, type Role } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { ObfuscatedEmail } from "@/components/contact/ObfuscatedEmail";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const { role, setRole } = usePrefs();

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Hello Harshita — ${ROLE_LABELS[role]} role`);
    const body = encodeURIComponent(
      `Hi Harshita,\n\nI'm reaching out about a ${ROLE_LABELS[role]} role.\n\n`,
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [role]);

  const downloadVcard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
EMAIL:${profile.email}
TEL:${profile.phone}
ADR:;;${profile.location};;;;
URL:${profile.linkedin}
URL:${profile.github}
NOTE:${profile.availability}
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Harshita_Ranka.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const [user, domain] = profile.email.split("@");

  return (
    <div className="container-site section-pad pb-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display text-4xl text-ink md:text-5xl">Say hi</h1>
          <p className="mt-4 max-w-xl text-ink-soft">{profile.availability}</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-border bg-mint px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden />
            {profile.location} · {profile.graduationLabel}
          </p>
          <div className="mt-6">
            <p className="eyebrow mb-2">Preferred roles</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`tag min-h-11 ${role === r ? "bg-blush" : ""}`}
                  onClick={() => setRole(r)}
                >
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-end gap-3">
            <PixelCat pose="typing" scale={3} />
            <p className="text-sm text-ink-soft">Mochi is watching the mailbox.</p>
          </div>
        </div>

        <Window title="letter.to-harshita" status="email · résumés · vCard">
          <ObfuscatedEmail user={user!} domain={domain!} />
          <p className="mt-4 text-sm text-ink-soft">
            Prefills a short note for a <strong>{ROLE_LABELS[role]}</strong> conversation.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a className="btn btn-secondary" href={mailto}>
              Open mail app
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <button type="button" className="btn btn-ghost" onClick={downloadVcard}>
              vCard
            </button>
            <Button href={`/resumes/${role}?from=contact`} variant="secondary">
              Résumé PDF
            </Button>
            <Link href="/resumes" className="btn btn-ghost">
              All variants
            </Link>
          </div>
        </Window>
      </div>
    </div>
  );
}
