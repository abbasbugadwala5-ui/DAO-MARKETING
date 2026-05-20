'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(!isHome);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (isHome) setVisible(y > window.innerHeight * 0.7);
      else setVisible(true);
      setScrolled(y > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-5 py-5 transition-all duration-500 md:px-8 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      {/* ── Brand pill ─────────────────────────────────────────────── */}
      <Link
        href="/"
        aria-label="DAO Studio — Home"
        className={`group flex items-center gap-3 rounded-full border border-white/40 bg-white/75 py-1.5 pl-1.5 pr-5 shadow-[0_2px_4px_rgba(18,23,42,0.04),0_10px_30px_-8px_rgba(18,23,42,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_2px_4px_rgba(18,23,42,0.04),0_14px_36px_-8px_rgba(18,23,42,0.22)] ${
          scrolled ? 'border-white/60 bg-white/85' : ''
        }`}
      >
        {/* Dark badge so the white-fill logo SVG reads against the light pill */}
        <span className="relative grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full bg-[#12172A] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/5">
          <img
            src="/logo/logo.svg"
            alt=""
            aria-hidden
            className="h-[34px] w-[34px] object-contain"
          />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#12172A]/60 group-hover:text-[#12172A]/85 transition-colors duration-300">
          Studio
        </span>
      </Link>

      {/* ── Nav pill ───────────────────────────────────────────────── */}
      <nav className="relative flex items-center gap-0.5 rounded-full border border-white/40 bg-white/75 p-1.5 shadow-[0_2px_4px_rgba(18,23,42,0.04),0_10px_30px_-8px_rgba(18,23,42,0.18)] backdrop-blur-2xl backdrop-saturate-150">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative flex items-center rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300 md:px-5 ${
                active
                  ? 'bg-[#12172A] text-white shadow-[0_6px_18px_-4px_rgba(18,23,42,0.45)]'
                  : 'text-[#12172A]/70 hover:bg-[#ECEAE3]/70 hover:text-[#12172A]'
              }`}
            >
              <span className="relative">
                {l.label}
                {!active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#12172A] transition-all duration-300 group-hover:w-full"
                  />
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <Link
        href="/contact"
        className="group hidden items-center gap-2.5 rounded-full bg-[#12172A] px-6 py-3 text-[13px] font-medium tracking-[0.02em] text-white shadow-[0_10px_30px_-8px_rgba(18,23,42,0.45)] ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0a0f1c] hover:shadow-[0_14px_36px_-8px_rgba(18,23,42,0.55)] sm:flex"
      >
        Start a project
        <span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </Link>
    </header>
  );
}
