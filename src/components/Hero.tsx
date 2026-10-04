"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Layers } from "lucide-react";

const ROLES = [
  "WEB DEVELOPER",
  "UI/UX DESIGNER",
  "CREATIVE FRONTEND DEVELOPER",
  "COMPUTER SCIENCE & DESIGN STUDENT",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

// Magnetic Typography Character Component (identical physics and styling to Playground Exp 1)
function MagneticChar({
  char,
  gradientClass,
}: {
  char: string;
  gradientClass: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const letterRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!letterRef.current) return;
    const rect = letterRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.45;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.45;
    setOffset({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <span
      ref={letterRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-default select-none py-1 sm:py-1.5 px-[1px] sm:px-[2px] overflow-visible"
    >
      <motion.span
        animate={{
          x: offset.x,
          y: offset.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        className={`inline-block font-black select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b py-0.5 overflow-visible transition-colors duration-200 ${gradientClass}`}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHero = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const statementY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Magnetic button state
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(roleTimer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnOffset({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-10 sm:pb-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden z-10"
    >
      {/* Top Meta Tagging */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-end border-b border-white/[0.08] pb-4"
      >
        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>UI/UX CRAFT</span>
        </div>
      </motion.div>

      {/* Main Hero Center Typography & Offset Statement */}
      <motion.div
        style={{ y: yHero, opacity: opacityHero }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto py-6 sm:py-8 items-center"
      >
        {/* Left Column: Greeting, Big Name, Dynamic Roles */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-rose-500" />
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-rose-400 uppercase font-semibold">
              HI, I&apos;M
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tight leading-[1.0] sm:leading-[0.98] select-none overflow-visible"
          >
            {/* VINAY with Magnetic Typography */}
            <div className="block overflow-visible">
              {"VINAY".split("").map((char, i) => (
                <MagneticChar
                  key={`v-${i}`}
                  char={char}
                  gradientClass="from-white via-neutral-100 to-neutral-300 hover:from-white hover:to-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]"
                />
              ))}
            </div>

            {/* DUVVADA with Playground Magnetic Typography */}
            <div className="block -mt-1 sm:-mt-2 overflow-visible">
              {"DUVVADA".split("").map((char, i) => (
                <MagneticChar
                  key={`d-${i}`}
                  char={char}
                  gradientClass="from-white via-rose-100 to-rose-600 hover:from-white hover:to-white drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:drop-shadow-[0_0_35px_rgba(239,68,68,0.95)]"
                />
              ))}
            </div>
          </motion.h1>

          {/* Dynamic Role Switcher with Character Feel */}
          <div className="h-10 sm:h-12 flex items-center overflow-hidden">
            <motion.div
              key={roleIndex}
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -35, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-sm sm:text-lg md:text-xl font-mono tracking-wider font-semibold text-rose-400"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#ef4444]" />
              <span>{ROLES[roleIndex]}</span>
            </motion.div>
          </div>

          {/* Interactive Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <motion.a
              ref={buttonRef}
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: btnOffset.x, y: btnOffset.y }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              data-cursor="EXPLORE"
              className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(225,29,72,0.4)] flex items-center gap-3"
            >
              {/* Liquid expanding circle layer */}
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 rounded-full" />
              <span>EXPLORE WORK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Huge Vertical / Offset Typography Statement */}
        <motion.div
          style={{ y: statementY }}
          className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-l lg:border-l-0 lg:border-r border-white/[0.08] pl-6 lg:pl-0 lg:pr-8 py-4"
        >
          <div className="flex flex-col text-left lg:text-right gap-1 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              I DESIGN
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="text-white"
            >
              DIGITAL
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-rose-500 glow-box-red"
            >
              EXPERIENCES.
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center justify-between border-t border-white/[0.08] pt-6 text-xs font-mono text-neutral-500"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>SCROLL TO DISCOVER</span>
        </div>

        <a
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
          className="hover:text-rose-400 transition-colors flex items-center gap-2"
        >
          <span>INDEX 01 / ABOUT</span>
          <ArrowDownRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
