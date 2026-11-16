import Link from "next/link";
import { PixelCat } from "@/components/cats/PixelCat";

export default function NotFound() {
  return (
    <div className="container-site section-pad text-center">
      <PixelCat pose="error" scale={5} title="404 unplugged cat" />
      <h1 className="display mt-4 text-4xl text-ink">404 — cable unplugged</h1>
      <p className="mt-2 text-ink-soft">This page wandered off chasing yarn.</p>
      <Link href="/" className="btn mt-6 inline-flex">
        Home
      </Link>
    </div>
  );
}
