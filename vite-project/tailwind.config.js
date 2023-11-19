module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#050505", 
        secondary: "#65676b",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
