import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import lineClamp from "@tailwindcss/line-clamp";

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
        customColor: "#AFAE9E",
      },
      fontFamily: {
  ubuntu: ['"Ubuntu"', 'sans-serif'],
  montserrat: ['"Montserrat"', 'sans-serif'],
  roboto: ['"Roboto"', 'sans-serif'],
      },
      screens: {
        'res': { 'max': '1138px' }, // Custom breakpoint for screens smaller than 1138px
      },
    },
  },
  plugins: [typography, lineClamp],
};
export default config;
