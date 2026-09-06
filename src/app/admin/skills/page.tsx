"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Wrench, Search, Code } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayButton from "@/components/ui/ClayButton";
import ClayInput from "@/components/ui/ClayInput";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState, EmptyState } from "@/components/ui/FeedbackStates";

const CATEGORIES = ["Frontend", "Backend", "Database", "Tools"];
const ICON_OPTIONS = [
  "Code",
  "Atom",
  "Layers",
  "Wind",
  "Server",
  "Cpu",
  "Network",
  "Database",
  "Table",
  "GitBranch",
  "Github",
  "Terminal",
  "Box",
  "FileCode",
  "Palette",
];

export default function AdminSkillsPage() {
  const { showToast } = useToast();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "Code",
    proficiency: 85,
    displayOrder: 1,
  });

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills || []);
      }
    } catch {
      showToast("Error fetching skills.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Frontend",
      icon: "Code",
      proficiency: 85,
      displayOrder: skills.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || "",
      category: skill.category || "Frontend",
      icon: skill.icon || "Code",
      proficiency: skill.proficiency || 85,
      displayOrder: skill.displayOrder || 1,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill._id}` : "/api/admin/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          editingSkill ? "Skill updated successfully!" : "Skill created successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchSkills();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch {
      showToast("Network error saving skill.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const res = await fetch(`/api/admin/skills/${deleteConfirmId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Skill deleted successfully.", "info");
        setDeleteConfirmId(null);
        fetchSkills();
      } else {
        showToast("Failed to delete skill.", "error");
      }
    } catch {
      showToast("Error deleting skill.", "error");
    }
  };

  const filteredSkills =
    categoryFilter === "All"
      ? skills
      : skills.filter((s) => s.category === categoryFilter);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Skills & Technologies</h2>
          <p className="text-xs text-charcoal-400">
            Manage your technical toolbox across Frontend, Backend, Database, and DevOps.
          </p>
        </div>

        <ClayButton variant="primary" size="md" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add New Skill
        </ClayButton>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              categoryFilter === cat
                ? "bg-orange-500 text-white"
                : "bg-charcoal-850 text-charcoal-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState message="Fetching technical skills..." />
      ) : filteredSkills.length === 0 ? (
        <EmptyState
          title="No skills found"
          description="Click 'Add New Skill' to add a tool or language to this category."
          actionText="Add Skill"
          onAction={openCreateModal}
        />
      ) : (
        <ClayCard className="overflow-hidden p-0 border border-white/5 bg-charcoal-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-850 text-charcoal-400 uppercase tracking-wider text-[11px] border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Skill Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Icon</th>
                  <th className="px-4 py-3.5">Proficiency</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSkills.map((s) => (
                  <tr key={s._id || s.name} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white text-sm">{s.name}</td>
                    <td className="px-4 py-4 text-charcoal-300">{s.category}</td>
                    <td className="px-4 py-4 text-orange-400 font-mono text-xs">{s.icon}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-28 h-2 rounded-full bg-charcoal-800 overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${s.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-charcoal-400">{s.proficiency}%</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white transition-colors"
                          title="Edit skill"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(s._id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-500/20 text-charcoal-300 hover:text-rose-400 transition-colors"
                          title="Delete skill"
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

      {/* Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? "Edit Skill" : "Add Technical Skill"}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ClayInput
            label="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Next.js"
            required
          />

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="clay-input px-4 py-3 text-sm w-full bg-charcoal-900 text-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-charcoal-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Icon Key
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="clay-input px-4 py-3 text-sm w-full bg-charcoal-900 text-white"
            >
              {ICON_OPTIONS.map((ico) => (
                <option key={ico} value={ico} className="bg-charcoal-900 text-white">
                  {ico}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Proficiency Level
              </label>
              <span className="text-xs font-bold text-orange-400">{formData.proficiency}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-2">
            <ClayButton variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ClayButton>
            <ClayButton variant="primary" size="md" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingSkill ? "Update Skill" : "Create Skill"}
            </ClayButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Skill"
        message="Are you sure you want to delete this skill from your portfolio?"
      />
    </div>
  );
}
