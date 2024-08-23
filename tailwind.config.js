/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: '#efefe9',
        dark: '#2b3034',
        errorText: '#226388',
        errorButton: '#fe6d12',
      },
    },
  },
  plugins: [],
};
