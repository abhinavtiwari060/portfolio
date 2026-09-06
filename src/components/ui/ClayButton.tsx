"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ClayButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export const ClayButton: React.FC<ClayButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-medium gap-1.5",
    md: "px-6 py-3 text-sm font-semibold gap-2",
    lg: "px-8 py-4 text-base font-semibold gap-2.5",
  };

  const variantClasses = {
    primary: "clay-button-primary",
    secondary: "clay-button-secondary",
    danger:
      "bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-lg border border-red-400/30 rounded-full hover:brightness-110 active:scale-95",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center transition-all select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default ClayButton;
