'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Avatar colors locked to the studio brand palette
   (terra, forest, plum, amber, olive, sand) — no off-palette hues. */
const quotes = [
  { q: 'DAO Studio understands our brand DNA and turns it into authentic, premium storytelling.', name: 'Leontine', role: 'Marketing Manager, Northwind', c: '#1E3D38' },
  { q: 'The team turns complex briefings into creative, customer-focused solutions every time.', name: 'Jurgen', role: 'Head of Product, Atoll', c: '#B8472B' },
  { q: 'Thanks to their work we have a site that reflects exactly where our company is headed.', name: 'Robbert', role: 'Co-founder, Pallas', c: '#A8A57F' },
  { q: 'Solution-oriented, exactly what you want as a client — a genuinely great collaboration.', name: 'Bert', role: 'Marketeer, Paragon', c: '#C0703F' },
  { q: 'Compliments on the redesign — only positive feedback, and it converts far better.', name: 'Rick', role: 'Partner, Crava', c: '#2E2140' },
  { q: 'Creative, energetic and bold. They connected our goals to the right audiences.', name: 'Jenno', role: 'Coordinator, Bloomr', c: '#E0A43B' },
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

  /* Each marquee row needs:
     - enough cards to overflow the widest viewport (~2560px) so wrap is offscreen
     - the array's first half must equal its second half so translateX(-50%) loops seamlessly
     A card is 430 + 26 gap = 456px. Repeating 3 quotes ×4 = 12 cards = 5472px track. */
  const rowA = [
    ...quotes.slice(0, 3), ...quotes.slice(0, 3),
    ...quotes.slice(0, 3), ...quotes.slice(0, 3),
  ];
  const rowB = [
    ...quotes.slice(3, 6), ...quotes.slice(3, 6),
    ...quotes.slice(3, 6), ...quotes.slice(3, 6),
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.testi-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.testi-heading', start: 'top 90%' },
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

      <div className="testi-rows flex flex-col gap-[26px]">
        <div className="testi-row testi-row-a flex w-max gap-[26px] will-change-transform">
          {rowA.map((q, i) => <Card key={`a${i}`} data={q} />)}
        </div>
        <div className="testi-row testi-row-b flex w-max gap-[26px] will-change-transform">
          {rowB.map((q, i) => <Card key={`b${i}`} data={q} />)}
        </div>
      </div>
    </section>
  );
}
