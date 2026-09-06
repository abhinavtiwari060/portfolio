"use client";

import React from "react";
import { motion } from "framer-motion";
import ClayBadge from "./ClayBadge";

interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  subtitle,
  centered = true,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {badgeText && (
        <ClayBadge variant="orange" size="md" className="mb-4 tracking-wide uppercase">
          {badgeText}
        </ClayBadge>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-charcoal-300 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
