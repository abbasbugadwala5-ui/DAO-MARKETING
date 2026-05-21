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
  { text: 'moves markets', italic: true },
  { text: 'and converts buyers.', italic: false },
];

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
      yPercent: 10, opacity: 0.45, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  return (
    <header
      ref={root}
      className="section-wrap relative flex min-h-[80svh] flex-col justify-center overflow-hidden pb-[48px] pt-[130px] text-left"
    >
      <h1 className="hero-headline hero-headline-xl">
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l.text.split(' ').map((w, j) => (
              <span key={j} className="reveal-line">
                <span className={`hero-word reveal-word ${l.italic ? 'hero-italic' : ''}`}>
                  {w}&nbsp;
                </span>
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="hero-fade hero-edge">
        <span className="hero-edge-mark" aria-hidden>↓</span>
        <span className="hero-edge-line" aria-hidden />
        <span className="hero-edge-year">2025</span>
      </div>
    </header>
  );
}
