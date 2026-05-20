'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const STEPS = [
  { name: 'Discovery',  desc: 'Audit, brief, define the problem.' },
  { name: 'Strategy',   desc: 'Positioning, proof, the case.' },
  { name: 'Creative',   desc: 'Concept, art direction, copy.' },
  { name: 'Production', desc: 'Build, shoot, edit, ship.' },
  { name: 'Launch',     desc: 'Go-live, rollout, hand-off.' },
  { name: 'Growth',     desc: 'Iterate, optimise, scale.' },
];

const ANGLES = [-90, -30, 30, 90, 150, 210];

const R = 240;
const C = 2 * Math.PI * R;

export default function ApproachCircle() {
  const root = useRef(null);
  const numRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const tipRef = useRef(null);
  const spokeRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Draw the progress arc as user scrolls through the section
    gsap.to('.ring-arc', {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Two counter-rotating decorative rings — ambient depth
    gsap.to('.ring-outer', {
      rotate: 360, duration: 140, ease: 'none', repeat: -1, transformOrigin: '50% 50%',
    });
    gsap.to('.ring-inner', {
      rotate: -360, duration: 90, ease: 'none', repeat: -1, transformOrigin: '50% 50%',
    });

    // Master scroll-driven update: beacon position, active step, spoke target, center text
    let lastIdx = -1;
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate(self) {
        const p = self.progress;

        // Move the traveling beacon along the arc tip
        const angle = -Math.PI / 2 + p * Math.PI * 2;
        const x = R * Math.cos(angle);
        const y = R * Math.sin(angle);
        gsap.set(tipRef.current, { attr: { cx: x, cy: y } });

        // Detect active step
        const idx = Math.min(
          STEPS.length - 1,
          Math.floor(p * STEPS.length)
        );
        if (idx === lastIdx) return;
        lastIdx = idx;

        const nodes = root.current.querySelectorAll('.node');
        nodes.forEach((n, i) => n.classList.toggle('active', i === idx));

        // Pivot the radial spoke to point at the new active node
        gsap.to(spokeRef.current, {
          rotate: ANGLES[idx] + 90,
          duration: 0.7,
          ease: 'power3.out',
          transformOrigin: '50% 50%',
        });

        // Center text swap with quick fade-up
        gsap.timeline()
          .to([numRef.current, nameRef.current, descRef.current],
            { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
          .call(() => {
            numRef.current.textContent = String(idx + 1).padStart(2, '0');
            nameRef.current.textContent = STEPS[idx].name;
            descRef.current.textContent = STEPS[idx].desc;
          })
          .to([numRef.current, nameRef.current, descRef.current],
            { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      },
    });
  }, { scope: root });

  return (
    <section ref={root} className="approach">
      <div className="approach-sticky">
        <div className="circle-wrap">
          <svg className="ring-svg" viewBox="-320 -320 640 640" aria-hidden>
            <defs>
              <radialGradient id="approach-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(18,23,42,0.06)" />
                <stop offset="100%" stopColor="rgba(18,23,42,0)" />
              </radialGradient>
            </defs>

            {/* Soft central glow for depth */}
            <circle cx="0" cy="0" r="300" fill="url(#approach-glow)" />

            {/* Outer decorative ring — slow clockwise */}
            <g className="ring-outer">
              <circle cx="0" cy="0" r={R + 48} />
            </g>

            {/* Inner decorative ring — counter-clockwise */}
            <g className="ring-inner">
              <circle cx="0" cy="0" r={R - 36} />
            </g>

            {/* Base dashed ring (the path the arc draws over) */}
            <circle className="ring-base" cx="0" cy="0" r={R} />

            {/* Radial spoke from center → active node */}
            <line
              ref={spokeRef}
              className="ring-spoke"
              x1="0" y1="0"
              x2="0" y2={-R}
            />

            {/* Progress arc (draws as user scrolls) */}
            <circle
              className="ring-arc"
              cx="0" cy="0" r={R}
              strokeDasharray={C}
              strokeDashoffset={C}
              transform="rotate(-90)"
            />

            {/* Traveling beacon — rides the arc tip */}
            <circle
              ref={tipRef}
              className="ring-tip"
              cx="0" cy={-R}
              r="7"
            />
          </svg>

          <div className="circle-center">
            <small>How we work</small>
            <div ref={numRef} className="step-num">01</div>
            <strong ref={nameRef}>Discovery</strong>
            <p ref={descRef} className="step-desc">Audit, brief, define the problem.</p>
          </div>

          {STEPS.map((s, i) => {
            const a = (ANGLES[i] * Math.PI) / 180;
            const x = 50 + 50 * Math.cos(a);
            const y = 50 + 50 * Math.sin(a);
            const posCls = i === 0 ? 'top' : i === 3 ? 'bot' : x > 50 ? 'side-r' : 'side-l';
            return (
              <div
                key={s.name}
                className={`node ${posCls}${i === 0 ? ' active' : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="dot" />
                <div className="meta">
                  <span className="node-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lbl">{s.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
