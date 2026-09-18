import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-light': '#F8FAFC',
        'background-dark': '#0B0F17',
        'surface-light': '#FFFFFF',
        'surface-dark': 'rgba(30, 41, 59, 0.8)',
        'text-light': '#0F172A',
        'text-dark': '#F8FAFC',
        'accent-primary': '#6366F1',
        'accent-secondary': '#38BDF8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
