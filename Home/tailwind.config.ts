import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#000054',
          light: '#1a1a7e',
          dark: '#000038',
        },
        secondary: {
          DEFAULT: '#D4900A',
          light: '#F0B429',
          dark: '#A67308',
        },
        
        // Supporting Colors (keeping for backward compatibility)
        ink: '#0C0C0C',
        canvas: '#F8F5EF',
        parchment: '#EDE9E0',
        forest: '#1A5C38',
        'forest-dark': '#123D26',
        gold: '#D4900A', // Alias for secondary
        'gold-light': '#F0B429', // Alias for secondary-light
        stone: '#6B6660',
        rule: '#C8C3B8',
        gray: {
          300: '#d1d5db',
        },
      },
      fontSize: {
        '2xs': ['0.65rem', { letterSpacing: '0.1em' }],
      },
    },
  },
  plugins: [],
}

export default config
