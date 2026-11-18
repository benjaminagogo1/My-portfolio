"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Code2,
  Cpu,
  HeartPulse,
  Layers3,
  Network,
  Plus,
  Minus,
} from "lucide-react";
import { expertise } from "@/lib/content";

const icons = {
  code: Code2,
  layers: Layers3,
  network: Network,
  brain: BrainCircuit,
  cpu: Cpu,
  heart: HeartPulse,
};

export function ExpertiseGrid() {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <div className="expertise-grid">
      {expertise.map((item, index) => {
        const Icon = icons[item.icon as keyof typeof icons];
        const open = expanded.includes(item.title);
        return (
          <article
            key={item.title}
            className={`expertise-item${open ? " is-expanded" : ""}`}
          >
            <div className="expertise-top">
              <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
              <span>0{index + 1}</span>
            </div>
            <h3>
              <button
                className="expertise-toggle"
                aria-expanded={open}
                aria-controls={`expertise-detail-${index}`}
                onClick={() =>
                  setExpanded(
                    open
                      ? expanded.filter((title) => title !== item.title)
                      : [...expanded, item.title],
                  )
                }
              >
                <span>{item.title}</span>
                {open ? (
                  <Minus aria-hidden="true" size={17} />
                ) : (
                  <Plus aria-hidden="true" size={17} />
                )}
              </button>
            </h3>
            <p className="expertise-description">{item.description}</p>
            <div
              id={`expertise-detail-${index}`}
              hidden={!open}
              className="expertise-detail"
            >
              <p>{item.detail}</p>
              <span>{item.tools}</span>
            </div>
            <span className="expertise-status">
              <span />
              {item.status}
            </span>
          </article>
        );
      })}
    </div>
  );
}
