'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Set to a file in /public — e.g. '/videos/studio.mp4' or '/images/studio.jpg'.
   Leave as '' to keep the placeholder. */
const CHAPTER_MEDIA = '/images/cine%2031.jpg';
const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s);

export default function VideoChapter() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Media parallax + slight scale through the section */
    gsap.to('.chapter-media', {
      yPercent: 18,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });

    /* Headline rises into place as user scrolls in */
    gsap.fromTo(
      '.chapter-rise',
      { y: 70, opacity: 0 },
      {
        y: 0, opacity: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    /* Then drifts UP + fades as the section exits viewport — layered parallax */
    gsap.to('.chapter-rise', {
      yPercent: -28,
      opacity: 0.45,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'center top',
        end: 'bottom top',
        scrub: 1,
      },
    });
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
        {/* <div className="chapter-num chapter-rise">01</div>
        <div className="chapter-eyebrow chapter-rise">Inside the Agency</div> */}
        <h2 className="chapter-rise">Every Touchpoint Has to Feel Right</h2>
        <p className="chapter-body chapter-rise">
          We connect your content, social media, and website into one clean brand experience that feels polished from start to finish.
        </p>
        <div className="chapter-line chapter-rise" />
      </div>
    </section>
  );
}
