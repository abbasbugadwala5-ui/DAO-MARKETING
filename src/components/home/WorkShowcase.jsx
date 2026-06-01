'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Map a video src to a poster image. Per-panel mapping uses existing
   images in /public/images/ so nothing 404s while real frame-extracted
   posters haven't been generated (ffmpeg pipeline pending). */
function posterFor(videoSrc) {
  const name = videoSrc.split('/').pop().toLowerCase();
  if (name.startsWith('shoots')) return '/images/shooting1.jpg';
  if (name.startsWith('edits'))  return '/images/edits4.jpg';
  // cinematic + everything else → the hero LCP image (already cached)
  return '/images/cine1.webp';
}

/* Lazy video card — only sets `src` once the element scrolls into
   viewport (with a 200px head-start). Poster + preload="none" keep
   bandwidth low until needed. */
function LazyVideo({ src, poster, className, ariaLabel }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || shouldLoad) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  const a11y = ariaLabel
    ? { 'aria-label': ariaLabel }
    : { 'aria-hidden': 'true' };

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      {...a11y}
    />
  );
}

/* Each panel = one category.
   To add Sama Al Tariq content: set `bg` to a path like '/images/sat-bg-1.jpg'
   or a video '/videos/sat-1.mp4', and set each card's `src` similarly.
   Empty strings fall back to a tinted gradient so the layout still renders. */
