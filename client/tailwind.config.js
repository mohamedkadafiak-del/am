/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#EC4899',
        danger: '#EF4444',
        safe: '#22C55E',
        background: '#0F172A',
        card: '#1E293B',
        accent: '#F8FAFC',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-blue': 'pulse-blue 2s infinite',
        'ripple': 'ripple 1.5s linear infinite',
      },
      keyframes: {
        'pulse-blue': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8', boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
