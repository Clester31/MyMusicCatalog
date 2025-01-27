import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main_1: "var(--main_1)",
        main_2: "var(--main_2)",
        main_3: "var(--main_3)",
        main_positive: "var(--main_positive)",
        main_positive_hover: "var(--main_positive_hover)",
        main_warning: "var(--main_warning)",
        main_danger: "var(--main_danger)",
      },
    },
  },
  plugins: [],
} satisfies Config;
