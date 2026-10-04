"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [phase, setPhase] = useState<"numbers" | "name" | "manifesto" | "done">("numbers");

  useEffect(() => {
    // Numbers sequence: 01 -> 02 -> 03 -> 04 -> 05
    const numberTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 5) {
          return prev + 1;
        } else {
          clearInterval(numberTimer);
          setPhase("name");
          return 5;
        }
      });
    }, 180);

    return () => clearInterval(numberTimer);
  }, []);

  useEffect(() => {
    if (phase === "name") {
      const timer = setTimeout(() => {
        setPhase("manifesto");
      }, 700);
      return () => clearTimeout(timer);
    } else if (phase === "manifesto") {
      const timer = setTimeout(() => {
        setPhase("done");
        if (onComplete) onComplete();
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] text-white selection:bg-rose-600 overflow-hidden"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

          {/* Studio Top Badge */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
              Digital Studio // Initializing
            </span>
          </div>

          <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
            <span className="text-[11px] font-mono tracking-widest text-neutral-500">
              SYS.V2.6
            </span>
          </div>

          {/* Main Stage Content */}
          <div className="relative flex flex-col items-center justify-center px-6 text-center">
            {phase === "numbers" && (
              <motion.div
                key="number-counter"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <div className="text-7xl sm:text-9xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600">
                  0{currentStep}
                </div>
                <div className="w-32 h-[2px] bg-neutral-800 mt-6 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-rose-500"
                    initial={{ width: "20%" }}
                    animate={{ width: `${currentStep * 20}%` }}
                    transition={{ ease: "easeOut", duration: 0.15 }}
                  />
                </div>
                <span className="mt-3 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
                  Calibrating Experience
                </span>
              </motion.div>
            )}

            {phase === "name" && (
              <motion.div
                key="name-stage"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <span className="text-xs font-mono tracking-[0.35em] text-rose-500 mb-2 uppercase">
                  Studio Portfolio
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
                  Vinay Duvvada
                </h1>
                <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 mt-3">
                  Computer Science & Design | Web Developer | UI/UX Designer in Progress
                </p>
              </motion.div>
            )}

            {phase === "manifesto" && (
              <motion.div
                key="manifesto-stage"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg font-mono tracking-[0.2em] font-medium">
                  {["DESIGN.", "DEVELOP.", "LEARN.", "IMPROVE."].map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className={i === 0 ? "text-rose-500 font-bold" : "text-white"}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom attribution */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 text-[11px] font-mono text-neutral-600">
            © 2026 VINAY DUVVADA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
