'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const cases = [
  {
    label: 'Sama Al Tariq',
    tag: 'Visit website',
    shape: 'tall',
    href: 'https://www.samaaltariq.org',
    external: true,
    src: '/images/case-sama-web.webp',
    alt: 'Sama Al Tariq construction and fit-out website by DAO Marketing',
    fallback: 'radial-gradient(120% 100% at 70% 20%,#188B97 0,#0c1518 70%)',
  },
  {
    label: 'Aya — Movement',
    tag: 'View case',
    shape: 'short',
    src: '/images/case-aya.jpg',
    alt: 'Aya — Movement brand identity case',
    fallback: 'radial-gradient(120% 100% at 30% 30%,#c8112a 0,#1a0306 75%)',
  },
];

function CaseCard({ data }) {
  const cardRef = useRef(null);
  const mediaRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(mediaRef.current, { x: x * 22, y: y * 22, duration: 0.6, ease: 'power2.out' });
  };
  const onLeave = () =>
    gsap.to(mediaRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });

  return (
    <motion.a
      ref={cardRef}
      href={data.href}
      target={data.external ? '_blank' : undefined}
      rel={data.external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ y: 70, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block cursor-pointer overflow-hidden rounded-[var(--radius-card)] ${
        data.shape === 'tall'
          ? 'aspect-square'
          : 'aspect-[4/5] mt-16 max-lg:mt-0'
      }`}
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 transition-transform duration-[1000ms] ease-[var(--ease)] group-hover:scale-[1.06]"
        style={{ background: data.fallback }}
      >
        {data.src && (
          <Image
            src={data.src}
            alt={data.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-[550ms] group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top,rgba(10,12,24,.55),transparent 55%)' }} />

      <span className="eyebrow absolute right-6 top-6 z-[2] scale-[0.85] rounded-full bg-white/90 px-4 py-2 text-ink opacity-0 backdrop-blur-[6px] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
        {data.tag}
      </span>

      <div className="absolute bottom-[26px] left-[30px] z-[2] translate-y-2 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-white opacity-90 transition-all duration-[550ms] group-hover:translate-y-0 group-hover:opacity-100">
        {data.label}
      </div>
    </motion.a>
  );
}

export default function Cases() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.cases-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.cases-heading', start: 'top 90%' },
    });
  }, { scope: root });

  return (
    <section ref={root} id="work" className="section-pad">
      <div className="section-wrap text-left">
        <div className="eyebrow eyebrow-gap text-inksoft">Selected work</div>
        <h2 className="cases-heading section-title title-gap">
          {'Latest cases'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="cases-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-[1.18fr_1fr] items-start gap-[30px] max-lg:grid-cols-1">
          {cases.map((c) => (
            <CaseCard key={c.label} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
