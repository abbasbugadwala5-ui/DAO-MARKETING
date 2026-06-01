'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    letter: 'D',
    name: 'Define',
    desc: 'Strip the brand to its essentials. Identify what only you can credibly say. Position before production — never the reverse.',
  },
  {
    letter: 'A',
    name: 'Amplify',
    desc: 'Cinematic content engineered for the algorithm. Hooks designed for retention, not applause. Distribution treated as a science.',
  },
  {
    letter: 'O',
    name: 'Own',
    desc: 'Convert audience into category authority. Saturate the niche until competitors have to react. Compounding equity — not campaigns.',
  },
];

export default function DAOMethod() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Initial hidden states (applied everywhere) */
      gsap.set('.dao-eyebrow', { y: 18, opacity: 0 });
      gsap.set('.dao-title-word', { yPercent: 110 });
      gsap.set('.dao-lede', { y: 22, opacity: 0 });
      gsap.set('.dao-pillar', { y: 90, opacity: 0 });
      gsap.set('.dao-letter', { y: 40, scale: 0.85, opacity: 0 });
      gsap.set('.dao-name', { y: 24, opacity: 0 });
      gsap.set('.dao-desc', { y: 18, opacity: 0 });
      gsap.set('.dao-pillar-rule', { scaleX: 0, transformOrigin: 'center center' });

      const pillars = gsap.utils.toArray('.dao-pillar');
      const mm = gsap.matchMedia();

      /* ─── PINNED SCRUB CARD-BY-CARD REVEAL — works on desktop AND mobile ─── */
      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          isMobile:  '(max-width: 900px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: isDesktop ? '+=320%' : '+=220%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to('.dao-eyebrow', { y: 0, opacity: 1, duration: 0.5 })
            .to('.dao-title-word', { yPercent: 0, duration: 0.7, stagger: 0.1 }, '-=0.2')
            .to('.dao-lede', { y: 0, opacity: 1, duration: 0.55 }, '-=0.2')
            .to({}, { duration: 0.6 });

          pillars.forEach((p, i) => {
            const letter = p.querySelector('.dao-letter');
            const name   = p.querySelector('.dao-name');
            const desc   = p.querySelector('.dao-desc');
            const rule   = p.querySelector('.dao-pillar-rule');
            const label  = `card${i}`;
            tl.addLabel(label, '+=0.4')
              .to(p,      { y: 0, opacity: 1, duration: 0.7 }, label)
              .to(letter, { y: 0, scale: 1, opacity: 1, duration: 0.7 },     `${label}+=0.1`)
              .to(name,   { y: 0, opacity: 1, duration: 0.45 },              `${label}+=0.4`)
              .to(desc,   { y: 0, opacity: 1, duration: 0.5 },               `${label}+=0.5`)
              .to(rule,   { scaleX: 1, duration: 0.55 },                     `${label}+=0.6`);
          });

          tl.to({}, { duration: 0.6 });
        }
      );

      /* ─── Subtle cursor tilt + letter lift on hover — desktop only ─── */
      mm.add('(min-width: 901px)', () => {
        const cleanups = [];
        pillars.forEach((pillar) => {
          const letter = pillar.querySelector('.dao-letter');

          const onMove = (e) => {
            const rect = pillar.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(pillar, { rotationX: -y * 6, ease: 'power2.out', duration: 0.5, overwrite: 'auto' });
            gsap.to(letter, { x: x * 14, y: y * 10, ease: 'power2.out', duration: 0.6, overwrite: 'auto' });
          };
          const onEnter = () => {
            gsap.to(letter, { scale: 1.06, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
          };
          const onLeave = () => {
            gsap.to(pillar, { rotationX: 0, ease: 'power3.out', duration: 0.9 });
            gsap.to(letter, { x: 0, y: 0, scale: 1, ease: 'power3.out', duration: 0.9 });
          };

          pillar.addEventListener('mousemove', onMove);
          pillar.addEventListener('mouseenter', onEnter);
          pillar.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            pillar.removeEventListener('mousemove', onMove);
            pillar.removeEventListener('mouseenter', onEnter);
            pillar.removeEventListener('mouseleave', onLeave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="dao-method">
      <div className="dao-method-orb" aria-hidden />

      <div className="dao-method-inner">
        <div className="dao-eyebrow">
          <span className="dao-eyebrow-dot" aria-hidden />
          The Method · What DAO stands for
        </div>

        <h2 className="dao-title">
          {['Define', 'Amplify', 'Own'].map((w, i) => (
            <span key={i} className="dao-title-line">
              <span className="dao-title-word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>

        <p className="dao-lede">
          Three letters. Three deliberate phases. Every brand we build moves through them — in sequence, never skipped, never reversed.
        </p>

        <div className="dao-pillars">
          {PILLARS.map((p) => (
            <article key={p.letter} className="dao-pillar">
              <div className="dao-shine" aria-hidden />
              <div className="dao-letter-wrap">
                <span className="dao-letter">{p.letter}</span>
              </div>
              <h3 className="dao-name">{p.name}</h3>
              <p className="dao-desc">{p.desc}</p>
              <div className="dao-pillar-rule" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
