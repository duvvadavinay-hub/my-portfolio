"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Terminal,
  Palette,
  Wrench,
  Cloud,
  Cpu,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  level: "Advanced" | "Proficient" | "Exploring";
  description: string;
  connections: string[];
}

const SKILL_DATA: SkillItem[] = [
  // FRONTEND
  {
    name: "React",
    category: "FRONTEND",
    level: "Advanced",
    description: "Component architecture, hooks, performance profiling, and state management.",
    connections: ["JavaScript", "Tailwind CSS", "Next.js", "Vercel"],
  },
  {
    name: "JavaScript",
    category: "FRONTEND",
    level: "Advanced",
    description: "Modern ES6+, async/await, closures, DOM manipulation, and event loops.",
    connections: ["React", "Node.js", "HTML5", "CSS3"],
  },
  {
    name: "Tailwind CSS",
    category: "FRONTEND",
    level: "Advanced",
    description: "Utility-first responsive layouts, custom design tokens, and fluid typography.",
    connections: ["React", "CSS3", "Figma"],
  },
  {
    name: "HTML5",
    category: "FRONTEND",
    level: "Advanced",
    description: "Semantic document structures, accessibility standards, and SEO hierarchy.",
    connections: ["CSS3", "JavaScript"],
  },
  {
    name: "CSS3",
    category: "FRONTEND",
    level: "Advanced",
    description: "Modern CSS Grid, Flexbox, keyframe animations, and custom properties.",
    connections: ["HTML5", "Tailwind CSS"],
  },

  // BACKEND & DATABASE
  {
    name: "Node.js",
    category: "BACKEND & DATABASE",
    level: "Proficient",
    description: "Express APIs, asynchronous event-driven backend services, and npm tooling.",
    connections: ["JavaScript", "PostgreSQL", "Firebase"],
  },
  {
    name: "MySQL",
    category: "BACKEND & DATABASE",
    level: "Proficient",
    description: "Relational database schema normalization, indexing, joins, and SQL queries.",
    connections: ["Node.js", "PostgreSQL"],
  },
  {
    name: "PostgreSQL",
    category: "BACKEND & DATABASE",
    level: "Proficient",
    description: "Advanced relational storage, ACID transactions, and Supabase integration.",
    connections: ["Node.js", "Supabase"],
  },
  {
    name: "Firebase",
    category: "BACKEND & DATABASE",
    level: "Proficient",
    description: "Realtime database, authentication flows, and serverless cloud functions.",
    connections: ["React", "Supabase"],
  },
  {
    name: "Supabase",
    category: "BACKEND & DATABASE",
    level: "Proficient",
    description: "Postgres backend-as-a-service, row-level security, and real-time subscriptions.",
    connections: ["PostgreSQL", "React"],
  },
  {
    name: "Appwrite",
    category: "BACKEND & DATABASE",
    level: "Exploring",
    description: "Self-hosted BaaS platform for authentication, databases, and storage buckets.",
    connections: ["React", "Node.js"],
  },

  // PROGRAMMING
  {
    name: "Python",
    category: "PROGRAMMING",
    level: "Proficient",
    description: "Algorithmic scripting, computational problem solving, and data structures.",
    connections: ["Pandas", "NumPy"],
  },
  {
    name: "Java",
    category: "PROGRAMMING",
    level: "Proficient",
    description: "Object-oriented programming, design patterns, and JVM execution models.",
    connections: ["C"],
  },
  {
    name: "C",
    category: "PROGRAMMING",
    level: "Proficient",
    description: "Low-level memory management, pointers, and foundational computer architecture.",
    connections: ["Java"],
  },

  // UI/UX
  {
    name: "Figma",
    category: "UI/UX",
    level: "Advanced",
    description: "Design systems, auto-layout, interactive component prototyping, and token libraries.",
    connections: ["Tailwind CSS", "Canva"],
  },
  {
    name: "Canva",
    category: "UI/UX",
    level: "Proficient",
    description: "High-velocity visual communication, editorial presentation graphics, and brand styling.",
    connections: ["Figma"],
  },

  // TOOLS & DEPLOYMENT
  {
    name: "Git",
    category: "TOOLS",
    level: "Advanced",
    description: "Version control branching, rebasing, merge conflict resolution, and commit hygiene.",
    connections: ["GitHub", "GitHub Actions"],
  },
  {
    name: "GitHub",
    category: "TOOLS",
    level: "Advanced",
    description: "Collaborative code reviews, pull requests, issue tracking, and repository security.",
    connections: ["Git", "GitHub Actions", "Vercel"],
  },
  {
    name: "GitHub Actions",
    category: "TOOLS",
    level: "Proficient",
    description: "Continuous integration workflows, automated testing, and automated deploy scripts.",
    connections: ["GitHub", "Vercel", "Render"],
  },
  {
    name: "Vercel",
    category: "DEPLOYMENT",
    level: "Advanced",
    description: "Edge networks, Next.js optimized cloud deployments, and serverless compute.",
    connections: ["React", "GitHub"],
  },
  {
    name: "Render",
    category: "DEPLOYMENT",
    level: "Proficient",
    description: "Fullstack web service hosting, background workers, and PostgreSQL managed databases.",
    connections: ["GitHub", "Node.js"],
  },
  {
    name: "Netlify",
    category: "DEPLOYMENT",
    level: "Proficient",
    description: "Static and Jamstack continuous deployment pipelines and edge redirects.",
    connections: ["Vercel", "GitHub"],
  },

  // DATA
  {
    name: "Pandas",
    category: "DATA",
    level: "Proficient",
    description: "DataFrame manipulation, exploratory data cleaning, and statistical grouping.",
    connections: ["NumPy", "Python"],
  },
  {
    name: "NumPy",
    category: "DATA",
    level: "Proficient",
    description: "Multi-dimensional array computations, vectorization, and mathematical modeling.",
    connections: ["Pandas", "Python"],
  },
];

