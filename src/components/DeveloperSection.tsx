"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code2,
  Activity,
  RefreshCw,
  GitCommit,
  Star,
  GitFork,
  Radio,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface DayData {
  date: string;
  count: number;
  level: number;
}

interface WeekData {
  days: DayData[];
}

interface RepoData {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  commits: number;
  pushedAt: string;
}

interface LanguageData {
  name: string;
  pct: string;
  color: string;
}

interface GitHubTelemetry {
  username: string;
  totalContributions: number;
  totalCommits: number;
  publicRepos: number;
  totalStars: number;
  languages: LanguageData[];
  calendarWeeks: WeekData[];
  repos: RepoData[];
  lastSynced: string;
  live: boolean;
}

// Fallback initial values so UI renders immediately without layout shift
const INITIAL_DATA: GitHubTelemetry = {
  username: "duvvadavinay-hub",
  totalContributions: 47,
  totalCommits: 212,
  publicRepos: 6,
  totalStars: 1,
  languages: [
    { name: "JavaScript", pct: "71%", color: "bg-amber-400" },
    { name: "TypeScript", pct: "15%", color: "bg-rose-500" },
    { name: "CSS", pct: "13%", color: "bg-indigo-400" },
    { name: "HTML", pct: "1%", color: "bg-orange-500" },
  ],
  calendarWeeks: [],
  repos: [
    {
      name: "my-portfolio",
      description: "Interactive portfolio web app with live GitHub telemetry & 3D experiences.",
      url: "https://github.com/duvvadavinay-hub/my-portfolio",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      languageColor: "#3178c6",
      commits: 2,
      pushedAt: new Date().toISOString(),
    },
    {
      name: "tennisauction",
      description: "Tennis tournament player auction & bidding platform.",
      url: "https://github.com/duvvadavinay-hub/tennisauction",
      stars: 0,
      forks: 0,
      language: "JavaScript",
      languageColor: "#f1e05a",
      commits: 92,
      pushedAt: new Date().toISOString(),
    },
    {
      name: "CSD-CSIT",
      description: "Department website & academic circulars repository.",
      url: "https://github.com/duvvadavinay-hub/CSD-CSIT",
      stars: 0,
      forks: 0,
      language: "JavaScript",
      languageColor: "#f1e05a",
      commits: 102,
      pushedAt: new Date().toISOString(),
    },
    {
      name: "academic-ledger",
      description: "CGPA & SGPA calculation platform with semester analytics graph.",
      url: "https://github.com/duvvadavinay-hub/academic-ledger",
      stars: 1,
      forks: 0,
      language: "JavaScript",
      languageColor: "#f1e05a",
      commits: 1,
      pushedAt: new Date().toISOString(),
    },
  ],
  lastSynced: new Date().toISOString(),
  live: false,
};

