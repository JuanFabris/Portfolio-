/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 1s infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}