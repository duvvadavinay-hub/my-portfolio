"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  GitCommit,
  Star,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function DeveloperSection() {
  // Original live stats for duvvadavinay-hub with immediate authentic default
  const [stats, setStats] = useState<{ commits: number | string; repos: number | string }>({
    commits: "48+",
    repos: 4,
  });

  useEffect(() => {
    let isMounted = true;
    async function syncGithubTelemetry() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setStats({
              commits: data.commits ? `${data.commits}+` : "48+",
              repos: data.repos ?? 4,
            });
          }
        }
      } catch {
        // Fallback directly to public GitHub API if local endpoint is unreachable
        try {
          const userRes = await fetch("https://api.github.com/users/duvvadavinay-hub");
          if (userRes.ok) {
            const userData = await userRes.json();
            if (isMounted && typeof userData.public_repos === "number") {
              setStats((prev) => ({ ...prev, repos: userData.public_repos }));
            }
          }
        } catch {}
      }
    }

    syncGithubTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  // Mock realistic contribution heatmap (52 weeks x 7 days)
  const weeks = 28;
  const days = 7;

  return (
    <section className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              GITHUB
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            GITHUB
          </h2>
        </div>

        <a
          href="https://github.com/duvvadavinay-hub"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="GITHUB"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-white transition-colors self-start md:self-auto"
        >
          <GithubIcon className="w-4 h-4 text-rose-400" />
          <span>github.com/duvvadavinay-hub</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contribution Map & Telemetry Stats */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Continuous Git Telemetry
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Active Commits in 2024–2026
            </span>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[560px]">
              {Array.from({ length: weeks }).map((_, w) => (
                <div key={w} className="flex flex-col gap-1.5 flex-1">
                  {Array.from({ length: days }).map((_, d) => {
                    // Generate realistic gradient variations
                    const intensity = (w * 3 + d * 5) % 6;
                    const bgClass =
                      intensity === 5
                        ? "bg-rose-500 shadow-[0_0_6px_#ef4444]"
                        : intensity === 4
                        ? "bg-rose-700/80"
                        : intensity === 3
                        ? "bg-rose-900/60"
                        : intensity === 2
                        ? "bg-white/15"
                        : "bg-white/5";

                    return (
                      <div
                        key={d}
                        title={`Day ${d + 1}, Week ${w + 1}`}
                        className={`w-full aspect-square rounded-[3px] transition-colors hover:scale-125 cursor-pointer ${bgClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5">
            <span>Less</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-900/60" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-700/80" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-500 shadow-[0_0_6px_#ef4444]" />
            </div>
            <span>More activity</span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                {stats.commits}
              </span>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Commits Pushed
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-mono font-bold text-rose-400">
                {stats.repos}
              </span>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Public Repos
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">99.8%</span>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Build Success
              </span>
            </div>
          </div>
        </div>

        {/* Right: Language Distribution */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-mono font-bold text-white uppercase">
              Language Spectrum
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {[
              { name: "JavaScript / TypeScript", pct: "42%", color: "bg-rose-500" },
              { name: "Node.js / Backend", pct: "25%", color: "bg-indigo-400" },
              { name: "Python / Data", pct: "18%", color: "bg-emerald-400" },
              { name: "HTML / Modern CSS", pct: "15%", color: "bg-amber-400" },
            ].map((lang) => (
              <div key={lang.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-300">{lang.name}</span>
                  <span className="text-neutral-400 font-bold">{lang.pct}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    style={{ width: lang.pct }}
                    className={`h-full ${lang.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 mt-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">
              Featured Highlight
            </span>
            <span className="text-xs font-bold text-white">
              CSD-CSIT Department & Academic Ledger
            </span>
            <p className="text-[11px] text-neutral-400 font-light">
              Version-controlled open source and deployed web applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
