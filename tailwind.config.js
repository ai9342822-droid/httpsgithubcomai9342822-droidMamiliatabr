/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843'
        },
        secondary: {
          50: '#fff0f5',
          100: '#ffe1eb',
          200: '#ffc2d7',
          300: '#ffa4c3',
          400: '#ff85af',
          500: '#ff8fab',
          600: '#cc5c89',
          700: '#994567',
          800: '#662e44',
          900: '#331722'
        }
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
        'english': ['Inter', 'Segoe UI', 'sans-serif'],
        'sans': ['Inter', 'Segoe UI', 'sans-serif']
      }
    },
  },
  plugins: [],
};
