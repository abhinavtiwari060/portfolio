"use client";

import React from "react";
import Image from "next/image";
import { Play, Quote } from "lucide-react";
import { ClayCard } from "./ClayCard";

export interface TestimonialData {
  _id?: string;
  name: string;
  profilePhoto?: string;
  designation?: string;
  organization?: string;
  videoUrl?: string;
  thumbnail?: string;
  testimonialText: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  onPlayVideo: (videoUrl: string, name: string, title?: string) => void;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  onPlayVideo,
}) => {
  const thumbnail =
    testimonial.thumbnail ||
    testimonial.profilePhoto ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

  return (
    <ClayCard
      variant="interactive"
      className="flex flex-col h-full overflow-hidden p-0 border border-white/5 hover:border-orange-500/40 group"
    >
      {/* Video Thumbnail with Play Button */}
      <div
        onClick={() => {
          if (testimonial.videoUrl) {
            onPlayVideo(
              testimonial.videoUrl,
              testimonial.name,
              `${testimonial.designation} • ${testimonial.organization}`
            );
          }
        }}
        className="relative w-full h-48 sm:h-52 overflow-hidden rounded-t-[26px] bg-charcoal-900 cursor-pointer"
      >
        <Image
          src={thumbnail}
          alt={testimonial.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-black/20" />

        {/* Play Icon Pill with pulse effect */}
        {testimonial.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:scale-110 group-hover:bg-orange-500 transition-all">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-orange-300/90 font-medium">
          <span>Click to watch testimonial</span>
        </div>
      </div>

      {/* Quote & Author Info */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start gap-3 mb-4">
          <Quote className="w-6 h-6 text-orange-400/50 shrink-0 rotate-180" />
          <p className="text-sm text-charcoal-300 italic leading-relaxed line-clamp-3">
            "{testimonial.testimonialText}"
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
          {testimonial.profilePhoto && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-orange-500/30 shrink-0">
              <Image
                src={testimonial.profilePhoto}
                alt={testimonial.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
              {testimonial.name}
            </h4>
            <p className="text-xs text-charcoal-400">
              {testimonial.designation}
              {testimonial.organization ? ` • ${testimonial.organization}` : ""}
            </p>
          </div>
        </div>
      </div>
    </ClayCard>
  );
};

export default TestimonialCard;
