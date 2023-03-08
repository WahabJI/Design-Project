/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'light_blue':'#3CBAB2',
        'beige': '#FFFFE3',
        'grey': '#F5F5F5',
        'white': '#FFFFFF',
        'black': '#28484F',
        'red': '#FF0000',
        'green': '#00FF00',
        'blue': '#0000FF',
        'dark_grey': '#DEDEDE',
      },
    },
    fontFamily: {},
  },
  plugins: [],
}