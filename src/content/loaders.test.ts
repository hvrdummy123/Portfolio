import { describe, expect, it } from "vitest";
import { claims, getClaim, profile } from "@/content/profile";
import { pdfFilename } from "@/content/data/resume";
import roles from "../../content/roles.json";

describe("profile + claims loaders", () => {
  it("has required identity fields", () => {
    expect(profile.education.cgpa).toBe("3.95/4");
    expect(profile.graduationLabel).toBe("June 2026");
    expect(profile.availability).toContain("Available immediately");
    expect(profile.email).toContain("@");
  });

  it("exposes key claims with evidence levels", () => {
    const batch = getClaim("batch-speedup-pct");
    expect(batch?.value).toBe("76");
    expect(batch?.evidenceLevel).toBe("private");
    expect(claims.length).toBeGreaterThan(5);
  });

  it("maps resume PDF names", () => {
    expect(pdfFilename("backend")).toBe("Harshita_Ranka_Resume_Backend.pdf");
    expect(pdfFilename("ai-agents")).toBe("Harshita_Ranka_Resume_AI_Agents.pdf");
  });

  it("has role lens entries with featured projects", () => {
    expect(roles.backend.featured.length).toBeGreaterThan(0);
    expect(roles["ai-agents"].whyFit.length).toBe(3);
  });
});
