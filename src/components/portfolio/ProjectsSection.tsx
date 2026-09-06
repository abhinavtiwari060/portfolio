"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard, { ProjectCardData } from "../ui/ProjectCard";
import ClayButton from "../ui/ClayButton";

interface ProjectsSectionProps {
  projects: ProjectCardData[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Featured Work"
          title="Handcrafted Projects & Applications"
          subtitle="Explore some of the applications, developer tools, and architectures I've designed and built recently."
        />

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat as string}
                onClick={() => setFilter(cat as string)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                  filter === cat
                    ? "clay-button-primary"
                    : "clay-button-secondary text-charcoal-300"
                }`}
              >
                {cat as string}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project._id || project.slug || idx}
              project={project}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="flex justify-center">
          <Link href="/projects">
            <ClayButton
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 text-orange-400" />}
            >
              View Full Projects Archive
            </ClayButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
