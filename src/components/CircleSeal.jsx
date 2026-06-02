'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CircleSeal({ label, center }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Roman numeral: scrub-driven scale-in + drift-up ── */
      gsap.fromTo(
        '.cb-numeral',
        { opacity: 0, y: 90, scale: 0.65 },
        {
          opacity: 1, y: 0, scale: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
      /* After landing, numeral drifts up as section exits */
      gsap.to('.cb-numeral', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'center 60%',
          end: 'bottom top',
          scrub: 1,
        },
      });

      /* ── Gold line: scrub draw left → right ── */
      gsap.fromTo(
        '.cb-line-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      /* ── Title words: scrub-driven y-rise, sub-staggered per word ── */
      gsap.utils.toArray('.cb-word').forEach((word, i) => {
        gsap.fromTo(
          word,
          { yPercent: 110 },
          {
            yPercent: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root.current,
              start: `top ${72 - i * 4}%`,
              end: `top ${32 - i * 4}%`,
              scrub: 1,
            },
          }
        );
      });

      /* ── Meta labels: scrub fade-up ── */
      gsap.fromTo(
        '.cb-meta',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      /* ── Background orb: parallax scale + drift ── */
      gsap.to('.cb-orb', {
        scale: 1.18,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      /* ── Title block itself drifts up as section exits ── */
      gsap.to('.cb-title', {
        yPercent: -16,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'center 50%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="chapter-band">
      <div className="cb-grain" aria-hidden />
      <div className="cb-light cb-light-l" aria-hidden />
      <div className="cb-light cb-light-r" aria-hidden />
      <div className="cb-orb" aria-hidden />

      <div className="cb-inner">
        <div className="cb-top">
          <span className="cb-meta cb-meta-l">
            <span className="cb-meta-dot" />
            Chapter
          </span>
          <span className="cb-meta cb-meta-r">DAO Marketing Management · Dubai</span>
        </div>

        <div className="cb-numeral" aria-hidden>{center}</div>

        <div className="cb-line">
          <span className="cb-line-fill" aria-hidden />
        </div>

        <h2 className="cb-title">
          {label.split(' ').map((w, i) => (
            <span key={i} className="cb-line-wrap">
              <span className="cb-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
