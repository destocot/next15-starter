import env from '@/env/client'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = env.NEXT_PUBLIC_BASE_URL

  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/profile/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
