"use client";

import React from "react";
import {
  Code,
  Database,
  Server,
  GitBranch,
  Github,
  Terminal,
  Wind,
  Layers,
  Box,
  Cpu,
  Table,
  FileCode,
  Palette,
  Network,
  Atom,
  LucideIcon,
} from "lucide-react";
import { ClayCard } from "./ClayCard";

interface SkillCardProps {
  name: string;
  iconName?: string;
  category: string;
  proficiency?: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  FileCode,
  Palette,
  Code,
  Atom,
  Layers,
  Wind,
  Server,
  Cpu,
  Network,
  Database,
  Table,
  GitBranch,
  Github,
  Terminal,
  Box,
};

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  iconName = "Code",
  category,
  proficiency = 85,
}) => {
  const IconComponent = ICON_MAP[iconName] || Code;

  return (
    <ClayCard
      variant="interactive"
      className="p-5 flex flex-col justify-between border border-white/5 hover:border-orange-500/30 group"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-charcoal-750 to-charcoal-850 flex items-center justify-center text-orange-400 group-hover:text-orange-300 group-hover:scale-110 transition-all shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),_inset_-1px_-1px_2px_rgba(0,0,0,0.5)] border border-white/5">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold text-charcoal-400 group-hover:text-orange-400/80 transition-colors">
          {proficiency}%
        </span>
      </div>

      <div>
        <h4 className="text-base font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
          {name}
        </h4>
        <p className="text-xs text-charcoal-400 mb-3">{category}</p>

        {/* Proficiency bar */}
        <div className="w-full h-2 rounded-full bg-charcoal-900 overflow-hidden shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000 ease-out"
            style={{ width: `${proficiency}%` }}
          />
        </div>
      </div>
    </ClayCard>
  );
};

export default SkillCard;
