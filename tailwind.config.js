/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          jokko: '#E85D04',
          light: '#FF8534',
          dark: '#C44D00',
          bg: '#FFF7EE',
          bg2: '#FFE8D0',
        },
        violet: {
          jokko: '#6B4C9A',
          light: '#8B6FBF',
        },
        navy: '#1E2A3A',
        dark: '#0D0D0D',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        jokko: '16px',
      },
    },
  },
  plugins: [],
}
