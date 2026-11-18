"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useAccessibility } from "@/components/accessibility";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -35px 0px" });
  const systemReduced = useReducedMotion();
  const { reduceMotion } = useAccessibility();
  const reduced = systemReduced || reduceMotion;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 14 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
