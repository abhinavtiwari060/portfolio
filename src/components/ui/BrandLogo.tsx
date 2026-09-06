import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  showSubtitle?: boolean;
  className?: string;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showSubtitle = true,
  className = "",
  href = "/",
}) => {
  return (
    <Link href={href} className={`group flex items-center gap-2.5 focus:outline-none select-none ${className}`}>
      {/* Minimal clean clay monogram mark */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-base tracking-tight shadow-clay-pill border border-orange-400/40 group-hover:scale-105 transition-transform duration-300">
        <span className="font-mono tracking-tighter">A</span>
      </div>

      <div className="flex flex-col text-left">
        <span className="font-bold text-base tracking-tight text-white group-hover:text-orange-400 transition-colors">
          Abhinav Tiwari
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-semibold text-orange-400 tracking-wider uppercase">
            Full Stack Dev
          </span>
        )}
      </div>
    </Link>
  );
};

export default BrandLogo;
