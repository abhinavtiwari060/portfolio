"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Heart, Shield } from "lucide-react";
import SocialButton from "../ui/SocialButton";

const FOOTER_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Articles", href: "#articles" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-charcoal-950 border-t border-white/5 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-2 focus:outline-none">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-base shadow-clay-pill border border-orange-400/40">
                A
              </div>
              <span className="font-bold text-lg text-white">Abhinav Kumar Tiwari</span>
            </Link>
            <p className="text-xs text-charcoal-400 max-w-sm">
              Developer • Builder • Problem Solver. Designing tactile interfaces & resilient backend architectures.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-charcoal-400 hover:text-orange-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-11 h-11 rounded-2xl bg-charcoal-850 hover:bg-charcoal-750 text-charcoal-300 hover:text-orange-400 border border-white/5 flex items-center justify-center shadow-clay-pill hover:scale-105 transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Abhinav Kumar Tiwari. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-orange-500 fill-orange-500 mx-0.5" /> & Claymorphism
            </span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-charcoal-400 hover:text-orange-400 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
