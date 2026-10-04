"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye, Layers } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { PROJECTS, Project } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isClosingRef = useRef(false);

  const handleOpen = (project: Project) => {
    if (isClosingRef.current) return;
    setSelectedProject(project);
  };

  const handleClose = () => {
    isClosingRef.current = true;
    setSelectedProject(null);
    setTimeout(() => {
      isClosingRef.current = false;
    }, 350);
  };

  return (
    <section
      id="projects"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              PROJECTS
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
            SELECTED WORK
          </h2>
        </div>
        <p className="text-sm sm:text-base font-mono text-neutral-400 max-w-md">
          A collection of projects where design meets development.
        </p>
      </div>

      {/* Large Immersive Project Panels */}
      <div className="flex flex-col gap-16 sm:gap-20">
        {PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left / Right Project Image Container */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                } relative`}
              >
                <div
                  onClick={() => handleOpen(project)}
                  data-cursor="VIEW"
                  className="cursor-pointer relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c14] p-2.5 sm:p-3 transition-all duration-500 group-hover:border-rose-500/40 group-hover:shadow-[0_0_50px_rgba(225,29,72,0.3)] select-none"
                >
                  {project.collageImages && project.collageImages.length >= 2 ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07070d]">
                      {/* Base Window: Dashboard with Performance Trajectory Graph */}
                      <div className="absolute left-0 top-0 w-[84%] h-[84%] rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1">
                        <Image
                          src={project.collageImages[0]}
                          alt={`${project.title} Performance Dashboard`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-left-top filter brightness-95 group-hover:brightness-105 transition-all"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        {/* Live Telemetry Badge */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{project.id === "tennis-auction" ? "LIVE STADIUM ARENA" : "LIVE DASHBOARD"}</span>
                        </div>
                      </div>

                      {/* Foreground Overlapping Window: Authentication Login Portal / Admin Control Panel */}
                      <div className="absolute right-0 bottom-0 w-[54%] h-[72%] rounded-xl overflow-hidden border-2 border-rose-500/50 bg-[#090910] shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(225,29,72,0.35)] transition-all duration-700 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:scale-105">
                        <Image
                          src={project.collageImages[1]}
                          alt={`${project.title} Secondary View`}
                          fill
                          sizes="(max-width: 1024px) 60vw, 35vw"
                          className="object-cover object-center filter brightness-100 group-hover:brightness-110 transition-all"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        {/* Portal Badge */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/90 backdrop-blur-md border border-rose-400/50 text-[9px] font-mono text-white font-bold tracking-wider">
                          <span>{project.id === "tennis-auction" ? "ADMIN CONTROL" : "LOGIN PORTAL"}</span>
                        </div>
                      </div>

                      {/* Hover Overlay Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-rose-400 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <Eye className="w-3.5 h-3.5" />
                        <span>INTERACTIVE DUAL PREVIEW</span>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute bottom-2 left-2 text-4xl sm:text-6xl font-black font-mono text-white/15 group-hover:text-rose-500/40 transition-colors z-20 pointer-events-none">
                        {project.number}
                      </div>
                    </div>
                  ) : (
                    /* Standard Single Image View */
                    <div className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-neutral-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-rose-400 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        <span>CLICK TO EXPAND CASE STUDY</span>
                      </div>
                      <div className="absolute bottom-4 left-4 text-4xl sm:text-6xl font-black font-mono text-white/20 group-hover:text-rose-500/50 transition-colors">
                        {project.number}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right / Left Info Column */}
              <div
                className={`lg:col-span-5 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                } flex flex-col gap-4`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-rose-500 font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="font-mono text-xs text-neutral-400">
                    {project.year}
                  </span>
                </div>

                <h3
                  onClick={() => handleOpen(project)}
                  data-cursor="VIEW"
                  className="cursor-pointer text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-rose-400 transition-colors leading-tight"
                >
                  {project.title}
                </h3>

                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => handleOpen(project)}
                    data-cursor="VIEW"
                    className="relative px-5 py-2.5 rounded-full bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 hover:border-rose-500 text-rose-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 group/btn cursor-pointer"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="OPEN"
                      className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>VIEW LIVE PROJECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GITHUB"
                      className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>SOURCE</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
