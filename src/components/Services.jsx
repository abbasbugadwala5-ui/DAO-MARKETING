'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import AnimatedCard from './AnimatedCard';

const NAV_OFFSET = 120;

const services = [
  {
    /* Walnut Brown */
    tag: 'Strategy', index: '01 / 10', bg: '#3F2A1B', light: true,
    kicker: 'The Foundation',
    title: 'Positioning that earns attention.',
    body: 'Research, audience mapping and a sharp narrative — the foundation every brand decision answers to.',
    src: '/images/cine%204.jpg',
    alt: 'Brand strategy session in a Dubai creative studio',
    fallback: 'linear-gradient(135deg,#3F2A1B,#1C120A)',
  },
  {
    /* Deep Maroon */
    tag: 'Branding', index: '02 / 10', bg: '#3A1818', light: true,
    kicker: 'The Identity',
    title: 'Identity systems with range.',
    body: 'Logo, type, motion and tone — a flexible kit that holds together across every surface and screen.',
    src: '/images/cine%205.webp',
    alt: 'Identity system layouts spread across a studio table',
    fallback: 'linear-gradient(135deg,#3A1818,#1A0A0A)',
  },
  {
    /* Cream Bronze */
    tag: 'Product Design', index: '03 / 10', bg: '#3D3220', light: true,
    kicker: 'The Experience',
    title: 'Interfaces people actually finish.',
    body: 'End-to-end UX and UI for web and apps — usability tested, design-system backed, dev-ready.',
    src: '/images/cine%207.webp',
    alt: 'UX and UI wireframes on a tablet during a product design review',
    fallback: 'linear-gradient(135deg,#3D3220,#1F1810)',
  },
  {
    /* Walnut Brown */
    tag: 'Web Design & Dev', index: '04 / 10', bg: '#3F2A1B', light: true,
    kicker: 'The Build',
    title: 'Sites that ship fast and last.',
    body: 'Next.js, headless CMS, motion-led builds — performance-tuned, animation-rich and SEO-ready websites that scale with the brand.',
    src: '/images/cine%2013.jpg',
    alt: 'Custom Next.js website design on a studio monitor',
    fallback: 'linear-gradient(135deg,#3F2A1B,#1C120A)',
  },
  {
    /* Deep Maroon */
    tag: 'E-commerce', index: '05 / 10', bg: '#3A1818', light: true,
    kicker: 'The Storefront',
    title: 'Storefronts engineered to sell.',
    body: 'Shopify and headless commerce builds with speed, merchandising and a checkout that does not leak.',
    src: '/images/cine%2015.jpg',
    alt: 'Shopify storefront mockup on a laptop and phone',
    fallback: 'linear-gradient(135deg,#3A1818,#1A0A0A)',
  },
  {
    /* Cream Bronze */
    tag: 'CRO Audit', index: '06 / 10', bg: '#3D3220', light: true,
    kicker: 'The Lift',
    title: 'Find the leaks. Lift the numbers.',
    body: 'Heuristic and data-led conversion audits with a prioritised roadmap of changes worth shipping.',
    src: '/images/cine%2020.jpg',
    alt: 'Conversion analytics and heatmap dashboard on a monitor',
    fallback: 'linear-gradient(135deg,#3D3220,#1F1810)',
  },
  {
    /* Walnut Brown */
    tag: 'SEO', index: '07 / 10', bg: '#3F2A1B', light: true,
    kicker: 'The Visibility',
    title: 'Rank where the buyers are looking.',
    body: 'Technical, on-page and content SEO built around real intent — compounding traffic that does not need a media buy to show up.',
    src: '/images/cine%2021.jpg',
    alt: 'Search engine results page open on a laptop screen',
    fallback: 'linear-gradient(135deg,#3F2A1B,#1C120A)',
  },
  {
    /* Deep Maroon */
    tag: 'Paid Media', index: '08 / 10', bg: '#3A1818', light: true,
    kicker: 'The Engine',
    title: 'Performance ads that pay back.',
    body: 'Meta, Google, TikTok and programmatic — full-funnel buying with creative testing, tracking and weekly read-outs that actually mean something.',
    src: '/images/cine%2024.jpg',
    alt: 'Performance ad creatives previewed across multiple devices',
    fallback: 'linear-gradient(135deg,#3A1818,#1A0A0A)',
  },
  {
    /* Cream Bronze */
    tag: 'Social Media', index: '09 / 10', bg: '#3D3220', light: true,
    kicker: 'The Audience',
    title: 'Channels that earn the follow.',
    body: 'Always-on content, community and short-form video built around the brand voice — calendars you can actually keep, not feeds you have to apologise for.',
    src: '/images/cine%2029.jpg',
    alt: 'Cinematic short-form reel storyboard for a social campaign',
    fallback: 'linear-gradient(135deg,#3D3220,#1F1810)',
  },
  {
    /* Walnut Brown */
    tag: 'Email & CRM', index: '10 / 10', bg: '#3F2A1B', light: true,
    kicker: 'The Lifecycle',
    title: 'Owned channels that compound.',
    body: 'Welcome, win-back, post-purchase and loyalty flows — email and SMS lifecycle programs that turn a one-time buyer into a returning one.',
    src: '/images/cine%2023.jpg',
    alt: 'Email lifecycle flow diagram on a designer’s screen',
    fallback: 'linear-gradient(135deg,#3F2A1B,#1C120A)',
  },
];

function ServiceMedia({ src, fallback, alt }) {
  return (
    <div className="absolute inset-0" style={{ background: fallback }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default function Services() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = gsap.utils.toArray('[data-stack-card]');

    cards.forEach((card, i) => {
      card.style.top = `${NAV_OFFSET + i * 32}px`;
      card.style.marginBottom = i < cards.length - 1 ? '12vh' : '0';

      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 1 - (cards.length - i) * 0.01,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }
    });

    gsap.from('.svc-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.svc-heading', start: 'top 90%' },
    });
  }, { scope: root });

  return (
    <section ref={root} id="services" className="section-pad svc-section">
      <div className="section-wrap">
        <div className="svc-eyebrow-row">
          <div className="eyebrow text-inksoft">What we do</div>
          <span className="svc-eyebrow-rule" aria-hidden />
          <div className="eyebrow text-inksoft">10 Disciplines</div>
        </div>

        <div className="svc-heading-grid">
          <h2 className="svc-heading svc-heading-xl">
            {'Ten ways we build value.'.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className={`svc-word reveal-word${w === 'ways' ? ' svc-italic' : ''}`}>{w}&nbsp;</span>
              </span>
            ))}
          </h2>

          <p className="svc-lead">
            One agency, ten disciplines — strategy, brand, product, web, commerce,
            conversion and the full digital marketing engine. A single team so the
            thinking never gets lost in the handoff.
          </p>
        </div>
      </div>

      <div className="section-wrap">
        <div className="relative">
          {services.map((s) => (
            <AnimatedCard
              key={s.tag}
              tag={s.tag}
              index={s.index}
              kicker={s.kicker}
              title={s.title}
              body={s.body}
              bg={s.bg}
              light={s.light}
              media={<ServiceMedia src={s.src} fallback={s.fallback} alt={s.alt} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
