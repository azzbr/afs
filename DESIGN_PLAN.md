# Al Fajer Private School - Master Design Plan

## Project Overview

This document serves as the comprehensive design blueprint for Al Fajer Private School's website development project. It includes technical specifications, design system, content strategy, and implementation roadmap.

## 1. Brand Identity & Visual Design

### 1.1 Brand Colors
- **Primary Blue:** #0028FF (Royal Blue) - Used for headers, primary buttons, accents
- **Accent Gold:** #FFD700 (Gold) - Used for highlights, secondary elements, hover states
- **Neutral Palette:**
  - Text Dark: #333333
  - Text Medium: #666666
  - Text Light: #999999
  - Background: #FFFFFF
  - Secondary Background: #F8F9FA
  - Borders: #E5E7EB

### 1.2 Typography System

**Font Selection Needed** - Please choose from these options:

#### English Font Options:
1. **Playfair Display** - Elegant, traditional serif (formal feel)
2. **Merriweather** - Highly readable serif (classic)
3. **Lora** - Beautiful serif with excellent readability
4. **Raleway** - Clean, modern sans-serif (contemporary)

#### Arabic Font Options:
1. **Cairo** - Modern, clean Arabic font
2. **Tajawal** - Google Fonts Arabic, highly readable
3. **Noto Naskh Arabic** - Traditional Arabic script
4. **Amiri** - Classic Arabic typography (formal)

**Recommended Pairing:** Playfair Display (English) + Cairo (Arabic) for traditional & formal feel

### 1.3 Logo Usage
- Primary logo: Full color version for headers
- Secondary logo: Simplified version for favicon and small spaces
- Clear space: Minimum padding around logo equal to height of "A"
- Background: Use on white or light backgrounds only

## 2. Technical Architecture

### 2.1 Framework Decision

**Recommended: Next.js 14+ with App Router**

**Why Next.js:**
- Excellent i18n support with next-intl
- Built-in RTL/LTR switching capabilities
- Server-side rendering for SEO
- Scalable from informational site to full platform
- Strong TypeScript support
- Vercel deployment (recommended)

**Alternative: Pure HTML/CSS/JS**
- Simpler for Phase 1 only
- Harder to scale to future phases
- Limited i18n capabilities

### 2.2 File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with i18n provider
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx        # About school
│   ├── admissions/
│   │   └── page.tsx        # Admissions info
│   ├── academics/
│   │   └── page.tsx        # Academic programs
│   ├── gallery/
│   │   └── page.tsx        # Photo gallery
│   ├── news/
│   │   └── page.tsx        # News & announcements
│   ├── events/
│   │   └── page.tsx        # Events calendar
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── faqs/
│       └── page.tsx        # FAQ section
├── components/
│   ├── Header/
│   │   ├── Navigation.tsx  # Main navigation
│   │   └── LanguageSwitcher.tsx # EN/AR toggle
│   ├── Footer/
│   │   ├── Footer.tsx      # Main footer
│   │   └── SocialLinks.tsx # Social media icons
│   ├── UI/
│   │   ├── Button.tsx      # Primary/secondary buttons
│   │   ├── Card.tsx        # Content cards
│   │   ├── StatCard.tsx    # Statistics display
│   │   └── FormField.tsx   # Form inputs
│   ├── Layout/
│   │   ├── Container.tsx   # Page containers
│   │   └── Section.tsx     # Content sections
│   └── Pages/
│       ├── Hero.tsx        # Hero sections
│       ├── Gallery.tsx     # Image galleries
│       └── Testimonials.tsx # Student/parent quotes
├── lib/
│   ├── i18n.ts             # Translation utilities
│   ├── api.ts              # API helpers (future)
│   └── utils.ts            # General utilities
├── styles/
│   ├── globals.css         # Global styles
│   ├── components.css      # Component styles
│   └── responsive.css      # Media queries
└── types/
    └── index.ts            # TypeScript interfaces
