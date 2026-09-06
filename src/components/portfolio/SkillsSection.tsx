"use client";

import React, { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";
import { ISkill } from "@/models/Skill";

interface SkillsSectionProps {
  skills: Partial<ISkill>[];
}

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Technical Skills"
          title="Tools & Technologies I Work With"
          subtitle="A curated breakdown of the frameworks, languages, databases, and workflow tools I use to build scalable web experiences."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                  isActive
                    ? "clay-button-primary"
                    : "clay-button-secondary text-charcoal-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <SkillCard
              key={skill._id?.toString() || idx}
              name={skill.name || "Skill"}
              iconName={skill.icon || "Code"}
              category={skill.category || "Frontend"}
              proficiency={skill.proficiency || 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