export default function DeveloperSection() {
  const [data, setData] = useState<GitHubTelemetry>(INITIAL_DATA);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [syncStatusText, setSyncStatusText] = useState<string>("Syncing...");

  const fetchTelemetry = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setIsSyncing(true);
      const url = `/api/github?t=${Date.now()}${isManualRefresh ? "&refresh=true" : ""}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setSyncStatusText("Live Synced");
      }
    } catch (err) {
      console.error("Failed to sync GitHub telemetry:", err);
    } finally {
      if (isManualRefresh) {
        setTimeout(() => setIsSyncing(false), 500);
      }
    }
  }, []);

  // Initial fetch + background auto-sync every 30 seconds
  useEffect(() => {
    fetchTelemetry(false);

    const interval = setInterval(() => {
      fetchTelemetry(false);
    }, 30000);

    // Sync automatically as soon as the user switches back to this tab
    const handleFocus = () => {
      fetchTelemetry(true);
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchTelemetry]);

  // Display the last 30 weeks of GitHub calendar
  const visibleWeeks =
    data.calendarWeeks.length > 0
      ? data.calendarWeeks.slice(-30)
      : Array.from({ length: 30 }).map((_, w) => ({
          days: Array.from({ length: 7 }).map((_, d) => {
            const intensity = (w * 3 + d * 5) % 6;
            return {
              date: `Week ${w + 1}, Day ${d + 1}`,
              count: intensity > 2 ? intensity : 0,
              level: intensity > 4 ? 4 : intensity > 3 ? 3 : intensity > 2 ? 1 : 0,
            };
          }),
        }));

  return (
    <section
      id="github"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              LIVE GIT TELEMETRY
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTO-SYNC ACTIVE</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            GITHUB
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {/* Real-time Sync Button */}
          <button
            onClick={() => fetchTelemetry(true)}
            disabled={isSyncing}
            title="Click to sync latest commits and repositories immediately from GitHub"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-white transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-rose-400 ${isSyncing ? "animate-spin" : ""}`}
            />
            <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
          </button>

          {/* GitHub Profile Link */}
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-rose-400" />
            <span>github.com/{data.username}</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left: Contribution Map & Telemetry Stats */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 flex flex-col gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Continuous Git Telemetry
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">
                Active Commits & Contributions
              </span>
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="relative">
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
              <div className="flex gap-1.5 min-w-[560px]">
                {visibleWeeks.map((week, w) => (
                  <div key={w} className="flex flex-col gap-1.5 flex-1">
                    {week.days.map((day, d) => {
                      const bgClass =
                        day.level >= 4
                          ? "bg-rose-500 shadow-[0_0_8px_#ef4444]"
                          : day.level === 3
                          ? "bg-rose-600/90"
                          : day.level === 2
                          ? "bg-rose-800/80"
                          : day.level === 1
                          ? "bg-rose-950/80 border border-rose-900/40"
                          : "bg-white/5";

                      return (
                        <div
                          key={d}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-full aspect-square rounded-[3px] transition-all hover:scale-125 cursor-pointer ${bgClass}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Tooltip */}
            <div className="h-6 flex items-center">
              {hoveredDay ? (
                <span className="text-xs font-mono text-rose-300">
                  <strong className="text-white">
                    {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
                  </strong>{" "}
                  on {hoveredDay.date}
                </span>
              ) : (
                <span className="text-xs font-mono text-neutral-500">
                  Hover over any block to view daily git commits & contributions
                </span>
              )}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5">
            <span>Less</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" title="0 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-950/80 border border-rose-900/40" title="1-2 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-800/80" title="3-5 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-600/90" title="6-9 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-rose-500 shadow-[0_0_6px_#ef4444]" title="10+ contributions" />
            </div>
            <span>More activity</span>
          </div>

          {/* Real-time Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                  {data.totalCommits}+
                </span>
              </div>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Commits Pushed
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-rose-400 tracking-tight">
                  {data.publicRepos}
                </span>
              </div>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Public Repos
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                  {data.totalContributions}
                </span>
              </div>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Year Contributions
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight">
                  100%
                </span>
              </div>
              <span className="block text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                Build Success
              </span>
            </div>
          </div>
        </div>

        {/* Right: Language Distribution & Featured Live Repo */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Language Spectrum
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">Live Repo Telemetry</span>
          </div>

          {/* Dynamic Language List */}
          <div className="flex flex-col gap-3.5">
            {data.languages.map((lang) => (
              <div key={lang.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-300">{lang.name}</span>
                  <span className="text-neutral-400 font-bold">{lang.pct}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    style={{ width: lang.pct }}
                    className={`h-full ${lang.color} rounded-full transition-all duration-700`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Featured Highlight Repo */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 mt-2 group hover:border-rose-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                Active Production Repo
              </span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                Live
              </span>
            </div>
            <a
              href="https://github.com/duvvadavinay-hub/my-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors flex items-center gap-1.5"
            >
              <span>duvvadavinay-hub/my-portfolio</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Interactive high-performance Next.js portfolio with real-time GitHub commits &amp; repository telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* Real Original Repositories Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Live GitHub Repositories ({data.repos.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
            Direct sync from @{data.username}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-[#0c0c14] border border-white/10 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/20"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors font-mono truncate">
                    {repo.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {repo.description || "Open-source software project by Vinay Duvvada."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-white/90">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {repo.language}
                    </span>
                  )}
                  {repo.commits > 0 && (
                    <span className="flex items-center gap-1 text-neutral-400">
                      <GitCommit className="w-3 h-3 text-rose-400" />
                      {repo.commits} commits
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {repo.stars}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
