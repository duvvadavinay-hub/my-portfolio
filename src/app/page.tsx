"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DesignMindset from "@/components/DesignMindset";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsEcosystem from "@/components/SkillsEcosystem";
import UIUXProcess from "@/components/UIUXProcess";
import DeveloperSection from "@/components/DeveloperSection";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setLoadingComplete(true)} />
      <CustomCursor />
      <ThreeBackground />

      <div className="relative min-h-screen flex flex-col bg-[#050508] text-[#f4f4f7] overflow-x-hidden selection:bg-rose-600 selection:text-white">
        <Navbar />

        <main className="flex-1 flex flex-col">
          <Hero />
          <About />
          <DesignMindset />
          <FeaturedProjects />
          <SkillsEcosystem />
          <UIUXProcess />
          <DeveloperSection />
          <CurrentlyLearning />
          <ContactSection />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
