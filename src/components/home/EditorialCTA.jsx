'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

export default function EditorialCTA() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.ed-word', { yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: '.editorial', start: 'top 75%' } });
    gsap.from('.ed-fade', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.editorial', start: 'top 70%' } });
  }, { scope: root });

  return (
    <section ref={root} className="editorial">
      <div className="section-wrap">
        <h2>
          {['One studio.', 'Every craft.'].map((line, li) => (
            <span key={li} style={{ display: 'block' }}>
              {line.split(' ').map((w, i) => (
                <span key={i} className="reveal-line">
                  <span className="ed-word reveal-word">{w}&nbsp;</span>
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p className="ed-fade editorial-sub">Social, cinematic, web and brand — under one roof in Dubai.</p>
        <Link href="/contact" className="ed-fade cine-btn">Start a project ↗</Link>
      </div>
    </section>
  );
}