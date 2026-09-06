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
  const { profile, skills, projects, articles, testimonials, settings } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-charcoal-950 dark:bg-charcoal-950 light:bg-[#faf7f2] text-white dark:text-white light:text-charcoal-900 flex flex-col relative selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Navigation (respects dynamic visibility) */}
      <Navbar settings={settings} />

      {/* Sections dynamically rendered based on MongoDB settings */}
      {settings?.showHero !== false && <HeroSection profile={profile} />}
      {settings?.showAbout !== false && <AboutSection profile={profile} />}
      {settings?.showSkills !== false && <SkillsSection skills={skills} />}
      {settings?.showProjects !== false && <ProjectsSection projects={projects} />}
      {settings?.showArticles !== false && <ArticlesSection articles={articles} />}
      {settings?.showTestimonials !== false && <TestimonialsSection testimonials={testimonials} />}
      {settings?.showContact !== false && (
        <ContactSection email={profile.email} socialLinks={profile.socialLinks} />
      )}

      {/* Footer (respects dynamic visibility) */}
      <Footer settings={settings} />
    </main>
  );
}
