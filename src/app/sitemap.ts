import env from '@/env/client'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = env.NEXT_PUBLIC_BASE_URL

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
    },
  ]
}
