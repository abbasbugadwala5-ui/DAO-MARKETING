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
    tag: 'Strategy', index: '01 / 05', bg: '#ECE7DC', light: false,
    title: 'Positioning that earns attention.',
    body: 'Research, audience mapping and a sharp narrative — the foundation every brand decision answers to.',
    src: '/images/svc-strategy.jpg',
    fallback: 'radial-gradient(120% 90% at 20% 10%,#3a4a6e 0,#1a2540 60%)',
  },
  {
    tag: 'Branding', index: '02 / 05', bg: '#B8472B', light: true,
    title: 'Identity systems with range.',
    body: 'Logo, type, motion and tone — a flexible kit that holds together across every surface and screen.',
    src: '/images/svc-branding.jpg',
    fallback: 'linear-gradient(135deg,#1c1c22,#3b2f24)',
  },
  {
    tag: 'Product Design', index: '03 / 05', bg: '#1E3D38', light: true,
    title: 'Interfaces people actually finish.',
    body: 'End-to-end UX and UI for web and apps — usability tested, design-system backed, dev-ready.',
    src: '/images/svc-product.jpg',
    fallback: 'linear-gradient(135deg,#23304a,#0e1526)',
  },
  {
    tag: 'E-commerce', index: '04 / 05', bg: '#E0A43B', light: false,
    title: 'Storefronts engineered to sell.',
    body: 'Shopify and headless commerce builds with speed, merchandising and a checkout that does not leak.',
    src: '/images/svc-ecommerce.jpg',
    fallback: 'linear-gradient(135deg,#13321f,#0c1d12)',
  },
  {
    tag: 'CRO Audit', index: '05 / 05', bg: '#2E2140', light: true,
    title: 'Find the leaks. Lift the numbers.',
    body: 'Heuristic and data-led conversion audits with a prioritised roadmap of changes worth shipping.',
    src: '/images/svc-cro.jpg',
    fallback: 'linear-gradient(135deg,#3e2417,#1b110a)',
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
      card.style.top = `${NAV_OFFSET + i * 46}px`;
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
    <section ref={root} id="services" className="section-pad">
      <div className="section-wrap text-left">
        <div className="eyebrow eyebrow-gap text-inksoft">What we do</div>
        <h2 className="svc-heading section-title title-gap">
          {'Five ways we build value.'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="svc-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="section-wrap">
        <div className="relative">
          {services.map((s) => (
            <AnimatedCard
              key={s.tag}
              tag={s.tag}
              index={s.index}
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