const PANELS = [
  {
    label: 'Cinematic',
    caption: 'Frames that feel like cinema',
    bg: '',
    tint: '#0A0908',              /* Unified cinematic black */
    cards: [
      { src: '/videos/cinematic-1.mp4',   w: 320, h: 540, left:  '3%', top: '13%', rot: -2 },
      { src: '/videos/cinematic-2.mp4',   w: 320, h: 540, left: '28%', top:  '9%', rot:  1 },
      { src: '/videos/cinematic-3.mp4',   w: 320, h: 540, left: '53%', top: '13%', rot: -1 },
      { src: '/videos/cinematic-copy.mp4', w: 320, h: 540, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Social Media',
    caption: 'Stories the algorithm rewards',
    bg: '',
    tint: '#0A0908',              /* Unified cinematic black */
    cards: [
      { src: '/images/sama%20linkedin2.webp', alt: 'Sama Al Tariq LinkedIn campaign post',     w: 315, h: 420, left: '2%',  top: '12%', rot: -2 },
      { src: '/images/insta%20sama1.webp',    alt: 'Sama Al Tariq Instagram post creative',    w: 305, h: 402, left: '28%', top: '17%', rot:  1 },
      { src: '/images/sama%20facebook3.webp', alt: 'Sama Al Tariq Facebook campaign creative', w: 310, h: 393, left: '53%', top: '13%', rot: -1 },
      { src: '/images/sama%20tiktok4.webp',   alt: 'Sama Al Tariq TikTok short-form creative', w: 255, h: 453, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Shoots',
    caption: 'Production with intention',
    bg: '',
    tint: '#0A0908',              /* Unified cinematic black */
    cards: [
      { src: '/videos/shoots3-copy.mp4',  alt: 'Behind-the-scenes from a Dubai brand shoot', w: 320, h: 540, left:  '3%', top: '13%', rot: -2 },
      { src: '/images/shooting1.jpg',     alt: 'On-set photo from a cinematic brand shoot',  w: 320, h: 540, left: '28%', top:  '9%', rot:  1 },
      { src: '/videos/shoots-4-copy.mp4', alt: 'Production reel for a Dubai property brand', w: 320, h: 540, left: '53%', top: '13%', rot: -1 },
      { src: '/images/shooting%202.jpg',  alt: 'Behind-the-scenes lighting setup on location', w: 320, h: 540, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Edits',
    caption: 'Cut for retention, graded for taste',
    bg: '',
    tint: '#0A0908',              /* Unified cinematic black */
    cards: [
      { src: '/videos/edits1-copy.mp4', alt: 'Cinematic edit sample for a lifestyle brand',     w: 340, h: 575, left:  '3%', top: '11%', rot: -2 },
      { src: '/videos/edits2-copy.mp4', alt: 'Short-form social edit graded for cinematic feel', w: 340, h: 575, left: '28%', top:  '7%', rot:  1 },
      { src: '/videos/edits3-copy.mp4', alt: 'Reel edit for a Dubai property launch',           w: 340, h: 575, left: '53%', top: '11%', rot: -1 },
      { src: '/videos/edits4-copy.jpg', alt: 'Cinematic still from a graded brand edit',         w: 340, h: 575, left: '78%', top:  '7%', rot:  2 },
    ],
  },
];

const isVideo = (s) => /\.(mp4|webm|mov)$/i.test(s);

export default function WorkShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      const n = PANELS.length;

      /* Horizontal pinned scroll (unchanged mechanics — just adds id).
         Store the returned tween — containerAnimation needs the tween, NOT
         the ScrollTrigger instance. */
      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -(n - 1) * window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          id: 'work-h-scroll',
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerHeight}`,
          invalidateOnRefresh: true,
        },
      });

      /* Card entry — y-rise + opacity + rotateX, staggered, per-panel,
         linked to the horizontal scroll via containerAnimation */
      sectionRef.current.querySelectorAll('.work-panel').forEach((panel) => {
        const cards = panel.querySelectorAll('.work-card');
        if (!cards.length) return;
        gsap.from(cards, {
          y: 90,
          opacity: 0,
          rotationX: 14,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,
            start: 'left 85%',
            end: 'left 30%',
            scrub: 1,
          },
        });
      });

      /* Wipe line draw-in */
      sectionRef.current.querySelectorAll('.work-wipe-line').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line.closest('.work-panel'),
              containerAnimation: horizontalTween,
              start: 'left 95%',
              end: 'left 45%',
              scrub: 1,
            },
          }
        );
      });

      /* Caption rise */
      sectionRef.current.querySelectorAll('.work-caption').forEach((caption) => {
        gsap.fromTo(
          caption,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: caption.closest('.work-panel'),
              containerAnimation: horizontalTween,
              start: 'left 70%',
              end: 'left 30%',
              scrub: 1,
            },
          }
        );
      });

      /* Mouse parallax — target the panel currently closest to viewport center.
         Animate its cards on x/y/rotation, and drift the orb further. */
      const onMouseMove = (e) => {
        if (!sectionRef.current) return;
        const panels = sectionRef.current.querySelectorAll('.work-panel');
        if (!panels.length) return;

        const vCenter = window.innerWidth / 2;
        let closest = panels[0];
        let closestDist = Infinity;
        panels.forEach((p) => {
          const rect = p.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const dist = Math.abs(center - vCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = p;
          }
        });

        const rect = closest.getBoundingClientRect();
        const xRel = (e.clientX - rect.left) / rect.width - 0.5;
        const yRel = (e.clientY - rect.top) / rect.height - 0.5;

        const cards = closest.querySelectorAll('.work-card');
        gsap.to(cards, {
          x: xRel * 26,
          y: yRel * 18,
          rotationY: xRel * 6,
          rotationX: -yRel * 4,
          ease: 'power2.out',
          duration: 0.9,
        });
        const orb = closest.querySelector('.work-orb');
        if (orb) {
          gsap.to(orb, {
            x: xRel * 90,
            y: yRel * 70,
            ease: 'power2.out',
            duration: 1.3,
          });
        }
      };
      window.addEventListener('mousemove', onMouseMove);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    });

    /* ─── MOBILE (≤900px) — no GSAP. Panels stack natively via CSS,
       videos autoplay in-place, no pin/scrub anything. ─── */
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="work-show">
      <div ref={trackRef} className="work-track" style={{ width: `${PANELS.length * 100}vw` }}>
        {PANELS.map((p, i) => (
          <div key={i} className="work-panel is-dark" style={{ background: p.tint }}>
            <div className="work-orb" aria-hidden />
            <div className="work-cinema-veil" />
            <div className="work-grain" />

            {p.bg && (
              <div className="work-bg">
                {isVideo(p.bg)
                  ? <LazyVideo src={p.bg} poster={posterFor(p.bg)} />
                  : <img src={p.bg} alt="" />}
              </div>
            )}

            {!p.bg && (
              <div className="work-marquee" aria-hidden>
                <div className="work-marquee-track">
                  {Array.from({ length: 12 }).map((_, k) => (
                    <span key={k} className="m-item">
                      DAO STUDIO<i className="m-dot">✦</i>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="work-eyebrow">
              <span className="work-eyebrow-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-eyebrow-sep">/</span>
              <span className="work-eyebrow-total">{String(PANELS.length).padStart(2, '0')}</span>
              <span className="work-eyebrow-line" />
              <span className="work-eyebrow-cat">{p.label}</span>
            </div>

            <div className="work-num" aria-hidden>{String(i + 1).padStart(2, '0')}</div>

            <div className="work-veil" />

            {i > 0 && <div className="work-wipe-line" aria-hidden />}

            <div className="work-cards">
              {p.cards.map((c, j) => (
                <div
                  key={j}
                  className="work-card"
                  style={{
                    width: c.w,
                    height: c.h,
                    left: c.left,
                    top: c.top,
                    '--rot': `${c.rot || 0}deg`,
                  }}
                >
                  {c.src && (isVideo(c.src)
                    ? <LazyVideo src={c.src} poster={posterFor(c.src)} ariaLabel={c.alt} />
                    : <img src={c.src} alt={c.alt || ''} />)}
                  <div className="work-card-glare" aria-hidden />
                </div>
              ))}
            </div>

            <div className="work-bar">
              <div className="work-bar-text">
                <h3 className="work-label">{p.label}</h3>
                <p className="work-caption">{p.caption}</p>
              </div>
              <Link href="/services" className="work-btn">Case studies</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
