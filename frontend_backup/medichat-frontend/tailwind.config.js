/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-red': '#E53E3E',
        'medical-gray': '#F7FAFC',
      }
    },
  },
  plugins: [],
}
