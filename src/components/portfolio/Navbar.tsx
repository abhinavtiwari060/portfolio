"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ClayButton from "../ui/ClayButton";
import BrandLogo from "../ui/BrandLogo";

interface NavbarProps {
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

export const Navbar: React.FC<NavbarProps> = ({ settings = {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build dynamic navigation links based on MongoDB settings
  const navLinks: Array<{ name: string; href: string }> = [];

  if (settings.showHero !== false) {
    navLinks.push({ name: "Home", href: "#hero" });
  }
  if (settings.showAbout !== false) {
    navLinks.push({ name: "About", href: "#about" });
  }
  if (settings.showSkills !== false) {
    navLinks.push({ name: "Skills", href: "#skills" });
  }
  if (settings.showProjects !== false) {
    navLinks.push({ name: "Projects", href: "#projects" });
  }
  if (settings.showArticles !== false) {
    navLinks.push({ name: "Articles", href: "#articles" });
  }
  if (settings.showTestimonials !== false) {
    navLinks.push({ name: "Testimonials", href: "#testimonials" });
  }
  if (settings.showContact !== false) {
    navLinks.push({ name: "Contact", href: "#contact" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-charcoal-950/85 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo />

        {/* Desktop Navigation Links (Dynamically filtered) */}
        {navLinks.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-charcoal-900/70 border border-white/5 shadow-clay-pill backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold text-charcoal-300 hover:text-orange-400 rounded-full hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop Controls: [ Contact CTA ] */}
        <div className="hidden md:flex items-center gap-3">
          {settings.showContact !== false && (
            <a href="#contact">
              <ClayButton variant="primary" size="sm">
                Let's Connect
              </ClayButton>
            </a>
          )}
        </div>

        {/* Mobile Controls: [ Menu Button ] */}
        <div className="flex items-center gap-2 md:hidden">
          {navLinks.length > 0 && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2.5 rounded-2xl bg-charcoal-850 text-charcoal-200 border border-white/5 shadow-clay-pill focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-charcoal-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-charcoal-200 hover:text-orange-400 hover:bg-charcoal-900 rounded-2xl transition-all"
              >
                {link.name}
              </a>
            ))}
            {settings.showContact !== false && (
              <div className="pt-3 border-t border-white/5 flex flex-col">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  <ClayButton variant="primary" size="md" className="w-full">
                    Let's Connect
                  </ClayButton>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
