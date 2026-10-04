"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";

// ============================================================================
// CONFIGURATION: Formspree Endpoint & Direct Email
// Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your .env.local or replace the placeholder below.
// Example: "https://formspree.io/f/xyzabcop" or Form ID "xyzabcop"
// ============================================================================
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "YOUR_FORMSPREE_ENDPOINT";

// Configure your direct contact email address
const DIRECT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "vinayduvvada.work@gmail.com";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "", // Anti-spam honeypot field
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<
    "idle" | "transmitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "message" | null
  >(null);

  // Magnetic button calculations for Left Email Button
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setBtnPos({ x, y });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  // Magnetic button calculations for Submit Button
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [submitBtnPos, setSubmitBtnPos] = useState({ x: 0, y: 0 });

  const handleSubmitBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!submitBtnRef.current || status === "transmitting") return;
    const rect = submitBtnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setSubmitBtnPos({ x, y });
  };

  const handleSubmitBtnMouseLeave = () => {
    setSubmitBtnPos({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DIRECT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email format (e.g. name@domain.com).";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a brief message or project scope.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Spam honeypot detection: bots automatically fill hidden input
    if (formData._gotcha) {
      setStatus("success");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setStatus("transmitting");
    setErrorMessage("");

    // If a custom Formspree endpoint is configured, try submitting via Formspree first
    if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT !== "YOUR_FORMSPREE_ENDPOINT") {
      try {
        const targetEndpoint =
          FORMSPREE_ENDPOINT.startsWith("http://") ||
          FORMSPREE_ENDPOINT.startsWith("https://")
            ? FORMSPREE_ENDPOINT
            : `https://formspree.io/f/${FORMSPREE_ENDPOINT}`;

        const response = await fetch(targetEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            _subject: `New Portfolio Inquiry — ${formData.name.trim()}`,
          }),
        });

        if (response.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "", _gotcha: "" });
          setErrors({});
          return;
        }
      } catch {
        // Fall back to direct email client dispatch below
      }
    }

    // Direct email client dispatch: pre-populates all user fields to vinayduvvada.work@gmail.com
    const subject = encodeURIComponent(
      `New Portfolio Inquiry — ${formData.name.trim()}`
    );
    const body = encodeURIComponent(
      `${formData.message.trim()}\n\n---\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    const mailtoUrl = `mailto:${DIRECT_EMAIL}?subject=${subject}&body=${body}`;

    // Open native/default email app
    const mailLink = document.createElement("a");
    mailLink.href = mailtoUrl;
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);

    // Smooth transition into MESSAGE TRANSMITTED ✓
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "", _gotcha: "" });
      setErrors({});
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-white/[0.08]"
    >
      {/* Red ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-rose-600/10 blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono tracking-[0.3em] text-rose-500 uppercase font-semibold">
          CONTACT
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Huge typography and direct contact buttons */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              LET&apos;S BUILD
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-rose-600">
                SOMETHING
              </span>
              <span className="block text-gradient-white">GREAT.</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-400 mt-6 font-light max-w-lg">
              Have an idea?<br />
              Let&apos;s turn it into an experience.
            </p>
          </div>

          {/* Magnetic Email Action Button */}
          <div className="relative group w-fit">
            <div className="absolute -inset-4 bg-rose-500/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCopyEmail}
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              data-cursor="CONTACT"
              className="relative px-8 py-5 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-mono text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_40px_rgba(225,29,72,0.4)] flex items-center gap-3 select-none"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL ME</span>
              <span className="text-rose-200 font-mono text-xs">• COPY ADDRESS</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-300 ml-1" />
              ) : (
                <Copy className="w-4 h-4 text-white/70 ml-1" />
              )}
            </motion.button>
          </div>

          {copied && (
            <span className="text-xs font-mono text-emerald-400">
              ✓ Email copied: {DIRECT_EMAIL}
            </span>
          )}

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
            <a
              href="https://www.linkedin.com/in/vinay-duvvada-508850389"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-400 text-xs font-mono text-white transition-all group"
            >
              <LinkedinIcon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href="https://github.com/duvvadavinay-hub"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-rose-400 text-xs font-mono text-white transition-all group"
            >
              <GithubIcon className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Column: Direct Inquiry Channel */}
        <div className="lg:col-span-5 p-7 sm:p-9 rounded-2xl bg-[#0c0c14]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-mono text-rose-400 uppercase tracking-widest font-bold">
                DIRECT INQUIRY CHANNEL
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              FEED // ACTIVE
            </span>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* Success State Screen */
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 px-2 flex flex-col items-center justify-center text-center gap-5"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.35)]">
                    <Check className="w-8 h-8 text-rose-400" />
                  </div>
                  <div className="absolute -inset-2 bg-rose-500/20 rounded-2xl blur-xl -z-10 animate-pulse" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    TRANSMISSION LOGGED
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                    MESSAGE TRANSMITTED ✓
                  </h4>
                  <p className="text-sm font-mono text-neutral-300 max-w-sm mt-1 leading-relaxed">
                    Thanks for reaching out.<br />
                    I&apos;ll get back to you soon.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  data-cursor="CLICK"
                  className="mt-3 px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-600/30 border border-white/10 hover:border-rose-500/50 text-xs font-mono text-neutral-200 hover:text-white transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>SEND ANOTHER MESSAGE</span>
                </button>
              </motion.div>
            ) : (
              /* Inquiry Form */
              <motion.div
                key="form-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Transmission Failure Alert */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                          TRANSMISSION FAILED
                        </span>
                        <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                          {errorMessage ||
                            "Something went wrong. Please try again or email me directly."}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-red-500/20">
                      <a
                        href={`mailto:${DIRECT_EMAIL}?subject=${encodeURIComponent(
                          formData.name
                            ? `New Portfolio Inquiry — ${formData.name}`
                            : "New Portfolio Inquiry"
                        )}&body=${encodeURIComponent(
                          `${formData.message || ""}\n\n---\nFrom: ${formData.name || "Anonymous"}\nEmail: ${formData.email || ""}`
                        )}`}
                        data-cursor="CONTACT"
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5"
                      >
                        <Mail className="w-3 h-3" />
                        <span>SEND VIA EMAIL APP (PRE-FILLED)</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white font-mono text-[11px] transition-colors"
                      >
                        RETRY
                      </button>
                    </div>
                  </motion.div>
                )}

                <form
                  action={FORMSPREE_ENDPOINT}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4.5"
                >
                  {/* Anti-spam honeypot (hidden from visitors, catches automated bots) */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={(e) =>
                      setFormData({ ...formData, _gotcha: e.target.value })
                    }
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Formspree notification email subject */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Portfolio Inquiry — Vinay Duvvada"
                  />

                  {/* 1. YOUR NAME */}
                  <div className="relative flex flex-col gap-1.5 group">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-name"
                        className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                          focusedField === "name" || formData.name
                            ? "text-rose-400 font-bold -translate-y-0.5"
                            : "text-neutral-400 font-medium"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            focusedField === "name"
                              ? "bg-rose-500 scale-100 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                              : "bg-transparent scale-0"
                          }`}
                        />
                        YOUR NAME
                      </label>
                      {focusedField === "name" && (
                        <span className="text-[10px] font-mono text-rose-400/80 animate-pulse">
                          {formData.name.length > 0
                            ? `${formData.name.length} CHARS`
                            : "TYPING..."}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onFocus={() => {
                          setFocusedField("name");
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3.5 rounded-xl text-white text-sm font-mono placeholder:text-neutral-600 transition-all duration-300 focus:outline-none border ${
                          focusedField === "name"
                            ? "bg-rose-950/20 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/40"
                            : errors.name
                            ? "bg-red-950/20 border-red-500/80"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* 2. EMAIL ADDRESS */}
                  <div className="relative flex flex-col gap-1.5 group">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-email"
                        className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                          focusedField === "email" || formData.email
                            ? "text-rose-400 font-bold -translate-y-0.5"
                            : "text-neutral-400 font-medium"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            focusedField === "email"
                              ? "bg-rose-500 scale-100 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                              : "bg-transparent scale-0"
                          }`}
                        />
                        EMAIL ADDRESS
                      </label>
                      {focusedField === "email" && (
                        <span className="text-[10px] font-mono text-rose-400/80 animate-pulse">
                          {formData.email.length > 0
                            ? `${formData.email.length} CHARS`
                            : "TYPING..."}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onFocus={() => {
                          setFocusedField("email");
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3.5 rounded-xl text-white text-sm font-mono placeholder:text-neutral-600 transition-all duration-300 focus:outline-none border ${
                          focusedField === "email"
                            ? "bg-rose-950/20 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/40"
                            : errors.email
                            ? "bg-red-950/20 border-red-500/80"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* 3. MESSAGE / PROJECT SCOPE */}
                  <div className="relative flex flex-col gap-1.5 group">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                          focusedField === "message" || formData.message
                            ? "text-rose-400 font-bold -translate-y-0.5"
                            : "text-neutral-400 font-medium"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            focusedField === "message"
                              ? "bg-rose-500 scale-100 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                              : "bg-transparent scale-0"
                          }`}
                        />
                        MESSAGE / PROJECT SCOPE
                      </label>
                      {focusedField === "message" && (
                        <span className="text-[10px] font-mono text-rose-400/80 animate-pulse">
                          {formData.message.length > 0
                            ? `${formData.message.length} CHARS`
                            : "TYPING..."}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell me about your idea,&#10;timeline, or vision..."
                        value={formData.message}
                        onFocus={() => {
                          setFocusedField("message");
                          if (errors.message)
                            setErrors({ ...errors, message: undefined });
                        }}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`w-full px-4 py-3.5 rounded-xl text-white text-sm font-mono placeholder:text-neutral-600 transition-all duration-300 focus:outline-none resize-none border ${
                          focusedField === "message"
                            ? "bg-rose-950/20 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/40"
                            : errors.message
                            ? "bg-red-950/20 border-red-500/80"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* 4. SEND MESSAGE Button with Magnetic Hover & Futuristic Transformation */}
                  <div className="relative group/send w-full pt-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/35 to-rose-500/35 rounded-2xl blur-lg opacity-0 group-hover/send:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <motion.button
                      ref={submitBtnRef}
                      onMouseMove={handleSubmitBtnMouseMove}
                      onMouseLeave={handleSubmitBtnMouseLeave}
                      animate={{ x: submitBtnPos.x, y: submitBtnPos.y }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      type="submit"
                      disabled={status === "transmitting"}
                      data-cursor={
                        status === "transmitting" ? "WAIT" : "TRANSMIT"
                      }
                      className={`relative w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 overflow-hidden select-none border ${
                        status === "transmitting"
                          ? "bg-rose-700/80 border-rose-500/80 text-white cursor-wait"
                          : "bg-white/[0.06] hover:bg-rose-600 border-white/10 hover:border-rose-500 text-white shadow-[0_0_25px_rgba(225,29,72,0.15)] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:scale-[1.01]"
                      }`}
                    >
                      {status === "transmitting" ? (
                        <>
                          <span>TRANSMITTING...</span>
                          <span className="inline-block animate-spin text-sm font-sans">
                            ◌
                          </span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover/send:translate-x-1.5 group-hover/send:-translate-y-0.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fallback Direct Email Channel */}
          <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-neutral-500 uppercase tracking-widest font-medium">
              PREFER EMAIL?
            </span>
            <a
              href={`mailto:${DIRECT_EMAIL}`}
              data-cursor="CONTACT"
              className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-bold tracking-wider transition-colors group/fallback"
            >
              <span>EMAIL ME DIRECTLY</span>
              <span className="transition-transform duration-300 group-hover/fallback:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
