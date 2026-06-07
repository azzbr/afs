import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── "Dawn" brand palette ── */
        brand: {
          50: '#F4F7FE',
          100: '#E8EEFC',
          200: '#C9D7F6',
          300: '#9FB6ED',
          400: '#5E7FDD',
          500: '#2C5CE0', // bright royal (hover / highlight)
          600: '#1A47B8', // primary brand
          700: '#11317A', // deep navy-blue (headers, footer, dark sections)
          800: '#0C2459',
          900: '#081A42',
          DEFAULT: '#1A47B8',
        },
        accent: {
          100: '#FDF1D4',
          200: '#FBE3A8',
          300: '#FAD06A',
          400: '#F8C13C',
          500: '#F7B71D', // sunny yellow (primary accent)
          600: '#E0A412', // deep amber (text-on-light)
          700: '#B5820C',
          DEFAULT: '#F7B71D',
        },
        ink: '#15223B',
        muted: '#5A6B85',
        faint: '#8A97AC',
        line: '#E6EAF1',
        canvas: '#FBFBFD',
        soft: '#F4F6FA',

        /* ── Legacy aliases → remapped to the new palette so any
              untouched reference (e.g. admin) inherits the redesign ── */
        'brand-blue': '#1A47B8',
        'brand-blue-dark': '#11317A',
        'brand-blue-light': '#2C5CE0',
        'brand-gold': '#F7B71D',
        'brand-gold-dark': '#E0A412',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        /* legacy alias — keeps existing `font-playfair` usages on the new face */
        playfair: ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21,34,59,0.04), 0 4px 16px rgba(21,34,59,0.06)',
        'card-hover': '0 8px 30px rgba(21,34,59,0.10)',
        lift: '0 18px 50px rgba(21,34,59,0.14)',
        /* legacy aliases */
        brand: '0 6px 20px rgba(26,71,184,0.18)',
        'brand-lg': '0 10px 30px rgba(26,71,184,0.22)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

export default config
