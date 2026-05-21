'use client';

/* Full-bleed kinetic ribbon that bridges Hero -> Services.
   Replaces the static pillars row with a continuous marquee:
   sans display + Playfair italic accents, terra-cotta star separators. */
const ITEMS = [
  'Strategy', 'Branding', 'Product Design', 'E-commerce', 'CRO Audit',
  'SEO', 'Paid Media', 'Social Media', 'Email & CRM',
];

export default function ServicesRibbon() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="svc-ribbon" aria-hidden>
      <div className="svc-ribbon-track">
        {loop.map((label, i) => (
          <span key={i} className="svc-ribbon-item">
            <span className={`svc-ribbon-text${i % 2 === 1 ? ' is-italic' : ''}`}>
              {label}
            </span>
            <span className="svc-ribbon-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
