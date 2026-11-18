import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main tabIndex={-1} id="main-content" className="container error-page">
        <p className="eyebrow">404 / A MISSING CONNECTION</p>
        <h1>
          This page took
          <br />a different path.
        </h1>
        <p>
          The page you’re looking for isn’t here. Head back to the portfolio to
          explore my work and engineering direction.
        </p>
        <Link href="/" className={buttonVariants()}>
          <ArrowLeft aria-hidden="true" /> Back to the portfolio
        </Link>
      </main>
      <Footer />
    </>
  );
}
