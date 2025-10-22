/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080c12',
        accent: '#ff7426',
        accentGlow: '#ff9a3c',
      },
      boxShadow: {
        glow: '0 0 35px rgba(255, 138, 58, 0.35)',
      },
      backgroundImage: {
        'grid-radial':
          'radial-gradient(circle at center, rgba(255, 116, 38, 0.12) 0%, rgba(8, 12, 18, 0.75) 55%, rgba(8, 12, 18, 1) 100%)',
      },
    },
  },
  plugins: [],
}
