"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08] text-neutral-400">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
        {/* Brand identity */}
        <div className="flex flex-col gap-1">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
            VINAY DUVVADA
          </span>
          <p className="text-xs font-mono text-neutral-400">
            Computer Science & Design | Web Developer | UI/UX Designer in Progress
          </p>
        </div>

        {/* Links & Back to Top */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <a
            href="https://github.com/duvvadavinay-hub"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/vinay-duvvada-508850389"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN"
            className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:vinayduvvada.work@gmail.com"
            data-cursor="CONTACT"
            className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-between text-[11px] font-mono text-neutral-600">
        <div>© 2026 Vinay Duvvada</div>
      </div>
    </footer>
  );
}
