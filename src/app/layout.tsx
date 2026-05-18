import type { Metadata } from 'next'
import { Playfair_Display, Cairo } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress'
import FloatingCTA from '@/components/FloatingCTA/FloatingCTA'
import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner'
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'Al Fajer Private School | American Education in Bahrain',
    template: '%s | Al Fajer Private School',
  },
  description:
    'Al Fajer Private School (AFS) is a non-profit, coeducational institution in Barbar, Bahrain, offering a bilingual American and MOE curriculum from Kindergarten to Grade 5. Trilingual education in Arabic, English & French.',
  keywords: [
    'Al Fajer Private School',
    'AFS Bahrain',
    'American curriculum school Bahrain',
    'bilingual school Bahrain',
    'international school Barbar',
    'elementary school Bahrain',
    'مدرسة الفجر الخاصة',
    'مدرسة البحرين',
  ],
  authors: [{ name: 'Al Fajer Private School' }],
  creator: 'Al Fajer Private School',
  publisher: 'Al Fajer Private School',
  metadataBase: new URL('https://afs.edu.bh'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_BH',
    url: 'https://afs.edu.bh',
    siteName: 'Al Fajer Private School',
    title: 'Al Fajer Private School | American Education in Bahrain',
    description:
      'Bilingual American & MOE curriculum school in Barbar, Bahrain. KG to Grade 5. Trilingual education in Arabic, English & French.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Al Fajer Private School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Fajer Private School',
    description: 'Bilingual American & MOE curriculum school in Barbar, Bahrain.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={`${playfair.variable} ${cairo.variable}`}>
      <body className="antialiased">
        <AnnouncementBanner />
        <ScrollProgress />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FloatingCTA />
      </body>
    </html>
  )
}