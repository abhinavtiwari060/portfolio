"use client";

import React from "react";
import { Menu, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onOpenMobileSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onOpenMobileSidebar }) => {
  return (
    <header className="sticky top-0 z-20 bg-charcoal-950/85 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar menu"
          className="lg:hidden p-2 rounded-xl bg-charcoal-850 text-charcoal-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-900 border border-white/5 text-xs text-charcoal-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Authenticated Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
