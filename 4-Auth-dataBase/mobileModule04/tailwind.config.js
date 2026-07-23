/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,tsx}', './src/**/**/*.{js,ts,tsx}', './src/**/**/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        black: "#111827",
      },
    },
  },
  plugins: [],
};