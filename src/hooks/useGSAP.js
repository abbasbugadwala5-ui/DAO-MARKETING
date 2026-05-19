'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Runs a GSAP setup function inside a scoped gsap.context so every
 * tween and ScrollTrigger created within is reverted on unmount.
 * Lightweight stand-in for @gsap/react's useGSAP.
 *
 * @param {Function} fn      setup function
 * @param {Object}   options { scope: ref, dependencies: [] }
 */
export function useGSAP(fn, { scope, dependencies = [] } = {}) {
  useEffect(() => {
    const ctx = gsap.context(fn, scope?.current || undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
