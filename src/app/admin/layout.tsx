"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render full screen without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Derive title from pathname
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[1] || "dashboard";
  const titleMap: Record<string, string> = {
    dashboard: "Dashboard Overview",
    sections: "Website Sections Control",
    settings: "Website Settings",
    profile: "Profile & Biography Management",
    projects: "Projects Management",
    articles: "Articles & Blog Management",
    skills: "Skills & Technologies",
    testimonials: "Video Testimonials",
    messages: "Contact Inquiries",
  };
  const title = titleMap[currentSegment] || "Admin Console";

  return (
    <div className="min-h-screen bg-charcoal-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={title}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
