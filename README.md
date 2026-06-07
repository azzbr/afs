# Al Fajer Private School Website

## Project Overview

A modern, bilingual (English/Arabic) informational website for Al Fajer Private School in Bahrain, designed to showcase the school's programs, values, and community while providing a foundation for future e-learning and parent portal modules.

### School Information

**Name:** Al Fajer Private School  
**Tagline:** Learning extends beyond walls  
**Location:** Budaiya Highway, Barbar, Bahrain  
**Founded:** 2013  
**Students:** 350+  
**Type:** Non-profit, coeducational  
**Grades:** Kindergarten to Grade 5  
**Contact:** +973 17550011 | contact@afs.edu.bh  

### Educational Programs

- **Dual Curriculum:** American + Bahrain Ministry of Education
- **Languages:** Arabic, English, French (Trilingual)
- **Assessment:** Renaissance STAR 360 (Reading, Early Literacy & Math)
- **KG1 Entry Age:** 2 years 9 months, diaper free

### Brand Identity ("Dawn" design system)

"Al Fajer" means *the dawn* — the redesign uses a refined sunrise concept: a confident
blue anchored by a warm yellow accent, warm neutrals, and restrained motion.

- **Primary (blue):** `#1A47B8` brand · `#11317A` deep navy · `#2C5CE0` highlight
- **Accent (yellow):** `#F7B71D` sunny · `#E0A412` deep amber (used sparingly)
- **Neutrals:** canvas `#FBFBFD` · ink `#15223B` · muted `#5A6B85` · hairline `#E6EAF1`
- **Typography:** Poppins (Latin display headings) + Cairo (body & all Arabic)
- **Tokens:** defined in `tailwind.config.ts` and `src/app/globals.css`
- **Imagery:** photo-ready via `MediaPlaceholder` — drop real images into `src` later

## Tech Stack

### Phase 1: Informational Website
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS-in-JS
- **i18n:** next-intl for bilingual support
- **Deployment:** Vercel (recommended) or Netlify

### Phase 2+: Future Modules
- **Backend:** Next.js API Routes / Node.js + Express
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **CMS:** Sanity or Contentful (for content management)

## Project Structure

```
afs/
├── public/                 # Static assets
│   ├── images/            # School images, gallery
│   ├── logo/              # School logo variations
│   └── favicon.ico
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout with i18n
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About school page
│   │   ├── admissions/    # Admissions information
│   │   ├── academics/     # Academic programs
│   │   ├── gallery/       # Photo/video gallery
│   │   ├── news/          # News & announcements
│   │   ├── events/        # Events calendar
│   │   ├── contact/       # Contact page
│   │   └── faqs/          # Frequently asked questions
│   ├── components/        # Reusable components
│   │   ├── Header/        # Navigation with language switcher
│   │   ├── Footer/        # Site footer
│   │   ├── Hero/          # Hero sections
│   │   ├── Stats/         # School statistics
│   │   ├── Gallery/       # Image galleries
│   │   └── LanguageSwitcher/ # RTL/LTR toggle
│   ├── lib/               # Utilities and helpers
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── content/               # Markdown content (optional)
├── locales/               # i18n translation files
│   ├── en/                # English translations
│   └── ar/                # Arabic translations
└── package.json
```

## Features

### Core Features (Phase 1)
- [ ] Bilingual support (English/Arabic) with RTL/LTR switching
- [ ] Responsive design for all devices
- [ ] School information pages
- [ ] Photo/video gallery
- [ ] News and announcements
- [ ] Events calendar
- [ ] Contact information and forms
- [ ] Admissions information
- [ ] Staff directory

### Future Modules (Phase 2+)
- [ ] Online registration system
- [ ] Student e-learning platform
- [ ] Parent portal
- [ ] Teacher dashboards
- [ ] Exam results system
- [ ] Fee payment integration
- [ ] Content management system

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd afs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your page content
3. Add translations to `locales/en/` and `locales/ar/`
4. Update navigation in `components/Header/`

### Adding Translations

1. Add new keys to `locales/en/common.json`
2. Add corresponding translations to `locales/ar/common.json`
3. Use the `useTranslations()` hook in components

### Adding Images

1. Place images in `public/images/`
2. Use Next.js Image component for optimization
3. Add alt text for accessibility

## Design System

### Typography
- **Display (headings, Latin):** Poppins — warm, geometric, professional
- **Body & Arabic:** Cairo — strong Arabic support, clean Latin
- **Headings** use the display font in LTR and Cairo in RTL (Arabic)

### Color Palette
- **Brand blue:** `#1A47B8` (primary) · `#11317A` (deep navy) · `#2C5CE0` (highlight) · `#E8EEFC` (tint)
- **Accent yellow:** `#F7B71D` (sunny) · `#E0A412` (deep amber) · `#FDF1D4` (soft tint)
- **Text:** `#15223B` (ink) · `#5A6B85` (muted) · `#8A97AC` (faint)
- **Surfaces:** `#FBFBFD` (canvas) · `#FFFFFF` (cards) · `#F4F6FA` (alt sections) · `#E6EAF1` (hairline)

### Components
- **Buttons:** `.btn-primary` / `.btn-secondary` / `.btn-outline` / `.btn-ghost`
- **`MediaPlaceholder`:** photo-ready image slots (pass `src` to swap in real photos)
- **`Logo` / `SectionHeading` / `PageHero`:** shared building blocks for consistent pages
- **Motion:** restrained — scroll-reveal (`data-reveal` + `useScrollReveal`) and gentle hover only

## Content Strategy

### Required Content
- [ ] School mission and vision statements
- [ ] Principal's welcome message
- [ ] School history and achievements
- [ ] Academic program descriptions
- [ ] Staff biographies
- [ ] Photo gallery content
- [ ] News and event content
- [ ] Admissions requirements and process

### Content Guidelines
- Use clear, accessible language
- Maintain consistent tone (traditional & formal)
- Ensure all content is available in both languages
- Optimize images for web performance
- Follow accessibility guidelines (WCAG 2.1)

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Recommended Hosting
- **Vercel:** Automatic deployments from Git
- **Netlify:** Alternative with similar features
- **Custom Server:** Node.js server for self-hosting

### Environment Variables
- `NEXT_PUBLIC_SITE_URL`: Production URL
- `NEXT_PUBLIC_API_URL`: API endpoint (for future phases)
- `GOOGLE_ANALYTICS_ID`: Analytics tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For support and questions:
- Email: contact@afs.edu.bh
- Phone: +973 17550011
- Website: [afs.edu.bh](https://afs.edu.bh)

---

**Note:** This README will be updated as the project progresses through its phases.