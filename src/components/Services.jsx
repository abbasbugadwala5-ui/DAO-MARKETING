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
    /* Deep Walnut — antique foundation */
    tag: 'Strategy', index: '01 / 10', bg: '#3F3220', light: true,
    kicker: 'The Foundation',
    title: 'Positioning that earns attention.',
    body: 'Research, audience mapping and a sharp narrative — the foundation every brand decision answers to.',
    src: '/images/cine%204.jpg',
    fallback: 'radial-gradient(120% 90% at 20% 10%,#3a4a6e 0,#1a2540 60%)',
  },
  {
    /* Oxblood — rich passionate red */
    tag: 'Branding', index: '02 / 10', bg: '#4F1818', light: true,
    kicker: 'The Identity',
    title: 'Identity systems with range.',
    body: 'Logo, type, motion and tone — a flexible kit that holds together across every surface and screen.',
    src: '/images/cine%205.png',
    fallback: 'linear-gradient(135deg,#1c1c22,#3b2f24)',
  },
  {
    /* Midnight Emerald — refined dark green */
    tag: 'Product Design', index: '03 / 10', bg: '#1A332E', light: true,
    kicker: 'The Experience',
    title: 'Interfaces people actually finish.',
    body: 'End-to-end UX and UI for web and apps — usability tested, design-system backed, dev-ready.',
    src: '/images/cine%207.png',
    fallback: 'linear-gradient(135deg,#23304a,#0e1526)',
  },
  {
    /* Royal Sapphire — deep night blue */
    tag: 'Web Design & Dev', index: '04 / 10', bg: '#1F2A4A', light: true,
    kicker: 'The Build',
    title: 'Sites that ship fast and last.',
    body: 'Next.js, headless CMS, motion-led builds — performance-tuned, animation-rich and SEO-ready websites that scale with the brand.',
    src: '/images/cine%2013.jpg',
    fallback: 'linear-gradient(135deg,#2c3a5a,#0f1426)',
  },
  {
    /* Antique Bronze — burnished gold-bronze */
    tag: 'E-commerce', index: '05 / 10', bg: '#6E5226', light: true,
    kicker: 'The Storefront',
    title: 'Storefronts engineered to sell.',
    body: 'Shopify and headless commerce builds with speed, merchandising and a checkout that does not leak.',
    src: '/images/cine%2015.jpg',
    fallback: 'linear-gradient(135deg,#13321f,#0c1d12)',
  },
  {
    /* Royal Aubergine — deep plum */
    tag: 'CRO Audit', index: '06 / 10', bg: '#2D1C3D', light: true,
    kicker: 'The Lift',
    title: 'Find the leaks. Lift the numbers.',
    body: 'Heuristic and data-led conversion audits with a prioritised roadmap of changes worth shipping.',
    src: '/images/cine%2020.jpg',
    fallback: 'linear-gradient(135deg,#3e2417,#1b110a)',
  },
  {
    /* Forest Verde — sophisticated deep green */
    tag: 'SEO', index: '07 / 10', bg: '#23362B', light: true,
    kicker: 'The Visibility',
    title: 'Rank where the buyers are looking.',
    body: 'Technical, on-page and content SEO built around real intent — compounding traffic that does not need a media buy to show up.',
    src: '/images/cine%2021.jpg',
    fallback: 'linear-gradient(135deg,#a3a78b,#7e8268)',
  },
  {
    /* Burgundy — wine red */
    tag: 'Paid Media', index: '08 / 10', bg: '#5E1B1B', light: true,
    kicker: 'The Engine',
    title: 'Performance ads that pay back.',
    body: 'Meta, Google, TikTok and programmatic — full-funnel buying with creative testing, tracking and weekly read-outs that actually mean something.',
    src: '/images/cine%2024.jpg',
    fallback: 'linear-gradient(135deg,#5a200f,#2d0e07)',
  },
  {
    /* Smoked Taupe — sophisticated neutral */
    tag: 'Social Media', index: '09 / 10', bg: '#3A3328', light: true,
    kicker: 'The Audience',
    title: 'Channels that earn the follow.',
    body: 'Always-on content, community and short-form video built around the brand voice — calendars you can actually keep, not feeds you have to apologise for.',
    src: '/images/cine%2029.jpg',
    fallback: 'linear-gradient(135deg,#c5bea8,#9a937e)',
  },
  {
    /* Midnight Ink — deepest blue-black */
    tag: 'Email & CRM', index: '10 / 10', bg: '#0F1A36', light: true,
    kicker: 'The Lifecycle',
    title: 'Owned channels that compound.',
    body: 'Welcome, win-back, post-purchase and loyalty flows — email and SMS lifecycle programs that turn a one-time buyer into a returning one.',
    src: '/images/cine%2030.jpg',
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
            One studio, ten disciplines — strategy, brand, product, web, commerce,
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
              media={<ServiceMedia src={s.src} fallback={s.fallback} alt={s.title} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
