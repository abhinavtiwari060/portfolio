"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Search,
  Check,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import ClayInput, { ClayTextarea } from "@/components/ui/ClayInput";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState, EmptyState } from "@/components/ui/FeedbackStates";

export default function AdminProjectsPage() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal & Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Full Stack",
    shortDescription: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    features: "",
    technologies: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    published: true,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch {
      showToast("Error fetching projects.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "Full Stack",
      shortDescription: "",
      detailedDescription: "",
      problem: "",
      solution: "",
      features: "",
      technologies: "",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || "",
      slug: proj.slug || "",
      category: proj.category || "Full Stack",
      shortDescription: proj.shortDescription || "",
      detailedDescription: proj.detailedDescription || "",
      problem: proj.problem || "",
      solution: proj.solution || "",
      features: Array.isArray(proj.features) ? proj.features.join("\n") : "",
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : "",
      imageUrl: proj.images?.[0] || "",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      featured: !!proj.featured,
      published: proj.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingProject ? prev.slug : generatedSlug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        showToast("Project cover uploaded!", "success");
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch {
      showToast("Error uploading image.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      features: formData.features.split("\n").map((f) => f.trim()).filter(Boolean),
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      images: formData.imageUrl ? [formData.imageUrl] : [],
    };

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject._id}`
        : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          editingProject ? "Project updated successfully!" : "Project created successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchProjects();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch {
      showToast("Network error saving project.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const res = await fetch(`/api/admin/projects/${deleteConfirmId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Project deleted successfully.", "info");
        setDeleteConfirmId(null);
        fetchProjects();
      } else {
        showToast("Failed to delete project.", "error");
      }
    } catch {
      showToast("Error deleting project.", "error");
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Projects Management</h2>
          <p className="text-xs text-charcoal-400">
            Create, edit, and organize project showcases, case studies, and live links.
          </p>
        </div>

        <ClayButton variant="primary" size="md" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add New Project
        </ClayButton>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search projects by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="clay-input pl-11 pr-4 py-2.5 text-xs w-full"
        />
      </div>

      {/* Projects Table */}
      {loading ? (
        <LoadingState message="Fetching projects catalogue..." />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Click 'Add New Project' to publish your first case study."
          actionText="Add Project"
          onAction={openCreateModal}
        />
      ) : (
        <ClayCard className="overflow-hidden p-0 border border-white/5 bg-charcoal-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-850 text-charcoal-400 uppercase tracking-wider text-[11px] border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Project</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Featured</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((p) => (
                  <tr key={p._id || p.slug} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal-800 shrink-0 border border-white/5">
                        <Image
                          src={
                            p.images?.[0] ||
                            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
                          }
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{p.title}</h4>
                        <span className="text-[11px] text-charcoal-400">/{p.slug}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-charcoal-300 font-medium">{p.category}</td>

                    <td className="px-4 py-4">
                      {p.featured ? (
                        <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase">
                          Featured
                        </span>
                      ) : (
                        <span className="text-charcoal-500 text-xs">—</span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          p.published !== false ? "text-emerald-400" : "text-charcoal-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.published !== false ? "bg-emerald-400" : "bg-charcoal-400"
                          }`}
                        />
                        {p.published !== false ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white transition-colors"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p._id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-500/20 text-charcoal-300 hover:text-rose-400 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ClayCard>
      )}

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Create New Project"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="Project Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. DevPulse Analytics"
              required
            />
            <ClayInput
              label="URL Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="devpulse-analytics"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Full Stack / Frontend / Backend"
            />
            <ClayInput
              label="Technologies (comma separated)"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="Next.js, TypeScript, MongoDB"
            />
          </div>

          <ClayTextarea
            label="Short Description"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            rows={2}
            placeholder="Brief summary displayed on project cards"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayTextarea
              label="Problem Statement"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              rows={2}
              placeholder="What challenge does this project solve?"
            />
            <ClayTextarea
              label="Solution Provided"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows={2}
              placeholder="How does your architecture address it?"
            />
          </div>

          <ClayTextarea
            label="Key Features (One per line)"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            rows={3}
            placeholder="Real-time telemetry ingestion&#10;Dark mode design system"
          />

          <ClayTextarea
            label="Detailed Description / Case Study (Markdown)"
            value={formData.detailedDescription}
            onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
            rows={4}
            placeholder="Detailed writeup with architectural choices..."
          />

          {/* Cover Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Project Cover Image
            </label>
            <div className="flex items-center gap-3">
              <ClayInput
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="flex-1"
              />
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <span className="px-3.5 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-xs font-semibold text-charcoal-200 border border-white/10 flex items-center gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>Upload</span>
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="GitHub Repository URL"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
            />
            <ClayInput
              label="Live Demo URL"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal-200">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded text-orange-500 focus:ring-orange-500 bg-charcoal-800"
              />
              <span>Mark as Featured Project</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal-200">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded text-orange-500 focus:ring-orange-500 bg-charcoal-800"
              />
              <span>Published on Website</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-2">
            <ClayButton variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ClayButton>
            <ClayButton variant="primary" size="md" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
            </ClayButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This will remove it permanently from your portfolio."
      />
    </div>
  );
}
