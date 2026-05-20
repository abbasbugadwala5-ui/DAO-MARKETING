'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const meta = [
  { h: 'Contact', lines: ['+971 4 000 0000', 'hello@daostudio.ae'] },
  { h: 'Networks', lines: ['Shopify Partners', 'Framer Experts'] },
  { h: 'Address', lines: ['Design District', 'Dubai, UAE'] },
  { h: 'Featured in', lines: ['Awwwards', 'FWA · CSSDA'] },
];

const socials = ['Instagram', 'LinkedIn', 'Behance', 'Dribbble'];

export default function Footer() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.foot-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '.foot-heading', start: 'top 90%' },
    });

    // parallax on cards + wordmark
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      gsap.to(el, {
        y: parseFloat(el.dataset.parallax),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }, { scope: root });

  return (
    <footer
      ref={root}
      id="footer"
      className="relative mt-[90px] overflow-hidden rounded-t-[40px] bg-black pt-[90px] text-white"
    >
      <div className="section-wrap relative z-[2] text-left">
        <div className="grid grid-cols-[1.25fr_1fr] gap-[50px] max-lg:grid-cols-1">
          {/* left */}
          <div>
            <h2
              className="foot-heading section-title"
              style={{ fontSize: 'clamp(28px, 3.4vw, 52px)' }}
            >
              {['Good things start with a', 'conversation.'].map((line, li) => (
                <span key={li} className="block">
                  {line.split(' ').map((w, i) => (
                    <span key={i} className="reveal-line">
                      <span className="foot-word reveal-word">{w}&nbsp;</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-9 max-sm:grid-cols-1">
              {meta.map((m) => (
                <div key={m.h} className="text-left">
                  <h4 className="eyebrow mb-3 text-[#8a8fa3]">{m.h}</h4>
                  {m.lines.map((l) => (
                    l.includes('@') ? (
                      <a key={l} href={`mailto:${l}`} className="body-sm leading-[1.6] transition-opacity hover:opacity-70">{l}</a>
                    ) : (
                      <p key={l} className="body-sm leading-[1.6]">{l}</p>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* right — parallax cards */}
          <div className="flex flex-col gap-6">
            <div data-parallax="-30"
              className="flex items-center gap-5 rounded-[24px] bg-[#1b2238] p-6 will-change-transform">
              <div className="h-[120px] w-[120px] flex-none rounded-[14px]"
                style={{ background: 'linear-gradient(150deg,#3a5648,#1d3026)' }} />
              <div className="text-left">
                <h5 className="heading-sm">
                  DAO Studio launches Conversion Rate Optimization services
                </h5>
                <div className="eyebrow mt-4 flex gap-4 text-[#8a8fa3]">
                  <span>News</span><span>Services</span>
                </div>
              </div>
            </div>
            <div data-parallax="-60"
              className="grid h-[230px] place-items-center rounded-[24px] bg-[#c9d0c4] text-[36px] font-semibold tracking-[-0.03em] text-navy will-change-transform">
              dao®
            </div>
          </div>
        </div>

        {/* giant wordmark */}
        <div
          data-parallax="40"
          className="mt-[60px] flex items-center whitespace-nowrap font-semibold leading-[0.78] tracking-[-0.05em] will-change-transform"
          style={{ fontSize: 'clamp(64px, 15vw, 220px)' }}
        >
          DAO
        </div>

        {/* bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-5 py-[34px] pb-10">
          <span className="meta text-[#8a8fa3]">
            © 2026 DAO Studio. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="body-sm flex items-center gap-2 rounded-full bg-[#222a44] px-[22px] py-[13px] font-medium hover:bg-[#323b5c]"
              >
                {s} ↗
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}