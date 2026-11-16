"use client";

import { useEffect, useState } from "react";

export function RefGreeting() {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("ref");
    if (value) setRef(value);
  }, []);

  if (!ref) return null;

  return (
    <p className="mb-4 inline-flex rounded-full border-2 border-border bg-butter px-3 py-1 text-sm">
      Hi {ref} team — thanks for reading.
    </p>
  );
}
