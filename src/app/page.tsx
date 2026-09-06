import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ArticlesSection from "@/components/portfolio/ArticlesSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import { getPortfolioData } from "@/lib/data/portfolio";

export const revalidate = 0; // Dynamic data for instant CMS updates

export default async function HomePage() {
  const { profile, skills, projects, articles, testimonials } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-charcoal-950 text-white flex flex-col relative selection:bg-orange-500 selection:text-white">
      <Navbar />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ArticlesSection articles={articles} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection
        email={profile.email}
        socialLinks={profile.socialLinks}
      />
      <Footer />
    </main>
  );
}
