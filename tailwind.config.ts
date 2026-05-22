import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          base:     "var(--bg-base)",
          surface:  "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          border:   "var(--border-base)",
          primary:  "var(--text-primary)",
          body:     "var(--text-body)",
          muted:    "var(--text-muted)",
          accent:   "var(--accent-blue)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
