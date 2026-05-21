'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Each panel = one category.
   To add Sama Al Tariq content: set `bg` to a path like '/images/sat-bg-1.jpg'
   or a video '/videos/sat-1.mp4', and set each card's `src` similarly.
   Empty strings fall back to a tinted gradient so the layout still renders. */
const PANELS = [
  {
    label: 'Cinematic',
    bg: '',
    tint: '#A8BCB5',              /* deeper sage — washed Product Design teal #1E3D38 */
    cards: [
      { src: '/videos/cinematic%201.mp4', w: 320, h: 540, left: '3%',  top: '13%', rot: -2 },
      { src: '/videos/cinematic%202.mp4', w: 320, h: 540, left: '28%', top:  '9%', rot:  1 },
      { src: '/videos/cinematic%203.mp4', w: 320, h: 540, left: '53%', top: '13%', rot: -1 },
      { src: '/videos/cinematic%20copy.mp4', w: 320, h: 540, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Social Media',
    bg: '',
    tint: '#D9A48C',              /* deeper terracotta — washed Branding #B8472B */
    cards: [
      { src: '/images/sama%20linkedin2.png', w: 315, h: 420, left: '2%',  top: '12%', rot: -2 },
      { src: '/images/insta%20sama1.png',    w: 305, h: 402, left: '28%', top: '17%', rot:  1 },
      { src: '/images/sama%20facebook3.png', w: 310, h: 393, left: '53%', top: '13%', rot: -1 },
      { src: '/images/sama%20tiktok4.png',   w: 255, h: 453, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Shoots',
    bg: '',
    tint: '#E8C887',              /* deeper amber — washed E-commerce #E0A43B */
    cards: [
      { src: '/videos/shoots3%20copy.mp4',   w: 320, h: 540, left:  '3%', top: '13%', rot: -2 },
      { src: '/images/shooting1.jpg',        w: 320, h: 540, left: '28%', top:  '9%', rot:  1 },
      { src: '/videos/shoots%204%20copy.mp4', w: 320, h: 540, left: '53%', top: '13%', rot: -1 },
      { src: '/images/shooting%202.jpg',     w: 320, h: 540, left: '78%', top:  '9%', rot:  2 },
    ],
  },
  {
    label: 'Edits',
    bg: '',
    tint: '#C9A0A8',              /* deeper dusty rose — washed Editorial #7A3A48 */
    cards: [
      { src: '/videos/edits1%20copy.mp4', w: 340, h: 575, left:  '3%', top: '11%', rot: -2 },
      { src: '/videos/edits2%20copy.mp4', w: 340, h: 575, left: '28%', top:  '7%', rot:  1 },
      { src: '/videos/edits3%20copy.mp4', w: 340, h: 575, left: '53%', top: '11%', rot: -1 },
      { src: '/videos/edits4%20copy.jpg', w: 340, h: 575, left: '78%', top:  '7%', rot:  2 },
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
      gsap.to(trackRef.current, {
        x: () => -(n - 1) * window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerHeight}`,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="work-show">
      <div ref={trackRef} className="work-track" style={{ width: `${PANELS.length * 100}vw` }}>
        {PANELS.map((p, i) => (
          <div key={i} className={`work-panel ${p.bg ? 'is-dark' : 'is-light'}`} style={{ background: p.tint }}>
            {p.bg && (
              <div className="work-bg">
                {isVideo(p.bg)
                  ? <video src={p.bg} autoPlay muted loop playsInline />
                  : <img src={p.bg} alt="" />}
              </div>
            )}

            {/* Background marquee — runs DAO STUDIO through every panel except Showreel */}
            {!p.bg && (
              <div className="work-marquee" aria-hidden>
                <div className="work-marquee-track">
                  {Array.from({ length: 12 }).map((_, k) => (
                    <span key={k} className="m-item">
                      DAO STUDIO<i className="m-dot"></i>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial section eyebrow — top-left */}
            <div className="work-eyebrow">
              <span className="work-eyebrow-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-eyebrow-sep">/</span>
              <span className="work-eyebrow-total">{String(PANELS.length).padStart(2, '0')}</span>
              <span className="work-eyebrow-line" />
              <span className="work-eyebrow-cat">{p.label}</span>
            </div>

            <div className="work-veil" />

            <div className="work-cards">
              {p.cards.map((c, j) => (
                <div key={j} className="work-card"
                  style={{ width: c.w, height: c.h, left: c.left, top: c.top,
                           '--rot': `${c.rot || 0}deg` }}>
                  {c.src && (isVideo(c.src)
                    ? <video src={c.src} autoPlay muted loop playsInline />
                    : <img src={c.src} alt="" />)}
                </div>
              ))}
            </div>

            <div className="work-bar">
              <h3 className="work-label">{p.label}</h3>
              <Link href="/services" className="work-btn">Case studies</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