```

### 2.3 i18n Strategy

**Implementation:**
- Use `next-intl` for comprehensive i18n support
- JSON-based translation files in `locales/en/` and `locales/ar/`
- Automatic RTL/LTR switching based on language
- URL structure: `/en/page` and `/ar/page`

**Translation Files Structure:**
```
locales/
├── en/
│   ├── common.json         # Navigation, buttons, common text
│   ├── home.json           # Home page specific content
│   ├── about.json          # About page content
│   └── forms.json          # Form labels and validation
└── ar/
    ├── common.json
    ├── home.json
    ├── about.json
    └── forms.json
```

## 3. Page Architecture

### 3.1 Homepage Structure

```
Header (Navigation + Language Switcher)
├── Hero Section
│   ├── School name and tagline
│   ├── Hero image/video
│   └── Call-to-action buttons
├── Statistics Section
│   ├── Student count
│   ├── Year founded
│   ├── Grades offered
│   └── Languages taught
├── Principal Welcome
│   ├── Photo
│   ├── Welcome message
│   └── Link to full message
├── Core Values
│   ├── Value cards with icons
│   └── Brief descriptions
├── Academic Programs
│   ├── Program highlights
│   ├── Curriculum info
│   └── Link to full programs
├── News & Events Preview
│   ├── Latest news items
│   ├── Upcoming events
│   └── Links to full sections
├── Photo Gallery Preview
│   ├── Image grid
│   └── Link to full gallery
├── Admissions CTA
│   ├── Quick info
│   └── Registration link
└── Footer
    ├── Contact info
    ├── Quick links
    ├── Social media
    └── Copyright
