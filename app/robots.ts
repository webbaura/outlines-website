import { MetadataRoute } from 'next';

const BASE = 'https://outlines.com.au';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
