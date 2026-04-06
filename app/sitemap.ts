import { MetadataRoute } from 'next';

const BASE = 'https://outlines.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,               lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/vision`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/events`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ];
}
