'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* placeholder client tiles — replace name/colour or drop a logo <Image> */
const clients = [
  { name: 'Northwind', bg: '#15233f', fg: '#fff', tag: 'Logistics' },
  { name: 'Paragon',   bg: '#16110d', fg: '#fff', tag: 'Festival' },
  { name: 'Vellum',    bg: '#d8482a', fg: '#fff', tag: 'Hardware' },
  { name: 'Sienna',    bg: '#c98a7d', fg: '#1a1a1a', tag: 'Textiles' },
  { name: 'Atoll',     bg: '#1d6f8c', fg: '#fff', tag: 'Travel' },
  { name: 'Lumio',     bg: '#c4dd2c', fg: '#15150f', tag: 'Health' },
  { name: 'Bloomr',    bg: '#3a2640', fg: '#fff', tag: 'Florals' },
  { name: 'Crava',     bg: '#e23b4f', fg: '#fff', tag: 'Tickets' },
  { name: 'Voltura',   bg: '#241038', fg: '#e0c8ff', tag: 'Events' },
  { name: 'Marisol',   bg: '#b8b0a2', fg: '#1a1a1a', tag: 'Care' },
  { name: 'Pallas',    bg: '#f1efe9', fg: '#1a1a1a', tag: 'Studio' },
  { name: 'Atlas',     bg: '#e0612e', fg: '#fff', tag: 'Sport' },
];

export default function BentoGrid() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.bento-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.bento-heading', start: 'top 90%' },
    });

    gsap.from('.bento-tile', {
      y: 46, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05,
      scrollTrigger: { trigger: '.bento-grid', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section ref={root} className="section-pad">
      <div className="section-wrap text-left">
        <div className="eyebrow eyebrow-gap text-inksoft">Selected clients</div>
        <h2 className="bento-heading section-title title-gap">
          {'Crafting collabs since 2010'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="bento-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>

        <div className="bento-grid grid grid-cols-6 gap-5 max-lg:grid-cols-4 max-sm:grid-cols-2">
          {clients.map((c) => (
            <motion.a
              key={c.name}
              href="#"
              className="bento-tile group relative grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-[20px]"
            >
              <div
                className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.08]"
                style={{ background: c.bg }}
              >
                <span
                  className="heading-md z-[2] transition-transform duration-[550ms] group-hover:-translate-y-1.5"
                  style={{ color: c.fg }}
                >
                  {c.name}
                </span>
              </div>
              <div className="absolute inset-0 z-[1] bg-[rgba(10,12,24,0.42)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="eyebrow absolute inset-x-0 bottom-4 z-[2] translate-y-2.5 text-center text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-[0.85]">
                {c.tag}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
