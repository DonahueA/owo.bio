/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#DBA6A6',
        'focused-pink': '#ff7f7f',
        'hovered-pink': '#ff7f7f',
        'dark-primary-pink': '#DBA6A6',
        'dark-primary-background': '#161111',
        'white': '#ffffff',
      },
    }
  },
  plugins: [],
}
