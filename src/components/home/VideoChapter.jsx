'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Set to a file in /public — e.g. '/videos/studio.mp4' or '/images/studio.jpg'.
   Leave as '' to keep the placeholder. */
const CHAPTER_MEDIA = '/images/cine1.png';
const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s);

export default function VideoChapter() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.chapter-media', { yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.chapter', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.chapter-rise', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.chapter', start: 'top 60%' } });
  }, { scope: root });

  return (
    <section ref={root} className="chapter">
      <div className="chapter-media">
        {!CHAPTER_MEDIA ? (
          <div className="chapter-media-ph" />
        ) : isVideo(CHAPTER_MEDIA) ? (
          <video src={CHAPTER_MEDIA} autoPlay muted loop playsInline />
        ) : (
          <img src={CHAPTER_MEDIA} alt="" />
        )}
      </div>
      <div className="chapter-veil" />
      <div className="chapter-inner">
        <div className="chapter-num chapter-rise">01</div>
        <div className="chapter-eyebrow chapter-rise">Inside the studio</div>
        <h2 className="chapter-rise">Welcome to DAO Studio</h2>
        <div className="chapter-line chapter-rise" />
      </div>
    </section>
  );
}
