/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: {
      customOrange: "#F78C34",
      hoverOrange: "#F08329"
    },},
  },
  plugins: [],
}

