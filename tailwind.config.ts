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
        'brand-blue': '#0028ff',
        'brand-blue-dark': '#0020cc',
        'brand-blue-light': '#3355ff',
        'brand-gold': '#ffd700',
        'brand-gold-dark': '#e6c200',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        cairo: ['var(--font-cairo)', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 4px 14px rgba(0, 40, 255, 0.3)',
        'brand-lg': '0 8px 24px rgba(0, 40, 255, 0.35)',
        'gold-lg': '0 8px 24px rgba(255, 215, 0, 0.35)',
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config