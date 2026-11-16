"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PixelCat } from "@/components/cats/PixelCat";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-site section-pad text-center">
      <PixelCat pose="error" scale={4} title="Something went wrong" />
      <h1 className="display mt-4 text-3xl text-ink">Something went wrong</h1>
      <p className="mt-2 text-ink-soft">Try again, or head back to Work.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button href="/work" variant="secondary">
          Work
        </Button>
        <Link href="/resumes" className="btn btn-ghost inline-flex">
          Résumé
        </Link>
      </div>
    </div>
  );
}
