'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const pillars = [
  {
    n: '01',
    name: 'Define',
    desc: 'Strip the brand to its essentials. Identify what only this client can credibly say. Position before production — never the reverse.',
  },
  {
    n: '02',
    name: 'Amplify',
    desc: 'Cinematic content engineered for the algorithm. Hooks designed for retention, not applause. Distribution treated as a science.',
  },
  {
    n: '03',
    name: 'Own',
    desc: 'Convert audience into category authority. Saturate the niche until competitors have to react. Compounding equity, not campaigns.',
  },
];

const voice = [
  { p: 'Controlled',    d: 'Never raise the volume to be heard. Pace, silence, and confident sentence structure carry more weight than enthusiasm.' },
  { p: 'Specific',      d: 'Numbers, names, and verifiable claims. Every adjective earns its place by being unfakeable.' },
  { p: 'Architectural', d: 'Sentences are structured. Ideas are sequenced. The reader feels carried, not chased.' },
  { p: 'Evidence-led',  d: 'Strategy is backed by data; creative is backed by craft references. Opinions are flagged as opinions.' },
  { p: 'Restrained',    d: 'No emojis. No exclamation marks. No urgency theatre. The brand whispers — that is why it carries.' },
];

const facts = [
  { k: 'Founded',  v: '2026',                       sub: 'Dubai, UAE' },
  { k: 'Founder',  v: 'Fraz Saeed',                 sub: 'Director' },
  { k: 'Studio',   v: 'The Place — Al Barsha',      sub: 'Operations' },
  { k: 'Practice', v: 'Branding · Social · Strategy', sub: 'Marketing Management' },
];

