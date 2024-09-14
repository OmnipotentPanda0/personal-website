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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        ubuntu: ['"Ubuntu"', 'sans-serif'],
      },
      screens: {
        'res': { 'max': '1138px' }, // Custom breakpoint for screens smaller than 1138px
      },
    },
  },
  plugins: [],
};
export default config;
