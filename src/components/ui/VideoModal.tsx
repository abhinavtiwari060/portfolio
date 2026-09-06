"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  speakerName?: string;
}

function getEmbedUrl(url: string): { type: "youtube" | "vimeo" | "video"; embedUrl: string } {
  if (!url) return { type: "video", embedUrl: "" };

  // YouTube
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  return { type: "video", embedUrl: url };
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  speakerName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const { type, embedUrl } = getEmbedUrl(videoUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Player Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-charcoal-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-charcoal-850">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {speakerName ? `Video Testimonial • ${speakerName}` : "Video Testimonial"}
                </h3>
                {title && <p className="text-xs text-charcoal-400">{title}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close video player"
                className="p-2 rounded-full text-charcoal-400 hover:text-white hover:bg-charcoal-750 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {type === "youtube" || type === "vimeo" ? (
                <iframe
                  src={embedUrl}
                  title="Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : embedUrl ? (
                <video src={embedUrl} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <div className="text-charcoal-400 text-sm">No video source provided</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
