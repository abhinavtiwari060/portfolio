"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ClayCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "orange" | "interactive";
  glow?: boolean;
}

export const ClayCard: React.FC<ClayCardProps> = ({
  children,
  className = "",
  variant = "default",
  glow = false,
  ...props
}) => {
  let baseVariantStyle = "clay-card";
  if (variant === "orange") {
    baseVariantStyle = "clay-card-orange text-white";
  } else if (variant === "interactive") {
    baseVariantStyle = "clay-card clay-card-hover cursor-pointer";
  }

  const glowStyle = glow ? "shadow-glow-orange border-orange-500/30" : "";

  return (
    <motion.div
      className={`${baseVariantStyle} ${glowStyle} ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ClayCard;
