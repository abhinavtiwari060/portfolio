"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Video, Upload, Loader2, Play } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import ClayInput, { ClayTextarea } from "@/components/ui/ClayInput";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState, EmptyState } from "@/components/ui/FeedbackStates";

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    organization: "",
    videoUrl: "",
    thumbnail: "",
    testimonialText: "",
    displayOrder: 1,
    published: true,
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch {
      showToast("Error fetching testimonials.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      designation: "",
      organization: "",
      videoUrl: "",
      thumbnail: "",
      testimonialText: "",
      displayOrder: testimonials.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingTestimonial(item);
    setFormData({
      name: item.name || "",
      designation: item.designation || "",
      organization: item.organization || "",
      videoUrl: item.videoUrl || "",
      thumbnail: item.thumbnail || "",
      testimonialText: item.testimonialText || "",
      displayOrder: item.displayOrder || 1,
      published: item.published !== false,
    });
    setIsModalOpen(true);
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
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
        showToast("Video thumbnail uploaded!", "success");
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch {
      showToast("Error uploading thumbnail.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial._id}`
        : "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          editingTestimonial ? "Testimonial updated!" : "Testimonial created!",
          "success"
        );
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch {
      showToast("Network error saving testimonial.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${deleteConfirmId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Testimonial deleted successfully.", "info");
        setDeleteConfirmId(null);
        fetchTestimonials();
      } else {
        showToast("Failed to delete testimonial.", "error");
      }
    } catch {
      showToast("Error deleting testimonial.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Video Testimonials</h2>
          <p className="text-xs text-charcoal-400">
            Manage video testimonials and peer recommendations displayed on your portfolio.
          </p>
        </div>

        <ClayButton variant="primary" size="md" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Testimonial
        </ClayButton>
      </div>

      {loading ? (
        <LoadingState message="Fetching video testimonials..." />
      ) : testimonials.length === 0 ? (
        <EmptyState
          title="No testimonials found"
          description="Add a peer review or video link to highlight collaborative impact."
          actionText="Add Testimonial"
          onAction={openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <ClayCard key={t._id || t.name} className="p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-charcoal-800 shrink-0 border border-orange-500/30">
                      <Image
                        src={t.thumbnail || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{t.name}</h4>
                      <p className="text-xs text-charcoal-400">
                        {t.designation} {t.organization ? `• ${t.organization}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(t._id)}
                      className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-500/20 text-charcoal-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-300 italic mb-4 leading-relaxed">
                  "{t.testimonialText}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-orange-400 font-mono truncate max-w-[240px]">
                  {t.videoUrl || "No video URL"}
                </span>
                <span className={t.published !== false ? "text-emerald-400 font-semibold" : "text-charcoal-400"}>
                  {t.published !== false ? "Published" : "Draft"}
                </span>
              </div>
            </ClayCard>
          ))}
        </div>
      )}

      {/* Testimonial Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTestimonial ? "Edit Testimonial" : "Add Video Testimonial"}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="Person Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Rivera"
              required
            />
            <ClayInput
              label="Designation / Role"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <ClayInput
            label="Organization / Company"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="e.g. Open Source Guild"
          />

          <ClayInput
            label="Video URL (YouTube / Vimeo / MP4)"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          {/* Thumbnail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Video Thumbnail Image
            </label>
            <div className="flex items-center gap-3">
              <ClayInput
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
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

          <ClayTextarea
            label="Testimonial Quote"
            value={formData.testimonialText}
            onChange={(e) => setFormData({ ...formData, testimonialText: e.target.value })}
            rows={3}
            required
          />

          <div className="flex items-center gap-6 pt-2">
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
              {saving ? "Saving..." : editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
            </ClayButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial?"
      />
    </div>
  );
}
