import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#151b70',
          light: '#1f2899',
          dark: '#0a0e3a',
        },
        secondary: {
          DEFAULT: '#2b7ce6',
          light: '#4d95f0',
          dark: '#1a5bb8',
        },
        accent: {
          DEFAULT: '#e60043',
          light: '#ff1a5c',
          dark: '#b30035',
        },
        neon: {
          DEFAULT: '#6BBE45',
          light: '#8FD668',
          dark: '#4F9030',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
