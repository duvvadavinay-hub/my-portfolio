"use client";

import React from "react";

const ROW_1 = [
  "REACT",
  "NEXT.JS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "FIGMA",
  "THREE.JS",
  "GSAP",
  "FRAMER MOTION",
  "LENIS",
];

const ROW_2 = [
  "PYTHON",
  "NODE.JS",
  "MYSQL",
  "POSTGRESQL",
  "SUPABASE",
  "FIREBASE",
  "GITHUB",
  "VERCEL",
  "RENDER",
];

export default function TechMarquee() {
  return (
    <section className="relative py-16 overflow-hidden border-y border-white/[0.08] bg-[#050508]/80 select-none">
      {/* Glow overlays on edges for smooth vignette */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050508] to-transparent z-10" />

      <div className="flex flex-col gap-6">
        {/* Row 1: Left to Right marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-8">
            {[...ROW_1, ...ROW_1].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-8 text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white/20 hover:text-rose-400 transition-colors cursor-default whitespace-nowrap"
              >
                <span>{tech}</span>
                <span className="text-rose-600 text-lg sm:text-2xl font-normal">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-8">
            {[...ROW_2, ...ROW_2].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-8 text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white/20 hover:text-white transition-colors cursor-default whitespace-nowrap"
              >
                <span>{tech}</span>
                <span className="text-white/40 text-lg sm:text-2xl font-normal">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
