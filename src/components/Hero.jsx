'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* split a string into word spans for the staggered reveal */
function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="reveal-line">
      <span className="reveal-word">{w}&nbsp;</span>
    </span>
  ));
}

const lines = [
  { text: 'Design that', italic: false },
  { text: 'moves markets —', italic: true },
  { text: 'built to convert.', italic: false },
];

const pillars = ['Strategy', 'Branding', 'Product Design', 'E-commerce', 'CRO Audit'];

export default function Hero() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // headline words rise in on load (plain tween — no ScrollTrigger)
    gsap.from('.hero-word', {
      yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.15,
    });

    // sub elements fade up
    gsap.from('.hero-fade',
      { y: 34, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.55 });

    // headline parallax on scroll
    gsap.to('.hero-headline', {
      yPercent: 18, opacity: 0.55, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  return (
    <header
      ref={root}
      className="section-wrap flex min-h-[100svh] flex-col justify-center pb-[72px] pt-[130px] text-left"
    >
      <h1 className="hero-headline display-1">
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l.text.split(' ').map((w, j) => (
              <span key={j} className="reveal-line">
                <span className={`hero-word reveal-word ${l.italic ? 'italic' : ''}`}>
                  {w}&nbsp;
                </span>
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <p className="hero-fade body-lg max-w-[420px] text-inksoft">
          DAO Studio is an independent digital agency crafting brand, product
          and commerce experiences with measurable impact.
        </p>

        <motion.div
          className="hero-fade"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Link
            href="/contact"
            className="body inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper"
          >
            Start a project
            <span className="grid h-[28px] w-[28px] place-items-center rounded-full bg-paper text-ink">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="hero-fade eyebrow mt-[64px] flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/10 pt-5 text-inksoft">
        {pillars.map((p) => <span key={p}>{p}</span>)}
      </div>
    </header>
  );
}
