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
      color: "text-orange-400",
      href: "/admin/projects",
    },
    {
      title: "Articles",
      value: stats?.totalArticles || 0,
      subtext: `${stats?.publishedArticles || 0} published (${stats?.draftArticles || 0} drafts)`,
      icon: BookOpen,
      color: "text-amber-400",
      href: "/admin/articles",
    },
    {
      title: "Skills Configured",
      value: stats?.totalSkills || 0,
      subtext: "Across Frontend, Backend, DB & Tools",
      icon: Wrench,
      color: "text-blue-400",
      href: "/admin/skills",
    },
    {
      title: "Video Testimonials",
      value: stats?.totalTestimonials || 0,
      subtext: "With video modals enabled",
      icon: Video,
      color: "text-purple-400",
      href: "/admin/testimonials",
    },
    {
      title: "Contact Messages",
      value: stats?.totalMessages || 0,
      subtext: `${stats?.unreadMessages || 0} unread submissions`,
      icon: MessageSquare,
      color: "text-emerald-400",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <ClayCard className="p-8 border border-white/5 bg-gradient-to-r from-charcoal-900 to-charcoal-850">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold mb-3 border border-orange-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Content Management System
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Welcome to Your Portfolio CMS
            </h2>
            <p className="text-sm text-charcoal-300 max-w-2xl leading-relaxed">
              Manage your personal biography, showcase projects, technical articles, skills, and client inquiries in real time. Changes update instantly on your public portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/" target="_blank">
              <ClayButton variant="secondary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
                View Live
              </ClayButton>
            </Link>
            <Link href="/admin/projects">
              <ClayButton variant="primary" size="md" icon={<PlusCircle className="w-4 h-4" />}>
                Add Project
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
                className="p-5 flex flex-col justify-between h-full border border-white/5 hover:border-orange-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-xl bg-charcoal-800 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-white mb-1">{card.value}</div>
                  <p className="text-xs text-charcoal-400">{card.subtext}</p>
                </div>
              </ClayCard>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClayCard className="p-6 sm:p-8 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            Quick Content Shortcuts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/profile"
              className="p-3.5 rounded-xl bg-charcoal-800/80 hover:bg-charcoal-750 text-xs font-semibold text-white border border-white/5 flex items-center justify-between"
            >
              <span>Edit About Me & Philosophy</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </Link>
            <Link
              href="/admin/projects"
              className="p-3.5 rounded-xl bg-charcoal-800/80 hover:bg-charcoal-750 text-xs font-semibold text-white border border-white/5 flex items-center justify-between"
            >
              <span>Manage Projects & Tech</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </Link>
            <Link
              href="/admin/articles"
              className="p-3.5 rounded-xl bg-charcoal-800/80 hover:bg-charcoal-750 text-xs font-semibold text-white border border-white/5 flex items-center justify-between"
            >
              <span>Publish New Technical Article</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </Link>
            <Link
              href="/admin/skills"
              className="p-3.5 rounded-xl bg-charcoal-800/80 hover:bg-charcoal-750 text-xs font-semibold text-white border border-white/5 flex items-center justify-between"
            >
              <span>Update Skill Proficiencies</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </Link>
          </div>
        </ClayCard>

        <ClayCard className="p-6 sm:p-8 border border-white/5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            Inbound Messages
          </h3>
          <p className="text-sm text-charcoal-300 leading-relaxed mb-6">
            Review messages submitted by recruiters, collaborators, and visitors through the portfolio contact form.
          </p>
          <Link href="/admin/messages">
            <ClayButton variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Go to Messages Inbox
            </ClayButton>
          </Link>
        </ClayCard>
      </div>
    </div>
  );
}
