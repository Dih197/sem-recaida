import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6366f1",
          secondary: "#ec4899",
          bg: "#0f0f1a",
          surface: "#1a1a2e",
          "surface-light": "#252542",
          emergency: "#dc2626",
          tarot: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
