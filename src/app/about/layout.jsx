const SITE_URL = 'https://daomarketing.com';
const PAGE_URL = `${SITE_URL}/about`;

export const metadata = {
  title: 'About — The Studio Behind DAO',
  description:
    'DAO Marketing is a Dubai studio of strategists, designers, developers and storytellers. We define brands, amplify their reach and help them own their category — built around a clear, repeatable method.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'About — DAO Marketing',
    description:
      'A Dubai studio of strategists, designers, developers and storytellers. Define. Amplify. Own.',
    url: PAGE_URL,
    siteName: 'DAO Marketing',
    type: 'website',
    locale: 'en_AE',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'About DAO Marketing — Dubai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — DAO Marketing',
    description: 'A Dubai studio of strategists, designers, developers and storytellers.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

const ABOUT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'About — DAO Marketing',
      description: 'About the Dubai-based luxury digital marketing studio behind DAO.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: PAGE_URL },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#fraz-saeed`,
      name: 'Fraz Saeed',
      jobTitle: 'Founder & Creative Director',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      url: PAGE_URL,
      knowsAbout: ['Brand Strategy', 'Creative Direction', 'Digital Marketing', 'Cinematic Content'],
    },
  ],
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_JSON_LD) }}
      />
      {children}
    </>
  );
}
