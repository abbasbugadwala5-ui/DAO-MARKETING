'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const HERO_VIDEO = '/videos/dubai%20aerial.mp4';

const pillars = [
  {
    n: '01',
    name: 'Define',
    desc: 'Strip the brand to its essentials. Identify what only this client can credibly say. Position before production — never the reverse.',
    bg: '#1E3D38',
    accent: '#BEC1A6',
  },
  {
    n: '02',
    name: 'Amplify',
    desc: 'Cinematic content engineered for the algorithm. Hooks designed for retention, not applause. Distribution treated as a science.',
    bg: '#B8472B',
    accent: '#F4EDD8',
  },
  {
    n: '03',
    name: 'Own',
    desc: 'Convert audience into category authority. Saturate the niche until competitors have to react. Compounding equity, not campaigns.',
    bg: '#2E2140',
    accent: '#E0A43B',
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

function Words({ text, className = 'about-word' }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="reveal-line">
      <span className={`${className} reveal-word`}>{w}&nbsp;</span>
    </span>
  ));
}

export default function AboutPage() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* HERO ---------------------------------------------------------- */
    gsap.from('.about-word', {
      yPercent: 120, duration: 1.15, ease: 'expo.out', stagger: 0.06, delay: 0.2,
    });
    gsap.from('.about-hero-fade', {
      y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.55,
    });
    gsap.to('.about-hero-video', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.about-hero-headline', {
      yPercent: 14, opacity: 0.5, ease: 'none',
      scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    /* MANIFESTO ----------------------------------------------------- */
    gsap.from('.about-mf-word', {
      yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: '.about-manifesto', start: 'top 78%' },
    });
    gsap.from('.about-mf-line', {
      scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: '.about-manifesto', start: 'top 78%' },
    });

    /* PILLARS (sticky stack) --------------------------------------- */
    const cards = gsap.utils.toArray('[data-pillar-card]');
    cards.forEach((card, i) => {
      card.style.top = `${120 + i * 46}px`;
      card.style.marginBottom = i < cards.length - 1 ? '14vh' : '0';
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 1 - (cards.length - i) * 0.012,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        });
      }
    });
    gsap.from('.about-pillars-title .reveal-word', {
      yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '.about-pillars', start: 'top 82%' },
    });

    /* POSITIONING --------------------------------------------------- */
    gsap.from('.about-pos-card', {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.about-positioning', start: 'top 80%' },
    });

    /* VOICE — staggered slide-in with divider draw -------------------- */
    gsap.from('.about-voice-row', {
      y: 26, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.about-voice', start: 'top 82%' },
    });
    gsap.from('.about-voice-divider', {
      scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '.about-voice', start: 'top 82%' },
    });

    /* FACTS — count-in feel via scale + fade ------------------------ */
    gsap.from('.about-fact', {
      y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.about-facts', start: 'top 85%' },
    });

    /* CTA — large serif reveal -------------------------------------- */
    gsap.from('.about-cta-word', {
      yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.about-cta', start: 'top 82%' },
    });
    gsap.from('.about-cta-btn', {
      y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
      scrollTrigger: { trigger: '.about-cta', start: 'top 82%' },
    });
  }, { scope: root });

  return (
    <main ref={root} className="about-root">
      {/* HERO ------------------------------------------------------- */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <video
            className="about-hero-video"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="about-hero-veil" />
        </div>

        <div className="about-hero-side l">Dubai · Est. 2026</div>
        <div className="about-hero-side r">Branding · Social · Strategy</div>

        <div className="section-wrap about-hero-inner">
          <div className="eyebrow about-hero-fade" style={{ color: 'rgba(255,255,255,0.7)' }}>
            About — DAO Studio
          </div>
          <h1 className="about-hero-headline display-1">
            <Words text="Signal architecture for craftsmanship-led brands." />
          </h1>
          <div className="about-hero-grid">
            <p className="about-hero-fade body-lg">
              DAO Studio is an independent digital agency in Dubai working with
              operators of high-end fit-out, renovation, real estate and interior
              design firms. We turn craftsmanship into category leadership through
              controlled signal, not noise.
            </p>
            <div className="about-hero-fade about-hero-meta">
              <div><span className="eyebrow">Discipline</span><p className="body">Branding · Social · Strategy</p></div>
              <div><span className="eyebrow">Based</span><p className="body">Dubai, UAE</p></div>
              <div><span className="eyebrow">Audience</span><p className="body">Owner-operators · AED 5M – 80M</p></div>
            </div>
          </div>
        </div>

        <div className="about-hero-cue">Scroll<span /></div>
      </section>

      {/* MANIFESTO -------------------------------------------------- */}
      <section className="section-wrap about-manifesto">
        <div className="about-mf-line" />
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

      {/* PILLARS — sticky stack ------------------------------------- */}
      <section className="section-wrap section-pad about-pillars">
        <div className="about-pillars-head">
          <div>
            <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Method</div>
            <h2 className="section-title about-pillars-title">
              {'Define. Amplify. Own.'.split(' ').map((w, i) => (
                <span key={i} className="reveal-line">
                  <span className="reveal-word">{w}&nbsp;</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="body" style={{ maxWidth: '34ch', color: 'var(--color-inksoft)' }}>
            Three phases of the client relationship. Each leans on the last —
            skip one and the next collapses.
          </p>
        </div>

        <div className="about-pillar-stack">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              data-pillar-card
              className="about-pillar-card"
              style={{ background: p.bg, '--accent': p.accent, '--i': i }}
            >
              <header className="about-pillar-head">
                <span className="about-pillar-tag">{p.n} / 03</span>
                <span className="about-pillar-dot" />
              </header>
              <div className="about-pillar-body">
                <h3 className="about-pillar-name">{p.name}</h3>
                <p className="about-pillar-desc">{p.desc}</p>
              </div>
              <div className="about-pillar-num" aria-hidden>{p.n}</div>
            </article>
          ))}
        </div>
      </section>

      {/* POSITIONING ------------------------------------------------ */}
      <section className="section-wrap section-pad about-positioning">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Positioning</div>
        <h2 className="section-title" style={{ marginBottom: 48, maxWidth: '22ch' }}>
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
              &ldquo;marketing&rdquo; might cheapen it. We give them the opposite:
              marketing as architecture.
            </p>
            <div className="about-pos-foot">
              <span>01</span><span>Audience profile</span>
            </div>
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
            <div className="about-pos-foot">
              <span>02</span><span>Market stance</span>
            </div>
          </article>
        </div>
      </section>

      {/* VOICE — 5 principles --------------------------------------- */}
      <section className="section-wrap section-pad about-voice">
        <div className="about-voice-head">
          <div>
            <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>Voice</div>
            <h2 className="section-title">How we sound.</h2>
          </div>
          <p className="body" style={{ maxWidth: '34ch', color: 'var(--color-inksoft)' }}>
            Luxury is communicated through restraint. Authority through evidence, not adjectives.
          </p>
        </div>
        <div className="about-voice-list">
          <div className="about-voice-divider" />
          {voice.map((v, i) => (
            <div key={v.p} className="about-voice-row">
              <span className="about-voice-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="about-voice-name">{v.p}</span>
              <p className="body about-voice-desc">{v.d}</p>
              <div className="about-voice-divider" />
            </div>
          ))}
        </div>
      </section>

      {/* STUDIO FACTS ----------------------------------------------- */}
      <section className="section-wrap section-pad about-facts">
        <div className="eyebrow text-inksoft" style={{ marginBottom: 18 }}>The studio</div>
        <h2 className="section-title" style={{ marginBottom: 36, maxWidth: '22ch' }}>
          A small studio, sharply focused.
        </h2>
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
      <section className="section-wrap about-cta-wrap">
        <div className="about-cta">
          <span className="eyebrow about-cta-eyebrow">— Work with the studio</span>
          <h2 className="about-cta-title">
            {'Restraint is the loudest thing we own.'.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className="about-cta-word reveal-word">{w}&nbsp;</span>
              </span>
            ))}
          </h2>
          <Link href="/contact" className="about-cta-btn">
            Work with us
            <span aria-hidden className="about-cta-arrow">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
