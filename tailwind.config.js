/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        brand: {
          400: '#00f0ff', // Cyber cyan
          500: '#ff003c', // Cyber magenta
          600: '#fce205', // Cyber yellow
        },
        bg: {
          main: '#050505',
          elevated: 'rgba(10, 10, 12, 0.8)',
        },
        text: {
          main: '#e2e8f0',
          muted: '#94a3b8',
        }
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'cyber-grid': '30px 30px',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-150%) skewX(-25deg)' },
          '100%': { transform: 'translateX(250%) skewX(-25deg)' },
        }
      },
      animation: {
        sweep: 'sweep 1.2s ease-out',
      }
    },
  },
  plugins: [],
}
