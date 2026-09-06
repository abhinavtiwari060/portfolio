"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  Code2,
  Atom,
  Server,
  Database,
  Layers,
} from "lucide-react";
import ClayButton from "../ui/ClayButton";
import SocialButton from "../ui/SocialButton";
import { IProfile } from "@/models/Profile";

interface HeroSectionProps {
  profile: Partial<IProfile>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const name = profile.name || "Abhinav Kumar Tiwari";
  const headline = profile.headline || "Developer • Builder • Problem Solver";
  const shortBio =
    profile.shortBio ||
    "I build practical, user-focused web experiences and enjoy turning ideas into high-performance, resilient products.";
  const availability = profile.availability || "Open to opportunities";
  const resumeUrl = profile.resumeUrl || "#";
  const profilePhoto =
    profile.profilePhoto ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  const socialLinks = profile.socialLinks || [
    { platform: "GitHub", url: "https://github.com/abhinavtiwari" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abhinavtiwari" },
    { platform: "Twitter", url: "https://twitter.com/abhinavtiwari" },
    { platform: "Email", url: "mailto:abhitiwariaj@gmail.com" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern transition-colors"
    >
      {/* Subtle warm orange ambient light (NO NEON) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 dark:bg-orange-600/10 light:bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Availability Status Badge (Warm Orange Indicator - NO NEON) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-charcoal-850/90 dark:bg-charcoal-850/90 light:bg-white border border-white/10 dark:border-white/10 light:border-orange-500/20 shadow-clay-pill mb-6 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span className="text-xs font-semibold text-charcoal-200 dark:text-charcoal-200 light:text-charcoal-700 tracking-wide">
                {availability}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white dark:text-white light:text-charcoal-900 tracking-tight leading-[1.1] mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600">Abhinav</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 dark:text-orange-400 light:text-orange-600 tracking-tight mb-6">
              {headline}
            </p>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600 max-w-xl leading-relaxed mb-8">
              {shortBio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a href="#projects">
                <ClayButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  View Projects
                </ClayButton>
              </a>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ClayButton
                  variant="secondary"
                  size="lg"
                  icon={<FileText className="w-4 h-4" />}
                >
                  Resume
                </ClayButton>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-500 mr-1">
                Follow:
              </span>
              {socialLinks.map((social, idx) => (
                <SocialButton
                  key={idx}
                  platform={social.platform}
                  url={social.url}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Photo & Floating Clay Tech Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* 3D Profile Frame */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer Clay Elevation Ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-charcoal-800 to-charcoal-950 dark:from-charcoal-800 dark:to-charcoal-950 light:from-white light:to-[#f0e8da] p-3 shadow-clay-card border border-white/10 dark:border-white/10 light:border-orange-500/20">
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-charcoal-900 dark:bg-charcoal-900 light:bg-[#f5eedf] shadow-inner">
                  <Image
                    src={profilePhoto}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, 384px"
                    className="object-cover object-center filter saturate-[1.05] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 dark:from-charcoal-950/70 light:from-charcoal-900/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Clay Badge 1: React */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 sm:-left-8 z-20"
              >
                <div className="clay-badge px-3.5 py-2 flex items-center gap-2 text-xs font-bold text-white dark:text-white light:text-charcoal-900 shadow-clay-pill border border-orange-500/30 backdrop-blur-md">
                  <Atom className="w-4 h-4 text-orange-400" />
                  <span>React</span>
                </div>
              </motion.div>

              {/* Floating Clay Badge 2: Next.js */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 -right-4 sm:-right-8 z-20"
              >
                <div className="clay-badge px-3.5 py-2 flex items-center gap-2 text-xs font-bold text-white dark:text-white light:text-charcoal-900 shadow-clay-pill border border-white/10 dark:border-white/10 light:border-orange-500/20 backdrop-blur-md">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span>Next.js</span>
                </div>
              </motion.div>

              {/* Floating Clay Badge 3: Node.js */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-16 -left-6 sm:-left-10 z-20"
              >
                <div className="clay-badge px-3.5 py-2 flex items-center gap-2 text-xs font-bold text-white dark:text-white light:text-charcoal-900 shadow-clay-pill border border-orange-500/20 backdrop-blur-md">
                  <Server className="w-4 h-4 text-orange-400" />
                  <span>Node.js</span>
                </div>
              </motion.div>

              {/* Floating Clay Badge 4: MongoDB */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 right-0 sm:right-6 z-20"
              >
                <div className="clay-badge px-3.5 py-2 flex items-center gap-2 text-xs font-bold text-orange-400 shadow-clay-pill border border-orange-500/30 backdrop-blur-md">
                  <Database className="w-4 h-4 text-orange-400" />
                  <span>MongoDB</span>
                </div>
              </motion.div>

              {/* Floating Clay Badge 5: JavaScript */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 left-10 z-20"
              >
                <div className="clay-badge px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-amber-400 shadow-clay-pill border border-amber-400/20 backdrop-blur-md">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>JavaScript</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
