import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080808',
        surface: '#111111',
        elevated: '#1A1818',
        wine: {
          DEFAULT: '#8B1A1A',
          hover: '#9E2020',
          muted: '#5A1010',
        },
        gold: {
          DEFAULT: '#C9A060',
          light: '#DDB878',
          dark: '#A07840',
          muted: '#7A5C30',
        },
        cream: '#F0EDE8',
        stone: '#9E9890',
        mist: '#6A6460',
        border: {
          DEFAULT: '#282420',
          subtle: '#1E1C1A',
          gold: 'rgba(201,160,96,0.3)',
          wine: 'rgba(139,26,26,0.4)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['var(--font-noto)', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.2em',
        ultrawide: '0.3em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C9A060 0%, #DDB878 50%, #A07840 100%)',
        'gradient-dark': 'linear-gradient(180deg, #080808 0%, #111111 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.2s forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};

export default config;
