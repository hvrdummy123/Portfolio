"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/data/site.config";
import {
  IconHome,
  IconWork,
  IconLab,
  IconNote,
  IconPerson,
} from "@/components/icons/PixelIcons";

const ICONS = {
  home: IconHome,
  work: IconWork,
  lab: IconLab,
  note: IconNote,
  person: IconPerson,
} as const;

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tabbar" aria-label="Mobile tabs">
      {siteConfig.mobileTabs.map((tab) => {
        const Icon = ICONS[tab.icon as keyof typeof ICONS] ?? IconHome;
        const active =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="mobile-tab focus-ring"
            data-active={active ? "true" : "false"}
          >
            <Icon className="h-5 w-5" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
