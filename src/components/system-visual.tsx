"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Code2,
  Cpu,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";

const fields = [
  {
    name: "Software",
    label: "Build the foundation.",
    detail: "Useful applications. Thoughtful architecture.",
    icon: Code2,
    color: "#23785b",
  },
  {
    name: "Intelligence",
    label: "Explore what’s possible.",
    detail: "AI that connects data to practical problems.",
    icon: BrainCircuit,
    color: "#796748",
  },
  {
    name: "Healthcare",
    label: "Keep people at the center.",
    detail: "Technology informed by the realities of care.",
    icon: HeartPulse,
    color: "#36716e",
  },
  {
    name: "Connected systems",
    label: "Connect the digital and physical.",
    detail: "A direction toward devices, sensors, and IoT.",
    icon: Cpu,
    color: "#536b4c",
  },
];

function projectPoint(lat: number, lon: number) {
  const x = Math.cos(lat) * Math.cos(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.sin(lon);
  const tilt = -0.29;
  return [
    280 + 164 * (x * Math.cos(tilt) - y * Math.sin(tilt)),
    254 + 164 * (x * Math.sin(tilt) + y * Math.cos(tilt)) * 0.89 + z * 19,
  ];
}

const paths = Array.from({ length: 27 }, (_, index) => {
  const latitude = index < 13;
  const fixed = latitude
    ? ((index - 6) * Math.PI) / 15
    : ((index - 13) * Math.PI) / 14;
  return Array.from({ length: 100 }, (_, point) => {
    const t = (point * Math.PI * 2) / 99;
    const [x, y] = projectPoint(latitude ? fixed : t, latitude ? t : fixed);
    return `${point ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
});

export function SystemVisual() {
  const [selected, setSelected] = useState(0);
  const field = fields[selected];
  return (
    <div
      className="system-visual"
      style={{ "--field-color": field.color } as React.CSSProperties}
    >
      <div className="visual-topline">
        <span>
          <span className="tiny-dot" /> THE CONNECTED SYSTEM
        </span>
        <span>
          FIG. 01 <ArrowUpRight aria-hidden="true" size={12} />
        </span>
      </div>
      <div className="globe-wrap">
        <svg
          viewBox="0 0 560 500"
          role="img"
          aria-label="Wireframe globe connecting software, intelligence, healthcare, and connected systems"
        >
          <defs>
            <radialGradient id="globe-halo">
              <stop stopColor="#a9d3af" stopOpacity=".38" />
              <stop offset="1" stopColor="#dcead9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="globe-fill" cx="35%" cy="30%">
              <stop stopColor="#eaf2e5" stopOpacity=".5" />
              <stop offset="1" stopColor="#bed4b7" stopOpacity=".13" />
            </radialGradient>
            <linearGradient id="globe-line" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#5c926e" stopOpacity=".25" />
              <stop
                offset=".5"
                stopColor="var(--field-color)"
                stopOpacity=".65"
              />
              <stop offset="1" stopColor="#719b7d" stopOpacity=".18" />
            </linearGradient>
          </defs>
          <circle cx="280" cy="255" r="235" fill="url(#globe-halo)" />
          <path
            d="M280 34V474M52 254H507"
            stroke="#4b7959"
            strokeOpacity=".15"
            strokeDasharray="3 6"
          />
          <ellipse
            cx="280"
            cy="254"
            rx="220"
            ry="82"
            transform="rotate(-32 280 254)"
            fill="none"
            stroke="#89a68a"
            strokeOpacity=".45"
          />
          <ellipse
            cx="280"
            cy="254"
            rx="220"
            ry="82"
            transform="rotate(40 280 254)"
            fill="none"
            stroke="#89a68a"
            strokeOpacity=".28"
            strokeDasharray="3 5"
          />
          <circle cx="280" cy="254" r="164" fill="url(#globe-fill)" />
          <g stroke="url(#globe-line)" strokeWidth=".8" fill="none">
            {paths.map((path, i) => (
              <path key={i} d={path} />
            ))}
          </g>
          <path
            d="M136 164L204 226L352 278L427 362M148 348L204 226L342 140L352 278"
            stroke="var(--field-color)"
            strokeWidth="1.3"
            opacity=".75"
            fill="none"
          />
          {[
            [136, 164],
            [204, 226],
            [352, 278],
            [427, 362],
            [148, 348],
            [342, 140],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="9"
                fill="#ecf3e9"
                stroke="var(--field-color)"
                strokeOpacity=".25"
              />
              <circle cx={x} cy={y} r="3" fill="var(--field-color)" />
            </g>
          ))}
          <g fill="#6e836e" fontSize="9" fontFamily="monospace">
            <text x="68" y="442">
              PEOPLE × DATA × SYSTEMS
            </text>
            <text x="467" y="91" transform="rotate(90 467 91)">
              IDEAS → REAL-WORLD IMPACT
            </text>
          </g>
        </svg>
        {fields.map(({ name, icon: Icon }, index) => (
          <button
            key={name}
            className={`field-node field-node-${index}${selected === index ? " is-selected" : ""}`}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <Icon aria-hidden="true" size={16} />
            <span>{name}</span>
          </button>
        ))}
        <span className="globe-coordinate coordinate-left">DIGITAL</span>
        <span className="globe-coordinate coordinate-right">PHYSICAL</span>
      </div>
      <div className="visual-caption" aria-live="polite">
        <span className="caption-index">0{selected + 1} / 04</span>
        <div>
          <strong>{field.label}</strong>
          <p>{field.detail}</p>
        </div>
        <span className="caption-plus" aria-hidden="true">
          +
        </span>
      </div>
      <p className="visual-hint">Select a connection to explore.</p>
    </div>
  );
}
