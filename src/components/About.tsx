"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "02+", label: "YEARS LEARNING" },
  { value: "03", label: "FEATURED PROJECTS" },
  { value: "∞", label: "IDEAS TO BUILD" },
  { value: "100%", label: "CURIOUS" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Section Sub-header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
          ABOUT
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e16] p-2 shadow-2xl"
          >
            {/* Ambient Crimson Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/30 via-indigo-600/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-900">
              <Image
                src="/images/vinay-portrait-black-folded.jpg"
                alt="Vinay Duvvada"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover object-center filter grayscale group-hover:grayscale-0 contrast-110 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-80" />

              {/* In-image Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">
                    Vinay Duvvada
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Computer Science & Design Student
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-rose-500/20 border border-rose-500/40 text-rose-300">
                  DEVELOPER
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Editorial Headline & Exact User Text */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
              I DON&apos;T JUST BUILD WEBSITES.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-300">
                I DESIGN EXPERIENCES.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col gap-5 text-neutral-300 text-base sm:text-lg font-light leading-relaxed"
          >
            <p>
              I&apos;m Vinay Duvvada, a 2nd-year B.Tech Computer Science & Design student passionate about Web Development and UI/UX Design.
            </p>
            <p>
              I enjoy transforming ideas into responsive, interactive and visually engaging digital experiences.
            </p>
            <p>
              I&apos;m currently exploring advanced web design, UI/UX principles and modern web technologies.
            </p>
          </motion.div>

          {/* Animated Statistics Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/30 transition-colors"
              >
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-500">
                    {stat.value}
                  </span>
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-rose-400 mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
