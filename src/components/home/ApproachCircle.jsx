'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const steps = ['Discovery', 'Strategy', 'Creative', 'Production', 'Launch', 'Growth'];
const angles = [-90, -30, 30, 90, 150, 210];

export default function ApproachCircle() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.node', { opacity: 1, ease: 'none', stagger: 0.5,
      scrollTrigger: { trigger: '.approach', start: 'top top', end: 'bottom bottom', scrub: 1 } });
  }, { scope: root });

  return (
    <section ref={root} className="approach">
      <div className="approach-sticky">
        <div className="circle-wrap">
          <div className="ring" />
          <div className="circle-center"><small>How we work</small><strong>Our Approach</strong></div>
          {steps.map((s, i) => {
            const a = (angles[i] * Math.PI) / 180;
            const x = 50 + 50 * Math.cos(a);
            const y = 50 + 50 * Math.sin(a);
            const cls = i === 0 ? 'top' : i === 3 ? 'bot' : x > 50 ? 'side-r' : 'side-l';
            return (
              <div key={s} className={`node ${cls}`} style={{ left: `${x}%`, top: `${y}%` }}>
                <div className="dot" />
                <div className="lbl">{s}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}