const CATEGORIES = [
  "ALL",
  "FRONTEND",
  "BACKEND & DATABASE",
  "PROGRAMMING",
  "UI/UX",
  "TOOLS",
  "DEPLOYMENT",
  "DATA",
];

export default function SkillsEcosystem() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    activeCategory === "ALL"
      ? SKILL_DATA
      : SKILL_DATA.filter((s) => s.category === activeCategory);

  return (
    <section
      id="tech-stacks"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      <div id="skills" className="absolute -top-24 pointer-events-none" />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              TECH STACKS
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            TECH STACKS
          </h2>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? "bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ecosystem Canvas / Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Floating Skill Badges */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredSkills.map((skill) => {
            const isHovered = hoveredSkill?.name === skill.name;
            const isConnected = hoveredSkill?.connections.includes(skill.name);

            return (
              <motion.div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 select-none ${
                  isHovered
                    ? "bg-rose-600/20 border-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.4)] z-20"
                    : isConnected
                    ? "bg-indigo-600/20 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] z-10"
                    : "bg-[#0c0c14]/90 border-white/[0.07] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                    {skill.category.split(" ")[0]}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      skill.level === "Advanced"
                        ? "bg-rose-500 shadow-[0_0_6px_#ef4444]"
                        : "bg-emerald-400"
                    }`}
                  />
                </div>

                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                  {skill.name}
                </div>

                <div className="mt-2 text-[10px] font-mono text-neutral-400">
                  {skill.level}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Inspector Panel */}
        <div className="lg:col-span-4 sticky top-28 p-6 sm:p-8 rounded-2xl bg-[#0d0d16] border border-white/10 shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                Tech Stack Inspector
              </span>
            </div>
            {hoveredSkill && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300">
                {hoveredSkill.level}
              </span>
            )}
          </div>

          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="text-[11px] font-mono text-rose-400 uppercase tracking-widest">
                  {hoveredSkill.category}
                </span>
                <h4 className="text-2xl font-black text-white mt-1">
                  {hoveredSkill.name}
                </h4>
              </div>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {hoveredSkill.description}
              </p>

              <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  Connected Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hoveredSkill.connections.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3 text-neutral-500">
              <Cpu className="w-10 h-10 stroke-1 animate-pulse" />
              <p className="text-xs font-mono">
                Hover over any technology node to inspect its proficiency & connected stack.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
