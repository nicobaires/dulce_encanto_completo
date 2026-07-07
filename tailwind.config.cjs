/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,svelte}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FFF5F8',
          100: '#FFE8F0',
          200: '#FFC9DD',
          300: '#F5A9C9',
          400: '#E8A9B8',
          500: '#E8A9B8',
          600: '#D48C9F',
          700: '#C97A8F',
          800: '#B8687F',
          900: '#A7566F',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
        md: '0 4px 16px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
