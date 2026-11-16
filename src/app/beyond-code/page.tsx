import { redirect } from "next/navigation";

/** Legacy route — puzzles live at /puzzles. */
export default function BeyondCodeRedirect() {
  redirect("/puzzles");
}
