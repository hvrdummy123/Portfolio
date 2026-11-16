"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { PixelCat } from "@/components/cats/PixelCat";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    console.info("contact_click", { channel: "email_copy" });
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
    <div className="container-site section-pad">
      <div className="flex items-start gap-4">
        <PixelCat pose="typing" scale={3} />
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display text-4xl text-ink md:text-5xl">Say hi</h1>
        </div>
      </div>
      <p className="mt-4 max-w-xl text-ink-soft">{siteConfig.availability}</p>
      <p className="mt-2 text-sm text-ink-soft">{siteConfig.location}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn" onClick={copyEmail}>
          {copied ? "Copied!" : "Copy email"}
        </button>
        <a className="btn btn-secondary" href={siteConfig.links.email}>
          mailto
        </a>
        <a
          className="btn btn-secondary"
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => console.info("contact_click", { channel: "linkedin" })}
        >
          LinkedIn
        </a>
        <a
          className="btn btn-secondary"
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <button type="button" className="btn btn-secondary" onClick={downloadVcard}>
          Download vCard
        </button>
        <Link href="/resumes?from=contact" className="btn btn-secondary">
          Résumés ↗
        </Link>
      </div>
    </div>
  );
}
