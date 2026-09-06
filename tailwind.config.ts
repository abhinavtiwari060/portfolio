import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chai: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Core Warm Orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        charcoal: {
          950: "#080a0d", // Darkest background
          900: "#0d0f14", // Base background
          850: "#12151c", // Card background
          800: "#181d26", // Elevated surface
          750: "#202633", // Hover surface
          700: "#2a3243", // Border & subtle line
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
        },
        clay: {
          surface: "#141821",
          surfaceHover: "#181d28",
          highlight: "#ffffff",
          shadow: "#07080c",
        }
      },
      boxShadow: {
        "clay-card": "0 12px 28px -4px rgba(0, 0, 0, 0.65), 0 4px 10px -2px rgba(0, 0, 0, 0.4), inset 1px 1px 2px rgba(255, 255, 255, 0.09), inset -2px -2px 4px rgba(0, 0, 0, 0.55)",
        "clay-card-hover": "0 20px 40px -6px rgba(0, 0, 0, 0.75), 0 8px 16px -4px rgba(249, 115, 22, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 5px rgba(0, 0, 0, 0.6)",
        "clay-orange": "0 10px 24px -2px rgba(249, 115, 22, 0.45), 0 4px 8px -1px rgba(234, 88, 12, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.35), inset -2px -2px 4px rgba(124, 45, 18, 0.6)",
        "clay-orange-hover": "0 16px 32px -2px rgba(249, 115, 22, 0.55), 0 6px 12px -1px rgba(234, 88, 12, 0.4), inset 1px 1px 4px rgba(255, 255, 255, 0.45), inset -2px -2px 5px rgba(124, 45, 18, 0.7)",
        "clay-orange-pressed": "0 2px 6px 0 rgba(249, 115, 22, 0.4), inset 2px 2px 4px rgba(124, 45, 18, 0.6), inset -1px -1px 2px rgba(255, 255, 255, 0.2)",
        "clay-input": "inset 2px 2px 5px rgba(0, 0, 0, 0.7), inset -1px -1px 2px rgba(255, 255, 255, 0.05)",
        "clay-pill": "0 4px 10px rgba(0, 0, 0, 0.4), inset 1px 1px 1px rgba(255, 255, 255, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.4)",
        "glow-orange": "0 0 25px -4px rgba(249, 115, 22, 0.35)",
      },
      borderRadius: {
        "2.5xl": "20px",
        "3.5xl": "28px",
        "4xl": "32px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "float-fast": "float 5s ease-in-out 1s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
