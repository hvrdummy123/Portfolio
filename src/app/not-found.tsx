import Link from "next/link";
import { PixelCat } from "@/components/cats/PixelCat";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-site section-pad text-center">
      <PixelCat pose="error" scale={5} title="Mochi looking for the page" />
      <h1 className="display mt-4 text-4xl text-ink">Page not found</h1>
      <p className="mt-2 text-ink-soft">
        This route is missing. Try Work or grab a résumé while you are here.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/work">See work</Button>
        <Button href="/resumes" variant="secondary">
          Résumé
        </Button>
        <Link href="/" className="btn btn-ghost inline-flex">
          Home
        </Link>
      </div>
    </div>
  );
}
