"use client";

import React, { useEffect, useState } from "react";
import {
  Sliders,
  Check,
  X,
  Save,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  Layers,
  User,
  Wrench,
  Briefcase,
  BookOpen,
  Video,
  MessageSquare,
} from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState } from "@/components/ui/FeedbackStates";

interface SectionConfig {
  key: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export default function AdminSectionsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    showHero: true,
    showAbout: true,
    showSkills: true,
    showProjects: true,
    showArticles: true,
    showTestimonials: true,
    showContact: true,
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings({
            showHero: data.settings.showHero ?? true,
            showAbout: data.settings.showAbout ?? true,
            showSkills: data.settings.showSkills ?? true,
            showProjects: data.settings.showProjects ?? true,
            showArticles: data.settings.showArticles ?? true,
            showTestimonials: data.settings.showTestimonials ?? true,
            showContact: data.settings.showContact ?? true,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Website section visibility saved successfully!", "success");
      } else {
        showToast(data.message || "Failed to update sections.", "error");
      }
    } catch {
      showToast("Network error saving section settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading section configuration..." />;

  const sectionItems: SectionConfig[] = [
    {
      key: "showHero",
      name: "Hero Section",
      description: "Landing intro with 3D profile picture, live status badge, and floating tech pills.",
      icon: Sparkles,
      enabled: settings.showHero,
    },
    {
      key: "showAbout",
      name: "About Me Section",
      description: "Development journey story, developer philosophy, education, and career goals.",
      icon: User,
      enabled: settings.showAbout,
    },
    {
      key: "showSkills",
      name: "Technical Skills",
      description: "Curated skills grid categorized across Frontend, Backend, Database, and Tools.",
      icon: Wrench,
      enabled: settings.showSkills,
    },
    {
      key: "showProjects",
      name: "Featured Projects",
      description: "Project showcase cards, case studies, GitHub source, and live demo links.",
      icon: Briefcase,
      enabled: settings.showProjects,
    },
    {
      key: "showArticles",
      name: "Articles & Blog",
      description: "Technical blog posts, architectural guides, tags, and markdown reader.",
      icon: BookOpen,
      enabled: settings.showArticles,
    },
    {
      key: "showTestimonials",
      name: "Video Testimonials",
      description: "Video recommendation cards with modal player for YouTube/Vimeo/direct video.",
      icon: Video,
      enabled: settings.showTestimonials,
    },
    {
      key: "showContact",
      name: "Contact Section",
      description: "'Have an idea? Let's build it.' form, email copy card, and social links.",
      icon: MessageSquare,
      enabled: settings.showContact,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-charcoal-900">
            Website Sections Visibility
          </h2>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-400 light:text-charcoal-600">
            Toggle which major sections appear on your public website and navigation menus.
          </p>
        </div>

        <ClayButton
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={saving}
          icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        >
          {saving ? "Saving Changes..." : "Save Visibility Settings"}
        </ClayButton>
      </div>

      {/* Sections List */}
      <div className="flex flex-col gap-4">
        {sectionItems.map((sec) => {
          const Icon = sec.icon;
          const isEnabled = sec.enabled;

          return (
            <ClayCard
              key={sec.key}
              className={`p-6 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isEnabled
                  ? "border-orange-500/30 bg-charcoal-900/95 dark:bg-charcoal-900/95 light:bg-white"
                  : "border-white/5 dark:border-white/5 light:border-charcoal-200 bg-charcoal-950/60 dark:bg-charcoal-950/60 light:bg-charcoal-50 opacity-70"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isEnabled
                      ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                      : "bg-charcoal-800 text-charcoal-400 border-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-white dark:text-white light:text-charcoal-900">
                      {sec.name}
                    </h3>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        isEnabled
                          ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                          : "bg-charcoal-800 text-charcoal-400 border-white/5"
                      }`}
                    >
                      {isEnabled ? "Visible (ON)" : "Hidden (OFF)"}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600 max-w-lg leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              </div>

              {/* Clay Toggle Button */}
              <button
                type="button"
                onClick={() => handleToggle(sec.key as keyof typeof settings)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none shrink-0 ${
                  isEnabled ? "bg-orange-500" : "bg-charcoal-800 dark:bg-charcoal-800 light:bg-charcoal-300"
                }`}
                role="switch"
                aria-checked={isEnabled}
              >
                <span className="sr-only">Toggle {sec.name}</span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center text-xs font-bold ${
                    isEnabled ? "translate-x-8 text-orange-600" : "translate-x-0 text-charcoal-600"
                  }`}
                >
                  {isEnabled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </span>
              </button>
            </ClayCard>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <ClayButton
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={saving}
          icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        >
          {saving ? "Saving Changes..." : "Save Visibility Settings"}
        </ClayButton>
      </div>
    </div>
  );
}
