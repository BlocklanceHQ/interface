import type { Config } from 'tailwindcss'

export default {
  content: ['./{app,components}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Lexend\\ Deca\\ Variable', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#EBE8FC',
          100: '#D7D1FA',
          200: '#C2BAF7',
          300: '#9A8CF2',
          400: '#8675F0',
          500: '#725FED',
          600: '#4931E8',
          700: '#351AE5',
        }
      }
    },
  },
  plugins: [],
} satisfies Config
