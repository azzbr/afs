import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://afs.edu.bh'
  const now = new Date()

  const routes = [
    { url: '/',           priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: '/about',      priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: '/academics',  priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: '/admissions', priority: 0.9,  changeFrequency: 'weekly'  as const },
    { url: '/apply',      priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/fees',       priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: '/parents',    priority: 0.7,  changeFrequency: 'weekly'  as const },
    { url: '/calendar',   priority: 0.7,  changeFrequency: 'weekly'  as const },
    { url: '/news',       priority: 0.6,  changeFrequency: 'weekly'  as const },
    { url: '/gallery',    priority: 0.5,  changeFrequency: 'monthly' as const },
    { url: '/staff',      priority: 0.6,  changeFrequency: 'monthly' as const },
    { url: '/contact',    priority: 0.8,  changeFrequency: 'monthly' as const },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
