'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Real assets — spaces URL-encoded as %20 to match filenames in /public/images */
const IMG = {
  heroA:     '/images/cine%202.png',
  heroB:     '/images/cine%203.png',
  studio1:   '/images/cine%2011.jpg',
  studio2:   '/images/cine%2017.png',
  studio3:   '/images/cine%2022.jpg',
  story1:    '/images/cine%2014.png',
  story2:    '/images/cine%2019.png',
  story3:    '/images/cine%2025.png',
  founderBg: '/images/cine%2026.jpg',
  founder:   '/images/cine%2012.png',
  mask:      '/images/cine%2030.jpg',
};

const STUDIO = [
  { src: IMG.studio1, label: 'Cinematic at every frame' },
  { src: IMG.studio2, label: 'Built for luxury developers' },
  { src: IMG.studio3, label: 'Made independently in Dubai' },
];

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.a-reveal').forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="about-v2">
      {/* HERO */}
      <section className="av2-hero">
        <div className="av2-hero-grid">
          <div className="av2-hero-text">
            <div className="av2-eyebrow a-reveal">DAO Studio · Recently opened · Dubai</div>
            <h1 className="av2-hero-title a-reveal">
              We build <em>cinematic</em> brands<br />
              for Dubai&rsquo;s most ambitious developers.
            </h1>
            <p className="av2-hero-lede a-reveal">
              A small, independent studio with senior taste. Social, film, web,
              and brand work — produced with the discipline of a print magazine
              and the pace of a production house.
            </p>
          </div>
          <div className="av2-hero-cards a-reveal">
            <div className="av2-hero-card"><img src={IMG.heroA} alt="" /><div className="av2-hero-card-label">Cinematic film</div></div>
            <div className="av2-hero-card"><img src={IMG.heroB} alt="" /><div className="av2-hero-card-label">Editorial brand work</div></div>
          </div>
        </div>
      </section>

      {/* STUDIO CARDS */}
      <section className="av2-studio">
        <div className="av2-studio-grid">
          {STUDIO.map((c, i) => (
            <div key={i} className="av2-studio-card a-reveal" style={{ '--i': i }}>
              <img src={c.src} alt="" />
              <div className="av2-studio-label">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER PORTRAIT */}
      <section className="av2-founder">
        <div className="av2-founder-bg" aria-hidden><img src={IMG.founderBg} alt="" /></div>
        <div className="av2-founder-card a-reveal">
          <img src={IMG.founder} alt="" />
          <div className="av2-founder-meta">
            <div className="av2-founder-name">Fraz Saeed</div>
            <div className="av2-founder-role">Founder & Creative Director</div>
          </div>
        </div>
        <div className="av2-founder-quote a-reveal">
          &ldquo;Every frame, every word, every pixel —<br />
          built to make luxury feel inevitable.&rdquo;
        </div>
      </section>

    </main>
  );
}
