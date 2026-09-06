"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { ClayCard } from "./ClayCard";
import { ClayBadge } from "./ClayBadge";

export interface ProjectCardData {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  images?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
}

export const ProjectCard: React.FC<{ project: ProjectCardData; priority?: boolean }> = ({
  project,
}) => {
  const coverImage =
    project.images && project.images.length > 0
      ? project.images[0]
      : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

  return (
    <ClayCard
      variant="interactive"
      className="group relative flex flex-col h-full overflow-hidden p-0 border border-white/5 hover:border-orange-500/40"
    >
      {/* Image Container with zoom */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-[26px] bg-charcoal-900">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

        {/* Category Badge */}
        {project.category && (
          <div className="absolute top-4 left-4 z-10">
            <ClayBadge variant="orange" size="sm">
              {project.category}
            </ClayBadge>
          </div>
        )}

        {/* Featured Star Pill */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full bg-orange-500/90 text-white shadow-lg backdrop-blur-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <Link href={`/projects/${project.slug}`} className="focus:outline-none">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1 mb-2.5">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-charcoal-300 leading-relaxed line-clamp-2 mb-5">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-lg bg-charcoal-800 text-charcoal-300 border border-charcoal-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-lg bg-charcoal-800/60 text-charcoal-400 border border-charcoal-700/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors group/link"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source on GitHub"
                className="p-2 rounded-full bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Live Demo"
                className="p-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-all hover:scale-105 border border-orange-500/30"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </ClayCard>
  );
};

export default ProjectCard;
