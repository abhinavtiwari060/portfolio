"use client";

import React, { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard, { TestimonialData } from "../ui/TestimonialCard";
import VideoModal from "../ui/VideoModal";

interface TestimonialsSectionProps {
  testimonials: TestimonialData[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    speakerName: string;
    title?: string;
  } | null>(null);

  const handlePlayVideo = (videoUrl: string, name: string, title?: string) => {
    setSelectedVideo({ url: videoUrl, speakerName: name, title });
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Video Testimonials"
          title="Kind Words from Peers & Mentors"
          subtitle="Real peer feedback and collaborative experiences from fellow engineers, teammates, and project partners."
        />

        {/* Video Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((item, idx) => (
            <TestimonialCard
              key={item._id || idx}
              testimonial={item}
              onPlayVideo={handlePlayVideo}
            />
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          speakerName={selectedVideo.speakerName}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
};

export default TestimonialsSection;
