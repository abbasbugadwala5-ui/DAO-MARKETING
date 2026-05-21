'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

/* Stroke icons for each phase — kept as raw SVG strings so we can
   swap the center icon imperatively via innerHTML inside the GSAP
   timeline (same pattern as numRef / nameRef / descRef). */
const ICONS = {
  Discovery:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  Strategy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
  Creative:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/></svg>',
  Production:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>',
  Launch:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 15 6-6"/><path d="M9 9h6v6"/></svg>',
  Growth:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>',
};

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
  const iconRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const tipRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Draw the progress arc as user scrolls — this is the line that connects dots
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

    // Master scroll-driven update: beacon position, active step, center text
    let lastIdx = -1;
    ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate(self) {
        if (!root.current || !tipRef.current) return;
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

        // Center text + icon swap with quick fade-up
        const targets = [numRef.current, iconRef.current, nameRef.current, descRef.current];
        gsap.timeline()
          .to(targets, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
          .call(() => {
            numRef.current.textContent = String(idx + 1).padStart(2, '0');
            iconRef.current.innerHTML = ICONS[STEPS[idx].name];
            nameRef.current.textContent = STEPS[idx].name;
            descRef.current.textContent = STEPS[idx].desc;
          })
          .to(targets, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
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

            {/* Progress arc — connects the dots as user scrolls */}
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
            <div
              ref={iconRef}
              className="center-icon"
              aria-hidden
              dangerouslySetInnerHTML={{ __html: ICONS.Discovery }}
            />
            <strong ref={nameRef} className="step-name">Discovery</strong>
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
                  <span
                    className="node-icon"
                    aria-hidden
                    dangerouslySetInnerHTML={{ __html: ICONS[s.name] }}
                  />
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
