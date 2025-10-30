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
      fontFamily: {
        about: ['"NTR"', 'sans-serif'], // custom family
        experience: ['"NTR"', 'sans-serif'],
        skills: ['"NTR"', 'sans-serif'],
        projects: ['"NTR"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.45, transform: 'scale(0.95)' },
          '50%': { opacity: 0.75, transform: 'scale(1.05)' },
        },
        'season-halo': {
          '0%': {
            background:
              'radial-gradient(circle at 40% 40%, rgba(255, 205, 160, 0.45) 0%, rgba(255, 111, 44, 0.18) 35%, rgba(8, 12, 18, 0) 70%)',
          },
          '25%': {
            background:
              'radial-gradient(circle at 50% 38%, rgba(255, 180, 96, 0.55) 0%, rgba(255, 116, 38, 0.25) 45%, rgba(8, 12, 18, 0) 75%)',
          },
          '50%': {
            background:
              'radial-gradient(circle at 60% 40%, rgba(255, 149, 68, 0.5) 0%, rgba(255, 116, 38, 0.28) 45%, rgba(8, 12, 18, 0) 75%)',
          },
          '75%': {
            background:
              'radial-gradient(circle at 45% 42%, rgba(255, 175, 98, 0.35) 0%, rgba(255, 81, 28, 0.2) 40%, rgba(8, 12, 18, 0) 70%)',
          },
          '100%': {
            background:
              'radial-gradient(circle at 40% 44%, rgba(210, 220, 255, 0.28) 0%, rgba(120, 160, 255, 0.18) 38%, rgba(8, 12, 18, 0) 70%)',
          },
        },
        'ground-glow': {
          '0%, 100%': { opacity: 0.55 },
          '25%': { opacity: 0.8 },
          '50%': { opacity: 0.7 },
          '75%': { opacity: 0.6 },
        },
        'trunk-cycle': {
          '0%': { transform: 'scaleY(0.3)', opacity: 0.4 },
          '15%': { transform: 'scaleY(1)', opacity: 1 },
          '25%': { transform: 'scaleY(1.05)', opacity: 1 },
          '50%': { transform: 'scaleY(1)', opacity: 0.95 },
          '75%': { transform: 'scaleY(0.9)', opacity: 0.8 },
          '90%': { transform: 'scaleY(0.6)', opacity: 0.6 },
          '100%': { transform: 'scaleY(0.4)', opacity: 0.45 },
        },
        'branch-cycle': {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '18%': { transform: 'scaleY(1)', opacity: 1 },
          '50%': { transform: 'scaleY(1.05)', opacity: 1 },
          '70%': { transform: 'scaleY(0.92)', opacity: 0.8 },
          '85%': { transform: 'scaleY(0.45)', opacity: 0.35 },
          '100%': { transform: 'scaleY(0)', opacity: 0 },
        },
        'leaf-cycle': {
          '0%': { transform: 'scale(0.4) translateY(-12px)', opacity: 0 },
          '20%': { transform: 'scale(1) translateY(0)', opacity: 1 },
          '45%': { transform: 'scale(1.08) translateY(-4px)', opacity: 1 },
          '60%': { transform: 'scale(1) translateY(0)', opacity: 1 },
          '75%': { transform: 'scale(0.95) translateY(10px)', opacity: 0.7 },
          '88%': { transform: 'scale(0.8) translateY(40px)', opacity: 0 },
          '100%': { transform: 'scale(0.4) translateY(-10px)', opacity: 0 },
        },
        'leaf-fall': {
          '0%': { opacity: 0, transform: 'translate3d(0, -12px, 0) rotate(-8deg) scale(0.85)' },
          '15%': { opacity: 0.85, transform: 'translate3d(-18px, 42px, 0) rotate(-18deg) scale(1)' },
          '35%': { opacity: 1, transform: 'translate3d(14px, 130px, 0) rotate(12deg) scale(0.97)' },
          '55%': { opacity: 0.9, transform: 'translate3d(-12px, 210px, 0) rotate(-14deg) scale(0.93)' },
          '75%': { opacity: 0.7, transform: 'translate3d(10px, 280px, 0) rotate(18deg) scale(0.9)' },
          '100%': { opacity: 0, transform: 'translate3d(-8px, 340px, 0) rotate(-20deg) scale(0.85)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 10s ease-in-out infinite',
        'season-halo': 'season-halo 24s ease-in-out infinite',
        'ground-glow': 'ground-glow 24s ease-in-out infinite',
        'trunk-cycle': 'trunk-cycle 24s ease-in-out infinite',
        'branch-cycle': 'branch-cycle 24s ease-in-out infinite',
        'leaf-cycle': 'leaf-cycle 24s ease-in-out infinite',
        'leaf-fall': 'leaf-fall 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