export default function AboutPage() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.about-word',     { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.15 });
    gsap.from('.about-fade',     { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5 });
    gsap.from('.about-mf-word',  { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: '.about-manifesto', start: 'top 78%' } });
    gsap.from('.about-pillar',   { y: 40, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.about-pillars', start: 'top 80%' } });
    gsap.from('.about-pos-card', { y: 40, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.about-positioning', start: 'top 82%' } });
    gsap.from('.about-voice-row',{ y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: '.about-voice', start: 'top 84%' } });
    gsap.from('.about-fact',     { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.about-facts', start: 'top 85%' } });
    gsap.from('.about-cta-word', { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.about-cta', start: 'top 82%' } });
  }, { scope: root });

  return (
    <main ref={root} className="pt-[120px]">
      {/* HERO ------------------------------------------------------- */}
      <section className="section-wrap about-hero">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>About — DAO Studio</div>
        <h1 className="display-1" style={{ maxWidth: '18ch' }}>
          {'Signal architecture for craftsmanship-led brands.'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="about-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h1>
        <div className="about-hero-grid">
          <p className="about-fade body-lg" style={{ color: 'var(--color-inksoft)' }}>
            DAO Studio is an independent digital agency in Dubai working with
            operators of high-end fit-out, renovation, real estate and interior
            design firms. We turn craftsmanship into category leadership through
            controlled signal, not noise.
          </p>
          <div className="about-fade about-hero-meta">
            <div><span className="eyebrow text-inksoft">Discipline</span><p className="body">Branding · Social · Strategy</p></div>
            <div><span className="eyebrow text-inksoft">Based</span><p className="body">Dubai, UAE</p></div>
            <div><span className="eyebrow text-inksoft">Audience</span><p className="body">Owner-operators, AED 5M – 80M</p></div>
          </div>
        </div>
      </section>

      {/* MANIFESTO -------------------------------------------------- */}
      <section className="section-wrap about-manifesto">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Manifesto</div>
        <blockquote className="about-manifesto-quote">
          {'We work with operators who already build beautifully. Our job is to make sure the right people see it — and remember who did it.'.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="about-mf-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </blockquote>
        <footer className="about-manifesto-sig">
          <span className="about-manifesto-dot" />
          DAO Studio · Position before production
        </footer>
      </section>

      {/* PILLARS — Define / Amplify / Own --------------------------- */}
      <section className="section-wrap section-pad about-pillars">
        <div className="st-head-row">
          <div>
            <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Method</div>
            <h2 className="section-title">Define. Amplify. Own.</h2>
          </div>
          <p className="body" style={{ maxWidth: '32ch', color: 'var(--color-inksoft)' }}>
            Three phases of the client relationship. Each leans on the last —
            skip one and the next collapses.
          </p>
        </div>
        <div className="about-pillar-grid">
          {pillars.map((p) => (
            <div key={p.n} className="about-pillar">
              <span className="about-pillar-num">{p.n}</span>
              <h3 className="about-pillar-name">{p.name}</h3>
              <p className="body" style={{ color: 'var(--color-inksoft)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSITIONING ------------------------------------------------ */}
      <section className="section-wrap section-pad about-positioning">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Positioning</div>
        <h2 className="section-title" style={{ marginBottom: 48, maxWidth: '20ch' }}>
          Who we work with, and how.
        </h2>
        <div className="about-pos-grid">
          <article className="about-pos-card">
            <span className="eyebrow text-inksoft">Audience</span>
            <h3 className="card-title" style={{ marginTop: 14 }}>
              Owner-operators of high-end fit-out, renovation, real estate and interior design firms.
            </h3>
            <p className="body" style={{ marginTop: 18, color: 'var(--color-inksoft)' }}>
              Annual revenue AED 5M — 80M. Founders or managing partners.
              Time-poor, taste-rich, allergic to gimmicks. They have spent a
              decade earning their reputation by hand and resent the idea that
              "marketing" might cheapen it. We give them the opposite:
              marketing as architecture.
            </p>
          </article>
          <article className="about-pos-card">
            <span className="eyebrow text-inksoft">Positioning</span>
            <h3 className="card-title" style={{ marginTop: 14 }}>
              Not an agency. A signal architect for craftsmanship-led businesses.
            </h3>
            <p className="body" style={{ marginTop: 18, color: 'var(--color-inksoft)' }}>
              The market is saturated with content shops that produce volume.
              We produce specificity — content systems engineered around
              algorithm physics, brand semiotics, and the actual psychology of a
              HNW Dubai buyer. We compete on precision, not pricing.
            </p>
          </article>
        </div>
      </section>

      {/* VOICE — 5 principles --------------------------------------- */}
      <section className="section-wrap section-pad about-voice">
        <div className="st-head-row">
          <div>
            <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Voice</div>
            <h2 className="section-title">How we sound.</h2>
          </div>
          <p className="body" style={{ maxWidth: '32ch', color: 'var(--color-inksoft)' }}>
            Luxury is communicated through restraint. Authority through evidence, not adjectives.
          </p>
        </div>
        <div className="about-voice-list">
          {voice.map((v) => (
            <div key={v.p} className="about-voice-row">
              <span className="about-voice-name">{v.p}</span>
              <p className="body" style={{ color: 'var(--color-inksoft)' }}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STUDIO FACTS ----------------------------------------------- */}
      <section className="section-wrap section-pad about-facts">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>The studio</div>
        <div className="about-facts-grid">
          {facts.map((f) => (
            <div key={f.k} className="about-fact">
              <span className="eyebrow text-inksoft">{f.k}</span>
              <div className="about-fact-v">{f.v}</div>
              <div className="meta text-inksoft">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA -------------------------------------------------------- */}
      <section className="section-wrap" style={{ paddingTop: 60, paddingBottom: 120 }}>
        <div className="about-cta hc-card">
          <h2 className="hc-title">
            {'Restraint is the loudest thing we own.'.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className="about-cta-word reveal-word">{w}&nbsp;</span>
              </span>
            ))}
          </h2>
          <Link href="/contact" className="btn-light">Work with us ↗</Link>
        </div>
      </section>
    </main>
  );
}
