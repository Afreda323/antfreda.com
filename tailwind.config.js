module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: "'Cabin', sans-serif",
        serif: "'Playfair Display', serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
