"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Code2, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { Project } from "@/data/projectsData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "problem" | "design" | "development" | "technology" | "result"
  >("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  const modalNode = (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        data-cursor="CLOSE"
        className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
      />

      {/* Modal Window Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c14] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Top Bar with Case Study Title and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080f]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              CASE STUDY // {project.number}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-medium transition-colors"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 flex items-center justify-center text-white transition-all cursor-pointer z-50 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              aria-label="Close modal"
              data-cursor="CLOSE"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-8">
          {/* Project Hero Banner Image / Dual Gallery Collage */}
          {project.collageImages && project.collageImages.length >= 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-xl group">
                <Image
                  src={project.collageImages[0]}
                  alt={`${project.title} Performance Dashboard`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                  {project.collageLabels?.[0] || "01 // Primary Telemetry View"}
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-xl group">
                <Image
                  src={project.collageImages[1]}
                  alt={`${project.title} Secondary View`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-rose-500/30 text-[10px] font-mono text-rose-300">
                  {project.collageLabels?.[1] || "02 // Secondary View"}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Metrics Ticker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col"
              >
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-rose-400">
                  {metric.value}
                </span>
                <span className="text-xs font-mono text-neutral-400 mt-1 uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Structured 6-Phase Tabs */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {[
                { key: "overview", label: "01 — OVERVIEW" },
                { key: "problem", label: "02 — PROBLEM" },
                { key: "design", label: "03 — DESIGN" },
                { key: "development", label: "04 — DEVELOPMENT" },
                { key: "technology", label: "05 — TECH STACKS" },
                { key: "result", label: "06 — RESULT" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                      : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.07]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 min-h-[160px]">
              {activeTab === "overview" && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    Executive Overview
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {project.overview}
                  </p>
                  <div className="mt-2 flex flex-col gap-2">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Core Highlights
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.keyFeatures.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-xs font-mono text-neutral-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "problem" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-rose-500" />
                    The Problem & Challenge
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {project.problem}
                  </p>
                </div>
              )}

              {activeTab === "design" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-rose-500" />
                    Design Architecture & User Experience
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {project.designProcess}
                  </p>
                </div>
              )}

              {activeTab === "development" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-rose-500" />
                    Engineering & Architecture Decisions
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {project.development}
                  </p>
                </div>
              )}

              {activeTab === "technology" && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-rose-500" />
                    Tech Stacks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "result" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    Impact & Project Result
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#08080f] flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-500">
            ROLE: {project.role} // {project.year}
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase transition-colors flex items-center gap-2"
              >
                <span>LAUNCH LIVE APP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalNode, document.body);
}
