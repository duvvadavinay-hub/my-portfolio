"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wand2,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  MousePointer2,
  Maximize2,
  Sliders,
} from "lucide-react";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<
    "magnetic" | "particles" | "tilt3d" | "colors" | "cursor"
  >("magnetic");

  // --- EXPERIMENT 1: MAGNETIC TYPOGRAPHY ---
  const magneticLetters = "VINAY DUVVADA".split("");
  const [mouseOffsets, setMouseOffsets] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleLetterMove = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.45;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.45;
    setMouseOffsets((prev) => ({ ...prev, [idx]: { x, y } }));
  };

  const handleLetterLeave = (idx: number) => {
    setMouseOffsets((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  };

  // --- EXPERIMENT 2: PARTICLE FIELD CANVAS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (activeTab !== "particles") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 360);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ["#ef4444", "#e11d48", "#ffffff", "#6366f1", "#f43f5e"];

    const onCanvasMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 4; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }
    };

    canvas.addEventListener("mousemove", onCanvasMove);

    let animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 16, 0.25)";
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        p.size = Math.max(0, p.size - 0.05);

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", onCanvasMove);
      cancelAnimationFrame(animId);
    };
  }, [activeTab]);

  // --- EXPERIMENT 3: 3D TILT CARD ---
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 18;
    const rotateY = ((x - centerX) / centerX) * 18;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({ rotateX, rotateY, glareX, glareY });
  };

  const handleTiltLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // --- EXPERIMENT 4: COLOR PALETTE GENERATOR ---
  const [palette, setPalette] = useState([
    { name: "Void Black", hex: "#050508" },
    { name: "Crimson Blaze", hex: "#e11d48" },
    { name: "Neon Ruby", hex: "#ff2a55" },
    { name: "Cyber Violet", hex: "#6366f1" },
    { name: "Pure Titanium", hex: "#f4f4f7" },
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generateNewPalette = () => {
    const baseHues = [350, 0, 10, 260, 220];
    const newPal = baseHues.map((hue, i) => {
      const sat = Math.floor(Math.random() * 30 + 70);
      const light = i === 0 ? 4 : i === 4 ? 96 : Math.floor(Math.random() * 30 + 40);
      return {
        name: `Hex H${hue} L${light}`,
        hex: hslToHex(hue + Math.floor(Math.random() * 20 - 10), sat, light),
      };
    });
    setPalette(newPal);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // --- EXPERIMENT 5: CURSOR PLAYGROUND ---
  const [activeCursorMode, setActiveCursorMode] = useState<"VIEW" | "OPEN" | "GITHUB" | "EXPLORE">("VIEW");

  return (
    <section
      id="playground"
      className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
              PLAYGROUND
            </span>
            <div className="h-[1px] w-12 bg-rose-500/50" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            PLAYGROUND
          </h2>
        </div>
      </div>

      {/* Experiment Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { key: "magnetic", label: "01. MAGNETIC TYPOGRAPHY" },
          { key: "particles", label: "02. PARTICLE FIELD" },
          { key: "tilt3d", label: "03. 3D TILT CARD" },
          { key: "colors", label: "04. COLOR GENERATOR" },
          { key: "cursor", label: "05. CURSOR PHYSICS" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-rose-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.4)]"
                : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Workbench Container */}
      <div className="relative p-6 sm:p-12 rounded-2xl bg-[#0a0a12] border border-white/10 shadow-2xl min-h-[440px] flex items-center justify-center overflow-hidden">
        {/* Lab Grid backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* 1. Magnetic Typography Experiment */}
        {activeTab === "magnetic" && (
          <div className="flex flex-col items-center justify-center gap-6 text-center select-none py-12">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              Hover & drag cursor across the letters
            </span>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              {magneticLetters.map((char, i) => {
                const offset = mouseOffsets[i] || { x: 0, y: 0 };
                return (
                  <motion.span
                    key={i}
                    onMouseMove={(e) => handleLetterMove(e, i)}
                    onMouseLeave={() => handleLetterLeave(i)}
                    animate={{ x: offset.x, y: offset.y }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`inline-block font-black text-4xl sm:text-7xl md:text-8xl tracking-tight cursor-default ${
                      char === " "
                        ? "w-4 sm:w-8"
                        : "text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-600 hover:from-white hover:to-white drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </div>
            <p className="text-xs font-mono text-neutral-400 mt-4">
              Real-time vector deflection physics calculated per character boundary.
            </p>
          </div>
        )}

        {/* 2. Particle Field Experiment */}
        {activeTab === "particles" && (
          <div className="w-full h-full flex flex-col items-center gap-4 relative py-4">
            <div className="flex items-center justify-between w-full text-xs font-mono text-neutral-400 px-2">
              <span>Interactive HTML5 Canvas Trail</span>
              <span className="text-rose-400">Move cursor anywhere inside</span>
            </div>
            <div className="w-full h-[360px] rounded-xl overflow-hidden bg-[#06060c] border border-white/10 relative">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] font-mono text-neutral-500">
                ACTIVE PARTICLES: ADAPTIVE BLENDING
              </div>
            </div>
          </div>
        )}

        {/* 3. 3D Tilt Card Experiment */}
        {activeTab === "tilt3d" && (
          <div className="flex flex-col items-center justify-center gap-6 py-6 perspective-[1000px]">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Hover around card to control 3D rotational matrix
            </span>

            <div
              ref={tiltCardRef}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              style={{
                transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
                transition: "transform 0.1s ease-out",
              }}
              className="relative w-80 sm:w-96 h-56 sm:h-64 rounded-2xl p-6 bg-gradient-to-br from-[#181824] to-[#0c0c14] border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Dynamic holographic glare reflection */}
              <div
                style={{
                  background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
                }}
                className="absolute inset-0 pointer-events-none"
              />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-400 tracking-wider">
                  STUDIO PASS // VIP
                </span>
                <Sparkles className="w-5 h-5 text-rose-500" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-wide">
                  VINAY DUVVADA
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  CREATIVE DEVELOPER & DESIGNER
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-[10px] text-neutral-500">
                <span>ROTATE X: {tiltStyle.rotateX.toFixed(1)}°</span>
                <span>ROTATE Y: {tiltStyle.rotateY.toFixed(1)}°</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Color Palette Generator Experiment */}
        {activeTab === "colors" && (
          <div className="w-full flex flex-col items-center gap-8 py-6 max-w-2xl">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-neutral-400">
                Generative Cybernetic Color Harmonies
              </span>
              <button
                onClick={generateNewPalette}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>GENERATE NEW</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
              {palette.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#0e0e16] cursor-pointer hover:border-white/30 transition-all"
                >
                  <div
                    style={{ backgroundColor: color.hex }}
                    className="h-28 w-full flex items-center justify-center relative transition-transform group-hover:scale-105"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 backdrop-blur-md text-white">
                      {copiedHex === color.hex ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                  <div className="p-3 flex flex-col">
                    <span className="text-[11px] font-mono font-bold text-white uppercase">
                      {color.hex}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {color.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {copiedHex && (
              <span className="text-xs font-mono text-emerald-400 animate-pulse">
                Copied {copiedHex} to clipboard!
              </span>
            )}
          </div>
        )}

        {/* 5. Cursor State Playground */}
        {activeTab === "cursor" && (
          <div className="flex flex-col items-center justify-center gap-8 py-6 text-center max-w-lg">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Hover over test targets to trigger magnetic cursor variants
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {["VIEW", "OPEN", "GITHUB", "EXPLORE"].map((mode) => (
                <div
                  key={mode}
                  data-cursor={mode}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-rose-500/60 hover:bg-rose-500/10 cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                >
                  <MousePointer2 className="w-5 h-5 text-rose-400" />
                  <span className="font-mono text-xs font-bold text-white">
                    {mode}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">
                    HOVER ME
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs font-mono text-neutral-500">
              Magnetic spring tracking automatically expands the follower capsule and displays dynamic action tags.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
