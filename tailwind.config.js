/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary: '#141414',
        card: '#1a1a1a',
        accent: {
          gold: '#d4af37',
          goldDark: '#B8860B',
          rose: '#e8b4b8',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #c9a961 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
      }
    },
  },
  plugins: [],
}
