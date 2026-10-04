"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, Palette, Flame } from "lucide-react";

const LEARNING_ITEMS = [
  {
    title: "Advanced Web Design",
    icon: Palette,
  },
  {
    title: "UI/UX",
    icon: Compass,
  },
  {
    title: "Modern Web Technologies",
    icon: Cpu,
  },
  {
    title: "Creative Coding",
    icon: Flame,
  },
];

export default function CurrentlyLearning() {
  return (
    <section className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-600/10 blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              CURRENTLY LEARNING
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            CURRENTLY LEARNING
          </h2>
        </div>

        {/* Dynamic kinetic motto */}
        <div className="flex flex-col font-mono text-xs sm:text-sm text-neutral-400 border-l border-rose-500/50 pl-4">
          <span className="font-bold text-white tracking-widest">
            ALWAYS LEARNING.
          </span>
          <span className="text-rose-400 font-bold tracking-widest">
            ALWAYS BUILDING.
          </span>
        </div>
      </div>

      {/* Learning Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LEARNING_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative p-8 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-rose-500/50 transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-rose-500 font-semibold">
                0{i + 1}
              </span>
              <item.icon className="w-6 h-6 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
