"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "PHILOSOPHY", href: "#mindset" },
  { label: "WORK", href: "#projects" },
  { label: "TECH STACKS", href: "#tech-stacks" },
  { label: "UI/UX", href: "#uiux" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section for highlight
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 sm:py-4 px-4 sm:px-8"
            : "py-6 sm:py-8 px-6 sm:px-12 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 select-none"
            data-cursor="HOME"
          >
            <div className="relative flex flex-col leading-none gap-0.5">
              <span className="font-extrabold tracking-widest text-sm sm:text-base text-white group-hover:text-rose-400 transition-colors leading-none">
                VINAY
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors leading-none">
                DUVVADA
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" />
          </a>

          {/* Desktop Floating Pill Navigation */}
          <nav
            className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
              isScrolled
                ? "bg-[#0c0c14]/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                : "bg-white/[0.03] backdrop-blur-md border border-white/[0.06] px-4 py-2 rounded-full"
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-cursor={link.label}
                  className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-rose-500/20 border border-rose-500/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Live Availability Pill & Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor="CONTACT"
              className="relative group overflow-hidden px-4 py-2 rounded-full bg-white/5 hover:bg-rose-600/90 border border-white/15 hover:border-rose-500 text-xs font-mono font-medium text-white transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                LET&apos;S TALK <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-24"
          >
            <div className="flex flex-col gap-6 mt-8">
              <span className="text-[11px] font-mono tracking-[0.3em] text-rose-500 uppercase">
                Navigation Index
              </span>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-300 hover:text-white hover:text-rose-400 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-neutral-600">0{i + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE FOR OPPORTUNITIES
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Computer Science & Design | Web Developer | UI/UX Designer in Progress
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
