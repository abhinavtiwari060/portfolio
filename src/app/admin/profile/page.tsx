"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Upload, User, Sparkles, GraduationCap } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayInput, { ClayTextarea } from "@/components/ui/ClayInput";
import ClayButton from "@/components/ui/ClayButton";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState } from "@/components/ui/FeedbackStates";

export default function AdminProfilePage() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setProfile(data.profile);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Profile & Biography updated successfully!", "success");
      } else {
        showToast(data.message || "Failed to update profile.", "error");
      }
    } catch {
      showToast("Network error while saving profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile({ ...profile, profilePhoto: data.url });
        showToast("Profile photo uploaded!", "success");
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch {
      showToast("Error uploading file.", "error");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !profile) return <LoadingState message="Loading profile information..." />;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Profile & Biography</h2>
            <p className="text-xs text-charcoal-400">
              Update your hero introduction, biography, developer philosophy, and career details.
            </p>
          </div>
          <ClayButton
            type="submit"
            variant="primary"
            size="md"
            disabled={saving}
            icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          >
            {saving ? "Saving Changes..." : "Save Profile"}
          </ClayButton>
        </div>

        {/* Basic Personal Info */}
        <ClayCard className="p-8 border border-white/5 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
            <User className="w-5 h-5 text-orange-400" />
            Personal Information & Hero
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ClayInput
              label="Full Name"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
            <ClayInput
              label="Headline (Hero Subtitle)"
              value={profile.headline || ""}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              placeholder="Developer • Builder • Problem Solver"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ClayInput
              label="Availability Status"
              value={profile.availability || ""}
              onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
              placeholder="Open to opportunities"
            />
            <ClayInput
              label="Contact Email"
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          {/* Profile Photo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Profile Photo URL / Upload
            </label>
            <div className="flex items-center gap-4">
              <ClayInput
                value={profile.profilePhoto || ""}
                onChange={(e) => setProfile({ ...profile, profilePhoto: e.target.value })}
                placeholder="https://..."
                className="flex-1"
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="px-4 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-xs font-semibold text-charcoal-200 border border-white/10 flex items-center gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>Upload Image</span>
                </span>
              </label>
            </div>
          </div>

          <ClayTextarea
            label="Short Bio (Hero Section)"
            value={profile.shortBio || ""}
            onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
            rows={3}
          />
        </ClayCard>

        {/* Detailed Story & Philosophy */}
        <ClayCard className="p-8 border border-white/5 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
            <Sparkles className="w-5 h-5 text-orange-400" />
            Detailed Biography & Philosophy
          </h3>

          <ClayTextarea
            label="Detailed Biography (About Me Section - Markdown Supported)"
            value={profile.detailedBio || ""}
            onChange={(e) => setProfile({ ...profile, detailedBio: e.target.value })}
            rows={8}
          />

          <ClayTextarea
            label="Personal Developer Philosophy"
            value={profile.devPhilosophy || ""}
            onChange={(e) => setProfile({ ...profile, devPhilosophy: e.target.value })}
            rows={3}
          />

          <ClayTextarea
            label="What I Like Building"
            value={profile.whatILikeBuilding || ""}
            onChange={(e) => setProfile({ ...profile, whatILikeBuilding: e.target.value })}
            rows={3}
          />

          <ClayInput
            label="Current Learning Areas (Comma separated)"
            value={Array.isArray(profile.learningNow) ? profile.learningNow.join(", ") : ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                learningNow: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
              })
            }
          />

          <ClayInput
            label="Career Goals"
            value={profile.careerGoals || ""}
            onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
          />
        </ClayCard>

        {/* Education & Links */}
        <ClayCard className="p-8 border border-white/5 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
            <GraduationCap className="w-5 h-5 text-orange-400" />
            Education & Links
          </h3>

          {/* Education Form */}
          {profile.education && profile.education.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ClayInput
                  label="Degree / Major"
                  value={profile.education[0]?.degree || ""}
                  onChange={(e) => {
                    const edu = [...profile.education];
                    edu[0] = { ...edu[0], degree: e.target.value };
                    setProfile({ ...profile, education: edu });
                  }}
                />
                <ClayInput
                  label="Institution"
                  value={profile.education[0]?.institution || ""}
                  onChange={(e) => {
                    const edu = [...profile.education];
                    edu[0] = { ...edu[0], institution: e.target.value };
                    setProfile({ ...profile, education: edu });
                  }}
                />
              </div>
              <ClayInput
                label="Year of Study"
                value={profile.education[0]?.year || ""}
                onChange={(e) => {
                  const edu = [...profile.education];
                  edu[0] = { ...edu[0], year: e.target.value };
                  setProfile({ ...profile, education: edu });
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/5">
            <ClayInput
              label="Resume URL (Google Drive / Cloudinary / Dropbox)"
              value={profile.resumeUrl || ""}
              onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
            />
            <ClayInput
              label="Location"
              value={profile.location || ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
          </div>
        </ClayCard>

        <div className="flex justify-end">
          <ClayButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={saving}
            icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          >
            {saving ? "Saving Changes..." : "Save Profile"}
          </ClayButton>
        </div>
      </form>
    </div>
  );
}
