"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  Wrench,
  Video,
  MessageSquare,
  LogOut,
  ExternalLink,
  Shield,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/ToastNotification";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile & Bio", href: "/admin/profile", icon: User },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Articles", href: "/admin/articles", icon: BookOpen },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Testimonials", href: "/admin/testimonials", icon: Video },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      showToast("Logged out successfully.", "info");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-5 bg-charcoal-900 border-r border-white/5">
      {/* Top Brand */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-clay-pill">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Abhinav CMS</h2>
              <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-charcoal-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-charcoal-300 hover:text-white hover:bg-charcoal-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-300 hover:text-orange-400 hover:bg-charcoal-850 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Public Site
          </span>
          <span className="text-[10px] bg-charcoal-800 px-2 py-0.5 rounded text-charcoal-400">
            Live
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
