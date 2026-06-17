'use client';

import { useEffect, createContext, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Wraps the app in a Lenis smooth-scroll instance and keeps GSAP
 * ScrollTrigger perfectly in sync — every scroll-driven animation
 * in the project reads from the same RAF loop, so there is no lag.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Skip Lenis on touch devices — native scroll is already hardware-optimized
    // and Lenis on top of it causes jank, lag, and broken sticky/scroll triggers.
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 900px)').matches);

    if (isTouchDevice) {
      // Still keep ScrollTrigger working with native scroll
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);
      ScrollTrigger.refresh();
      if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      return () => window.removeEventListener('load', onLoad);
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // route in-page anchor links through Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -10, duration: 1.5 });
      }
    };
    document.addEventListener('click', onClick);

    ScrollTrigger.refresh();
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('load', onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // on route change → jump to top, re-measure ScrollTriggers
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Native scroll path (touch devices)
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
