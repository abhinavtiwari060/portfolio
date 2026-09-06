"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Shield } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";

interface FooterProps {
  settings?: {
    showHero?: boolean;
    showAbout?: boolean;
    showSkills?: boolean;
    showProjects?: boolean;
    showArticles?: boolean;
    showTestimonials?: boolean;
    showContact?: boolean;
  };
}

export const Footer: React.FC<FooterProps> = ({ settings = {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks: Array<{ name: string; href: string }> = [];
  if (settings.showHero !== false) footerLinks.push({ name: "Home", href: "#hero" });
  if (settings.showAbout !== false) footerLinks.push({ name: "About", href: "#about" });
  if (settings.showSkills !== false) footerLinks.push({ name: "Skills", href: "#skills" });
  if (settings.showProjects !== false) footerLinks.push({ name: "Projects", href: "#projects" });
  if (settings.showArticles !== false) footerLinks.push({ name: "Articles", href: "#articles" });
  if (settings.showTestimonials !== false) footerLinks.push({ name: "Testimonials", href: "#testimonials" });
  if (settings.showContact !== false) footerLinks.push({ name: "Contact", href: "#contact" });

  return (
    <footer className="relative bg-charcoal-950 dark:bg-charcoal-950 light:bg-[#f5f1e8] border-t border-white/5 dark:border-white/5 light:border-orange-500/15 pt-16 pb-12 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5 dark:border-white/5 light:border-orange-500/15">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <BrandLogo showSubtitle={false} className="mb-2" />
            <p className="text-xs text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-600 max-w-sm">
              Developer • Builder • Problem Solver. Designing tactile interfaces & resilient backend architectures.
            </p>
          </div>

          {/* Dynamic Footer Nav Links */}
          {footerLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-700 hover:text-orange-400 dark:hover:text-orange-400 light:hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-2xl bg-charcoal-850 dark:bg-charcoal-850 light:bg-white text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-700 hover:text-orange-400 dark:hover:text-orange-400 light:hover:text-orange-600 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-center shadow-clay-pill hover:scale-105 transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500 dark:text-charcoal-500 light:text-charcoal-600">
          <p>© {new Date().getFullYear()} Abhinav Kumar Tiwari. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Developed By Abhinav Kumar Tiwari
            </span>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-700 hover:text-orange-400 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
