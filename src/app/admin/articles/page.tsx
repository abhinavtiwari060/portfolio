"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, Upload, Loader2, BookOpen } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import ClayInput, { ClayTextarea } from "@/components/ui/ClayInput";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState, EmptyState } from "@/components/ui/FeedbackStates";

export default function AdminArticlesPage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Engineering",
    tags: "",
    readingTime: "5 min read",
    author: "Abhinav Kumar Tiwari",
    published: true,
  });

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles || []);
      }
    } catch {
      showToast("Error fetching articles.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "Engineering",
      tags: "",
      readingTime: "5 min read",
      author: "Abhinav Kumar Tiwari",
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (art: any) => {
    setEditingArticle(art);
    setFormData({
      title: art.title || "",
      slug: art.slug || "",
      excerpt: art.excerpt || "",
      content: art.content || "",
      coverImage: art.coverImage || "",
      category: art.category || "Engineering",
      tags: Array.isArray(art.tags) ? art.tags.join(", ") : "",
      readingTime: art.readingTime || "5 min read",
      author: art.author || "Abhinav Kumar Tiwari",
      published: art.published !== false,
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
      slug: editingArticle ? prev.slug : generatedSlug,
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
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
        showToast("Article cover image uploaded!", "success");
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch {
      showToast("Error uploading cover image.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingArticle
        ? `/api/admin/articles/${editingArticle._id}`
        : "/api/admin/articles";
      const method = editingArticle ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          editingArticle ? "Article updated successfully!" : "Article published successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchArticles();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch {
      showToast("Network error saving article.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const res = await fetch(`/api/admin/articles/${deleteConfirmId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Article deleted successfully.", "info");
        setDeleteConfirmId(null);
        fetchArticles();
      } else {
        showToast("Failed to delete article.", "error");
      }
    } catch {
      showToast("Error deleting article.", "error");
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Articles & Blog Management</h2>
          <p className="text-xs text-charcoal-400">
            Write, edit, and publish technical guides and architectural thoughts.
          </p>
        </div>

        <ClayButton variant="primary" size="md" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Write New Article
        </ClayButton>
      </div>

      {/* Search */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search articles by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="clay-input pl-11 pr-4 py-2.5 text-xs w-full"
        />
      </div>

      {loading ? (
        <LoadingState message="Fetching articles catalogue..." />
      ) : filteredArticles.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Start writing your first technical post with markdown support."
          actionText="Write Article"
          onAction={openCreateModal}
        />
      ) : (
        <ClayCard className="overflow-hidden p-0 border border-white/5 bg-charcoal-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-850 text-charcoal-400 uppercase tracking-wider text-[11px] border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Reading Time</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredArticles.map((art) => (
                  <tr key={art._id || art.slug} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal-800 shrink-0 border border-white/5">
                        <Image
                          src={
                            art.coverImage ||
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
                          }
                          alt={art.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{art.title}</h4>
                        <span className="text-[11px] text-charcoal-400">/{art.slug}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-charcoal-300 font-medium">{art.category}</td>
                    <td className="px-4 py-4 text-charcoal-400">{art.readingTime}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          art.published !== false ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            art.published !== false ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                        />
                        {art.published !== false ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(art)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white transition-colors"
                          title="Edit article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(art._id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-500/20 text-charcoal-300 hover:text-rose-400 transition-colors"
                          title="Delete article"
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

      {/* Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingArticle ? "Edit Article" : "Write Technical Article"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="Article Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Next.js & MongoDB Architecture"
              required
            />
            <ClayInput
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ClayInput
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Engineering / Architecture / UI & Design"
            />
            <ClayInput
              label="Estimated Reading Time"
              value={formData.readingTime}
              onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
              placeholder="6 min read"
            />
          </div>

          <ClayInput
            label="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Next.js, MongoDB, Architecture, Clean Code"
          />

          <ClayTextarea
            label="Short Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            placeholder="Summary for article cards and social previews"
            required
          />

          <ClayTextarea
            label="Article Content (Markdown Supported)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            placeholder="Write your article using Markdown headers, code snippets, and lists..."
            required
          />

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Cover Image
            </label>
            <div className="flex items-center gap-3">
              <ClayInput
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
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

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal-200">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded text-orange-500 focus:ring-orange-500 bg-charcoal-800"
              />
              <span>Publish Article (Uncheck for Draft)</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-2">
            <ClayButton variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ClayButton>
            <ClayButton variant="primary" size="md" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingArticle ? "Update Article" : "Publish Article"}
            </ClayButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to permanently delete this article? This action cannot be undone."
      />
    </div>
  );
}
