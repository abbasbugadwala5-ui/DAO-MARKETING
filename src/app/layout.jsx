import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const SITE_URL = 'https://daomarketing.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DAO Marketing — Luxury Digital Agency in Dubai',
    template: '%s · DAO Marketing',
  },
  description:
    'DAO Marketing is a Dubai-based luxury digital marketing agency crafting brand strategy, identity, web, performance media and cinematic content for ambitious brands.',
  applicationName: 'DAO Marketing',
  authors: [{ name: 'DAO Marketing', url: SITE_URL }],
  creator: 'DAO Marketing',
  publisher: 'DAO Marketing',
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
      { url: '/logo/logo-mark-icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo/logo-mark-icon.svg',
    apple: '/logo/logo-mark-icon.svg',
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
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService', 'MarketingService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'DAO Marketing',
      legalName: 'DAO Marketing Management LLC',
      alternateName: ['DAO Marketing', 'DAO Marketing Management', 'DAO Marketing LLC'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo/logo.svg`,
        width: 1080,
        height: 1080,
      },
      image: [`${SITE_URL}/og-image.jpg`, `${SITE_URL}/logo/logo.svg`],
      description:
        'Dubai-based luxury digital marketing agency. We build brand strategy, identity systems, web platforms, cinematic content and performance media for ambitious brands across the UAE and the wider GCC.',
      slogan: 'Define. Amplify. Own.',
      foundingDate: '2026',
      foundingLocation: { '@type': 'Place', name: 'Dubai, United Arab Emirates' },
      email: 'fraz@daomarketing.com',
      telephone: '+971-50-442-5845',
      priceRange: 'AED 40,000 – AED 200,000+',
      currenciesAccepted: 'AED, USD, EUR, GBP',
      paymentAccepted: 'Bank Transfer, Credit Card, Invoice',
      knowsAbout: [
        'Digital Marketing',
        'Brand Strategy',
        'Brand Identity Design',
        'Web Design and Development',
        'E-commerce and Shopify',
        'Conversion Rate Optimisation',
        'Search Engine Optimisation',
        'Paid Media and Performance Advertising',
        'Social Media Marketing',
        'Cinematic Content Production',
        'Email Marketing and CRM Lifecycle',
        'UX and UI Design',
      ],
      serviceType: [
        'Digital Marketing Agency',
        'Brand Strategy Consultancy',
        'Web Design and Development Agency',
        'Performance Marketing Agency',
        'Creative Content Agency',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'The One Tower',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        postalCode: '00000',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.2048,
        longitude: 55.2708,
      },
      hasMap: 'https://www.google.com/maps/search/?api=1&query=The+One+Tower+Dubai',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'City', name: 'Abu Dhabi' },
        { '@type': 'City', name: 'Sharjah' },
        { '@type': 'City', name: 'Riyadh' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Qatar' },
        { '@type': 'Place', name: 'Gulf Cooperation Council (GCC)' },
        { '@type': 'Place', name: 'Middle East and North Africa (MENA)' },
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
          areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
          availableLanguage: ['English', 'Arabic', 'Hindi', 'Urdu'],
        },
        {
          '@type': 'ContactPoint',
          email: 'fraz@daomarketing.com',
          telephone: '+971-50-442-5845',
          contactType: 'sales',
          areaServed: ['AE', 'SA', 'QA'],
          availableLanguage: ['English', 'Arabic'],
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'DAO Marketing Services',
        itemListElement: [
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Brand Strategy & Positioning', serviceType: 'Strategy', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Branding & Identity Systems', serviceType: 'Branding', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Product Design (UX/UI)', serviceType: 'Product Design', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Web Design & Development', serviceType: 'Web Development', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'E-commerce & Shopify', serviceType: 'E-commerce', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'CRO Audit & Conversion Optimisation', serviceType: 'CRO', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Search Engine Optimisation (SEO)', serviceType: 'SEO', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Paid Media & Performance Advertising', serviceType: 'Paid Media', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Social Media Marketing & Content', serviceType: 'Social Media', areaServed: 'AE' } },
          { '@type': 'Offer', priceCurrency: 'AED', itemOffered: { '@type': 'Service', name: 'Email Marketing & CRM Lifecycle', serviceType: 'CRM', areaServed: 'AE' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'DAO Marketing',
      description: 'Luxury digital marketing agency in Dubai — Define. Amplify. Own.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'DAO Marketing — Luxury Digital Agency in Dubai',
      description:
        'Brand strategy, identity, web, performance media and cinematic content — built for ambitious brands. Define. Amplify. Own.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
      breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
      primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is DAO Marketing based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DAO Marketing is a luxury digital marketing agency based in The One Tower, Dubai, United Arab Emirates. We work with brands across the UAE, Saudi Arabia, the wider GCC and MENA region.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does DAO Marketing offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer ten capabilities under one roof: brand strategy and positioning, branding and identity systems, product design (UX/UI), web design and development, e-commerce and Shopify, CRO audits, search engine optimisation, paid media and performance advertising, social media and content, and email marketing with CRM lifecycle.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost to work with DAO Marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Engagements typically range from AED 40,000 for focused brand or identity projects to AED 200,000+ for full-stack platform builds with performance media and content. Every proposal is custom — scope, timeline and pricing are agreed before any work begins.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a project take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Brand and identity projects usually run 4–8 weeks. Website builds run 8–14 weeks depending on scope. Always-on retainers (paid media, SEO, social, CRM) begin within 2 weeks of kickoff.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I start working with DAO Marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Send a brief through the contact form on our site, or email fraz@daomarketing.com directly. One of our team members reads every enquiry within 24 hours — no auto-responder, no triage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does DAO Marketing work with brands outside the UAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. While we are headquartered in Dubai, we work with brands across Saudi Arabia, Qatar, Kuwait, Bahrain, Oman and the wider GCC and MENA region. Remote engagements with international brands are common.',
          },
        },
      ],
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
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500;1,600&family=Playfair+Display:wght@500;600;700&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"
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
          <WhatsAppFloat />
        </SmoothScroll>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
