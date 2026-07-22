'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG = {
  process1: '/images/cine-18.jpg',
  process2: '/images/cine-23.jpg',
  process3: '/images/cine-5.webp',
};

export default function WhatHappensNext() {
  const procRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray('.proc-stage');
      if (!stages.length || !procRef.current) return;

      const mm = gsap.matchMedia();

      /* ─── PINNED 3-STAGE CROSS-FADE — desktop AND mobile ─── */
      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          isMobile:  '(max-width: 900px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          gsap.set(stages, { autoAlpha: 0 });
          gsap.set(stages[0], { autoAlpha: 1 });

          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: procRef.current,
              start: 'top top',
              end: isDesktop ? '+=180%' : '+=140%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.from('.proc-stage-1 .proc-text',  { xPercent: -25, opacity: 0, duration: 0.8 }, 0)
            .from('.proc-stage-1 .proc-photo', { xPercent: 25,  opacity: 0, duration: 0.8 }, 0.1)
            .to({}, { duration: 1.0 });

          tl.to(stages[0], { autoAlpha: 0, duration: 0.5 })
            .fromTo(stages[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '<')
            .from('.proc-stage-2 .proc-photo', { xPercent: -25, opacity: 0, duration: 0.8 }, '<')
            .from('.proc-stage-2 .proc-text',  { xPercent: 25,  opacity: 0, duration: 0.8 }, '<+0.1')
            .to({}, { duration: 1.0 });

          tl.to(stages[1], { autoAlpha: 0, duration: 0.5 })
            .fromTo(stages[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '<')
            .from('.proc-stage-3 .proc-text',  { xPercent: -25, opacity: 0, duration: 0.8 }, '<')
            .from('.proc-stage-3 .proc-photo', { xPercent: 25,  opacity: 0, duration: 0.8 }, '<+0.1')
            .to({}, { duration: 1.0 });
        }
      );

      gsap.from('.whn-cta-inner > *', {
        y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.whn-cta', start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="cv2-proc-pin" ref={procRef}>
        <div className="proc-stage proc-stage-1">
          <div className="proc-text">
            <span className="proc-eyebrow">01 · Reply</span>
            <p>You hear back within <em>24 hours</em>. One of our team members reads every enquiry — no auto-responder, no triage.</p>
          </div>
          <div className="proc-photo">
            <img loading="lazy" decoding="async" src={IMG.process1} alt="" />
          </div>
        </div>

        <div className="proc-stage proc-stage-2">
          <div className="proc-photo">
            <img loading="lazy" decoding="async" src={IMG.process2} alt="" />
          </div>
          <div className="proc-text">
            <span className="proc-eyebrow">02 · Discovery</span>
            <p>A <em>30-minute call</em> to align on goals, scope and timeline. No pitch theatre, no slide deck — just a clear conversation.</p>
          </div>
        </div>

        <div className="proc-stage proc-stage-3">
          <div className="proc-text">
            <span className="proc-eyebrow">03 · Proposal</span>
            <p>A <em>tailored proposal</em> with scope, milestones and pricing — usually within a week of the discovery call.</p>
          </div>
          <div className="proc-photo">
            <img loading="lazy" decoding="async" src={IMG.process3} alt="" />
          </div>
        </div>
      </section>

      <section className="whn-cta">
        <div className="whn-cta-inner">
          <div className="whn-cta-eyebrow">Ready when you are</div>
          <h3 className="whn-cta-title">
            Let&rsquo;s start the <em>conversation</em>.
          </h3>
          <p className="whn-cta-lede">
            Share the brief — a clear next step lands in your inbox within a day.
          </p>
          <Link href="/contact" className="whn-cta-btn">
            Start a conversation
            <span aria-hidden className="whn-cta-arrow">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
