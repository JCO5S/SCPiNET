/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00ff00',
          yellow: '#ffb627',
        }
      }
    },
  },
  plugins: [],
}