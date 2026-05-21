'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OurStorySection() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.story-h-word', { yPercent: 110 });
      gsap.set('.os-tagline', { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to('.story-h-word:nth-child(1)', { yPercent: 0, duration: 1, ease: 'power3.out' })
        .to('.story-h-word:nth-child(2)', { yPercent: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .to('.os-tagline', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .to({}, { duration: 0.8 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="os-intro">
      <h2 className="story-h">
        <span className="story-h-line"><span className="story-h-word">Our</span></span>
        <span className="story-h-line"><span className="story-h-word">Story</span></span>
      </h2>
      <div className="os-tagline">
        <span aria-hidden className="os-tagline-rule" />
        <span>A young studio, with senior taste.</span>
        <span aria-hidden className="os-tagline-rule" />
      </div>
    </section>
  );
}
