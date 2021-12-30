module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: "'Cabin', sans-serif",
        mono: "'Space Mono', monospace",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
