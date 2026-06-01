'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DAOMethod from '@/components/DAOMethod';

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
  founderBg: '/images/founder-bg.jpg',
  founder:   '/images/founder-fraz.jpg',
  mask:      '/images/cine%2030.jpg',
};

const STUDIO = [
  { src: IMG.studio1, label: 'Cinematic at every frame' },
  { src: IMG.studio2, label: 'Built for luxury developers' },
  { src: IMG.studio3, label: 'Made independently in Dubai' },
];

export default function About({ showDAO = true }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Basic enter-once fade-ups for small elements */
      gsap.utils.toArray('.a-reveal').forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      /* ── HERO scroll-out parallax ───────────────────── */
      gsap.to('.av2-hero-text', {
        yPercent: -22,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.av2-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.av2-hero-cards', {
        yPercent: -10,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: '.av2-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.utils.toArray('.av2-hero-card img').forEach((img, i) => {
        gsap.to(img, {
          yPercent: i === 0 ? -10 : -16,   // each card scrolls at slightly different speed
          ease: 'none',
          scrollTrigger: {
            trigger: '.av2-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      /* ── STUDIO cards — sequential scrub reveal, one by one ── */
      gsap.utils.toArray('.av2-studio-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 110, opacity: 0, scale: 0.92, rotationX: -18 },
          {
            y: 0, opacity: 1, scale: 1, rotationX: 0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
      /* Studio grid container — add slight upward drift as section progresses */
      gsap.to('.av2-studio-grid', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.av2-studio',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      /* ── FOUNDER section — dramatic scroll-driven entrance ─── */
      gsap.fromTo(
        '.av2-founder-card',
        { y: 140, opacity: 0, rotationX: -20, scale: 0.85 },
        {
          y: 0, opacity: 1, rotationX: 0, scale: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.av2-founder',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
      /* Founder bg image — parallax scrub */
      gsap.to('.av2-founder-bg img', {
        yPercent: 18,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.av2-founder',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      /* Founder quote rises into place */
      gsap.fromTo(
        '.av2-founder-quote',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.av2-founder',
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
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

      {showDAO && <DAOMethod />}

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
          <img src={IMG.founder} alt="Fraz Saeed, Founder of DAO Marketing" />
          <div className="av2-founder-meta">
            <div className="av2-founder-name">Fraz Saeed</div>
            <div className="av2-founder-role">Founder &amp; Creative Director</div>
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
