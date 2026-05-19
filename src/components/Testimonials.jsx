'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* generic placeholder testimonials */
const quotes = [
  { q: 'DAO Studio understands our brand DNA and turns it into authentic, premium storytelling.', name: 'Leontine', role: 'Marketing Manager, Northwind', c: '#1d2433' },
  { q: 'The team turns complex briefings into creative, customer-focused solutions every time.', name: 'Jurgen', role: 'Head of Product, Atoll', c: '#16345a' },
  { q: 'Thanks to their work we have a site that reflects exactly where our company is headed.', name: 'Robbert', role: 'Co-founder, Pallas', c: '#7d6f5e' },
  { q: 'Solution-oriented, exactly what you want as a client — a genuinely great collaboration.', name: 'Bert', role: 'Marketeer, Paragon', c: '#d8442a' },
  { q: 'Compliments on the redesign — only positive feedback, and it converts far better.', name: 'Rick', role: 'Partner, Crava', c: '#3a8fb8' },
  { q: 'Creative, energetic and bold. They connected our goals to the right audiences.', name: 'Jenno', role: 'Coordinator, Bloomr', c: '#4a90c2' },
];

function Card({ data }) {
  return (
    <article className="flex w-[430px] flex-none flex-col justify-between rounded-[24px] bg-white p-[34px] text-left shadow-[0_18px_50px_rgba(18,23,42,0.07)] max-sm:w-[300px] max-sm:p-[26px]"
      style={{ minHeight: 288 }}>
      <q className="body-lg block">{data.q}</q>
      <div className="mt-7 flex items-center gap-3.5">
        <div className="h-12 w-12 flex-none rounded-full" style={{ background: data.c }} />
        <div className="text-left">
          <div className="heading-sm">{data.name}</div>
          <div className="meta text-inksoft">{data.role}</div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const root = useRef(null);
  // duplicate each row so it never runs dry while translating
  const rowA = [...quotes.slice(0, 3), ...quotes.slice(0, 3)];
  const rowB = [...quotes.slice(3, 6), ...quotes.slice(3, 6)];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.testi-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.testi-heading', start: 'top 90%' },
    });

    // two rows drift in opposite directions, linked to scroll
    gsap.to('.testi-row-a', {
      xPercent: -26, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    gsap.fromTo('.testi-row-b', { xPercent: -26 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }, { scope: root });

  return (
    <section ref={root} className="section-pad overflow-hidden">
      <div className="section-wrap text-left">
        <div className="eyebrow eyebrow-gap text-inksoft">Testimonials</div>
        <h2 className="testi-heading section-title title-gap">
          {'Their words, not ours.'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="testi-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="flex flex-col gap-[26px]">
        <div className="testi-row-a flex w-max gap-[26px] will-change-transform">
          {rowA.map((q, i) => <Card key={`a${i}`} data={q} />)}
        </div>
        <div className="testi-row-b flex w-max gap-[26px] will-change-transform">
          {rowB.map((q, i) => <Card key={`b${i}`} data={q} />)}
        </div>
      </div>
    </section>
  );
}
