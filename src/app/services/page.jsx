import HashScroll from '@/components/HashScroll';
import Hero from '@/components/Hero';
import ServicesRibbon from '@/components/ServicesRibbon';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';

export const metadata = {
  title: 'Services — Brand, Web, Performance & Content',
  description:
    'Ten capabilities under one roof — strategy, branding, product design, web development, e-commerce, CRO, SEO, paid media, social and email/CRM. Built for ambitious brands.',
  keywords: [
    'digital marketing services Dubai',
    'branding agency services',
    'web development services',
    'SEO services Dubai',
    'paid media management',
    'CRO audit services',
    'Shopify development',
    'social media management Dubai',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — DAO Marketing',
    description:
      'Strategy, branding, product, web, e-commerce, CRO, SEO, paid, social and CRM — ten capabilities under one roof.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — DAO Marketing',
    description:
      'Strategy, branding, product, web, e-commerce, CRO, SEO, paid, social and CRM.',
  },
};

export default function ServicesPage() {
  return (
    <main>
      <HashScroll />
      <Hero /><ServicesRibbon /><Services /><Cases /><Process /><Testimonials />
    </main>
  );
}
