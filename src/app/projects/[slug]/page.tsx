import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Layers, Cpu, Lightbulb, AlertCircle } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ClayCard from "@/components/ui/ClayCard";
import ClayBadge from "@/components/ui/ClayBadge";
import ClayButton from "@/components/ui/ClayButton";
import { getProjectBySlug } from "@/lib/data/portfolio";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} • Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.images?.[0] ? [{ url: project.images[0] }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const coverImage =
    project.images?.[0] ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

  return (
    <main className="min-h-screen bg-charcoal-950 text-white flex flex-col pt-28 pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-400 hover:text-orange-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.category && (
              <ClayBadge variant="orange" size="md">
                {project.category}
              </ClayBadge>
            )}
            {project.featured && (
              <ClayBadge variant="success" size="sm">
                Featured Project
              </ClayBadge>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal-300 max-w-3xl leading-relaxed mb-6">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ClayButton variant="primary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
                  Live Demo
                </ClayButton>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <ClayButton variant="secondary" size="md" icon={<Github className="w-4 h-4" />} className="text-white">
                  Source Code
                </ClayButton>
              </a>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full h-64 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-clay-card border border-white/10 mb-14 bg-charcoal-900">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
        </div>

        {/* Problem & Solution Cards */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {project.problem && (
              <ClayCard className="p-8 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">The Problem</h3>
                <p className="text-sm text-charcoal-300 leading-relaxed">{project.problem}</p>
              </ClayCard>
            )}

            {project.solution && (
              <ClayCard className="p-8 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">The Solution</h3>
                <p className="text-sm text-charcoal-300 leading-relaxed">{project.solution}</p>
              </ClayCard>
            )}
          </div>
        )}

        {/* Key Features Checklist */}
        {project.features && project.features.length > 0 && (
          <ClayCard className="p-8 sm:p-10 border border-white/5 mb-14">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-orange-400" />
              Key Features & Architectural Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-charcoal-900/60 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-charcoal-200 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </ClayCard>
        )}

        {/* Tech Stack Breakdown */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-14">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-orange-400" />
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-charcoal-850 text-charcoal-200 border border-white/10 shadow-clay-pill"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Breakdown */}
        {project.detailedDescription && (
          <ClayCard className="p-8 sm:p-10 border border-white/5 mb-14">
            <div className="prose prose-invert max-w-none text-charcoal-200 space-y-4">
              {project.detailedDescription.split("\n\n").map((para: string, idx: number) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </ClayCard>
        )}

        {/* Additional Images if available */}
        {project.images && project.images.length > 1 && (
          <div className="mb-14">
            <h3 className="text-xl font-bold text-white mb-6">Additional Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="relative h-64 rounded-2xl overflow-hidden border border-white/10 shadow-clay-card">
                  <Image src={img} alt={`${project.title} screenshot ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
