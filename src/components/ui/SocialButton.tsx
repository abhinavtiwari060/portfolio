import React from "react";
import { Github, Linkedin, Twitter, Mail, Globe, Youtube, Instagram, LucideIcon } from "lucide-react";

interface SocialButtonProps {
  platform: string;
  url: string;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  mail: Mail,
  email: Mail,
  youtube: Youtube,
  instagram: Instagram,
};

export const SocialButton: React.FC<SocialButtonProps> = ({ platform, url, className = "" }) => {
  const normalizedKey = platform.toLowerCase().trim();
  const IconComponent = ICON_MAP[normalizedKey] || Globe;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${platform}`}
      className={`w-11 h-11 rounded-2xl bg-charcoal-850 hover:bg-charcoal-750 text-charcoal-300 hover:text-orange-400 border border-white/5 hover:border-orange-500/30 flex items-center justify-center transition-all duration-300 shadow-clay-pill hover:scale-105 ${className}`}
    >
      <IconComponent className="w-5 h-5" />
    </a>
  );
};

export default SocialButton;
