'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const HEADLINE = ['Now it’s', 'your move!!'];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/daostudio' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/daostudio' },
  { label: 'Behance',   href: 'https://behance.net/daostudio' },
  { label: 'TikTok',    href: 'https://tiktok.com/@daostudio' },
];

export default function Footer() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.foot-word', {
      yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.foot-heading', start: 'top 92%' },
    });
    gsap.from('.foot-fade', {
      y: 22, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.foot-heading', start: 'top 78%' },
    });
  }, { scope: root });

  return (
    <footer ref={root} id="footer" className="dao-footer">
      <h2 className="foot-heading">
        {HEADLINE.map((line, li) => (
          <span key={li} className="foot-line">
            {line.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className="foot-word reveal-word">{w}&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </h2>

      <Link href="/contact" className="foot-cta foot-fade">Contact us</Link>

      <div className="foot-socials foot-fade">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>

      <div className="foot-mark foot-fade"><b>DAO</b> </div>

      <p className="foot-addr foot-fade">Design District, Dubai, UAE</p>
      <p className="foot-copy foot-fade">© 2026 DAO Studio. All rights reserved.</p>
    </footer>
  );
}
