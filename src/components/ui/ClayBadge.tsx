import React from "react";

interface ClayBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "neutral" | "success";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const ClayBadge: React.FC<ClayBadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon,
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs font-medium gap-1",
    md: "px-3.5 py-1 text-xs font-semibold gap-1.5",
  };

  const variantClasses = {
    default: "clay-badge text-charcoal-200",
    orange: "clay-badge-orange",
    neutral: "bg-charcoal-800/80 border border-charcoal-700/60 text-charcoal-300",
    success:
      "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1)]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center select-none rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default ClayBadge;
