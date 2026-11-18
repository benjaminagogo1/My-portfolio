"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main tabIndex={-1} id="main-content" className="container error-page">
      <p className="eyebrow">A CONNECTION INTERRUPTED</p>
      <h1>
        Something didn’t
        <br />
        load as expected.
      </h1>
      <p>Please try loading this page again.</p>
      <Button onClick={reset}>Try again</Button>
      <Link href="/" className="inline-link">
        Return to the portfolio
      </Link>
    </main>
  );
}
