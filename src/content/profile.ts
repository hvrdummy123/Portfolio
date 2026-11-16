import raw from "../../content/profile.json";
import claimsRaw from "../../content/claims.json";

export type Profile = typeof raw;
export type Claim = (typeof claimsRaw.claims)[number];

export const profile: Profile = raw;
export const claims: Claim[] = claimsRaw.claims;

export function getClaim(id: string): Claim | undefined {
  return claims.find((c) => c.id === id);
}

export function claimDisplay(id: string): string {
  const c = getClaim(id);
  if (!c) return "";
  return `${c.value}${c.unit ? (c.unit.startsWith("/") ? c.unit : ` ${c.unit}`) : ""}`.trim();
}
