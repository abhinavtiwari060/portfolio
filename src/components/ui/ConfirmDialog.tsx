"use client";

import React from "react";
import Modal from "./Modal";
import ClayButton from "./ClayButton";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-charcoal-300 leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <ClayButton variant="secondary" size="sm" onClick={onClose} disabled={loading}>
            {cancelText}
          </ClayButton>
          <ClayButton variant="danger" size="sm" onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : confirmText}
          </ClayButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
