'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const phases = [
  {
    num: '01',
    kicker: 'The Brief',
    title: 'Understanding before answering.',
    body: 'Stakeholders, audiences, competitors and analytics — a deep listen that becomes a positioning brief every later decision answers to.',
    tags: ['Audit', 'Workshops', 'Positioning'],
    /* Soft cream — lightest */
    tint: { from: '#FBF1D8', to: '#EFDBA8', glow: 'rgba(26, 26, 26, 0.06)' },
  },
  {
    num: '02',
    kicker: 'The Craft',
    title: 'Strategy, brand and product in lockstep.',
    body: 'Identity, narrative and interface designed in parallel — one team, one direction, no handoffs that lose the thread.',
    tags: ['Identity', 'UX / UI', 'Design system'],
    /* Champagne */
    tint: { from: '#F8EAC6', to: '#E5CC92', glow: 'rgba(26, 26, 26, 0.08)' },
  },
  {
    num: '03',
    kicker: 'The Build',
    title: 'Engineering that holds up at scale.',
    body: 'Next.js, Shopify, headless commerce and bespoke stacks — production-ready code, content models that flex, infrastructure that ships.',
    tags: ['Engineering', 'CMS', 'Performance'],
    /* Warm dust */
    tint: { from: '#F5E5BC', to: '#DCC18B', glow: 'rgba(26, 26, 26, 0.08)' },
  },
  {
    num: '04',
    kicker: 'The Lift',
    title: 'Launch, measure, then move the number.',
    body: 'Launch is the start of the work. Conversion testing, paid media, lifecycle and SEO compound the line that matters.',
    tags: ['Launch', 'CRO', 'Growth'],
    /* Deepest gold — anchors the row */
    tint: { from: '#F0DEAA', to: '#D2B47A', glow: 'rgba(26, 26, 26, 0.10)' },
  },
];

export default function Process() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.process-word', {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: '.process-heading', start: 'top 90%' },
    });

    gsap.from('.process-step', {
      y: 56, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.process-grid', start: 'top 82%' },
    });
  }, { scope: root });

  return (
    <section ref={root} className="section-pad process-section">
      <div className="section-wrap">
        <div className="svc-eyebrow-row">
          <div className="eyebrow text-inksoft">How we work</div>
          <span className="svc-eyebrow-rule" aria-hidden />
          <div className="eyebrow text-inksoft">04 Phases</div>
        </div>

        <div className="svc-heading-grid">
          <h2 className="process-heading svc-heading-xl">
            {'From brief to lift-off.'.split(' ').map((w, i) => (
              <span key={i} className="reveal-line">
                <span className={`process-word reveal-word${w === 'lift-off.' ? ' svc-italic' : ''}`}>{w}&nbsp;</span>
              </span>
            ))}
          </h2>
          <p className="svc-lead">
            Four overlapping phases — discovery flows into design, design into build,
            and build into the work that lifts the number. No silos, no relay-race handoffs.
          </p>
        </div>

        <div className="process-grid">
          {phases.map((p) => (
            <article
              key={p.num}
              className="process-step"
              style={{
                '--tint-from': p.tint.from,
                '--tint-to': p.tint.to,
                '--tint-glow': p.tint.glow,
              }}
            >
              <div className="process-num">{p.num}</div>
              <div className="process-kicker">{p.kicker}</div>
              <h3 className="process-title">{p.title}</h3>
              <p className="process-body">{p.body}</p>
              <div className="process-tags">
                {p.tags.map((t) => <span key={t} className="process-tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
