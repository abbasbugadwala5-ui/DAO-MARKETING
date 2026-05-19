'use client';
import { useEffect } from 'react';
import { useLenis } from '@/components/SmoothScroll';

export default function HashScroll() {
  const lenisRef = useLenis();
  useEffect(() => {
    const go = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (!el) return;
      const lenis = lenisRef?.current;
      if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.4 });
      else el.scrollIntoView();
    };
    const t = setTimeout(go, 300);
    window.addEventListener('hashchange', go);
    return () => { clearTimeout(t); window.removeEventListener('hashchange', go); };
  }, [lenisRef]);
  return null;
}