```

### 3.2 Inner Page Structure

**Standard Layout:**
```
Header
├── Page Header
│   ├── Page title
│   ├── Breadcrumb navigation
│   └── Page-specific hero image
├── Main Content
│   ├── Primary content area
│   └── Sidebar (optional)
└── Footer
```

## 4. Content Requirements

### 4.1 Text Content Needed

**From School:**
1. **Mission Statement** (exact wording from website)
2. **Vision Statement** (exact wording from website)
3. **Principal's Name and Welcome Message**
4. **School History** (founding story, key milestones)
5. **Academic Program Descriptions**
6. **Staff Directory** (names, positions, photos if available)
7. **Admissions Process** (detailed steps, requirements)
8. **Contact Information** (exact details)

**To Be Created:**
1. **Homepage Hero Text** (compelling introduction)
2. **Value Statements** (3-5 core values with descriptions)
3. **Program Highlights** (key features of each program)
4. **Gallery Captions** (descriptions for photos/videos)
5. **FAQ Content** (common parent questions)

### 4.2 Visual Content Needed

**Images Required:**
1. **Hero Images** (school building, students learning, campus)
2. **Principal Photo** (professional headshot)
3. **Classroom Photos** (students engaged in learning)
4. **Extracurricular Photos** (sports, arts, activities)
5. **Campus Photos** (facilities, playground, library)
6. **Event Photos** (past events, ceremonies)
7. **Staff Photos** (professional photos for directory)

**Logo Assets:**
1. **Primary Logo** (full color, PNG/SVG)
2. **Secondary Logo** (simplified version)
3. **Favicon** (16x16, 32x32, 48x48)
4. **Social Media Icons** (for various platforms)

## 5. Development Phases

### Phase 1: Informational Website (Weeks 1-4)
**Timeline:** 4 weeks
**Focus:** Static content presentation

**Week 1: Setup & Foundation**
- Project initialization
- Design system setup
- Basic page structure
- Navigation implementation

**Week 2: Core Pages**
- Homepage development
- About page
- Admissions page
- Contact page

**Week 3: Content Pages**
- Academic programs page
- Gallery page
- News/events page
- FAQ page

**Week 4: Polish & Launch**
- Responsive testing
- Performance optimization
- Content population
- Launch preparation

**Deliverables:**
- Fully functional bilingual website
- All core pages complete
- Basic SEO implementation
- Mobile-responsive design

### Phase 2: Online Registration (Weeks 5-8)
**Timeline:** 4 weeks
**Focus:** Interactive forms and data collection

**Features:**
- Online registration forms
- Document upload functionality
- Form validation
- Admin dashboard for applications
- Email notifications

### Phase 3: E-Learning Platform (Weeks 9-16)
**Timeline:** 8 weeks
**Focus:** Student learning management

**Features:**
- Student login system
- Course content management
- Assignment submission
- Progress tracking
- Teacher content upload

### Phase 4: Parent Portal (Weeks 17-24)
**Timeline:** 8 weeks
**Focus:** Parent engagement and communication

**Features:**
- Parent login system
- Student progress viewing
- Fee payment integration
- Communication tools
- Event registration

## 6. Technical Specifications

### 6.1 Performance Requirements
- **Page Load Time:** Under 3 seconds
- **Mobile Performance:** Lighthouse score 90+
- **Image Optimization:** WebP format with fallbacks
- **Code Splitting:** Component-level loading
- **Caching:** Strategic caching for static content

### 6.2 Accessibility Standards
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation** support
- **Screen Reader** compatibility
- **Color Contrast** ratios checked
- **Alt Text** for all images
- **ARIA Labels** for interactive elements

### 6.3 SEO Implementation
- **Meta Tags** for all pages
- **Structured Data** for school information
- **Sitemap** generation
- **Robots.txt** configuration
- **Open Graph** tags for social sharing
- **Canonical URLs** to prevent duplicate content

## 7. Content Management Strategy

### 7.1 Phase 1: Static Content
- Content directly in code
- Manual updates required
- Simple but limited flexibility

### 7.2 Phase 2+: CMS Integration
**Recommended: Sanity.io**
- Headless CMS with excellent Next.js integration
- Real-time collaborative editing
- Custom content types
- Media asset management
- Version control and preview

**Alternative: Contentful**
- Enterprise-grade CMS
- Strong API performance
- Extensive plugin ecosystem
- Advanced content modeling

## 8. Testing Strategy

### 8.1 Browser Compatibility
- **Chrome:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Edge:** Latest 2 versions
- **Mobile:** iOS Safari, Android Chrome

### 8.2 Testing Types
- **Unit Testing:** Component functionality
- **Integration Testing:** Page interactions
- **E2E Testing:** User workflows
- **Accessibility Testing:** WCAG compliance
- **Performance Testing:** Load times and optimization
- **Cross-browser Testing:** Consistency across browsers

## 9. Deployment & Maintenance

### 9.1 Deployment Strategy
**Recommended: Vercel**
- Automatic deployments from Git
- Preview deployments for testing
- Global CDN for performance
- Built-in SSL certificates
- Easy rollback capabilities

**Alternative: Netlify**
- Similar features to Vercel
- Form handling capabilities
- Build plugins ecosystem
- A/B testing support

### 9.2 Maintenance Plan
- **Weekly:** Content updates, performance monitoring
- **Monthly:** Security updates, backup verification
- **Quarterly:** Performance audits, feature reviews
- **Annually:** Major updates, technology stack review

## 10. Success Metrics

### 10.1 Technical Metrics
- **Page Load Speed:** < 3 seconds
- **Mobile Performance:** Lighthouse 90+
- **Uptime:** 99.9% availability
- **SEO Score:** Top 10 rankings for key terms

### 10.2 User Experience Metrics
- **Bounce Rate:** < 40%
- **Time on Site:** > 3 minutes
- **Conversion Rate:** > 5% for contact forms
- **Mobile Usage:** > 60% of traffic

### 10.3 Business Metrics
- **Inquiry Volume:** Increase in admissions inquiries
- **Parent Engagement:** Portal adoption rate
- **Student Success:** Platform usage metrics
- **Brand Awareness:** Social media growth

---

**Next Steps:**
1. Confirm font preferences
2. Provide logo assets
3. Supply required content (mission, vision, principal info)
4. Approve technical stack decision
5. Set project timeline and milestones