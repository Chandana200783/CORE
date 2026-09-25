/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rovera-bg': '#0a0e14',
        'rovera-panel': '#111821',
      },
      fontFamily: {
        mono: ['SF Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
