"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "@/lib/content";
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
        Benjamin Agogo<span>Software Engineer</span>
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
        </nav>
        <a
          className={`${buttonVariants({ size: "sm" })} header-contact`}
          href={href("contact")}
        >
          Let’s connect <ArrowUpRight aria-hidden="true" />
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
            </nav>
            <p className="mt-auto text-sm text-muted-foreground">
              Otete Benjamin Agogo
              <br />
              Software Engineer
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
