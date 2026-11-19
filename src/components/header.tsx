"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { cvPath, identity, navigation } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { AccessibilityControls } from "@/components/accessibility";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        ba<span>↗</span>
      </span>
      <span className="brand-name">
        Benjamin Agogo<span>{identity.title}</span>
      </span>
    </>
  );
}

export function Header({ home = false }: { home?: boolean }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [home]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href={href("home")}
          className="brand"
          aria-label="Benjamin Agogo, home"
        >
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ label, id }) => (
            <a
              key={id}
              href={href(id)}
              aria-current={home && active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
          {cvPath && (
            <a href={cvPath} target="_blank" rel="noopener noreferrer">
              View CV
            </a>
          )}
          {!cvPath && (
            <span
              className="nav-cv-placeholder"
              title="Your finished CV will be linked here"
            >
              CV <span>soon</span>
            </span>
          )}
        </nav>
        <a
          className={`${buttonVariants({ size: "sm" })} header-contact`}
          href={href("contact")}
        >
          <span className="contact-label-full">Let’s connect</span>
          <span className="contact-label-short">Contact</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <AccessibilityControls />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="mobile-menu" aria-label="Open navigation">
              <Menu aria-hidden="true" size={24} />
            </button>
          </DialogTrigger>
          <DialogContent closeLabel="Close navigation">
            <DialogTitle className="mt-3 text-lg font-semibold">
              Explore the portfolio
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Engineering, AI, healthcare, and connected systems.
            </DialogDescription>
            <nav aria-label="Mobile navigation" className="mobile-nav">
              {navigation.map(({ label, id }, index) => (
                <DialogClose asChild key={id}>
                  <a href={href(id)}>
                    <span>0{index + 1}</span>
                    {label}
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </a>
                </DialogClose>
              ))}
              {cvPath && (
                <DialogClose asChild>
                  <a href={cvPath} target="_blank" rel="noopener noreferrer">
                    <span>CV</span> View CV{" "}
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </a>
                </DialogClose>
              )}
              {!cvPath && (
                <div className="mobile-cv-placeholder">
                  View CV <span>Coming soon</span>
                </div>
              )}
            </nav>
            <p className="mt-auto text-sm text-muted-foreground">
              {identity.name}
              <br />
              {identity.title}
            </p>
          </DialogContent>
        </Dialog>
      </div>
      <noscript>
        <nav
          className="no-script-nav container"
          aria-label="Section navigation"
        >
          {navigation.map(({ label, id }) => (
            <a key={id} href={href(id)}>
              {label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
