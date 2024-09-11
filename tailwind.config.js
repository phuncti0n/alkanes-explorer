/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter Variable", "sans-serif"],
      mono: ["Geist Mono", "monospaced"],
    },
    screens: {
      sm: "440px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    backgroundImage: {
      "gradient-1": `var(--gradient-1)`,
      "gradient-2": `var(--gradient-2)`,
      "gradient-3": `var(--gradient-3)`,
      "gradient-4": `var(--gradient-4)`,
      "gradient-5": `var(--gradient-5)`,
    },
    extend: {},
  },
  plugins: [],
};
