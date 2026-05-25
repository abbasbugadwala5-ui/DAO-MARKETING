import HashScroll from '@/components/HashScroll';
import Hero from '@/components/Hero';
import ServicesRibbon from '@/components/ServicesRibbon';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';

const SITE_URL = 'https://daomarketing.com';
const PAGE_URL = `${SITE_URL}/services`;

export const metadata = {
  title: 'Services — Brand, Web, Performance & Content',
  description:
    'Ten capabilities under one roof — brand strategy, identity, product design, web development, e-commerce, CRO, SEO, paid media, social and email/CRM. Built for ambitious brands in Dubai and the wider GCC.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Services — DAO Marketing',
    description:
      'Ten capabilities under one roof — strategy, branding, product, web, e-commerce, CRO, SEO, paid, social and CRM.',
    url: PAGE_URL,
    siteName: 'DAO Marketing',
    type: 'website',
    locale: 'en_AE',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'DAO Marketing Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — DAO Marketing',
    description: 'Strategy, branding, product, web, e-commerce, CRO, SEO, paid, social and CRM.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

const SERVICE_LIST = [
  { slug: 'strategy',      name: 'Brand Strategy & Positioning',        description: 'Research, audience mapping and a sharp narrative — the foundation every brand decision answers to.' },
  { slug: 'branding',      name: 'Branding & Identity Systems',         description: 'Logo, type, motion and tone — a flexible kit that holds together across every surface and screen.' },
  { slug: 'product',       name: 'Product Design (UX / UI)',            description: 'End-to-end UX and UI for web and apps — usability tested, design-system backed, dev-ready.' },
  { slug: 'web',           name: 'Web Design & Development',            description: 'Next.js, headless CMS, motion-led builds — performance-tuned and SEO-ready websites that scale.' },
  { slug: 'ecommerce',     name: 'E-commerce & Shopify',                description: 'Shopify and headless commerce builds with speed, merchandising and a checkout that does not leak.' },
  { slug: 'cro',           name: 'CRO Audit & Conversion Optimisation', description: 'Heuristic and data-led conversion audits with a prioritised roadmap of changes worth shipping.' },
  { slug: 'seo',           name: 'Search Engine Optimisation (SEO)',    description: 'Technical, on-page and content SEO built around real intent — compounding traffic without a media buy.' },
  { slug: 'paid-media',    name: 'Paid Media & Performance Advertising', description: 'Meta, Google, TikTok and programmatic — full-funnel buying with creative testing and weekly read-outs.' },
  { slug: 'social',        name: 'Social Media Marketing & Content',    description: 'Always-on content, community and short-form video built around the brand voice.' },
  { slug: 'email-crm',     name: 'Email Marketing & CRM Lifecycle',     description: 'Welcome, win-back, post-purchase and loyalty flows — owned channels that compound.' },
];

const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Services — DAO Marketing',
      description:
        'Ten digital marketing capabilities offered by DAO Marketing in Dubai — from strategy and branding to web, performance media, SEO and content.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AE',
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: PAGE_URL },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#service-list`,
      name: 'DAO Marketing — Service Catalogue',
      numberOfItems: SERVICE_LIST.length,
      itemListElement: SERVICE_LIST.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          '@id': `${PAGE_URL}#${s.slug}`,
          name: s.name,
          description: s.description,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: [
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Place', name: 'GCC' },
            { '@type': 'Place', name: 'MENA' },
          ],
          serviceType: s.name,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'AED',
            url: PAGE_URL,
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />
      <HashScroll />
      <Hero /><ServicesRibbon /><Services /><Cases /><Process /><Testimonials />
    </main>
  );
}
