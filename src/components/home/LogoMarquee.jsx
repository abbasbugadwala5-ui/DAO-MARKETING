'use client';

const logos = ['Northwind', 'Atoll', 'Vellum', 'Crava', 'Bloomr', 'Pallas', 'Sienna', 'Voltura'];

export default function LogoMarquee() {
  const row = [...logos, ...logos]; // doubled for a seamless loop
  return (
    <section className="marquee" aria-label="Selected clients">
      <div className="marquee-track">
        {row.map((l, i) => <span key={i} className="marquee-logo">{l}</span>)}
      </div>
    </section>
  );
}