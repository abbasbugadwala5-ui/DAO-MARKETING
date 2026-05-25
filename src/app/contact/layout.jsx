const SITE_URL = 'https://daomarketing.com';
const PAGE_URL = `${SITE_URL}/contact`;

export const metadata = {
  title: 'Contact — Start a Conversation',
  description:
    'Tell us about the brand, the timeline and the ambition. We reply within 24 hours — no auto-responder, no triage. Reach DAO Marketing in Dubai.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Contact — DAO Marketing',
    description: 'Share the brief — a clear next step lands in your inbox within a day.',
    url: PAGE_URL,
    siteName: 'DAO Marketing',
    type: 'website',
    locale: 'en_AE',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Contact DAO Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — DAO Marketing',
    description: 'Share the brief — a clear next step lands in your inbox within a day.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

const CONTACT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Contact — DAO Marketing',
      description: 'Get in touch with DAO Marketing — Dubai studio.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: PAGE_URL },
      ],
    },
  ],
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_JSON_LD) }}
      />
      {children}
    </>
  );
}
