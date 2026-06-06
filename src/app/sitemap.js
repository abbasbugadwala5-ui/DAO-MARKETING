const SITE_URL = 'https://daomarketing.com';

const alt = (path) => ({
  languages: {
    'en-AE': `${SITE_URL}${path}`,
    en: `${SITE_URL}${path}`,
  },
});

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL,               lastModified: now, changeFrequency: 'weekly',  priority: 1.0,  alternates: alt('') },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.95, alternates: alt('/services') },
    { url: `${SITE_URL}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.85, alternates: alt('/about') },
    { url: `${SITE_URL}/work`,     lastModified: now, changeFrequency: 'monthly', priority: 0.80, alternates: alt('/work') },
    { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.75, alternates: alt('/contact') },
    { url: `${SITE_URL}/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.30, alternates: alt('/privacy') },
    { url: `${SITE_URL}/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.30, alternates: alt('/terms') },
    { url: `${SITE_URL}/cookies`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.25, alternates: alt('/cookies') },
  ];
}
