import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--c-bg)",
        surface1: "var(--c-surface-1)",
        surface2: "var(--c-surface-2)",
        surface3: "var(--c-surface-3)",
        line: "var(--c-border)",
        ink: {
          DEFAULT: "var(--c-text-1)",
          muted: "var(--c-text-2)",
          faint: "var(--c-text-3)",
        },
        brand: {
          DEFAULT: "var(--c-red)",
          hover: "var(--c-red-hover)",
        },
        positive: "var(--c-green)",
        warning: "var(--c-amber)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        raised: "var(--shadow-raised)",
        glow: "var(--shadow-glow)",
      },
      maxWidth: {
        shell: "1440px",
      },
      zIndex: {
        nav: "var(--z-nav)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontSize: {
        "mono-xs": ["10px", { lineHeight: "1.4" }],
        "mono-sm": ["11px", { lineHeight: "1.4" }],
        "mono-base": ["12px", { lineHeight: "1.5" }],
        "mono-md": ["14px", { lineHeight: "1.5" }],
        "display-sm": ["1.25rem", { lineHeight: "1.2" }],
        "display-md": ["1.5rem", { lineHeight: "1.15" }],
        "display-lg": ["2rem", { lineHeight: "1.1" }],
        "display-xl": ["3rem", { lineHeight: "1" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        radarsweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulsedot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        radarsweep: "radarsweep 10s linear infinite",
        pulsedot: "pulsedot 1.6s ease-in-out infinite",
        fadein: "fadein 0.6s ease",
      },
    },
  },
  plugins: [],
};

export default config;
