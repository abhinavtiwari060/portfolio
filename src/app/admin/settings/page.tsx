"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  Loader2,
  Sliders,
  Globe,
  ArrowRight,
} from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import ClayInput, { ClayTextarea } from "@/components/ui/ClayInput";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState } from "@/components/ui/FeedbackStates";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
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
          setSettings(data.settings);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("General website settings saved successfully!", "success");
      } else {
        showToast(data.message || "Failed to save settings.", "error");
      }
    } catch {
      showToast("Network error while saving settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading settings..." />;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Admin & Website Settings
        </h2>
        <p className="text-xs text-charcoal-400">
          Manage global SEO metadata and quick section visibility controls.
        </p>
      </div>

      {/* Website Sections Shortcut */}
      <ClayCard className="p-6 sm:p-8 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white dark:text-white light:text-charcoal-900 mb-1 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-orange-400" />
            Website Section Visibility
          </h3>
          <p className="text-xs text-charcoal-300 dark:text-charcoal-300 light:text-charcoal-600">
            Control which sections (Hero, About, Skills, Projects, Articles, Testimonials, Contact) are enabled.
          </p>
        </div>
        <Link href="/admin/sections">
          <ClayButton variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Manage Sections
          </ClayButton>
        </Link>
      </ClayCard>

      {/* General Settings Form */}
      <form onSubmit={handleSave}>
        <ClayCard className="p-6 sm:p-8 border border-white/5 dark:border-white/5 light:border-orange-500/20 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white dark:text-white light:text-charcoal-900 flex items-center gap-2 border-b border-white/5 pb-4">
            <Globe className="w-5 h-5 text-orange-400" />
            Global Website Meta
          </h3>

          <ClayInput
            label="Website Meta Title"
            value={settings.siteTitle || ""}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            placeholder="Abhinav Kumar Tiwari (Abhi) • Full Stack Developer & Builder"
          />

          <ClayTextarea
            label="Website Meta Description"
            value={settings.siteDescription || ""}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            rows={3}
            placeholder="Developer • Builder • Problem Solver. Building practical, high-performance web experiences."
          />

          <div className="flex justify-end pt-2">
            <ClayButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={saving}
              icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            >
              {saving ? "Saving..." : "Save Settings"}
            </ClayButton>
          </div>
        </ClayCard>
      </form>
    </div>
  );
}
