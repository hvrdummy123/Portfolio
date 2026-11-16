"use client";

import { useMemo, useState } from "react";

/** Split email so scrapers reading static HTML get less signal. */
export function ObfuscatedEmail({
  user,
  domain,
  className,
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const email = useMemo(() => `${user}@${domain}`, [user, domain]);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={className}>
      <p className="font-[family-name:var(--font-jetbrains)] text-sm" aria-label={`Email ${email}`}>
        <span>{user}</span>
        <span aria-hidden> [at] </span>
        <span className="sr-only">@</span>
        <span>{domain}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary !text-xs" onClick={copy}>
          {copied ? "Copied" : "Copy email"}
        </button>
        <a className="btn !text-xs" href={`mailto:${email}`}>
          Open mail app
        </a>
      </div>
    </div>
  );
}
