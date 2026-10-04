"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring motion values for position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity tracking for fluid squash & stretch
  const [velocityScale, setVelocityScale] = useState({ scaleX: 1, scaleY: 1, angle: 0 });
  const prevPos = useRef({ x: -100, y: -100, time: Date.now() });

  useEffect(() => {
    // Touch detection
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    // Enable custom cursor class on body
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - prevPos.current.time, 1);
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Compute velocity & tilt angle
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      if (speed > 0.15) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const stretch = Math.min(speed * 0.35, 0.45);
        setVelocityScale({
          scaleX: 1 + stretch,
          scaleY: Math.max(1 - stretch * 0.7, 0.7),
          angle,
        });
      } else {
        setVelocityScale({ scaleX: 1, scaleY: 1, angle: 0 });
      }

      prevPos.current = { x: e.clientX, y: e.clientY, time: now };

      // Inspect hovered target for contextual text
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("action");
      } else {
        const clickable = target.closest("a, button, [role='button'], input, textarea, select");
        if (clickable) {
          const href = (clickable as HTMLAnchorElement).href || "";
          if (href.includes("github.com")) {
            setCursorText("GITHUB");
            setCursorVariant("action");
          } else if (href.includes("mailto:") || href.includes("contact")) {
            setCursorText("CONTACT");
            setCursorVariant("action");
          } else if (href.startsWith("http")) {
            setCursorText("OPEN");
            setCursorVariant("action");
          } else {
            setCursorText("");
            setCursorVariant("hover");
          }
        } else {
          setCursorText("");
          setCursorVariant("default");
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const isAction = cursorVariant === "action";
  const isHover = cursorVariant === "hover";

  // Dynamic dimension based on state
  const size = isAction ? 70 : isHover ? 48 : 16;

  return (
    <>
      {/* Primary Fluid Luminous Magnetic Cursor - Highest Stacking Level */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 flex items-center justify-center font-mono select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: isAction || isHover ? 0 : velocityScale.angle,
          scaleX: isClicking ? 0.8 : isAction || isHover ? 1 : velocityScale.scaleX,
          scaleY: isClicking ? 0.8 : isAction || isHover ? 1 : velocityScale.scaleY,
          zIndex: 9999999,
        }}
      >
        <motion.div
          animate={{
            width: size,
            height: size,
            backgroundColor: isAction
              ? "rgba(225, 29, 72, 0.95)"
              : isHover
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(255, 255, 255, 0.95)",
            borderColor: isAction
              ? "rgba(255, 255, 255, 0.7)"
              : isHover
              ? "rgba(239, 68, 68, 0.85)"
              : "rgba(239, 68, 68, 0.8)",
            borderWidth: isAction ? 1.5 : isHover ? 1.5 : 1.5,
            boxShadow: isAction
              ? "0 0 35px rgba(225, 29, 72, 0.8)"
              : isHover
              ? "0 0 25px rgba(239, 68, 68, 0.55)"
              : "0 0 16px rgba(225, 29, 72, 0.75), 0 0 6px rgba(255, 255, 255, 0.9)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 26,
          }}
          className="rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
        >
          {/* Action text inside expanded lens */}
          {cursorText && isAction && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="text-white text-[10px] font-extrabold tracking-widest uppercase drop-shadow px-1 text-center"
            >
              {cursorText}
            </motion.span>
          )}

          {/* Pulse ring when hovering interactive items */}
          {isHover && !cursorText && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-full border border-rose-400 absolute"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
