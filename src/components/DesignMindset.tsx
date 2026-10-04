"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Palette,
  Terminal,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    id: "research",
    stepNumber: "01",
    title: "RESEARCH",
    icon: Search,
    tagline: "Uncovering user pain points & contextual signals",
    description:
      "Deep diving into user behavior, stakeholder objectives, competitive landscapes, and technical constraints before writing a single line of code.",
    deliverables: ["User Persona Mapping", "Information Architecture", "Heuristic Audits"],
  },
  {
    id: "ideate",
    stepNumber: "02",
    title: "IDEATE",
    icon: Lightbulb,
    tagline: "Exploration through high-velocity concepts",
    description:
      "Synthesizing insights into wireframes, user flows, and divergent structural layouts to discover the simplest path through complex problems.",
    deliverables: ["Low-Fi Wireframing", "User Journey Flowcharts", "Interaction Maps"],
  },
  {
    id: "design",
    stepNumber: "03",
    title: "DESIGN",
    icon: Palette,
    tagline: "Pixel-perfect visual harmony & kinetic physics",
    description:
      "Engineering cohesive design systems, typographic hierarchies, micro-interactions, responsive states, and high-fidelity Figma components.",
    deliverables: ["Figma Design Systems", "Motion Curves & Physics", "Accessibility Contrast (WCAG AAA)"],
  },
  {
    id: "develop",
    stepNumber: "04",
    title: "DEVELOP",
    icon: Terminal,
    tagline: "High-performance code crafted to 60fps standard",
    description:
      "Translating visual blueprints into semantic, accessible, and reactive codebases utilizing React, Next.js, WebGL shaders, and smooth animation hooks.",
    deliverables: ["Modular Component Architecture", "Dynamic State Management", "Clean TypeScript Contracts"],
  },
  {
    id: "test",
    stepNumber: "05",
    title: "TEST",
    icon: CheckCircle2,
    tagline: "Rigorous quality assurance across every viewport",
    description:
      "Benchmarking load times, Core Web Vitals, cross-browser compatibility, edge case input validation, and keyboard navigation compliance.",
    deliverables: ["Core Web Vitals Benchmark", "Cross-Browser & Device Matrix", "Responsive Stress Testing"],
  },
  {
    id: "improve",
    stepNumber: "06",
    title: "IMPROVE",
    icon: TrendingUp,
    tagline: "Continuous iteration driven by real-world telemetry",
    description:
      "Monitoring performance telemetry, user interaction heatmaps, and feedback loops to continuously refine UI polish and speed.",
    deliverables: ["Real User Metrics (RUM)", "Micro-Interaction Polishing", "Continuous Delivery & Updates"],
  },
];

export default function DesignMindset() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="mindset"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              PHILOSOPHY
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            DESIGN MINDSET
          </h2>
        </div>
      </div>

      {/* Process Stepper Bar (Interactive) */}
      <div className="hidden lg:grid grid-cols-6 gap-3 mb-10">
        {STEPS.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`relative flex flex-col p-4 rounded-xl border text-left transition-all duration-300 ${
                isActive
                  ? "bg-rose-500/10 border-rose-500/60 shadow-[0_0_25px_rgba(225,29,72,0.2)]"
                  : "bg-white/[0.02] border-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-neutral-400 font-semibold">
                  {step.stepNumber}
                </span>
                <step.icon
                  className={`w-4 h-4 ${isActive ? "text-rose-400" : "text-neutral-500"}`}
                />
              </div>
              <span
                className={`font-mono text-xs font-bold tracking-wider ${
                  isActive ? "text-white" : "text-neutral-400"
                }`}
              >
                {step.title}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeMindsetBar"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-rose-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Featured Active Step Detail Card (Desktop) */}
      <div className="hidden lg:block relative p-8 sm:p-12 rounded-2xl bg-[#0b0b12] border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative grid grid-cols-12 gap-8 items-center">
          <div className="col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs font-semibold">
                PHASE {STEPS[activeStep].stepNumber} OF 06
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {STEPS[activeStep].tagline}
              </span>
            </div>

            <h3 className="text-4xl font-extrabold text-white tracking-tight">
              {STEPS[activeStep].title}
            </h3>

            <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-2xl">
              {STEPS[activeStep].description}
            </p>

            {/* Deliverables tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {STEPS[activeStep].deliverables.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center p-8 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            {React.createElement(STEPS[activeStep].icon, {
              className: "w-20 h-20 text-rose-500 mb-4 animate-pulse-slow",
            })}
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              Execution Benchmark
            </span>
            <span className="text-white font-bold text-sm mt-1">
              Standardized Workflow
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden flex flex-col gap-6 relative">
        <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-gradient-to-b from-rose-500 via-neutral-700 to-rose-500/20" />

        {STEPS.map((step) => (
          <div
            key={step.id}
            className="relative flex items-start gap-6 pl-12"
          >
            <div className="absolute left-[18px] top-4 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[#050508] shadow-[0_0_10px_#ef4444]" />
            <div className="p-6 rounded-xl bg-[#0c0c14] border border-white/10 w-full flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400">
                  {step.stepNumber} // {step.title}
                </span>
                <step.icon className="w-4 h-4 text-neutral-400" />
              </div>
              <p className="text-xs text-neutral-400">{step.tagline}</p>
              <p className="text-sm text-neutral-300 font-light mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
