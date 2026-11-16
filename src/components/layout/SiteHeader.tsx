"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/content/data/site.config";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="container-site flex items-center justify-between gap-4 py-4">
        <Link href="/" className="focus-ring font-medium text-ink no-underline">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring no-underline",
                  item.pill || active
                    ? "font-medium text-ink"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="container-site flex flex-col gap-2 border-t border-line py-3 md:hidden"
          aria-label="Mobile"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-1 text-ink no-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
