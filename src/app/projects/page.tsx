import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPortfolioData } from "@/lib/data/portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Applications",
  description:
    "Explore full-stack web applications, developer tooling, and systems built by Abhinav Kumar Tiwari.",
};

export const revalidate = 0;

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-charcoal-950 text-white flex flex-col pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <SectionHeading
          badgeText="Portfolio"
          title="All Projects & Builds"
          subtitle="A comprehensive catalogue of applications, microservices, developer tools, and client products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, idx: number) => (
            <ProjectCard key={project._id || project.slug || idx} project={project} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
