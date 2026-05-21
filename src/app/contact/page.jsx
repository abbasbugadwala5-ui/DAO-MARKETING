'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactFormSection from '@/components/ContactFormSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.c-reveal').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="contact-v2 contact-minimal">
      <section className="cv2-mini-hero">
        <div className="cv2-mini-hero-inner">
          <div className="cv2-eyebrow c-reveal">Get in touch · Dubai · 2026</div>
          <h1 className="cv2-mini-hero-title c-reveal">
            Let&rsquo;s start the <em>conversation</em>.
          </h1>
          <p className="cv2-mini-hero-lede c-reveal">
            Tell us about the project — a real person reads every enquiry and
            replies with a clear next step within a day.
          </p>
        </div>
      </section>

      <ContactFormSection />
    </main>
  );
}
