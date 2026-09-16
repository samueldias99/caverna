import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        "border-accent": "var(--border-accent)",
        "stone-pill": "var(--stone-pill)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        bronze: "var(--bronze)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
