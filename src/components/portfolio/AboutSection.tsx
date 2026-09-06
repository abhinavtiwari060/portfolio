"use client";

import React from "react";
import {
  GraduationCap,
  Sparkles,
  Target,
  Compass,
  Cpu,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import ClayCard from "../ui/ClayCard";
import SectionHeading from "../ui/SectionHeading";
import { IProfile } from "@/models/Profile";

interface AboutSectionProps {
  profile: Partial<IProfile>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const detailedBio =
    profile.detailedBio ||
    `I am a dedicated full-stack software developer who thrives at the intersection of robust backend engineering and thoughtful, tactile user interface design.

My development journey began with an innate curiosity about how distributed systems scale and how modern digital interfaces communicate with servers. Over the years, that curiosity has turned into a disciplined engineering practice: designing clean database schemas, crafting modular REST APIs, and building modern web applications that prioritize user experience and performance.

I strongly believe that good software is not just about writing code that works—it is about writing code that is simple to understand, straightforward to maintain, and a pleasure for end users to interact with every day.`;

  const devPhilosophy =
    profile.devPhilosophy ||
    "Write clean, readable code that solves real problems. Keep systems simple, test thoroughly, and craft experiences that feel fast, intuitive, and delightful.";

  const whatILikeBuilding =
    profile.whatILikeBuilding ||
    "Full-stack web applications, scalable backend APIs, developer tools, and tactile, high-craft user interfaces.";

  const careerGoals =
    profile.careerGoals ||
    "To collaborate with world-class engineering teams building impactful, high-scale products that millions of users rely on daily.";

  const education =
    profile.education && profile.education.length > 0
      ? profile.education
      : [
          {
            degree: "Bachelor of Technology in Computer Science & Engineering",
            institution: "Dr. A.P.J. Abdul Kalam Technical University",
            year: "2021 – 2025",
            description:
              "Focused on Data Structures, Algorithms, Distributed Computing, Database Management Systems, and Web Architecture.",
          },
        ];

  const learningNow =
    profile.learningNow && profile.learningNow.length > 0
      ? profile.learningNow
      : [
          "Distributed Systems Architecture",
          "Cloud Native Tooling & Microservices",
          "Advanced TypeScript Design Patterns",
          "High-Performance Web Animations",
        ];

  return (
    <section id="about" className="py-24 relative overflow-hidden transition-colors">
      {/* Subtle warm orange ambient light (NO NEON) */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-600/10 dark:bg-orange-600/10 light:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="About Me"
          title="Building with Purpose & Precision"
          subtitle="A glimpse into my background, developer philosophy, and what drives my technical exploration."
        />

        {/* Big Clay Showcase Card */}
        <ClayCard className="p-8 sm:p-12 border border-white/5 dark:border-white/5 light:border-orange-500/20 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Biography & Story */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-charcoal-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  My Development Journey
                </h3>

                <div className="text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700 leading-relaxed space-y-4 text-base">
                  {detailedBio.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Developer Philosophy Card */}
              <div className="mt-8 p-6 rounded-2xl bg-charcoal-950/70 dark:bg-charcoal-950/70 light:bg-orange-500/5 border border-orange-500/20 shadow-clay-pill">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                  <Compass className="w-4 h-4" />
                  Developer Philosophy
                </div>
                <p className="text-sm font-medium text-charcoal-200 dark:text-charcoal-200 light:text-charcoal-800 italic leading-relaxed">
                  "{devPhilosophy}"
                </p>
              </div>
            </div>

            {/* Right: Technical Focus, Education & Goals */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* What I Like Building */}
              <div className="p-6 rounded-2xl bg-charcoal-800/60 dark:bg-charcoal-800/60 light:bg-white border border-white/5 dark:border-white/5 light:border-orange-500/15">
                <h4 className="text-base font-bold text-white dark:text-white light:text-charcoal-900 flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-orange-400" />
                  What I Like Building
                </h4>
                <p className="text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700 leading-relaxed">
                  {whatILikeBuilding}
                </p>
              </div>

              {/* Current Learning Areas */}
              <div className="p-6 rounded-2xl bg-charcoal-800/60 dark:bg-charcoal-800/60 light:bg-white border border-white/5 dark:border-white/5 light:border-orange-500/15">
                <h4 className="text-base font-bold text-white dark:text-white light:text-charcoal-900 flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                  Current Learning & Exploration
                </h4>
                <ul className="space-y-2">
                  {learningNow.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="p-6 rounded-2xl bg-charcoal-800/60 dark:bg-charcoal-800/60 light:bg-white border border-white/5 dark:border-white/5 light:border-orange-500/15">
                <h4 className="text-base font-bold text-white dark:text-white light:text-charcoal-900 flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  Education
                </h4>
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-sm font-bold text-white dark:text-white light:text-charcoal-900 leading-snug">
                        {edu.degree}
                      </h5>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-charcoal-750 dark:bg-charcoal-750 light:bg-orange-500/10 text-orange-400 shrink-0">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-600 mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Career Goals */}
              <div className="p-6 rounded-2xl bg-charcoal-800/60 dark:bg-charcoal-800/60 light:bg-white border border-white/5 dark:border-white/5 light:border-orange-500/15">
                <h4 className="text-base font-bold text-white dark:text-white light:text-charcoal-900 flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  Career Goals
                </h4>
                <p className="text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700 leading-relaxed">
                  {careerGoals}
                </p>
              </div>
            </div>
          </div>
        </ClayCard>
      </div>
    </section>
  );
};

export default AboutSection;
