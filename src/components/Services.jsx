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
    tag: 'Strategy', index: '01 / 09', bg: '#ECE7DC', light: false,
    kicker: 'The Foundation',
    title: 'Positioning that earns attention.',
    body: 'Research, audience mapping and a sharp narrative — the foundation every brand decision answers to.',
    src: '/images/svc-strategy.jpg',
    fallback: 'radial-gradient(120% 90% at 20% 10%,#3a4a6e 0,#1a2540 60%)',
  },
  {
    tag: 'Branding', index: '02 / 09', bg: '#B8472B', light: true,
    kicker: 'The Identity',
    title: 'Identity systems with range.',
    body: 'Logo, type, motion and tone — a flexible kit that holds together across every surface and screen.',
    src: '/images/svc-branding.jpg',
    fallback: 'linear-gradient(135deg,#1c1c22,#3b2f24)',
  },
  {
    tag: 'Product Design', index: '03 / 09', bg: '#1E3D38', light: true,
    kicker: 'The Experience',
    title: 'Interfaces people actually finish.',
    body: 'End-to-end UX and UI for web and apps — usability tested, design-system backed, dev-ready.',
    src: '/images/svc-product.jpg',
    fallback: 'linear-gradient(135deg,#23304a,#0e1526)',
  },
  {
    tag: 'E-commerce', index: '04 / 09', bg: '#E0A43B', light: false,
    kicker: 'The Storefront',
    title: 'Storefronts engineered to sell.',
    body: 'Shopify and headless commerce builds with speed, merchandising and a checkout that does not leak.',
    src: '/images/svc-ecommerce.jpg',
    fallback: 'linear-gradient(135deg,#13321f,#0c1d12)',
  },
  {
    tag: 'CRO Audit', index: '05 / 09', bg: '#2E2140', light: true,
    kicker: 'The Lift',
    title: 'Find the leaks. Lift the numbers.',
    body: 'Heuristic and data-led conversion audits with a prioritised roadmap of changes worth shipping.',
    src: '/images/svc-cro.jpg',
    fallback: 'linear-gradient(135deg,#3e2417,#1b110a)',
  },
  {
    /* Sage — sibling of forest, lighter cool */
    tag: 'SEO', index: '06 / 09', bg: '#BEC1A6', light: false,
    kicker: 'The Visibility',
    title: 'Rank where the buyers are looking.',
    body: 'Technical, on-page and content SEO built around real intent — compounding traffic that does not need a media buy to show up.',
    src: '/images/svc-strategy.jpg',
    fallback: 'linear-gradient(135deg,#a3a78b,#7e8268)',
  },
  {
    /* Deep Rust — sibling of terra, deeper warm */
    tag: 'Paid Media', index: '07 / 09', bg: '#7A2E1A', light: true,
    kicker: 'The Engine',
    title: 'Performance ads that pay back.',
    body: 'Meta, Google, TikTok and programmatic — full-funnel buying with creative testing, tracking and weekly read-outs that actually mean something.',
    src: '/images/svc-ecommerce.jpg',
    fallback: 'linear-gradient(135deg,#5a200f,#2d0e07)',
  },
  {
    /* Sand — sibling of cream, deeper neutral */
    tag: 'Social Media', index: '08 / 09', bg: '#DAD5C6', light: false,
    kicker: 'The Audience',
    title: 'Channels that earn the follow.',
    body: 'Always-on content, community and short-form video built around the brand voice — calendars you can actually keep, not feeds you have to apologise for.',
    src: '/images/svc-branding.jpg',
    fallback: 'linear-gradient(135deg,#c5bea8,#9a937e)',
  },
  {
    /* Navy — sibling of plum, bluer cool */
    tag: 'Email & CRM', index: '09 / 09', bg: '#1A2540', light: true,
    kicker: 'The Lifecycle',
    title: 'Owned channels that compound.',
    body: 'Welcome, win-back, post-purchase and loyalty flows — email and SMS lifecycle programs that turn a one-time buyer into a returning one.',
    src: '/images/svc-cro.jpg',
    fallback: 'linear-gradient(135deg,#101a30,#070b18)',
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
          <div className="eyebrow text-inksoft">09 Disciplines</div>
        </div>

        <div className="svc-heading-grid">
          <h2 className="svc-heading svc-heading-xl">
            {'Nine ways we build value.'.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className={`svc-word reveal-word${w === 'ways' ? ' svc-italic' : ''}`}>{w}&nbsp;</span>
              </span>
            ))}
          </h2>

          <p className="svc-lead">
            One studio, nine disciplines — strategy, brand, product, commerce, conversion
            and the full digital marketing engine. A single team so the thinking never
            gets lost in the handoff.
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
              media={<ServiceMedia src={s.src} fallback={s.fallback} alt={s.title} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
