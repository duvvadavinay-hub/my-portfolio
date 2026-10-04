"use client";

import React from "react";
import { motion } from "framer-motion";

const MANIFESTO_WORDS = ["DESIGN.", "DEVELOP.", "LEARN.", "IMPROVE.", "REPEAT."];

export default function FinalCTA() {
  return (
    <section className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-center overflow-hidden border-t border-white/[0.08]">
      {/* Background slow-moving red gradient */}
      <div className="absolute inset-0 bg-radial-crimson opacity-60 pointer-events-none" />

      <div className="flex flex-col items-center justify-center gap-8 relative z-10">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white">
            THANK YOU
            <span className="block text-neutral-500">FOR EXPLORING.</span>
          </h2>
        </div>

        {/* Animated Independent Words */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 text-base sm:text-2xl md:text-3xl font-mono font-black tracking-widest">
          {MANIFESTO_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={
                i === 0
                  ? "text-rose-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  : i === 4
                  ? "text-white underline decoration-rose-500 underline-offset-8"
                  : "text-neutral-400 hover:text-white transition-colors"
              }
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
