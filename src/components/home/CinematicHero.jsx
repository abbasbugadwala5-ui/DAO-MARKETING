'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const HEADLINE = 'Bold work for ambitious brands';

/* Background video — plays full-bleed behind the headline.
   Drop another file in /public/videos and swap this path. */
const HERO_VIDEO = '/videos/video1.mp4';

/* ─── Image mosaic (commented out for now) ──────────────────────────
   Re-enable by uncommenting these + the JSX block below, and removing
   the <video> render.

const TILES = 36; // 6-column grid

const TILE_MEDIA = [
  '/images/cine1.png',
  '/images/cine%202.png',
  '/images/cine%203.png',
  '/images/cine%204.jpg',
  '/images/cine%205.png',
  '/images/cine%206.png',
  '/images/cine%207.png',
  '/images/cine%208.jpg',
  '/images/cine%209.jpg',
  '/images/cine%2010.jpg',
  '/images/cine%2011.jpg',
  '/images/cine%2012.png',
  '/images/cine%2013.jpg',
  '/images/cine%2014.png',
  '/images/cine%2015.jpg',
  '/images/cine%2016.jpg',
  '/images/cine%2017.png',
  '/images/cine%2018.jpg',
  '/images/cine%2019.png',
  '/images/cine%2020.jpg',
  '/images/cine%2021.jpg',
  '/images/cine%2022.jpg',
  '/images/cine%2023.jpg',
  '/images/cine%2024.jpg',
  '/images/cine%2024.png',
  '/images/cine%2025.png',
  '/images/cine%2026.jpg',
  '/images/cine%2027.png',
  '/images/cine%2028.png',
  '/images/cine%2029.jpg',
  '/images/cine%2030.jpg',
  '/images/cine%2031.jpg',
  '/images/cine%2032.jpg',
  '/images/cine%2033.png',
  '/images/cine%2034.jpg',
];

const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s);
─────────────────────────────────────────────────────────────────── */

export default function CinematicHero() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.cine-word', { yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.2 });
    gsap.to('.cine-mosaic', { yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: '.cine-hero', start: 'top top', end: 'bottom top', scrub: true } });
  }, { scope: root });

  return (
    <section ref={root} className="cine-hero">
      <div className="cine-mosaic">
        <video
          className="cine-bg-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* ─── Image mosaic JSX (commented out) ─────────────────────
        {Array.from({ length: TILES }).map((_, i) => {
          const src = TILE_MEDIA.length ? TILE_MEDIA[i % TILE_MEDIA.length] : null;
          return (
            <div key={i} className="cine-tile">
              {!src ? (
                <div className="cine-tile-ph" />
              ) : isVideo(src) ? (
                <video src={src} autoPlay muted loop playsInline />
              ) : (
                <img src={src} alt="" />
              )}
            </div>
          );
        })}
        ──────────────────────────────────────────────────────────── */}
      </div>
      <div className="cine-veil" />
      <div className="cine-side l">Dubai · Est. 2010</div>
      <div className="cine-side r">Social · Cinematic · Web · Branding</div>
      <div className="cine-inner">
        <img
          src="/logo/logo.svg"
          alt="DAO Studio"
          className="cine-logo"
        />
        <h1>
          {HEADLINE.split(' ').map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="cine-word reveal-word">{w}&nbsp;</span>
            </span>
          ))}
        </h1>
      </div>
      <div className="cine-cue">Explore our approach<span /></div>
    </section>
  );
}
