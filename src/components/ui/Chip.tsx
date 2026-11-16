import type { ReactNode } from "react";

const TONE: Record<string, string> = {
  backend: "tag-backend",
  ai: "tag-ai",
  blockchain: "tag-blockchain",
  frontend: "tag-frontend",
  infra: "tag-infra",
  fintech: "tag-fintech",
  default: "",
};

type ChipProps = {
  children: ReactNode;
  tone?: keyof typeof TONE | string;
  className?: string;
};

export function Chip({ children, tone = "default", className = "" }: ChipProps) {
  const toneClass = TONE[tone] ?? TONE.default;
  return <span className={`tag ${toneClass} ${className}`}>{children}</span>;
}
