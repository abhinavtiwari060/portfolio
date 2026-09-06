"use client";

import React, { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle, Clock, Search, MessageSquare } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/ToastNotification";
import { LoadingState, EmptyState } from "@/components/ui/FeedbackStates";

export default function AdminMessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch {
      showToast("Error fetching messages.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (msg: any) => {
    try {
      const res = await fetch(`/api/admin/messages/${msg._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !msg.read }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(msg.read ? "Marked as unread." : "Marked as read.", "info");
        fetchMessages();
        if (selectedMessage && selectedMessage._id === msg._id) {
          setSelectedMessage({ ...selectedMessage, read: !msg.read });
        }
      }
    } catch {
      showToast("Error updating message status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const res = await fetch(`/api/admin/messages/${deleteConfirmId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Message deleted successfully.", "info");
        setDeleteConfirmId(null);
        if (selectedMessage && selectedMessage._id === deleteConfirmId) {
          setSelectedMessage(null);
        }
        fetchMessages();
      } else {
        showToast("Failed to delete message.", "error");
      }
    } catch {
      showToast("Error deleting message.", "error");
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Contact Inquiries</h2>
        <p className="text-xs text-charcoal-400">
          Review incoming submissions from recruiters, clients, and technical peers.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          placeholder="Search by name, email or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="clay-input pl-11 pr-4 py-2.5 text-xs w-full"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading contact inquiries..." />
      ) : filteredMessages.length === 0 ? (
        <EmptyState
          title="No contact messages yet"
          description="Inquiries sent through the 'Have an idea? Let's build it.' form will appear here."
        />
      ) : (
        <ClayCard className="overflow-hidden p-0 border border-white/5 bg-charcoal-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-850 text-charcoal-400 uppercase tracking-wider text-[11px] border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Message Snippet</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMessages.map((m) => (
                  <tr
                    key={m._id}
                    onClick={() => {
                      setSelectedMessage(m);
                      if (!m.read) toggleReadStatus(m);
                    }}
                    className={`cursor-pointer transition-colors ${
                      m.read ? "hover:bg-charcoal-850/50" : "bg-orange-500/5 hover:bg-orange-500/10 font-medium"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm">{m.name}</div>
                      <div className="text-[11px] text-charcoal-400">{m.email}</div>
                    </td>

                    <td className="px-4 py-4 max-w-xs truncate text-charcoal-300">
                      {m.message}
                    </td>

                    <td className="px-4 py-4 text-charcoal-400">
                      {new Date(m.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          m.read ? "text-charcoal-400" : "text-orange-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            m.read ? "bg-charcoal-500" : "bg-orange-500"
                          }`}
                        />
                        {m.read ? "Read" : "Unread"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleReadStatus(m)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white"
                          title={m.read ? "Mark as unread" : "Mark as read"}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(m._id)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-500/20 text-charcoal-300 hover:text-rose-400"
                          title="Delete message"
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

      {/* Message Reader Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title="Inbound Message Details"
          maxWidth="md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h4 className="text-base font-bold text-white">{selectedMessage.name}</h4>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-orange-400 hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <span className="text-xs text-charcoal-400">
                {new Date(selectedMessage.createdAt || Date.now()).toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal-850 text-xs sm:text-sm text-charcoal-200 leading-relaxed whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re:%20Portfolio%20Inquiry`}
                className="clay-button-primary px-4 py-2 text-xs"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setDeleteConfirmId(selectedMessage._id)}
                className="text-xs text-rose-400 hover:underline"
              >
                Delete Message
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to delete this contact message?"
      />
    </div>
  );
}
