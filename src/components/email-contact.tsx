"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cvPath, identity } from "@/lib/content";

export function EmailContact() {
  const address = useRef<HTMLAnchorElement>(null);
  const [feedback, setFeedback] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setFeedback("Email address copied.");
    } catch {
      if (address.current) {
        const range = document.createRange();
        range.selectNodeContents(address.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setFeedback("The email address is selected. Use Copy to copy it.");
    }
  }

  return (
    <div className="email-contact">
      <div className="contact-actions">
        <a href={`mailto:${identity.email}`} className={buttonVariants()}>
          Email me <Mail aria-hidden="true" />
        </a>
        {cvPath && (
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            View CV <ArrowUpRight aria-hidden="true" />
          </a>
        )}
        {!cvPath && (
          <button
            type="button"
            disabled
            className={buttonVariants({ variant: "outline" })}
            title="Your finished CV will be linked here"
            aria-label="View CV, coming soon"
          >
            View CV <span className="placeholder-label">Coming soon</span>
          </button>
        )}
      </div>
      <div className="email-details">
        <a
          href={`mailto:${identity.email}`}
          ref={address}
          className="contact-email"
        >
          {identity.email}
        </a>
        <button type="button" className="copy-email" onClick={copyEmail}>
          <Copy size={16} aria-hidden="true" /> Copy email
        </button>
      </div>
      <p className="contact-copy-status" role="status">
        {feedback}
      </p>
    </div>
  );
}
