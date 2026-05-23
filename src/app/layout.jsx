import '@/styles/globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

const SITE_URL = 'https://daomarketing.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DAO Marketing — Luxury Digital Agency in Dubai',
    template: '%s · DAO Marketing',
  },
  description:
    'DAO Marketing is a Dubai-based luxury digital marketing studio crafting brand strategy, identity, web, performance media and cinematic content for ambitious brands.',
  applicationName: 'DAO Marketing',
  authors: [{ name: 'DAO Marketing', url: SITE_URL }],
  creator: 'DAO Marketing',
  publisher: 'DAO Marketing',
  keywords: [
    'digital marketing agency Dubai',
    'luxury branding agency',
    'creative agency Dubai',
    'cinematic content production',
    'performance marketing Dubai',
    'web design Dubai',
    'web development Dubai',
    'SEO agency Dubai',
    'social media marketing Dubai',
    'paid media agency',
    'CRO audit',
    'email marketing CRM',
    'Shopify agency Dubai',
    'Next.js development',
    'brand strategy Dubai',
    'UAE marketing agency',
    'DAO Marketing',
  ],
  category: 'Digital Marketing Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'DAO Marketing',
    title: 'DAO Marketing — Luxury Digital Agency in Dubai',
    description:
      'Brand strategy, identity, web, performance media and cinematic content — built for ambitious brands. Define. Amplify. Own.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DAO Marketing — Luxury Digital Agency in Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAO Marketing — Luxury Digital Agency in Dubai',
    description:
      'Brand strategy, identity, web, performance media and cinematic content. Define. Amplify. Own.',
    images: ['/og-image.jpg'],
    creator: '@daomarketing',
  },
  icons: {
    icon: [
      { url: '/logo/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo/logo.svg',
    apple: '/logo/logo.svg',
  },
  manifest: '/manifest.json',
  verification: {
    // Add real codes after setting up Search Console / Bing Webmaster Tools.
    // google: 'paste-google-site-verification-here',
    // other: { 'msvalidate.01': 'paste-bing-code-here' },
  },
  other: {
    'theme-color': '#0A0908',
  },
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'DAO Marketing',
      alternateName: 'DAO Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/logo/logo.svg`,
      image: `${SITE_URL}/og-image.jpg`,
      description:
        'Dubai-based luxury digital marketing studio — brand strategy, identity, web, performance media and cinematic content.',
      slogan: 'Define. Amplify. Own.',
      foundingDate: '2024',
      email: 'fraz@daomarketing.com',
      telephone: '+971-50-442-5845',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'The One Tower',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'City', name: 'Abu Dhabi' },
        { '@type': 'Place', name: 'GCC' },
        { '@type': 'Place', name: 'MENA' },
      ],
      sameAs: [
        'https://www.instagram.com/daomarketing',
        'https://www.linkedin.com/company/dao-marketing-management-llc/',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: 'fraz@daomarketing.com',
          telephone: '+971-50-442-5845',
          contactType: 'customer service',
          areaServed: 'AE',
          availableLanguage: ['English', 'Arabic', 'Hindi', 'Urdu'],
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'DAO Marketing Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Strategy & Positioning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Identity Systems' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Product Design (UX/UI)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design & Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-commerce & Shopify' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRO Audit & Conversion Optimisation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Search Engine Optimisation (SEO)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paid Media & Performance Advertising' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing & Content' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Email Marketing & CRM Lifecycle' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'DAO Marketing',
      description: 'Luxury digital marketing studio in Dubai.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&family=Playfair+Display:wght@500;600;700&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <ScrollIndicator />
        </SmoothScroll>
      </body>
    </html>
  );
}
