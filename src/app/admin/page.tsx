"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  Wrench,
  Video,
  MessageSquare,
  ArrowRight,
  Sparkles,
  PlusCircle,
  ExternalLink,
  Sliders,
  Settings,
} from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import { LoadingState } from "@/components/ui/FeedbackStates";

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalSkills: number;
  totalTestimonials: number;
  unreadMessages: number;
  totalMessages: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading dashboard metrics..." />;

  const statCards = [
    {
      title: "Projects",
      value: stats?.totalProjects || 0,
      subtext: `${stats?.publishedProjects || 0} published on site`,
      icon: Briefcase,
      color: "text-orange-500",
      href: "/admin/projects",
    },
    {
      title: "Articles",
      value: stats?.totalArticles || 0,
      subtext: `${stats?.publishedArticles || 0} published (${stats?.draftArticles || 0} drafts)`,
      icon: BookOpen,
      color: "text-orange-400",
      href: "/admin/articles",
    },
    {
      title: "Skills Configured",
      value: stats?.totalSkills || 0,
      subtext: "Across Frontend, Backend, DB & Tools",
      icon: Wrench,
      color: "text-amber-500",
      href: "/admin/skills",
    },
    {
      title: "Video Testimonials",
      value: stats?.totalTestimonials || 0,
      subtext: "With video modals enabled",
      icon: Video,
      color: "text-amber-600",
      href: "/admin/testimonials",
    },
    {
      title: "Contact Inquiries",
      value: stats?.totalMessages || 0,
      subtext: `${stats?.unreadMessages || 0} unread submissions`,
      icon: MessageSquare,
      color: "text-orange-600",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <ClayCard className="p-6 sm:p-8 border border-white/5 dark:border-white/5 light:border-orange-500/20 bg-gradient-to-r from-charcoal-900 to-charcoal-850 dark:from-charcoal-900 dark:to-charcoal-850 light:from-white light:to-orange-50/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold mb-3 border border-orange-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Portfolio CMS Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-charcoal-900 mb-2">
              Welcome, Abhinav Tiwari
            </h2>
            <p className="text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600 max-w-2xl leading-relaxed">
              Manage your personal biography, showcase projects, technical articles, skills, website section visibility, and client inquiries in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/" target="_blank">
              <ClayButton variant="secondary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
                View Live
              </ClayButton>
            </Link>
            <Link href="/admin/sections">
              <ClayButton variant="primary" size="md" icon={<Sliders className="w-4 h-4" />}>
                Website Sections
              </ClayButton>
            </Link>
          </div>
        </div>
      </ClayCard>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="focus:outline-none">
              <ClayCard
                variant="interactive"
                className="p-5 flex flex-col justify-between h-full border border-white/5 dark:border-white/5 light:border-orange-500/15 hover:border-orange-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-500 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-xl bg-charcoal-800 dark:bg-charcoal-800 light:bg-orange-500/10 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-white dark:text-white light:text-charcoal-900 mb-1">
                    {card.value}
                  </div>
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-500">{card.subtext}</p>
                </div>
              </ClayCard>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClayCard className="p-6 sm:p-8 border border-white/5 dark:border-white/5 light:border-orange-500/15">
          <h3 className="text-lg font-bold text-white dark:text-white light:text-charcoal-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Quick Content Shortcuts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/sections"
              className="p-3.5 rounded-xl bg-charcoal-800/80 dark:bg-charcoal-800/80 light:bg-orange-500/10 hover:bg-charcoal-750 dark:hover:bg-charcoal-750 light:hover:bg-orange-500/20 text-xs font-semibold text-white dark:text-white light:text-charcoal-800 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-between transition-colors"
            >
              <span>Website Sections Visibility</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
            <Link
              href="/admin/projects"
              className="p-3.5 rounded-xl bg-charcoal-800/80 dark:bg-charcoal-800/80 light:bg-orange-500/10 hover:bg-charcoal-750 dark:hover:bg-charcoal-750 light:hover:bg-orange-500/20 text-xs font-semibold text-white dark:text-white light:text-charcoal-800 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-between transition-colors"
            >
              <span>Manage Projects & Tech</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
            <Link
              href="/admin/articles"
              className="p-3.5 rounded-xl bg-charcoal-800/80 dark:bg-charcoal-800/80 light:bg-orange-500/10 hover:bg-charcoal-750 dark:hover:bg-charcoal-750 light:hover:bg-orange-500/20 text-xs font-semibold text-white dark:text-white light:text-charcoal-800 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-between transition-colors"
            >
              <span>Publish Technical Article</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
            <Link
              href="/admin/settings"
              className="p-3.5 rounded-xl bg-charcoal-800/80 dark:bg-charcoal-800/80 light:bg-orange-500/10 hover:bg-charcoal-750 dark:hover:bg-charcoal-750 light:hover:bg-orange-500/20 text-xs font-semibold text-white dark:text-white light:text-charcoal-800 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-between transition-colors"
            >
              <span>General Settings</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
          </div>
        </ClayCard>

        <ClayCard className="p-6 sm:p-8 border border-white/5 dark:border-white/5 light:border-orange-500/15">
          <h3 className="text-lg font-bold text-white dark:text-white light:text-charcoal-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            Inbound Messages
          </h3>
          <p className="text-sm text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600 leading-relaxed mb-6">
            Review messages submitted by recruiters, collaborators, and visitors through the portfolio contact form.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/admin/messages">
              <ClayButton variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Go to Messages Inbox
              </ClayButton>
            </Link>
            <Link href="/admin/profile">
              <ClayButton variant="secondary" size="md">
                Edit Bio & Links
              </ClayButton>
            </Link>
          </div>
        </ClayCard>
      </div>
    </div>
  );
}
