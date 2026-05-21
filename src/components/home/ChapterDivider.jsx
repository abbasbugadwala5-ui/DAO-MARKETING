'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

export default function ChapterDivider({
  number,
  eyebrow,
  title,
  italic,
  video,
  image,
}) {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.chapter-word', {
      yPercent: 120,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: root.current, start: 'top 75%' },
    });
    gsap.from('.chapter-meta', {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    });
    gsap.from('.chapter-cue', {
      y: 16,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.4,
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    });

    gsap.to('.chapter-bg-media', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: root });

  return (
    <section ref={root} className="chapter-divider">
      <div className="chapter-bg" aria-hidden>
        {video ? (
          <video
            className="chapter-bg-media"
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : image ? (
          <img className="chapter-bg-media" src={image} alt="" />
        ) : null}
        <div className="chapter-veil" />
        <div className="chapter-grain" aria-hidden />
      </div>

      <div className="chapter-inner">
        <div className="chapter-meta">
          <span className="chapter-num">{number}</span>
          <span className="chapter-line" aria-hidden />
          <span className="chapter-eyebrow">{eyebrow}</span>
        </div>

        <h2 className="chapter-title">
          {title.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="chapter-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
          {italic && (
            <span className="reveal-line">
              <span className="chapter-word reveal-word chapter-italic">{italic}</span>
            </span>
          )}
        </h2>

        <div className="chapter-cue">
          <span>Continue</span>
          <span className="chapter-cue-line" aria-hidden />
        </div>
      </div>
    </section>
  );
}
