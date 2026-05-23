const SITE_URL = 'https://daomarketing.com';

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { 'en-AE': SITE_URL, en: SITE_URL } },
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
      alternates: { languages: { 'en-AE': `${SITE_URL}/services`, en: `${SITE_URL}/services` } },
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: { languages: { 'en-AE': `${SITE_URL}/about`, en: `${SITE_URL}/about` } },
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.75,
      alternates: { languages: { 'en-AE': `${SITE_URL}/contact`, en: `${SITE_URL}/contact` } },
    },
  ];
}
