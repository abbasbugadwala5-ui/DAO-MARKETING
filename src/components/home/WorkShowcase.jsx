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
    tint: '#0a1322',              /* cool cinematic blue-black */
    cards: [
      { src: '/videos/cinematic%201.mp4', w: 280, h: 498, left: '7%',  top: '14%', rot: -2 },
      { src: '/videos/cinematic%202.mp4', w: 300, h: 533, left: '38%', top:  '8%', rot:  1 },
      { src: '/videos/cinematic%203.mp4', w: 280, h: 498, left: '68%', top: '14%', rot: -1 },
    ],
  },
  {
    label: 'Interiors',
    bg: '',
    tint: '#1a120d',              /* warm dark espresso */
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
    tint: '#0d1817',              /* deep production teal */
    cards: [
      { src: '/images/shooting1.jpg',     w: 340, h: 510, left: '10%', top: '16%', rot: -2 },
      { src: '/images/shooting%202.jpg',  w: 360, h: 540, left: '50%', top: '11%', rot:  1 },
    ],
  },
  {
    label: 'Showreel',
    bg: '/videos/dubai%20aerial.mp4',
    tint: '#000',                 /* video covers the panel */
    cards: [],
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
          <div key={i} className="work-panel" style={{ background: p.tint }}>
            {p.bg && (
              <div className="work-bg">
                {isVideo(p.bg)
                  ? <video src={p.bg} autoPlay muted loop playsInline />
                  : <img src={p.bg} alt="" />}
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

            {/* Giant panel number watermark — bottom-right */}
            <div className="work-num" aria-hidden>
              {String(i + 1).padStart(2, '0')}
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
