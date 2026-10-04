"use client";

import React from "react";
import {
  Users,
  AlertCircle,
  Search,
  Layout,
  Palette,
  Play,
  Terminal,
} from "lucide-react";

const UX_STEPS = [
  { step: "01", name: "USER", icon: Users, desc: "Empathy mapping & behavioral observation" },
  { step: "02", name: "PROBLEM", icon: AlertCircle, desc: "Defining core user friction points" },
  { step: "03", name: "RESEARCH", icon: Search, desc: "Heuristic evaluation & competitive audit" },
  { step: "04", name: "WIREFRAME", icon: Layout, desc: "Structural clarity & low cognitive load" },
  { step: "05", name: "UI DESIGN", icon: Palette, desc: "Design systems, typography & accessibility" },
  { step: "06", name: "PROTOTYPE", icon: Play, desc: "Kinetic motion & interactive validation" },
  { step: "07", name: "DEVELOPMENT", icon: Terminal, desc: "Semantic, accessible 60fps code" },
];

export default function UIUXProcess() {
  return (
    <section
      id="uiux"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              UI/UX DESIGN
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            DESIGN IS NOT DECORATION.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-300 to-white">
              IT&apos;S COMMUNICATION.
            </span>
          </h2>
        </div>
      </div>

      {/* Workflow Label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-rose-400 uppercase font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" />
          WORKFLOW
        </span>
        <div className="h-[1px] w-16 bg-rose-500/40" />
      </div>

      {/* UX Pipeline Horizontal Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {UX_STEPS.map((s) => (
          <div
            key={s.name}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/40 transition-colors flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-rose-500">
                {s.step}
              </span>
              <s.icon className="w-4 h-4 text-neutral-500 group-hover:text-rose-400 transition-colors" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white block">
                {s.name}
              </span>
              <span className="text-[10px] text-neutral-400 mt-1 block leading-tight">
                {s.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
