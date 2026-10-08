/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F6F1EA",
        secondary: "#716861",
        tertiary: "#EEE6DC",
        "black-100": "#FFFDF9",
        "black-200": "#EEE6DC",
        "white-100": "#272321",
      },
      boxShadow: {
        card: "0px 28px 80px -20px rgba(91,70,53,.18)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
