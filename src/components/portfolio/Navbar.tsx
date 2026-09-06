"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import ClayButton from "../ui/ClayButton";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Articles", href: "#articles" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-charcoal-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-lg shadow-clay-pill border border-orange-400/40 group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-orange-400 transition-colors">
              Abhinav Tiwari
            </span>
            <span className="text-[11px] font-medium text-orange-400/90 tracking-wider uppercase">
              Full Stack Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-charcoal-900/70 border border-white/5 shadow-clay-pill backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-xs font-semibold text-charcoal-300 hover:text-orange-400 rounded-full hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Admin Link */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#contact">
            <ClayButton variant="primary" size="sm">
              Let's Connect
            </ClayButton>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2.5 rounded-2xl bg-charcoal-850 text-charcoal-200 border border-white/5 shadow-clay-pill focus:outline-none hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-charcoal-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-charcoal-200 hover:text-orange-400 hover:bg-charcoal-900 rounded-2xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
